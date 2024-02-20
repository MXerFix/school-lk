import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create_document, get_required_documents } from "../../api/documents"
import { useAdmissionStepMutate } from "../admission/useAdmissionStepMutate"


export type RequestValidationError = {
  message: string
  errors: []
}

export function useDocumentGetReq(step_index: number) {
  
  
  // const { setActiveStep, setAdmission } = useAdmissionStore()
  // const { MutateAdmissionStepFn } = useAdmissionStepMutate()

  const {
    mutate: getReqDocumentFn,
    isPending: isGetReqDocumentPending,
    isSuccess: isGetReqDocumentSuccess,
    data,
  } = useMutation({
    mutationFn: () => get_required_documents(step_index),
    onSuccess: ({ data }: { data: {message: string, docs: boolean} }) => {
      console.log(data)
      if (data.docs) {
        toast.success(data.message, {
          id: 'check_req_documents'
        })
      }
      toast.dismiss('check_documents_data')
    },
    onError: (error: AxiosError<RequestValidationError>) => {
      toast.dismiss('check_documents_data')
      if (error.response?.data.message) {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return { getReqDocumentFn, isGetReqDocumentPending, isGetReqDocumentSuccess, data }
}
