import React from 'react'

export type HTMLJSXProps<E> = Omit<React.DetailedHTMLProps<React.HTMLAttributes<E>, E>, 'content'>

export type JSXDivProps = HTMLJSXProps<HTMLDivElement>
export type JSXButtonProps = HTMLJSXProps<HTMLButtonElement>

export type JSXLabelProps = HTMLJSXProps<HTMLLabelElement>
export type JSXSpanProps = HTMLJSXProps<HTMLSpanElement>
export type JSXLiProps = HTMLJSXProps<HTMLLIElement>

export type JSXInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type JSXTextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>
