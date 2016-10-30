import React from 'react'
import { Link } from 'react-router'

export default function (plate, people, remove) {
  let sharedBy = function  () {
    if (!plate.consumersCids.length) { return; }

    return (
      <p className='consumers-list'>
        {plate.consumersCids.map(consumerCid => {
          return people.find(person => person.cid === consumerCid).name
        }).join(', ')}
      </p>
    )
  }

  let className = !Object.keys(plate.consumersCids).length ? 'without-people' : ''

  return (
    <tr key={plate.cid} className={className}>
      <td className='price-cell'>
        <p className='paragraph-1'>
          {plate.price.toFixed(2)}<br/>
        </p>
        {sharedBy()}
        <Link to={`/plates/${plate.cid}/edit`}>edit</Link>
      </td>

      <td className='quantity-cell'>
        <p className='paragraph-1'>
          {plate.quantity}
        </p>
      </td>

      <td className='delete-button-column'>
        <button
          className='table-delete-button'
          onClick={evt => remove(plate.cid)}
          type='button'>
          Remove
        </button>
      </td>
    </tr>
  )
}
