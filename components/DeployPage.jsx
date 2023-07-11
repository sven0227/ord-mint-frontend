import { ORDINAL_TYPE_BRC20_DEPLOY } from '@/utils/apiRoutes'
import { useMemo, useState } from 'react'

export default function DeployPage ({ connected, orderList, handleDeploy }) {
  const [tick, setTick] = useState('')
  const [maxSupply, setMaxSupply] = useState(0)

  const deployOrder = useMemo(() => {
    const sorted = orderList.filter(
      order => order.ordinal_type === ORDINAL_TYPE_BRC20_DEPLOY
    )
    return sorted
  }, [orderList])

  return (
    <div className='flex flex-col p-2'>
      <div className='p-2'>
        <h1>Deploye</h1>
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
          <label className='p-2'>Max supply: </label>
          <input
            className='form-control'
            type='number'
            max={99999}
            value={maxSupply}
            onChange={e => setMaxSupply(e.target.value)}
          />
        </div>
        <button
          className='btn btn-primary'
          onClick={() => handleDeploy(tick, maxSupply)}
        >
          Deploy
        </button>
        {deployOrder.map((order, index) => (
          <div key={index}>
            <span>{index + 1}</span>{': '}<span>{order.token_tick}</span>,
            <span>{order.max_supply}</span>
            {'=>'}
            <span>{order.description}</span>
          </div>
        ))}
      </section>
    </div>
  )
}
