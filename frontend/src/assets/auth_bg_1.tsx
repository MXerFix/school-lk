import { SVGProps } from "react"

const AuthBgLeft = ({ className }: SVGProps<SVGElement>) => {
  return (
    <svg
      className={className}
      width='323'
      height='1080'
      viewBox='0 0 323 1080'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0 0H293.44C293.44 0 328.22 140.319 303.156 273.5C278.458 404.736 135.783 493.287 161.619 624C183.136 732.862 295.62 736.742 318.379 845C336.975 933.455 293.44 1080 293.44 1080H0V0Z'
        fill='url(#paint0_linear_44_2206)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_44_2206'
          x1='161.5'
          y1='0'
          x2='161.5'
          y2='1080'
          gradientUnits='userSpaceOnUse'>
          <stop stop-color='#0090E1' />
          <stop
            offset='0.860794'
            stop-color='#3C51A2'
          />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default AuthBgLeft
