import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import gql from 'graphql-tag';
import { IPost } from './model/post';

interface Query {
    posts: IPost[];
}

export interface ISubscription {
    PostCreated: IPost;
}

export class GraphQLClient {

    public POSTS_SUBSCRIPTION = gql`
            subscription {
                PostCreated {
                    _id
                    title
                    author
                    body
                }
            }
        `;
    public POSTS_QUERY = gql`
            query {
                posts {
                    _id
                    title
                    author
                    body
                }
            }
        `;
    public CREATE_POST = gql`
            mutation($CreatePostInput: CreatePostInput!) {
                CreatePost(input: $CreatePostInput) {
                  title
                  author
                  body
                }
            }
        `;
    public client: ApolloClient<NormalizedCacheObject>;

    constructor() {
        // Create an http link:
        const cache = new InMemoryCache();

        const httpLink = new HttpLink({
            uri: 'http://localhost:4000/',
        });
        // Create a WebSocket link:
        const wsLink = new WebSocketLink({
            uri: `ws://localhost:4000/graphql`,
            options: {
                reconnect: true
            }
        });

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
            // split based on operation type
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === 'OperationDefinition' &&
                    definition.operation === 'subscription'
                );
            },
            wsLink,
            httpLink,
        );

        this.client = new ApolloClient({
            // Provide required constructor fields
            cache: cache,
            link: link,

            // Provide some optional constructor fields
            name: 'react-web-client',
            version: '1.3',
            queryDeduplication: false,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                },
            },
        });
    }

    mutation(post: IPost) {
        return this.client.mutate<IPost>({ mutation: this.CREATE_POST, variables: { CreatePostInput: post } });
    }

    query() {
        return this.client.query<Query>({ query: this.POSTS_QUERY }).then(response => response.data.posts);
    }

    subscribe() {
        return this.client.subscribe<ISubscription>({ query: this.POSTS_SUBSCRIPTION });
    }
}

export const graphQLClient = new GraphQLClient();