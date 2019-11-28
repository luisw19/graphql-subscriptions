import mongoose, { Document } from 'mongoose'

export interface Card extends Document {
    title: string
    author: string
    body: string
}

const Schema = new mongoose.Schema(
    {
        title: String,
        author: String,
        body: String,
    },
    // Adds createdAt and updatedAt to the model
    { timestamps: true }
)

export default mongoose.model<Card>('Card', Schema)