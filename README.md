# Video Decryption & Streaming Platform

A secure admin panel for streaming encrypted videos with on-the-fly decryption. Built with FastAPI backend and Next.js frontend.

## 🎯 Features

- **Secure Video Streaming**: RSA + AES-GCM encrypted video delivery
- **On-the-fly Decryption**: Videos are decrypted in real-time without saving to disk
- **Modern UI**: Beautiful, responsive interface with dark mode
- **RESTful API**: Clean FastAPI backend with comprehensive documentation
- **Type-Safe Frontend**: Built with TypeScript and Next.js 14
- **Chunked Streaming**: Efficient streaming for large video files

## 🏗️ Architecture

### Backend (FastAPI)
- **Endpoint**: `/video/stream?uid=<uid>&tid=<transaction_id>`
- **Decryption**: RSA-OAEP for key decryption, AES-GCM for video decryption
- **Streaming**: Chunked response for efficient delivery
- **Security**: PBKDF2 key derivation with 100,000 iterations

### Frontend (Next.js + TypeScript)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Components**: React with TypeScript
- **Video Player**: HTML5 video element with custom controls

## 📁 Project Structure

```
aignosis/
├── backend/
│   ├── main.py                      # FastAPI application
│   ├── requirements.txt             # Python dependencies
│   ├── generate_test_key.py         # Key generation utility
│   ├── setup_test_files.py          # Test file setup utility
│   ├── storage/                     # Encrypted video storage
│   │   ├── {uid}_{tid}_encrypted.bin
│   │   └── {uid}_{tid}_encrypted_key.bin
│   ├── private_key_test.pem         # RSA private key (generate this)
│   └── README.md
├── frontend/
│   ├── app/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Main video player
│   │   └── globals.css              # Global styles
│   ├── package.json                 # Node dependencies
│   ├── tsconfig.json                # TypeScript config
│   ├── tailwind.config.js           # Tailwind config
│   └── README.md
└── README.md                        # This file
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 18+** with npm
- **Git** (for cloning)

### 1. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Generate RSA key pair (if not provided)
python generate_test_key.py

# Setup test files in storage directory
python setup_test_files.py

# Run the server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

**API Documentation:**
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 2. Setup Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Test the Application

1. Open `http://localhost:3000` in your browser
2. Enter the test credentials:
   - **UID**: `random_video`
   - **Transaction ID**: (leave empty)
3. Click **Load & Play Video**
4. The video should stream and play automatically

## 🔐 Decryption Process

```
1. Client requests video with UID and Transaction ID
                    ↓
2. Backend loads RSA private key
                    ↓
3. Backend decrypts AES password using RSA-OAEP
                    ↓
4. Backend reads encrypted video (salt + nonce + ciphertext)
                    ↓
5. Backend derives AES-256 key using PBKDF2
                    ↓
6. Backend decrypts video using AES-GCM
                    ↓
7. Backend streams decrypted chunks to client
                    ↓
8. Client plays video in HTML5 player
```

## 📝 File Naming Convention

Store encrypted files following this pattern:

- **Video**: `{uid}_{transaction_id}_encrypted.bin`
- **Key**: `{uid}_{transaction_id}_encrypted_key.bin`

Example:
- `user123_tx456_encrypted.bin`
- `user123_tx456_encrypted_key.bin`

## 🔧 Configuration

### Backend Configuration

Edit `backend/main.py` to change:
- `PRIVATE_KEY_PATH`: Path to RSA private key
- `STORAGE_DIR`: Directory for encrypted files
- CORS settings for production

### Frontend Configuration

Edit `frontend/app/page.tsx` to change:
- API endpoint URL (default: `http://localhost:8000`)
- Video player settings
- UI theme colors

## 🎨 UI Features

- **Modern Dark Theme**: Gradient backgrounds with glassmorphism
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Fade-in and slide-up effects
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations
- **Video Controls**: Full-featured HTML5 player

## 📦 Dependencies

### Backend
- `fastapi==0.104.1` - Modern web framework
- `uvicorn==0.24.0` - ASGI server
- `cryptography==41.0.7` - Encryption/decryption
- `python-multipart==0.0.6` - Form data handling

### Frontend
- `next==14.0.0` - React framework
- `react==18.2.0` - UI library
- `typescript==5.2.2` - Type safety
- `tailwindcss==3.3.5` - Utility-first CSS
- `lucide-react==0.294.0` - Icon library

## 🔒 Security Considerations

### Current Implementation (Development)
- Private key stored in plaintext
- CORS allows all origins
- No authentication/authorization
- No rate limiting


## 🧪 Testing

### Backend Testing

```bash
cd backend

# Test health endpoint
curl http://localhost:8000/health

# Test video streaming
curl "http://localhost:8000/video/stream?uid=random_video&tid=" --output test.mp4

# View API documentation
open http://localhost:8000/docs
```

### Frontend Testing

1. Enter valid UID and Transaction ID
2. Verify video loads and plays
3. Test error scenarios (invalid UID, empty fields)
4. Test responsive design on different screen sizes

## 🐛 Troubleshooting

### Backend Issues

**Error: Private key not found**
```bash
# Generate a test key
python generate_test_key.py
```

**Error: Video/key file not found**
```bash
# Setup test files
python setup_test_files.py
```

**Port 8000 already in use**
```bash
# Use a different port
uvicorn main:app --reload --port 8001
```

### Frontend Issues

**CORS errors**
- Ensure backend is running
- Check CORS settings in `backend/main.py`

**Video not loading**
- Verify backend URL in `frontend/app/page.tsx`
- Check browser console for errors
- Ensure UID and Transaction ID are correct

**npm install fails**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📚 API Reference

### GET /video/stream

Stream a decrypted video.

**Query Parameters:**
- `uid` (required): User identifier
- `tid` (required): Transaction identifier

**Response:**
- **200 OK**: Video stream (video/mp4)
- **404 Not Found**: Video or key file not found
- **500 Internal Server Error**: Decryption error

**Example:**
```bash
curl "http://localhost:8000/video/stream?uid=user123&tid=tx456"
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

