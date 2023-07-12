import { ORDINAL_TYPE_TEXT } from '@/utils/apiRoutes'
import { useMemo, useState } from 'react'

export default function MintPage ({ orderList, handleInscribeText }) {
  const [text, setText] = useState('sample text')

  const deployOrder = useMemo(() => {
    const sorted = orderList.filter(
      order => order.ordinal_type === ORDINAL_TYPE_TEXT
    )
    return sorted
  }, [orderList])

  return (
    <div className='flex flex-col p-2'>
      <div className='p-2'>
        <h1>Inscribe Text</h1>
      </div>
      <section className='flex flex-col p-2'>
        <div className='mb-2'>
          <label className='p-2'>Text: </label>
          <input
            className='form-control'
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <button
          className='btn btn-primary'
          onClick={() => handleInscribeText(text)}
        >
          Inscribe
        </button>
        <div className='mt-2'>
          {deployOrder.map((order, index) => (
            <div key={index}>
              <span>{index + 1}</span>
              {': '}
              <a
                href={`https://mempool.space/testnet/tx/${order.ordinal?.reveal}`}
                target='_blank'
              >
                <span>{order.inscription_text.slice(0,15)}</span>
              </a>
              {' => '}
              <span>{order.description}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
