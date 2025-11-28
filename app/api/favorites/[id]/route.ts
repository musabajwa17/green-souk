import { NextResponse } from "next/server"
import { auth } from "@/auth"
import connectDB from "@/lib/mongodb"
import FavoriteSong from "@/models/FavoriteSong"
import { unlink } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params
    const { songName, mp3File } = await request.json()

    await connectDB()

    const song = await FavoriteSong.findById(id)

    if (!song) {
      return NextResponse.json(
        { error: "Song not found" },
        { status: 404 }
      )
    }

    if (song.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // Update song
    const updateData: any = {}
    if (songName) {
      updateData.songName = songName.trim()
    }
    if (mp3File !== undefined) {
      // Delete old file if replacing
      if (song.mp3File && mp3File && song.mp3File !== mp3File) {
        const oldFilepath = join(process.cwd(), "public", song.mp3File)
        if (existsSync(oldFilepath)) {
          try {
            await unlink(oldFilepath)
          } catch (err) {
            console.error("Error deleting old file:", err)
          }
        }
      }
      updateData.mp3File = mp3File || undefined
    }

    const updatedSong = await FavoriteSong.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )

    return NextResponse.json(updatedSong)
  } catch (error) {
    console.error("Error updating favorite:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params

    await connectDB()

    const song = await FavoriteSong.findById(id)

    if (!song) {
      return NextResponse.json(
        { error: "Song not found" },
        { status: 404 }
      )
    }

    if (song.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // Delete MP3 file if it exists
    if (song.mp3File) {
      const filepath = join(process.cwd(), "public", song.mp3File)
      if (existsSync(filepath)) {
        try {
          await unlink(filepath)
        } catch (err) {
          console.error("Error deleting file:", err)
        }
      }
    }

    await FavoriteSong.findByIdAndDelete(id)

    return NextResponse.json({ message: "Song deleted successfully" })
  } catch (error) {
    console.error("Error deleting favorite:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

