import { searchTweets, newTweet } from "./controllers/twitter.controller";
import { pubsub } from "./server";
import { NEW_TWEET } from "./constants";
import { ITweetQueryParams } from "./types/twitter.types";

const resolvers = {
    Subscription: {
        newTweet: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: (_: any, queryParams: ITweetQueryParams) => {
                newTweet(queryParams.filters);
                return pubsub.asyncIterator([NEW_TWEET]);
            },
        },
    },
    Query: {
        searchTweets: async (_: any, queryParams: ITweetQueryParams) => {
            return await searchTweets(queryParams.filters, queryParams.limit);
        },
    },
};

export default resolvers;
