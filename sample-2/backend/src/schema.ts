// src/schema.ts
import { gql } from "apollo-server";

const typeDefs = gql`
    # New subscriptions type
    type Subscription {
        PostCreated: Post
    }
    type Post {
        _id: ID!
        title: String
        author: String
        body: String
    }
    type Query {
        posts: [Post]
    }
    input CreatePostInput {
        title: String
        author: String
        body: String
    }
    type Mutation {
        CreatePost(input: CreatePostInput): Post
    }
`;

export default typeDefs;
