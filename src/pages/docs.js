import React, { useState, useEffect, useCallback } from 'react'
import DocList from '@/components/documents/DocList'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()

  const [sharedToMeDocuments, setSharedToMeDocuments] = useState(null)
  const [userDocuments, setUserDocuments] = useState(null)

  const fetchUserDocuments = useCallback(async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/document/user/${session.user.name}`)
    return res.data
  }, [session.user.name])

  useEffect(() => {
    async function getUserDocuments() {
      const userDocuments = await fetchUserDocuments()
      setUserDocuments(userDocuments)
    }
    getUserDocuments()
  }, [fetchUserDocuments])

  const fetchSharedToMeDocuments = useCallback(async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/invitation/documents/${session.user.email}`)
    return res.data
  }, [session.user.email])

  useEffect(() => {
    async function getSharedToMeDocuments() {
      const sharedToMeDocuments = await fetchSharedToMeDocuments()
      setSharedToMeDocuments(sharedToMeDocuments)
    }
    getSharedToMeDocuments()
  }, [fetchSharedToMeDocuments])

  return (
    <div className='relative'>  
      <div>
        {userDocuments ? <DocList documents={userDocuments} setDocuments={setUserDocuments} title="My Documents" /> : <div>Loading...</div>}
      </div>
      <div>
        {sharedToMeDocuments ? <DocList documents={sharedToMeDocuments} setDocuments={setSharedToMeDocuments} title="Shared to me" /> : <div>Loading...</div>}
      </div>
    </div>
  )
}
