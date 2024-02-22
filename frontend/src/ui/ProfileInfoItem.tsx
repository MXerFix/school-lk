import { useClickAway } from "@uidotdev/usehooks"
import classNames from "classnames"
import { Edit } from "lucide-react"
import React, { ReactNode, useState } from "react"

export type ProfileInfoItemType = {
  title: string
  value: ReactNode
  select?: boolean
  options?: string[]
  onOptionClick?: (value: string) => void
}

const ProfileInfoItem = ({ title, value, select, options, onOptionClick }: ProfileInfoItemType) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const ref = useClickAway<HTMLDivElement>(() => setIsOptionsOpen(false))

  const onSelectItemClick = async (op: string) => {
    onOptionClick && onOptionClick(op)
    setIsOptionsOpen(!isOptionsOpen)
  }

  // console.log(isOptionsOpen)

  return (
    <div className='flex text-lg items-center justify-start gap-2'>
      <span className='block bg-base-neutral rounded-lg py-2 px-4'>
        {title}
        {":"}
      </span>
      {select ? (
        <div
          className=''
          ref={ref}>
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className='flex gap-2 items-center'>
            {" "}
            {value}
            <Edit />
          </button>
          <ul
            className={classNames(
              "absolute bg-base-neutral transition-all rounded-lg p-2 flex flex-col gap-0.5",
              isOptionsOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}>
            {options?.map((op) => (
              <li
                key={op}
                className='transition cursor-pointer hover:bg-base-100 px-2 py-1 rounded-md'
                onClick={() => onSelectItemClick(op)}>
                <a> {op} </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{value}</p>
      )}
    </div>
  )
}

export default ProfileInfoItem
