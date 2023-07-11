export default function MintPage ({ handleMint }) {
  return (
    <div className='flex flex-col p-2'>
      <div className='p-2'>
        <h1>Mint</h1>
      </div>
      <section className='flex flex-col p-2'>
        <div className='mb-2'>
          <label className='p-2'>Token Tick: </label>
          <input className='form-control' type='text' maxLength={4} />
        </div>
        <div className='mb-2'>
          <label className='p-2'>Mint Amount </label>
          <input className='form-control' type='number' max={99999} />
        </div>
        <button className='btn btn-primary' onClick={handleMint}>
          Mint
        </button>
      </section>
    </div>
  )
}
