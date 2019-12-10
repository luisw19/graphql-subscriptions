import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import gql from 'graphql-tag';
import { ITweet } from './model/tweet';

interface Query {
    tweets: ITweet[];
}

export interface ISubscription {
    newTweet: ITweet;
}

export class GraphQLClient {

    public TWEETS_SUBSCRIPTION = gql`
            subscription {
                newTweet (filters: "Java"){
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
        `;
    public TWEETS_QUERY = gql`
            query {
                searchTweets (filters: "Java", limit: 2) {
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
        `;
    // public CREATE_POST = gql`
    //         mutation($CreatePostInput: CreatePostInput!) {
    //             CreatePost(input: $CreatePostInput) {
    //                 title
    //                 author
    //                 body
    //             }
    //         }
    //     `;
    public client: ApolloClient<NormalizedCacheObject>;

    constructor() {
        // Create an http link:
        const cache = new InMemoryCache();

        const httpLink = new HttpLink({
            uri: 'http://localhost:4000/graphql',
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

    query() {
        return this.client.query<Query>({ query: this.TWEETS_QUERY }).then(response => response.data.tweets);
    }

    subscribe() {
        return this.client.subscribe<ISubscription>({ query: this.TWEETS_SUBSCRIPTION });
    }

    unsubscribe() {
        return this.client.stop();
    }
}

export const graphQLClient = new GraphQLClient();