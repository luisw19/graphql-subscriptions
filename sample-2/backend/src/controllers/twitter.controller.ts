import { ITweet, ITweetSearchParams } from "../models/twitter.model";
import { twitterSearch } from "../clients/twitter";
import { pubsub } from "../server";

export async function searchTweets(filter: string, limit: number): Promise<[ITweet]> {
    const params: ITweetSearchParams = {
        q: filter,
        count: limit,
        result_type: "recent",
        lang: "en",
    };
    return await twitterSearch(params);
}
