import React, { useState } from 'react'
import { useRef } from 'react'
import SubmitButton from '../buttons/SubmitButton'
import axios from 'axios'
import Alert from '../alerts/Alert'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'


export default function Register() {
    const router = useRouter()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [alertType, setAlertType] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)
    const [submitionLoading, setSubmitionLoading] = useState(false)
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>;
    } else if (session) {
        router.push("/");
        return null;
    }


    function handleSubmit(e) {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const comfirmPassword = passwordConfirmRef.current.value
        if (password !== comfirmPassword) {
            setAlertType('red')
            setAlertMessage("Passwords do not match")
        } else {
            setSubmitionLoading(true)
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
                email,
                password,
                comfirmPassword
            })
                .then(res => {
                    setAlertType('green')
                    setAlertMessage("You have successfully registered. Please check your email to verify your account.")
                    setSubmitionLoading(false)
                }).catch(err => {
                    console.log(err)
                    setAlertType('red')
                    setAlertMessage(err.response.data)
                    setSubmitionLoading(false)
                }
                )
        }
    }
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Alert setAlertType={setAlertType} alertType={alertType} alertMessage={alertMessage} />
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image
                        width={32}
                        height={32}
                         className="w-8 h-8 mr-2" src="/images/Logo.svg" alt="logo" />
                        JaneWrite
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register your account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input ref={passwordRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input ref={passwordConfirmRef} type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-white">Forgot password? (not yet)</a>
                                </div>
                                <SubmitButton text="register" loading={submitionLoading} />
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link href="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
