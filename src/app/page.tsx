'use client'
import { useState } from "react";
import {useRouter} from 'next/navigation'
import loginApi from "@/api/login";
import Link from "next/link";

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email:string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const login = async () => {

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      return;
    }

    const token = await loginApi(email, password)
    if(token.status) {
      setErrorMessage(token.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
    else {
      document.cookie = `auth_token=${token}`
      router.push('/book-loan')
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Please Sign In to Continue</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-red-500 mb-2"> <span>{errorMessage}</span></div>
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="emai;"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  onClick={login}
                >
                  Sign in
                </button>
              </div>
            </div>

            <div className="text-xs italic mt-5">
              <span>Does not have an account <Link href={'/register'} className="text-sky-700 font-bold">Register Here</Link></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
