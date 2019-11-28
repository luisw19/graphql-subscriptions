import {
    getAllCards,
    GetAllCardsInput,
    createCard,
    CreateCardInput,
} from './controllers/card.controller'
import { CARD_CREATED } from './constants'
import { pubsub } from './app'

const resolvers = {
    Subscription: {
        CardCreated: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([CARD_CREATED]),
        },
    },
    Query: {
        cards: (_: null, { input }: { input: GetAllCardsInput }) =>
            getAllCards({ ...input }),
    },
    Mutation: {
        CreateCard: (_: null, { input }: { input: CreateCardInput }) =>
            createCard({ ...input }),
    },
}

export default resolvers