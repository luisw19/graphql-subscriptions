# Graphql Backend Microservice

This project contains a sample Twitter Streaming API based on GraphQL Subscriptions.  

This project requires [npm](https://www.npmjs.com/get-npm). In Mac it can be installed as following:

```bash
# to install node
brew install node
```

The project also requires valid twitter consumer and access tokens/keys which can be obtained by first registering on the [Twitter Developer Portal](https://developer.twitter.com/) (if not already )and then creating a new application. Once this is done, create a `.env` file in the root folder and define the tokens/keys as following:

```bash
# Consumer API keys
TWITTER_CONSUMER_KEY=<value here>
TWITTER_CONSUMER_SECRET=<value here>

# Access Tokens
TWITTER_ACCESS_TOKEN=<value here>
TWITTER_ACCESS_TOKEN_SECRET=<value here>
```

## Try it out

- run:

    ```bash
    npm install
    npm run dev
    ```

- Open the Graphql Playground with the url: <http://localhost:4000/>

- **Create a stream of tweets** based on specific **filters**:

    ```graphql
    subscription {
    newTweet (filters: "javascript"){
        id
        created_at
        text
        reply_count
        retweet_count
        user {
        name
        screen_name
        profile_image_url
        }
    }
    }
    ```

    > noticed the filter *javascript*. Modified accordingly to filter based on tags (e.g. #Java) or twitter accounts (e.g. @luisw19).

- **Search for tweets** based on specific **filters**:

    ```graphql
    query {
        searchTweets (filters: "Java", limit: 10) {
            created_at
            text
        }
    }
    ```
