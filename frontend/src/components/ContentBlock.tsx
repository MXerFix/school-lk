import React, { ReactNode } from "react"
import classNames from "classnames"

type ContentBlockType = {
  title?: ReactNode
  size?: "huge" | "medium" | "little"
  className?: string
  children?: ReactNode
  icon?: ReactNode
}

const ContentBlock = ({
  title,
  size = "medium",
  className,
  children,
  icon,
}: ContentBlockType) => {

  const cols = {
    huge: 'home-content-block-huge',
    medium: 'home-content-block-medium',
    little: 'home-content-block-little'
  }

  return (
    <div
      className={classNames(
        `bg-primary-content rounded-3xl p-8 home-content-block`,
        cols[size],
        className
      )}>
      <h3 className='text-3xl mb-4 h-1/6 flex items-center gap-4'>{title} {icon} </h3>
      <div className='h-5/6'>{children}</div>
    </div>
  )
}

export default ContentBlock
