import React from 'react'

function Inputbox_com(props) {
  return (
    <div>
    <section>{props.name}</section>
    <input type="text" placeholder={props.placeholder} />
    </div>
  )
}

export default Inputbox_com