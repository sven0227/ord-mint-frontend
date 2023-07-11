export default function TextInscriptionPage () {
  return (
    <div className='flex flex-col p-2'>
      <div className='p-2'>
        <h1>Inscribe Text</h1>
      </div>
      <section className='flex flex-col p-2'>
        <div className='mb-2'>
          <label className='p-2'>Text to inscribe: </label>
          <input className='form-control' type='text' maxLength={4} />
        </div>
        <div className='mb-2'>
          <label className='p-2'>Max supply: </label>
          <input className='form-control' type='number' max={99999} />
        </div>
        <button className='btn btn-primary'>Inscribe </button>
      </section>
    </div>
  )
}
