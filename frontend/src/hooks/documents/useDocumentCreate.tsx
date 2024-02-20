import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { create_document } from "../../api/documents"


export type RequestValidationError = {
  message: string
  errors: []
}

export function useDocumentCreate() {
  
  
  // const { setActiveStep, setAdmission } = useAdmissionStore()

  const {
    mutate: createDocumentFn,
    isPending: isCreateDocumentPending,
    isSuccess: isCreateDocumentSuccess,
    data,
  } = useMutation({
    mutationFn: (formData: FormData) => create_document(formData),
    onSuccess: ({ data }: { data: {message: string} }) => {
      console.log(data)
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

  return { createDocumentFn, isCreateDocumentPending, isCreateDocumentSuccess, data }
}
