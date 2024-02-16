import { MutableRefObject, Ref, RefObject, useState } from "react"


const useDialog = (ref: RefObject<HTMLDialogElement> | MutableRefObject<HTMLDialogElement>) => {
  

  const openModal = () => {
    if (!ref.current) return
    ref.current.showModal()
  }
  const closeModal = () => {
    if (!ref.current) return
    ref.current.close()
  }

  return {
    openModal,
    closeModal
  }

}

export default useDialog