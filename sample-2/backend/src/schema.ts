// src/schema.ts
import { gql } from "apollo-server-express";

const typeDefs = gql`
    # New subscriptions type
    type User {
        created_at: String
        description: String
        id: ID
        screen_name: String
        name: String
        profile_image_url: String
        url: String
        tweets_count: Int
        followers_count: Int
        tweets: Tweet
    }
    type Tweet {
        id: ID!
        created_at: String
        text: String
        user: User
        quote_count: Int
        reply_count: Int
        retweet_count: Int
        favorite_count: Int
        retweets: Retweet
    }
    type Retweet {
        id: ID
        created_at: String
        in_reply_to_tweet_id: String
        retweet_count: Int
        in_reply_to_user_id: String
        in_reply_to_screen_name: String
        retweeted_status: Tweet
        user: User
    }
    type Query {
        searchTweets(filters: String, limit: Int): [Tweet]
    }
    type Subscription {
        newTweet(filters: String): Tweet
    }
`;

export default typeDefs;
