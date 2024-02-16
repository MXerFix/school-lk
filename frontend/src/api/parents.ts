import $v1 from "."
import { ChildCreateType } from "../store/store.child"
import { ParentCreateType } from "../store/store.parents"

export const create_parent = async (parent: ParentCreateType) => {
  return $v1.post("/user/parents", { ...parent })
}

export const get_parents = async () => {
  return $v1.get("/user/parents")
}
