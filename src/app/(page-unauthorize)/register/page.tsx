'use client'
import React, { useState } from "react";
import Link from "next/link";
import registerApi from "@/api/register";
import { revalidatePath } from "next/cache";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const validateEmail = (email:string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateEmail(formState.email)) {
      setErrorMessage('Please enter a valid email address')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      return;
    }

    if (!validatePassword(formState.password)) {
      setErrorMessage('Input must be at least 8 characters long, and contain lowercase letters, uppercase letters, and numbers. Special characters are not allowed.');
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      return;
    }

    const user = await registerApi(formState.name, formState.email, formState.password)
    if(user.statusCode) {
      setErrorMessage(user.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      revalidatePath('/register')
    } else {
      alert ("Register Success")
    }
    
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Register Form</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-red-500 mb-2"> <span>{errorMessage}</span></div>
          <form className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border" onSubmit={register}>
            <div className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleInputChange}
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
                    value={formState.password}
                    onChange={handleInputChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="passwordConfirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="password confirmation"
                    value={formState.password_confirmation}
                    onChange={handleInputChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="text-xs italic mt-5">
            <span>Already have an account <Link href={'/'} className="text-sky-700 font-bold">Signin Here</Link></span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
