"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Trash2, Plus, Music, Edit2, X, Play, Pause, Upload } from "lucide-react"

interface FavoriteSong {
  _id: string
  songName: string
  mp3File?: string
  createdAt: string
  updatedAt: string
}

export default function FavoritesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [songs, setSongs] = useState<FavoriteSong[]>([])
  const [newSong, setNewSong] = useState("")
  const [newSongFile, setNewSongFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editSongName, setEditSongName] = useState("")
  const [editSongFile, setEditSongFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated") {
      fetchSongs()
    }
  }, [status, router])

  const fetchSongs = async () => {
    try {
      const response = await fetch("/api/favorites")
      if (response.ok) {
        const data = await response.json()
        setSongs(data)
      }
    } catch (err) {
      console.error("Error fetching songs:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/favorites/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        return data.url
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload file")
      return null
    }
  }

  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSong.trim()) return

    setAdding(true)
    setError("")
    setUploading(true)

    try {
      let mp3FileUrl: string | null = null

      // Upload file if provided
      if (newSongFile) {
        mp3FileUrl = await handleFileUpload(newSongFile)
        if (!mp3FileUrl) {
          setAdding(false)
          setUploading(false)
          return
        }
      }

      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songName: newSong.trim(),
          mp3File: mp3FileUrl,
        }),
      })

      if (response.ok) {
        const song = await response.json()
        setSongs([song, ...songs])
        setNewSong("")
        setNewSongFile(null)
        // Reset file input
        const fileInput = document.getElementById("new-song-file") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        const data = await response.json()
        setError(data.error || "Failed to add song")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setAdding(false)
      setUploading(false)
    }
  }

  const handleEditSong = (song: FavoriteSong) => {
    setEditingId(song._id)
    setEditSongName(song.songName)
    setEditSongFile(null)
  }

  const handleSaveEdit = async (id: string) => {
    if (!editSongName.trim()) return

    setError("")
    setUploading(true)

    try {
      let mp3FileUrl: string | undefined = undefined

      // Upload new file if provided
      if (editSongFile) {
        const uploadedUrl = await handleFileUpload(editSongFile)
        if (uploadedUrl) {
          mp3FileUrl = uploadedUrl
        } else {
          setUploading(false)
          return
        }
      }

      const updateData: any = { songName: editSongName.trim() }
      if (mp3FileUrl !== undefined) {
        updateData.mp3File = mp3FileUrl
      }

      const response = await fetch(`/api/favorites/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        const updatedSong = await response.json()
        setSongs(songs.map((s) => (s._id === id ? updatedSong : s)))
        setEditingId(null)
        setEditSongName("")
        setEditSongFile(null)
        // Reset file input
        const fileInput = document.getElementById(`edit-song-file-${id}`) as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update song")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditSongName("")
    setEditSongFile(null)
  }

  const handleDeleteSong = async (id: string) => {
    if (!confirm("Are you sure you want to delete this song?")) return

    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSongs(songs.filter((song) => song._id !== id))
        // Stop audio if playing
        if (audioRefs.current[id]) {
          audioRefs.current[id].pause()
          audioRefs.current[id].currentTime = 0
        }
        if (playingId === id) {
          setPlayingId(null)
        }
      }
    } catch (err) {
      console.error("Error deleting song:", err)
    }
  }

  const handlePlayPause = (song: FavoriteSong) => {
    if (!song.mp3File) return

    const audioId = song._id

    if (!audioRefs.current[audioId]) {
      audioRefs.current[audioId] = new Audio(song.mp3File)
      audioRefs.current[audioId].addEventListener("ended", () => {
        setPlayingId(null)
      })
    }

    const audio = audioRefs.current[audioId]

    if (playingId === audioId) {
      audio.pause()
      setPlayingId(null)
    } else {
      // Pause any other playing audio
      if (playingId && audioRefs.current[playingId]) {
        audioRefs.current[playingId].pause()
        audioRefs.current[playingId].currentTime = 0
      }
      audio.play()
      setPlayingId(audioId)
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause()
        audio.src = ""
      })
    }
  }, [])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 sm:py-8 lg:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">My Favorite Songs</h1>

          {/* Add Song Form */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Add a Favorite Song</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleAddSong} className="space-y-4">
              <div>
                <label htmlFor="new-song-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Song Name
                </label>
                <input
                  id="new-song-name"
                  type="text"
                  value={newSong}
                  onChange={(e) => setNewSong(e.target.value)}
                  placeholder="Enter song name..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="new-song-file" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload MP3 File (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="new-song-file"
                    type="file"
                    accept="audio/mpeg,audio/mp3,.mp3"
                    onChange={(e) => setNewSongFile(e.target.files?.[0] || null)}
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {newSongFile && (
                    <span className="text-sm text-gray-600">{newSongFile.name}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Max file size: 10MB</p>
              </div>

              <button
                type="submit"
                disabled={adding || uploading}
                className="w-full bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    {adding ? "Adding..." : "Add Song"}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Songs List */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Saved Songs ({songs.length})</h2>
            
            {songs.length === 0 ? (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No favorite songs yet. Add one above!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {songs.map((song) => (
                  <div
                    key={song._id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {editingId === song._id ? (
                      // Edit Mode
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editSongName}
                          onChange={(e) => setEditSongName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Song name"
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Update MP3 File (Optional)
                          </label>
                          <input
                            id={`edit-song-file-${song._id}`}
                            type="file"
                            accept="audio/mpeg,audio/mp3,.mp3"
                            onChange={(e) => setEditSongFile(e.target.files?.[0] || null)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                          />
                          {song.mp3File && (
                            <p className="text-xs text-gray-500 mt-1">Current file: {song.mp3File.split('/').pop()}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(song._id)}
                            disabled={uploading}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
                          >
                            {uploading ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 flex items-center gap-3">
                          <Music className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-base sm:text-lg truncate">{song.songName}</p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Added {new Date(song.createdAt).toLocaleDateString()}
                            </p>
                            {song.mp3File && (
                              <p className="text-xs text-green-600 mt-1">✓ MP3 file available</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {song.mp3File && (
                            <button
                              onClick={() => handlePlayPause(song)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title={playingId === song._id ? "Pause" : "Play"}
                            >
                              {playingId === song._id ? (
                                <Pause className="w-5 h-5" />
                              ) : (
                                <Play className="w-5 h-5" />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => handleEditSong(song)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit song"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSong(song._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete song"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
