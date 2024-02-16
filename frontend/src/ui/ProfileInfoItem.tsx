import React, { ReactNode } from "react"

export type ProfileInfoItemType = {
  title: string
  value: ReactNode
}

const ProfileInfoItem = ({ title, value }: ProfileInfoItemType) => {
  return (
    <div className='flex text-lg items-center justify-start gap-2'>
      <span className='block bg-base-300 rounded-lg py-2 px-4'> {title}{":"} </span> <p> {value} </p>
    </div>
  )
}

export default ProfileInfoItem
