import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFavoriteSong extends Document {
  _id: mongoose.Types.ObjectId;
  songName: string;
  userId: mongoose.Types.ObjectId;
  mp3File?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSongSchema = new Schema<IFavoriteSong>(
  {
    songName: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mp3File: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'favorite_songs',
  }
);

// Create index for faster queries
FavoriteSongSchema.index({ userId: 1 });

// Prevent re-compilation during development
const FavoriteSong: Model<IFavoriteSong> =
  mongoose.models.FavoriteSong || mongoose.model<IFavoriteSong>('FavoriteSong', FavoriteSongSchema);

export default FavoriteSong;