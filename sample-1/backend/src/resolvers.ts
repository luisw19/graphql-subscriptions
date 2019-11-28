import {
    getAllPosts,
    GetAllPostsInput,
    createPost,
    CreatePostInput,
} from './controllers/post.controller'
import { POST_CREATED } from './constants'
import { pubsub } from './app'

const resolvers = {
    Subscription: {
        PostCreated: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([POST_CREATED]),
        },
    },
    Query: {
        posts: (_: null, { input }: { input: GetAllPostsInput }) =>
            getAllPosts({ ...input }),
    },
    Mutation: {
        CreatePost: (_: null, { input }: { input: CreatePostInput }) =>
            createPost({ ...input }),
    },
}

export default resolvers