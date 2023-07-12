import { ORDINAL_TYPE_BRC20_MINT } from '@/utils/apiRoutes'
import { useMemo, useState } from 'react'

export default function MintPage ({ orderList, handleMint }) {
  const [tick, setTick] = useState('')
  const [tokenAmount, setTokenAmount] = useState(0)

  const deployOrder = useMemo(() => {
    const sorted = orderList.filter(
      order => order.ordinal_type === ORDINAL_TYPE_BRC20_MINT
    )
    return sorted
  }, [orderList])

  return (
    <div className='flex flex-col p-2'>
      <div className='p-2'>
        <h1>Mint</h1>
      </div>
      <section className='flex flex-col p-2'>
        <div className='mb-2'>
          <label className='p-2'>Token Tick: </label>
          <input
            className='form-control'
            type='text'
            maxLength={4}
            value={tick}
            onChange={e => setTick(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label className='p-2'>Token Amount: </label>
          <input
            className='form-control'
            type='number'
            max={99999}
            value={tokenAmount}
            onChange={e => setTokenAmount(e.target.value)}
          />
        </div>
        <button
          className='btn btn-primary'
          onClick={() => handleMint(tick, tokenAmount)}
        >
          Mint
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
                <span>{order.token_tick}</span>
                {', '}
                <span>{order.mint_amount}</span>
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
