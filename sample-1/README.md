# Graphql Subscription

This project contains a sample Graphql Subscription based on [this article](https://medium.com/swlh/create-a-graphql-server-with-queries-mutations-subscriptions-b53df26df985) by Tom Nagle.

## Try a subscription

- run:

    ```bash
    npm install
    npm run dev
    ```

- Open the Graphql Playground with the url: <http://localhost:4000/>

- In one of the tabs enter the following **subscription** and hit enter:

    ```graphql
    subscription {
        CardCreated {
            _id
            title
            author
            body
        }
    }
    ```

- In another tab enter the following **mutation** and **query variables** and hit enter:

    ```graphql
    mutation ($CreateCardInput: CreateCardInput!){
        CreateCard (input: $CreateCardInput) {
            title
            author
            body
        }
    }
    ```

    ```json
    {
        "CreateCardInput": {
            "title": "Title",
            "author": "Author",
            "body": "body"
        }
    }
    ```

- Finally Notice how the subscription tab got updated with the added record.
