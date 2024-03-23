import React from 'react'

export default function Pet(props) {
  return (
    <div className='bg-cyan-700 w-1/2 rounded-md text-white shadow-black shadow-sm'>
      <h1>{ props.name }</h1>
      <h1>{ props.animal }</h1>
      <h1>{ props.breed }</h1>
    </div>
  )
}
