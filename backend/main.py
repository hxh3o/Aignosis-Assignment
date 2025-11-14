import os
from typing import Generator
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Video Streaming API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PRIVATE_KEY_PATH = "private_key_test.pem"
STORAGE_DIR = "storage"

os.makedirs(STORAGE_DIR, exist_ok=True)


def load_private_key():
    try:
        with open(PRIVATE_KEY_PATH, "rb") as f:
            pem = f.read()
        return serialization.load_pem_private_key(pem, password=None)
    except FileNotFoundError:
        logger.error(f"Private key not found at {PRIVATE_KEY_PATH}")
        raise HTTPException(status_code=500, detail="Server configuration error: Private key not found")
    except Exception as e:
        logger.error(f"Error loading private key: {e}")
        raise HTTPException(status_code=500, detail="Failed to load private key")


def decrypt_rsa_password(encrypted_key_path: str) -> bytes:
    try:
        priv_key = load_private_key()
        with open(encrypted_key_path, "rb") as f:
            encrypted_password = f.read()
        
        password = priv_key.decrypt(
            encrypted_password,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None,
            ),
        )
        logger.info(f"RSA-decrypted password length: {len(password)} bytes")
        return password
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Encrypted key file not found")
    except Exception as e:
        logger.error(f"RSA decryption failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to decrypt password")


def decrypt_video_stream(encrypted_video_path: str, password: bytes) -> bytes:
    try:
        with open(encrypted_video_path, "rb") as f:
            full_data = f.read()
        
        salt = full_data[:16]
        nonce = full_data[16:28]
        ciphertext = full_data[28:]
        
        logger.info(f"Salt length: {len(salt)}, Nonce length: {len(nonce)}, Ciphertext length: {len(ciphertext)}")
        
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        aes_key = kdf.derive(password)
        logger.info(f"Derived AES key length: {len(aes_key)} bytes")
        
        aesgcm = AESGCM(aes_key)
        decrypted_data = aesgcm.decrypt(nonce, ciphertext, None)
        
        logger.info(f"Successfully decrypted video, size: {len(decrypted_data)} bytes")
        return decrypted_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Encrypted video file not found")
    except Exception as e:
        logger.error(f"Video decryption failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to decrypt video")


def generate_video_stream(decrypted_data: bytes, chunk_size: int = 1024 * 1024) -> Generator[bytes, None, None]:
    for i in range(0, len(decrypted_data), chunk_size):
        yield decrypted_data[i:i + chunk_size]


@app.get("/")
async def root():
    return {
        "message": "Video Streaming API",
        "version": "1.0.0",
        "endpoints": {
            "/video/stream": "Stream decrypted video"
        }
    }


@app.get("/video/stream")
async def stream_video(
    uid: str = Query(..., description="User ID"),
    tid: str = Query(..., description="Transaction ID")
):
    logger.info(f"Stream request received - UID: {uid}, Transaction ID: {tid}")
    
    encrypted_video_path = os.path.join(STORAGE_DIR, "random_video__encrypted.bin")
    encrypted_key_path = os.path.join(STORAGE_DIR, "random_video__encrypted_key.bin")
    
    if not os.path.exists(encrypted_video_path):
        logger.error(f"Video file not found: {encrypted_video_path}")
        raise HTTPException(status_code=404, detail="Test video file not found. Please run setup_test_files.py")
    
    if not os.path.exists(encrypted_key_path):
        logger.error(f"Key file not found: {encrypted_key_path}")
        raise HTTPException(status_code=404, detail="Test key file not found. Please run setup_test_files.py")
    
    try:
        password = decrypt_rsa_password(encrypted_key_path)
        
        decrypted_video = decrypt_video_stream(encrypted_video_path, password)
        
        return StreamingResponse(
            generate_video_stream(decrypted_video),
            media_type="video/mp4",
            headers={
                "Accept-Ranges": "bytes",
                "Content-Length": str(len(decrypted_video)),
                "Cache-Control": "no-cache"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error during streaming: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

