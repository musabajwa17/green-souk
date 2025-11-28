import { NextResponse } from "next/server"
import { auth } from "@/auth"
import connectDB from "@/lib/mongodb"
import FavoriteSong from "@/models/FavoriteSong"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await connectDB()

    const songs = await FavoriteSong.find({
      userId: session.user.id
    }).sort({ createdAt: -1 })

    return NextResponse.json(songs)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { songName, mp3File } = await request.json()

    if (!songName || typeof songName !== "string" || !songName.trim()) {
      return NextResponse.json(
        { error: "Song name is required" },
        { status: 400 }
      )
    }

    await connectDB()

    const song = await FavoriteSong.create({
      songName: songName.trim(),
      userId: session.user.id,
      mp3File: mp3File || undefined
    })

    return NextResponse.json(song, { status: 201 })
  } catch (error) {
    console.error("Error creating favorite:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

