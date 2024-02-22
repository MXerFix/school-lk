export type UserType = {
  id: number
  uuid: string
  username: string
  hashed_password: string
  email: string
  is_verified: boolean
  tel?: string
  profile_img?: string
  activation_link?: string
  role_id: number
  child?: ChildType
  parents?: ParentType[]
  admission?: AdmissionType
}

export type PersonType = {
  id: number
  name: string
  lastname?: string
  surname: string
  birthDate: string
  user_id: number
  gender: "male" | "female"
  citizenship: string
}

export interface ChildType extends PersonType {
  passport: string
  insurance: string
  is_student: boolean
  is_enrollee: boolean
  img?: string
  parent_id?: number[]
  grade_index?: number
  grade_id?: number
  section_ids?: number[]
  email?: string
  tel?: string
}

export interface ParentType extends PersonType {
  passport: string
  email: string
  tel: string
  relation_type: relationType
  snils: string
  user_id: number
  child_id: number
  // insurance: string
}

export interface ParentCreateType {
  id?: number
  name: string
  lastname?: string
  surname: string
  birthDate: string
  gender: "male" | "female"
  citizenship?: string
  email: string
  tel: string
  relation_type?: relationType
  snils?: string
  passport_number?: string
  passport_series?: string
  passport_address?: string
  passport_date?: string
  passport_department?: string
  passport_issuedBy?: string
  passport_addressDate?: string
}

export type AdmissionStepStatusType = "success" | "failed" | "pending" | "initial" | "closed" | "incorrect"

export type AdmissionStepType = {
  id: number
  status: AdmissionStepStatusType
  title: string
}

interface AdmissionStep_1 extends AdmissionStepType {
  documents: string
}

interface AdmissionStep_2 extends AdmissionStepType {
  checkout: string
  is_payed: boolean
}

interface AdmissionStep_3 extends AdmissionStepType {
  part_1: string
  part_2: string
  part_3: string
}

interface AdmissionExamInterface {
  id: number
  name: string
  description: string
  date: string
  time: string
  class: string
  status: AdmissionStepStatusType
  comments?: string
  points?: number
  max_points?: number
  min_points?: number
  exercises?: string
}

interface AdmissionStep_4 extends AdmissionStepType {
  documents: string
}

interface AdmissionStep_5 extends AdmissionStepType {
  checkout: string
  is_payed: boolean
}

export type AdmissionType = {
  id: number
  user_id: number
  status: AdmissionStepStatusType
  step: number
  step_statuses: AdmissionStepStatusType[]
}

export type DocumentTagType =
  | "passport"
  | "parent_passport"
  | "child_passport"
  | "snils"
  | "parent_snils"
  | "child_snils"
  | "additions"
  | "parent_surname_change"
  | "large_family_document"
  | "child_disability_document"
  | "svo_document"
  | "consent"
  | "consent_personal_data"
  | "consent_psych_diagnosis"
  | "consent_exams"
  | "parent"
  | "child"
  | "checkout"

export type SectionType = {
  id: number
  name: string
  description: string
  available_grades: number[]
  available_genders: string[]
  type: string
}

export type relationType = "mother" | "father" | "grandmother" | "grandfather" | "trustee"
