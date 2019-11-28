# Graphql Backend Microservice

This project contains a sample Graphql microservice based on [this article](https://medium.com/swlh/create-a-graphql-server-with-queries-mutations-subscriptions-b53df26df985) by Tom Nagle.

## Pre-requisites

This project requires [npm](https://www.npmjs.com/get-npm) and [mongo](https://www.mongodb.com/what-is-mongodb) to be installed. Following an example on how to install in Mac:

```bash
brew install node
brew install mongodb
```

## Try it out

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

- In another enter the following **mutation** and **query variables** values and hit enter to create a new _card_:

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

    Notice how the subscription tab got updated with the added record.

- Finally if you want to **query** previously created _cards_ enter the following and hit enter:

    ```graphql
    query {
        cards {
            _id
            title
            author
            body
        }
    }
    ```
