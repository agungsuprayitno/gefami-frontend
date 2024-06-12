'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import getCookie from "@/helper/getCookie";

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
const Navbar = () => {
  const pathName = usePathname()
  const authToken = getCookie('auth_token')
  const router = useRouter()
  const logout = async () => {
    await deleteAllCookies()
    router.push('/')
  }
  
  return (
    <>
    {pathName !== '/' && 
        <nav className="bg-teal-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Link href="/movie" className="text-white text-xl font-bold">
                  Movies
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="flex ml-10 space-x-4">
                  <Link href="/movie" className="text-white hover:bg-teal-700 hover:text-white px-5 py-2 rounded-md text-sm font-medium">
                    Home
                  </Link>
                  <Link href="/favourite" className="text-white hover:bg-teal-700 hover:text-white px-5 py-2 rounded-md text-sm font-medium">
                    Favourite
                  </Link>
                  <Link href="/about-us" className="text-white hover:bg-teal-700 hover:text-white px-5 py-2 rounded-md text-sm font-medium">
                    About Us
                  </Link>
                  <Link href="/contact-us" className="text-white hover:bg-teal-700 hover:text-white px-5 py-2 rounded-md text-sm font-medium">
                    Contact Us
                  </Link>
                  {authToken && <Link href="#" 
                    className="text-white hover:bg-teal-700 hover:text-white px-5 py-2 rounded-md text-sm font-medium"
                    onClick={logout}
                    >
                    Logout
                  </Link>}
                </div>
              </div>
              <div className="md:hidden">
                <button className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-teal-700 focus:outline-none focus:ring focus:ring-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/movie" className="block px-5 py-2 rounded-md text-base font-medium text-white bg-teal-900">
              Home
              </Link>
              <Link href="/favourite"  className="block px-5 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-teal-700">
                Favourite
              </Link>
              <Link href="/about-us" className="block px-5 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-teal-700">
                About Us
              </Link>
              <Link href="/contact-us" className="block px-5 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-teal-700">
                Contact Us
              </Link>
              {authToken && <Link href="/#" 
                className="block px-5 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-teal-700"
                onClick={logout}
                >
                Logout
              </Link>}
            </div>
          </div>
        </nav>
}
    </>
  )
    
};

export default Navbar;
