import { useAdmissionStore } from "./store.admission"
import { useChildStore } from "./store.child"
import { useParentsStore } from "./store.parents"
import { useUserStore } from "./store.user"


export const useInitialStore = () => {

  const childStore = useChildStore()
  const parentsStore = useParentsStore()
  const admissionStore = useAdmissionStore()
  const userStore = useUserStore()

  const resetStore = () => {
    childStore.reset()
    parentsStore.reset()
    admissionStore.reset()
    userStore.reset()
  }


  return { resetStore }

}