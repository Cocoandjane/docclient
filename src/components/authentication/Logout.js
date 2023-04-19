import React from 'react'

import { signOut } from "next-auth/react"

export default function Logout() {
    return (
        <div className='w-full h-screen flex justify-center items-center '>
            <div className='w-32'>
                <button
                    onClick={signOut}
                    type="button"
                    className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                    Sign out
                </button>
            </div>
        </div>
    )
}
