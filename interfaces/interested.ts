import { Pet } from './Pet'
import { User } from './User'

export interface Interested {
  user_id: string
  pet_id: number
  step: 'PENDING' | 'REVIEWING' | 'ADOPED'
}

export interface InterestedPet extends Interested, Pet {}

export interface InterestedUser extends Interested, User {}
