import * as React from 'react'

interface Props {
  children?: string | React.ReactNode;
  onClick?: (event: any) => any;
  id?: string;
  role?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  id,
  role,
  disabled
}:Props) => {
  return (
    <button className="my-0px mx-auto flex items-center
  justify-center
  w-72
  h-16
  bg-black
  text-white
  border
  border-solid
  border-black
  border-box
  uppercase" onClick={onClick} id={id} role={role} disabled={disabled}>
      {
        children
      }
    </button>
  )
}
