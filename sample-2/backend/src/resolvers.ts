import { searchTweets } from "./controllers/twitter.controller";
import { pubsub } from "./server";
import { NEW_TWEET } from "./constants";
import { ITweetQueryParams } from "./models/twitter.model";

const resolvers = {
    Subscription: {
        newTweets: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([NEW_TWEET]),
        },
    },
    Query: {
        searchTweets: async (_: any, queryParams: ITweetQueryParams) => {
            return await searchTweets(queryParams.filters, queryParams.limit);
        },
    },
};

export default resolvers;
