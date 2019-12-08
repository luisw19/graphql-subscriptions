import dotenv from "dotenv";
dotenv.config();

import Twitter from "twitter";
import { ITweetSearchParams } from "../models/twitter.model";

const config = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY || "",
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "",
    access_token_key: process.env.TWITTER_ACCESS_TOKEN || "",
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
    // request_options: {
    //     proxy: "http://myproxyserver.com:1234",
    // },
};

// create a twitter client
const client: Twitter = new Twitter(config);

// // Set up your search parameters. Ref doc: https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
// const params: RequestParams = {
//     q: "@luisw19 #Sofia",
//     count: 10,
//     result_type: "recent",
//     lang: "en",
// };

export const twitterSearch = (params: ITweetSearchParams): any => {
    return new Promise((resolve, reject) => {
        console.log("searching:");
        console.log(params);
        client.get("search/tweets", params, (err, tweets, response) => {
            if (!err) {
                console.log(`Found ${tweets.statuses.length} tweets`);
                resolve(tweets.statuses);
            } else {
                console.log(err);
                resolve(err);
            }
        });
    });
};


