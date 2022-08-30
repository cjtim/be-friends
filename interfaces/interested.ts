import { Pet } from './Pet'

export interface Interested extends Pet {
  user_id: string
  pet_id: number
}
