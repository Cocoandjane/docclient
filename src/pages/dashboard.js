import React, {useState} from 'react'
import TextEditor from '@/components/documents/TextEditor'
import ThemeToggle from '@/components/buttons/ThemeToggle'
import { useSession } from 'next-auth/react'



export default function Home() {

  const { data: session, status } = useSession()
  const [document, setDocument] = useState({
    title: '',
    body: '',
    userId: session.user.name
  })

  return (
    <div className='relative'>
        <ThemeToggle />
        <TextEditor  document={document} setDocument={setDocument}/>
    </div>
  )
}
