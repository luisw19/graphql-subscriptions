import { PORT, PATH, DATABASE_NAME } from "./constants";
import connect from "./database/connect";
import http from "http";
import express from "express";
import compression from "compression";
import cors from "cors";
import { ApolloServer, PubSub } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";

// Using Apollo PubSub implementation but it can be replaced
// See more here: https://www.apollographql.com/docs/apollo-server/data/subscriptions/
export const pubsub = new PubSub();

const app = express();
app.use("*", cors());
app.use(compression());

// Create the GraphQL server passing 3 arguments: schema, resolvers, and a flag to enable the playground
const gServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
});

// as we're using express we apply the middleware which also allows to define custom paths
gServer.applyMiddleware({
    app,
    path: PATH,
});

// this step is important for subscriptions.
// The "subscriptions-transport-ws" library requires a HTTP server to support WS upgrades
// More info here: https://www.apollographql.com/docs/apollo-server/data/subscriptions/
const httpServer = http.createServer(app);
gServer.installSubscriptionHandlers(httpServer);

// The `listen` method launches a web server.
httpServer.listen({ port: PORT }, async () => {
    console.log(`🚀  GraphQL playground ready at http://localhost:${PORT}${PATH}`);
    console.log(`🚀  Subscriptions ready at ws://localhost:${PORT}${gServer.subscriptionsPath}`);
    // Connect to your database
    await connect({ db: `mongodb://localhost:27017/${DATABASE_NAME}` });
});
