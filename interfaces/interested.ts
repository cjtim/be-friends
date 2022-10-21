/* eslint-disable no-unused-vars */
import { Pet } from './Pet'
import { User } from './User'

// eslint-disable-next-line no-shadow
export enum InterestedStep {
  PENDING = 'ได้รับข้อมูลแล้ว',
  REVIEWING = 'กำลังตรวจสอบข้อมูล และติดต่อกลับ',
  ADOPED = 'เสร็จสิ้น',
}

export interface Interested {
  user_id: string
  pet_id: number
  step: InterestedStep
}

export const InterestedSteps: InterestedStep[] = [
  InterestedStep.PENDING,
  InterestedStep.REVIEWING,
  InterestedStep.ADOPED,
]

export interface InterestedPet extends Interested, Pet {}

export interface InterestedUser extends Interested, User {}
