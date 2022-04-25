export type ItemType = {
  front: string
  back: string
  description: string
  imgURL: string
  rating: number
  date: string
  id: string
}

export type DeckType = {
  deckTitle: string
  items: Array<ItemType>
}

export type FlashCardPropsType = {
  id: string
  front: string
  back: string
  imgURL: string
  description: string
  mode?: string | null
  editMode?: boolean 
  onDeleteCard: (id: string) => void
  repetitionMode?: any
  setCardModal?: any
  setCurrentCard?: any
}

export type DeckAppType = {
  deckTitle: string
  items: Array<ItemType>
  userId: string
  deckId: string
}

export type UserData = {
  email: string
  isAdmin: boolean
  nickname: string
  online: boolean
}