import { Pet } from './Pet'

export interface Liked extends Pet {
  user_id: string
  pet_id: number
}
