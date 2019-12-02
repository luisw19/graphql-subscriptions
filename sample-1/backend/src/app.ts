import { ApolloServer, PubSub, ServerInfo } from 'apollo-server'
import typeDefs from './schema'
import connect from './database/connect'
import resolvers from './resolvers'

export const pubsub = new PubSub()

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// Move this into a configuration file
const DATABASE_NAME = 'post-db'

// The `listen` method launches a web server.
server.listen().then(async ({ url, subscriptionsUrl }: ServerInfo) => {
    console.log(`🚀  GraphQL playground ready at ${url}/graphql`)
    console.log(`🚀  Subscriptions ready at ${subscriptionsUrl}`)
    // Connect to your database
    await connect({ db: `mongodb://localhost:27017/${DATABASE_NAME}` })
})