const Navbar = () => {
  return (
    <nav className='bg-purple-200 px-4 py-3 sm:px-6'>
        <div className='mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row'>
        <div className='logo font-bold text-black text-2xl'>
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>Guard/&gt;</span>
            </div>
      <ul>
        <li className='flex flex-wrap justify-center gap-4 text-sm sm:text-base'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/about">About</a>
            <a className='hover:font-bold' href="/contact">Contact</a>
        </li>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar
