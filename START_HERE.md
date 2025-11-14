# 🚀 START HERE - Video Streaming Platform

Welcome! This is your complete guide to get started.

## 📦 What's Included

This project contains a **fully functional video streaming platform** with:

✅ **Backend** - FastAPI with RSA + AES-GCM decryption  
✅ **Frontend** - Next.js with beautiful UI  
✅ **Documentation** - Complete guides and references  
✅ **Setup Scripts** - Automated installation  
✅ **Test Files** - Sample encrypted video ready to stream

## ⚡ Quick Start (5 Minutes)

### Windows Users

1. **Setup Backend**
   - Double-click: `setup-backend.bat`
   - Wait for installation to complete

2. **Setup Frontend**
   - Double-click: `setup-frontend.bat`
   - Wait for npm install to complete (may take 2-3 minutes)

3. **Start Backend**
   - Double-click: `start-backend.bat`
   - Backend runs at: `http://localhost:8000`

4. **Start Frontend** (open new window)
   - Double-click: `start-frontend.bat`
   - Frontend runs at: `http://localhost:3000`

5. **Watch Video**
   - Open browser: `http://localhost:3000`
   - Enter UID: `random_video`
   - Leave Transaction ID empty
   - Click "Load & Play Video"

### Linux/Mac Users

```bash
# Setup and start backend
./setup-backend.sh
./start-backend.sh

# In new terminal - setup and start frontend
./setup-frontend.sh
./start-frontend.sh

# Open browser: http://localhost:3000
# UID: random_video, Transaction ID: (empty)
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [README.md](README.md) | Main project documentation |
| [QUICKSTART.md](QUICKSTART.md) | Fast setup guide |
| [SETUP.md](SETUP.md) | Detailed setup instructions |
| [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | Complete project details |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture diagrams |
| [backend/README.md](backend/README.md) | Backend API documentation |
| [frontend/README.md](frontend/README.md) | Frontend development guide |

## 🎯 Test Credentials

For the included test video:
- **UID**: `random_video`
- **Transaction ID**: (leave empty)

## 🔧 Troubleshooting

### Backend won't start?

**Check Python version:**
```bash
python --version  # Should be 3.8 or higher
```

**Reinstall dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

### Frontend won't start?

**Check Node version:**
```bash
node --version  # Should be 18 or higher
```

**Clear and reinstall:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Video won't load?

1. ✅ Backend running? Check: `http://localhost:8000/health`
2. ✅ Correct UID? Use: `random_video`
3. ✅ Transaction ID empty? Leave blank
4. ✅ Check browser console (F12) for errors

### Port already in use?

**Windows:**
```bash
# Kill process on port 8000 (backend)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill process on port 3000 (frontend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## 📁 Project Structure

```
aignosis/
├── backend/              # FastAPI backend
│   ├── main.py          # Main application
│   ├── storage/         # Encrypted videos
│   └── *.pem           # RSA keys (generated)
├── frontend/            # Next.js frontend
│   └── app/            # Application pages
├── *.bat               # Windows scripts
├── *.sh                # Linux/Mac scripts
└── *.md                # Documentation
```

## 🎬 Features

### Backend
- ✅ RSA-4096 + AES-256-GCM encryption
- ✅ PBKDF2 key derivation (100k iterations)
- ✅ Streaming response (no disk writes)
- ✅ Comprehensive error handling
- ✅ API documentation at `/docs`

### Frontend
- ✅ Modern dark theme UI
- ✅ Responsive design
- ✅ Real-time validation
- ✅ Error/success messages
- ✅ HTML5 video player
- ✅ Smooth animations

## 🌐 URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main application |
| Backend | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| Health | http://localhost:8000/health | Server health check |

## 🔐 Security

This implementation uses:
- **RSA-4096** for key encryption
- **AES-256-GCM** for video encryption
- **PBKDF2-HMAC-SHA256** for key derivation
- **No plaintext storage** - everything in memory
- **Authenticated encryption** with GCM mode

## 💡 Next Steps

After successful setup:

1. ✅ **Test the sample video**
   - Use provided test credentials
   - Verify streaming works smoothly

2. ✅ **Explore the API**
   - Visit `http://localhost:8000/docs`
   - Try different endpoints

3. ✅ **Add your own videos**
   - Encrypt using same format
   - Place in `backend/storage/`
   - Follow naming: `{uid}_{tid}_encrypted.bin`

4. ✅ **Customize the UI**
   - Edit `frontend/app/page.tsx`
   - Modify Tailwind colors in config
   - Add new features

5. ✅ **Read the docs**
   - [ARCHITECTURE.md](ARCHITECTURE.md) for system design
   - [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) for details

## ❓ Need Help?

1. Check troubleshooting section above
2. Review [SETUP.md](SETUP.md) for detailed steps
3. Check browser console (F12) for errors
4. Check backend terminal for logs
5. Verify all prerequisites are installed

## ✅ Checklist

Before you start:
- [ ] Python 3.8+ installed
- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Git installed (optional)

After setup:
- [ ] Backend runs on port 8000
- [ ] Frontend runs on port 3000
- [ ] Sample video plays successfully
- [ ] No errors in console

## 🎉 Success!

If you see the video playing, **congratulations!** 🎊

You now have a fully functional encrypted video streaming platform.

## 📞 Key Commands

**Windows:**
```bash
setup-backend.bat     # Setup backend once
setup-frontend.bat    # Setup frontend once
start-backend.bat     # Start backend server
start-frontend.bat    # Start frontend server
```

**Linux/Mac:**
```bash
./setup-backend.sh    # Setup backend once
./setup-frontend.sh   # Setup frontend once
./start-backend.sh    # Start backend server
./start-frontend.sh   # Start frontend server
```

**Stop servers:**
- Press `Ctrl + C` in both terminal windows

## 🚀 Production Deployment

For production deployment:

1. Use environment variables for configuration
2. Enable HTTPS
3. Restrict CORS to specific origins
4. Add authentication/authorization
5. Use a proper key management service
6. Add rate limiting
7. Set up monitoring and logging
8. Use CDN for video delivery

See [README.md](README.md) for more production considerations.

---

**Ready to stream? Start with the Quick Start section above! 🎬**

Questions? Check [SETUP.md](SETUP.md) or [README.md](README.md)

