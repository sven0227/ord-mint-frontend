const Header = ({ connected, address, handleConnect }) => {
  return (
    <div className='flex justify-end p-2 w-full'>
      <button className='p-2 bg-blend-color-dodge' onClick={handleConnect}>
        {connected ? address : 'Connect wallet'}
      </button>
    </div>
  )
}

export default Header
