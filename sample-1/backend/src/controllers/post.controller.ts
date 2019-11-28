import PostModel, { Post } from '../models/post.model'
import { POST_CREATED } from '../constants'
import { pubsub } from '../app'

export interface CreatePostInput {
    title: string
    author: string
    body: string
}

// Create a new post from the given input
export async function createPost({
    title,
    author,
    body,
}: CreatePostInput): Promise<Post | Error> {
    const post = await PostModel.create({
        title,
        author,
        body,
    })
        .then((data: Post) => data)
        .catch((error: Error) => {
            throw error
        })

    // Publish the creation of a new post to whoever is listening
    pubsub.publish(POST_CREATED, { PostCreated: post })

    return post
}

export interface GetAllPostsInput {
    limit?: number
}

export function getAllPosts({ limit }: GetAllPostsInput) {
    return PostModel.find({})
        .limit(limit ? limit : 0)
        .then((data: Post[]) => data)
        .catch((error: Error) => {
            throw error
        })
}