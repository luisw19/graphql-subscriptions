import CardModel, { Card } from '../models/card.model'
import { CARD_CREATED } from '../constants'
import { pubsub } from '../app'

export interface CreateCardInput {
    title: string
    author: string
    body: string
}

// Create a new card from the given input
export async function createCard({
    title,
    author,
    body,
}: CreateCardInput): Promise<Card | Error> {
    const card = await CardModel.create({
        title,
        author,
        body,
    })
        .then((data: Card) => data)
        .catch((error: Error) => {
            throw error
        })

    // Publish the creation of a new card to whoever is listening
    pubsub.publish(CARD_CREATED, { CardCreated: card })

    return card
}

export interface GetAllCardsInput {
    limit?: number
}

export function getAllCards({ limit }: GetAllCardsInput) {
    return CardModel.find({})
        .limit(limit ? limit : 0)
        .then((data: Card[]) => data)
        .catch((error: Error) => {
            throw error
        })
}