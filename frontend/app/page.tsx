'use client'

import { useState, useRef } from 'react'
import { Play, Film, Key, User, AlertCircle, Loader2, CheckCircle, X, Maximize2 } from 'lucide-react'

export default function VideoPlayer() {
  const [uid, setUid] = useState('')
  const [tid, setTid] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = async () => {

    if (!uid.trim() || !tid.trim()) {
      setError('Please enter both UID and Transaction ID')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const url = `http://localhost:8000/video/stream?uid=${encodeURIComponent(uid)}&tid=${encodeURIComponent(tid)}`
      
      setVideoUrl(url)
      setSuccess(true)
      setLoading(false)
      setShowModal(true)
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load()
        }
      }, 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load video')
      setVideoUrl('')
      setLoading(false)
    }
  }

  const handleReset = () => {
    setVideoUrl('')
    setError('')
    setSuccess(false)
    setUid('')
    setTid('')
    setShowModal(false)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const handleVideoError = () => {
    setError('Failed to load video. Please check your UID and Transaction ID.')
    setSuccess(false)
    setVideoUrl('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Film className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Admin Video Player
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Secure encrypted video streaming platform
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 animate-slide-up">
          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="uid" className="flex items-center text-sm font-medium text-gray-200">
                  <User className="w-4 h-4 mr-2 text-purple-400" />
                  User ID (UID)
                </label>
                <input
                  id="uid"
                  type="text"
                  placeholder="Enter UID"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={loading || videoUrl !== ''}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="tid" className="flex items-center text-sm font-medium text-gray-200">
                  <Key className="w-4 h-4 mr-2 text-purple-400" />
                  Transaction ID
                </label>
                <input
                  id="tid"
                  type="text"
                  placeholder="Enter Transaction ID"
                  value={tid}
                  onChange={(e) => setTid(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={loading || videoUrl !== ''}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 animate-fade-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {success && !error && (
              <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-200 animate-fade-in">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">Video loaded successfully!</p>
              </div>
            )}

            <div className="flex gap-4">
              {!videoUrl ? (
                <button
                  onClick={handlePlay}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Load & Play Video
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Load Different Video
                </button>
              )}
            </div>
          </div>

          {videoUrl && !showModal && (
            <div className="p-8 pt-0 animate-fade-in">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 p-8 text-center">
                <Film className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Video Ready!</h3>
                <p className="text-gray-300 mb-6">Your video has been decrypted and is ready to play</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Maximize2 className="w-5 h-5" />
                  Open Video Player
                </button>
                <div className="mt-4 text-sm text-gray-400">
                  <p>UID: <span className="font-mono text-purple-300">{uid}</span> | Transaction ID: <span className="font-mono text-purple-300">{tid}</span></p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm animate-fade-in">
          <p>Secured with RSA + AES-GCM encryption</p>
          <p className="mt-1">© 2025 Aignosis. All rights reserved.</p>
        </div>
      </div>

      {showModal && videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-6xl bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl shadow-2xl overflow-hidden border border-purple-500/30 animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Film className="w-6 h-6 text-purple-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Encrypted Video Player</h2>
                  <p className="text-sm text-gray-400">
                    UID: <span className="font-mono text-purple-300">{uid}</span> | 
                    TID: <span className="font-mono text-purple-300">{tid}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            <div className="relative bg-black">
              <video
                ref={videoRef}
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh]"
                src={videoUrl}
                controlsList="nodownload"
                onError={handleVideoError}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          
            <div className="p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Decrypted with RSA-4096 + AES-256-GCM</span>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Load Different Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

