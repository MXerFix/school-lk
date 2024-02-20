import  $v1  from '.';


export const get_documents = async () => {
  return $v1.get('/user/admission/documents')
}

export const create_document = async (document: FormData) => {
  return $v1.post('/user/admission/documents', document)
}

export const get_required_documents = async (step_index: number) => {
  return $v1.get(`/user/admission/documents?required=true&step_index=${step_index}`)
}