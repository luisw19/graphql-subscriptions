// src/schema.ts
import { gql } from "apollo-server-express";

const typeDefs = gql`
    # New subscriptions type
    type Post {
        _id: ID!
        title: String
        author: String
        body: String
    }
    input CreatePostInput {
        title: String
        author: String
        body: String
    }
    type Query {
        posts: [Post]
    }
    type Mutation {
        CreatePost(input: CreatePostInput): Post
    }
    type Subscription {
        PostCreated: Post
    }
`;

export default typeDefs;
