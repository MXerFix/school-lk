
export type UserType = {
  id: number
  uuid: string
  username: string
  hashed_password: string
  email: string
  is_verified: boolean
  profile_img?: string
  activation_link?: string
  role_id: number
  child?: ChildType
  parents?: ParentType[]
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
  id: number
  name: string
  lastname?: string
  surname: string
  birthDate: string
  gender: "male" | "female"
  citizenship: string
  email: string
  tel: string
  relation_type: relationType
  snils: string
  passport_number: string
  passport_series: string
  passport_address: string
  passport_date: string
  passport_department: string
  passport_issuedBy: string
  passport_addressDate: string
}

export type AdmissionType = {
  id: number
  user_id: number
  step_1: {
    is_complete: boolean
    is_pending: boolean
    documents: string[]
  }
  step_2: {
    is_complete: boolean
    is_pending: boolean
    payment: string
    payment_status: "paid" | "not_paid" | "pending"
  }
  step_3: {
    is_complete: boolean
    is_pending: boolean
    interview_completed: number
    interview_index: number
    meta: {
      interview_1: {
        is_complete: boolean
        is_pending: boolean
        qr: string
      }
      interview_2: {
        is_complete: boolean
        is_pending: boolean
        qr: string
      }
      interview_3: {
        is_complete: boolean
        is_pending: boolean
        qr: string
      }
    }
  }
  step_4: {
    is_complete: boolean
    is_pending: boolean
    documents: string[]
  }
  step_5: {
    is_complete: boolean
    is_pending: boolean
    payment: string
    payment_status: "paid" | "not_paid" | "pending"
  }
}

export type SectionType = {
  id: number
  name: string
  description: string
  available_grades: number[]
  available_genders: string[]
  type: string
}

export type relationType = "mother" | "father" | "grandmother" | "grandfather" | "trustee"
