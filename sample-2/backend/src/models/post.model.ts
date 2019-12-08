import mongoose, { Document } from "mongoose";

export interface IPost extends Document {
    title: string;
    author: string;
    body: string;
}

const schema = new mongoose.Schema(
    {
        title: String,
        author: String,
        body: String,
    },
    // Adds createdAt and updatedAt to the model
    { timestamps: true },
);

export default mongoose.model<IPost>("Post", schema);
