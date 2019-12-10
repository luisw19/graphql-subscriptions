# Graphql Backend Microservice

This project contains a sample Twitter Streaming API based on GraphQL Subscriptions.  

This project requires [npm](https://www.npmjs.com/get-npm). In Mac it can be installed as following:

```bash
# to install node
brew install node
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
