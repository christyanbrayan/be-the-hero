import React from 'react'

export default function Header(props) {
  return (
    <header>
      <h1> {props.children} </h1>
    </header>
  )
}