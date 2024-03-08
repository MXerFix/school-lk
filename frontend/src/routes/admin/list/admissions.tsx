import { createFileRoute } from "@tanstack/react-router"
import { useAdmissionGetAll } from "../../../hooks/admission/useAdmissionGetAll"
import { useEffect } from "react"
import { useAdminStore } from "../../../store/store.admin"

export const Route = createFileRoute("/admin/list/admissions")({
  component: AdminListAdmissions,
})

function AdminListAdmissions() {
  const { getAdmissionsFn } = useAdmissionGetAll()
  const { admissions } = useAdminStore()

  useEffect(() => {
    getAdmissionsFn()
  }, [getAdmissionsFn])

  return (
    <div className='col-span-3 flex flex-col items-start justify-start gap-5'>
      {admissions.length &&
        admissions.map((admission) => (
          <>
            {admission.user.child && (
              <div className='grid grid-cols-5 w-full h-20 gap-6'>
                <div className='bg-base-200 col-span-1 rounded-xl flex items-center justify-center'>
                  {new Date(admission.createdAt)
                    .getTime()
                    .toString()
                    .slice(0, 10)
                    .concat("-")
                    .concat(admission.id.toString())}
                </div>
                <div className='bg-base-200 col-span-4 rounded-xl grid grid-cols-8 items-center'>
                  <p className="col-span-3">
                    {" "}
                    {admission.user.child.surname} {admission.user.child.name}{" "}
                    {admission.user.child.lastname ?? ""}
                  </p>
                  <p className="col-span-2">
                    {admission.step}
                  </p>
                  <div className="col-span-1">ok</div>
                  <div className="col-span-2 flex items-center justify-end">more</div>
                </div>
              </div>
            )}
          </>
        ))}
    </div>
  )
}
