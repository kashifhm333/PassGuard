const Footer = () => {
  return (
<footer className="w-full border-t border-black/15 bg-purple-100">
  <div className="mx-auto w-full max-w-7xl p-4 md:flex md:items-center md:justify-between">
    <span className="text-sm text-black sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
  <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-black sm:mt-0">
        <li>
      <a href="#" className="hover:underline">About</a>
        </li>
        <li>
      <a href="#" className="hover:underline">Privacy Policy</a>
        </li>
        <li>
      <a href="#" className="hover:underline">Licensing</a>
        </li>
        <li>
      <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

  )
}

export default Footer
