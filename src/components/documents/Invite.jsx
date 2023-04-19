import React, { useState, useRef } from 'react'
import { UsergroupAddOutlined, CloseOutlined } from '@ant-design/icons'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import SubmitButton from '../buttons/SubmitButton'
import Alert from '../alerts/Alert'

export default function Invite({ setShowInvite, docId }) {
    const [emails, setEmails] = useState([])
    const emailRef = useRef()
    const [loading, setLoading] = useState(false)
    const { data: session, status } = useSession()
    const [alertType, setAlertType] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)

    function SendInvitation(e) {
        e.preventDefault()
        if (emails.length > 0) {
            setLoading(true)
            emails.forEach(email => {
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/invitation`, {
                    senderEmail: session.user.email,
                    recipientEmail: email,
                    documentId: docId
                }).then(res => {
                    setAlertMessage(`Invitation sent to ${email}`)
                    setAlertType('green')
                    setLoading(false)
                }).catch(err => {
                    setAlertMessage(`Invitation not sent to ${email}`)
                    setAlertType('red')
                    setLoading(false)
                })
            })
        } else {
            setLoading(true)
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/invitation`, {
                senderEmail: session.user.email,
                recipientEmail: emailRef.current.value,
                documentId: docId
            }).then(res => {
                setAlertMessage(`Invitation sent to ${emailRef.current.value}`)
                setAlertType('green')
                setLoading(false)
                emailRef.current.value = ''
            }
            ).catch(err => {
                setAlertMessage(`Invitation not sent to ${emailRef.current.value}`)
                setAlertType('red')
                setLoading(false)
            })
        }
    }

    return (
        <>
            <Alert alertType={alertType} alertMessage={alertMessage} setAlertType={setAlertType} />
            <div className="flex flex-col w-96 items-center justify-center absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className=" block w-full rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    {emails.length > 0 &&
                        <div className="flex flex-col mb-2">
                            {emails.map((email, index) => (
                                <div
                                    key={index}
                                    className="flex items-center  gap-2">
                                    <div className="text-sm text-neutral-500 dark:text-neutral-400">{email}</div>
                                    <CloseOutlined
                                        onClick={() => {
                                            setEmails(emails.filter((_, i) => i !== index))
                                        }}
                                        className='text-sm text-neutral-500 dark:text-neutral-400' />
                                </div>
                            ))}
                        </div>
                    }
                    <form
                        onSubmit={SendInvitation}
                    >
                        <div className="relative mb-6 flex" data-te-input-wrapper-init>
                            <input
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        setEmails([...emails, emailRef.current.value])
                                        emailRef.current.value = ''
                                    }
                                }
                                }
                                ref={emailRef}
                                type="email"
                                className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"

                                id="exampleInput91"
                                placeholder="Email address" />
                          
                            <UsergroupAddOutlined
                                onClick={() => {
                                    setEmails([...emails, emailRef.current.value])
                                    emailRef.current.value = ''
                                }}
                                className="absolute flex items-center text-xl right-3 top-0 mb-0 truncate pt-[0.37rem] leading-[1.6] text-neutral-500 motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            />
                        </div>

                        <SubmitButton
                            loading={loading}
                            text="Share"
                            type="submit"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                        </SubmitButton>
                        <div className="flex justify-around dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            <button
                                onClick={() => setShowInvite(false)}
                                type="button" >Close </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
