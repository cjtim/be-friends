/* eslint-disable no-unused-vars */
import { Pet } from './Pet'
import { User } from './User'

// eslint-disable-next-line no-shadow
export enum InterestedStep {
  PENDING = 'ได้รับข้อมูลแล้ว',
  SCREENING = 'กำลังตรวจสอบข้อมูล และติดต่อกลับ',
  CONFIRMATION = 'ยืนยันรับอุปถัมภ์',

  FAILED = 'คุณสมบัติไม่ผ่าน',
  PICKEDUP = 'เสร็จสิ้นการอุปถัมภ์',
}

export interface Interested {
  user_id: string
  pet_id: number
  step: InterestedStep
}

export const InterestedSteps: InterestedStep[] = [
  InterestedStep.PENDING,
  InterestedStep.SCREENING,
  InterestedStep.CONFIRMATION,
  InterestedStep.FAILED,
  InterestedStep.PICKEDUP,
]

export interface InterestedPet extends Interested, Pet {}

export interface InterestedUser extends Interested, User {}
