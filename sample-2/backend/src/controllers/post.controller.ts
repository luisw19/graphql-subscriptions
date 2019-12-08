import PostModel, { IPost } from "../models/post.model";
import { POST_CREATED } from "../constants";
import { pubsub } from "../server";

export interface ICreatePostInput {
    title: string;
    author: string;
    body: string;
}

// Create a new post from the given input
export async function createPost({
    title,
    author,
    body,
}: ICreatePostInput): Promise<IPost | Error> {
    const post = await PostModel.create({
        title,
        author,
        body,
    })
        .then((data: IPost) => data)
        .catch((error: Error) => {
            throw error;
        });

    // Publish the creation of a new post to whoever is listening
    pubsub.publish(POST_CREATED, { PostCreated: post });

    return post;
}

export interface IGetAllPostsInput {
    limit?: number;
}

export function getAllPosts({ limit }: IGetAllPostsInput) {
    return PostModel.find({})
        .limit(limit ? limit : 0)
        .then((data: IPost[]) => data)
        .catch((error: Error) => {
            throw error;
        });
}
