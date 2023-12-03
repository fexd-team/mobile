import React from 'react'

export type HTMLJSXElement<E> = Omit<React.DetailedHTMLProps<React.HTMLAttributes<E>, E>, 'content'>
export type JSXDivElement = HTMLJSXElement<HTMLDivElement>
export type JSXInputElement = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type JSXTextAreaElement = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>
