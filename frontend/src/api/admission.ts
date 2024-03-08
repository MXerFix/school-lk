import $v1 from "."
import { AdmissionStepStatusType } from "../store/store.admission"

export const get_admission = async () => {
  return $v1.get("/user/admission")
}

export const mutate_admission_step = async (status: AdmissionStepStatusType, step_index: number) => {
  return $v1.post("/user/admission/step", { status, step_index })
}

export const get_all_admissions = async () => {
  return $v1.get("/admin/admissions")
}