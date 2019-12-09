import { ITweet, ITweetSearchParams } from "../types/twitter.types";
import { twitterSearch, twitterStream } from "../clients/twitter";
import { NEW_TWEET } from "../constants";
import { pubsub } from "../server";
import _ from "lodash";

export async function searchTweets(filter: string, limit: number): Promise<[ITweet]> {
    const params: ITweetSearchParams = {
        q: filter,
        count: limit,
        result_type: "recent",
        lang: "en",
    };
    return await twitterSearch(params);
}

export function newTweet(filter: string): void {
    twitterStream(filter).on("data", (event: any) => {
        console.log("Processing new tweet...");
        if (isTweet(event)) {
            pubsub.publish(NEW_TWEET, { newTweet: event });
        }
    });
}

const isTweet = _.conforms({
    user: _.isObject,
    id_str: _.isString,
    text: _.isString,
});

