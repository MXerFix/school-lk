import $v1 from ".";
import { ChildCreateType } from "../store/store.child";


export const create_child = async (child: FormData) => {
  return $v1.post('/user/children', child)
}

export const get_child = async () => {
  return $v1.get('/user/children')
}

export const mutate_child = async (child: FormData) => {
  return $v1.put(`/user/children`, child)
}