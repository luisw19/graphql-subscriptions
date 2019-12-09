import { searchTweets, startTweetStream } from "./controllers/twitter.controller";
import { pubsub } from "./server";
import { ITweetQueryParams } from "./types/twitter.types";
import { UserInputError } from "apollo-server-errors";

const resolvers = {
    Subscription: {
        newTweet: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: (parent: any, queryParams: ITweetQueryParams, context: any) => {
                if ( !queryParams.filters ) {
                    throw new UserInputError("please set some filters");
                } else {
                    const ctx = context.extended.ctx;
                    console.log(`Received context ${ctx}`);
                    startTweetStream(queryParams.filters, ctx);
                    return pubsub.asyncIterator([ctx]);
                }
            },
        },
    },
    Query: {
        searchTweets: async (parent: any, queryParams: ITweetQueryParams) => {
            if ( !queryParams.filters ) {
                throw new UserInputError("please set some filters");
            } else {
                return await searchTweets(queryParams.filters, queryParams.limit);
            }
        },
    },
};

export default resolvers;
