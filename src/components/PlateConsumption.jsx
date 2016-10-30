import React from 'react'

export default function (person, personConsuption, increaseConsumption, decreaseConsumption) {
  return (
    <tr key={person.cid}>
      <td>
        <p className='paragraph-1'>
          {person.name}
        </p>
      </td>

      <td className='int-selector-cell'>
        <div className='int-selector'>
          <button
            type='button'
            className='rounded-button rb-minus'
            onClick={decreaseConsumption}>
            Decrease
          </button>

          <span className='value'>
            {personConsuption || '0'}
          </span>

          <button
            type='button'
            className='rounded-button rb-plus'
            onClick={increaseConsumption}>
            Increase
          </button>
        </div>
      </td>
    </tr>
  )
}
