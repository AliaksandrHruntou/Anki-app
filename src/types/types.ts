export type ItemType = {
  front: string
  back: string
  rating: number
  date: Date | string
  id: string
}

export type DeckType = {
  deckTitle: string
  items: Array<ItemType>
}

export type FlashCardPropsType = {
  id: number
  front: string
  back: string 
  mode?: string | null
  editMode?: boolean 
  onDeleteCard: (id: number) => void
  repetitionMode?: any
}

export type DeckAppType = {
  deckTitle?: string
  items?: Array<ItemType>
  userId?: string
  deckId: string
}