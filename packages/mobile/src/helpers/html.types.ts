import React from 'react'

export type HTMLJSXElement<E> = Omit<React.DetailedHTMLProps<React.HTMLAttributes<E>, E>, 'content'>
export type JSXDivElement = HTMLJSXElement<HTMLDivElement>
