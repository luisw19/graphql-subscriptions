
export interface IUser {
    created_at: string;
    description: string;
    id: string;
    screen_name: string;
    name: string;
    profile_image_url: string;
    url: string;
    tweets_count: number;
    followers_count: number;
    tweets: ITweet;
}

export interface ITweet {
    id: string;
    created_at: string;
    text: string;
    retweet_count: number;
    user: IUser;
    retweets: IRetweet;
}

export interface IRetweet {
    id: string;
    created_at: string;
    in_reply_to_tweet_id: string;
    retweet_count: number;
    in_reply_to_user_id: string;
    in_reply_to_screen_name: string;
    retweeted_status: ITweet;
    user: IUser;
}

export interface ITweetSearchParams {
    q: string;
    count: number;
    result_type?: string;
    lang?: string;
}


export interface ITweetQueryParams {
    filters: string;
    limit: number;
}
