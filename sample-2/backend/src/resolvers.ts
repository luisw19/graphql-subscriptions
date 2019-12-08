import {
    getAllPosts,
    IGetAllPostsInput,
    createPost,
    ICreatePostInput,
} from "./controllers/post.controller";
import { POST_CREATED } from "./constants";
import { pubsub } from "./server";

const resolvers = {
    Subscription: {
        PostCreated: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([POST_CREATED]),
        },
    },
    Query: {
        posts: (_: null, { input }: { input: IGetAllPostsInput }) =>
            getAllPosts({ ...input }),
    },
    Mutation: {
        CreatePost: (_: null, { input }: { input: ICreatePostInput }) =>
            createPost({ ...input }),
    },
};

export default resolvers;
