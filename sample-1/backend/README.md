# Graphql Backend Microservice

This project contains a sample Graphql microservice based on [this article](https://medium.com/swlh/create-a-graphql-server-with-queries-mutations-subscriptions-b53df26df985) by Tom Nagle, however modified extensively to:

- Use [TSLint](https://palantir.github.io/tslint/) instead of ESLint
- Use [apollo-server-express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) with custom options (e.g. port, path)instead of the basic apollo server with default options
- Use npm instead of yarn
- Use *Posts* as opposed to *Cards*.

## Pre-requisites

This project requires [npm](https://www.npmjs.com/get-npm) and [mongo](https://www.mongodb.com/what-is-mongodb) to be installed. Following an example on how to install in Mac:

```bash
# to install node
brew install node

# to install and start mongodb community edition
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
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
        PostCreated {
            _id
            title
            author
            body
        }
    }
    ```

- In another enter the following **mutation** and **query variables** values and hit enter to create a new _post_:

    ```graphql
    mutation ($CreatePostInput: CreatePostInput!){
        CreatePost (input: $CreatePostInput) {
            title
            author
            body
        }
    }
    ```

    ```json
    {
        "CreatePostInput": {
            "title": "Title",
            "author": "Author",
            "body": "body"
        }
    }
    ```

    Notice how the subscription tab got updated with the added record.

- Finally if you want to **query** previously created _posts_ enter the following and hit enter:

    ```graphql
    query {
        posts {
            _id
            title
            author
            body
        }
    }
    ```
