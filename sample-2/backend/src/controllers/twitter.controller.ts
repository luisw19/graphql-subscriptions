import { ITweet, ITweetSearchParams } from "../types/twitter.types";
import { twitterSearch, twitterStream } from "../clients/twitter";
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

const streamHandler: any[string] = [];

const isTweet = _.conforms({
    user: _.isObject,
    id_str: _.isString,
    text: _.isString,
});

let context: string = "";
const tweetListener = (event: any) => {
    console.log(`Processing new tweet in context ${context}`);
    if (isTweet(event)) {
        pubsub.publish(context, { newTweet: event });
    }
};

export function startTweetStream(filter: string, ctx: string): void {
    context = ctx;
    if ( !streamHandler[ctx]) {
        streamHandler[ctx] = twitterStream.create(filter, ctx);
    }
    streamHandler[ctx]
        .on("data", tweetListener)
        .on( "error", ( err: any ) => {
            console.log(`error processing stream ${ctx}`, err);
        } );
}

export function stopTweetStream(ctx: string): void {
    context = ctx;
    console.log("Removing listener");
    if ( !streamHandler[ctx]) {
        console.log("Nothing to remove");
    } else {
        streamHandler[ctx].removeListener("data", tweetListener);
        streamHandler.splice( streamHandler.indexOf(ctx), 1  );
    }
}

