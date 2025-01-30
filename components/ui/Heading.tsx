import React, { PropsWithChildren } from 'react'

export default function Heading({children}: PropsWithChildren) {
  return (
    <h1 className="text-2xl my-10">{children}</h1>

  )
}
