import { useMemo } from "react"
import { useAdmissionGet } from "./admission/useAdmissionGet"
import { useChildGet } from "./child/useChildGet"
import { useParentsGet } from "./parents/useParentsGet"


export const useFetchData = () => {


  const { getAdmissionFn, isAdmissionPending, isAdmissionSuccess } = useAdmissionGet()
  const { getParentsFn, isParentPending, isParentSuccess } = useParentsGet()
  const { getChildFn, isChildPending, isChildSuccess } = useChildGet()

  const isPending = useMemo(() => isAdmissionPending || isParentPending || isChildPending, [isAdmissionPending, isParentPending, isChildPending])
  const isSuccess = useMemo(() => isAdmissionSuccess && isParentSuccess && isChildSuccess, [isAdmissionSuccess, isParentSuccess, isChildSuccess])

  const fetchData = async () => {
    getAdmissionFn()
    getParentsFn()
    getChildFn()
  }

  return { fetchData, isPending, isSuccess }


}