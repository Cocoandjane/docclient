import React, { useEffect } from 'react'
import Navbar from './header/Navbar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();  
    if (status === "loading") {
      return <p>Loading...</p>;
    } 
    else if (!session && router.pathname !== "/auth/login" || !session && router.pathname !== "/auth/register") {
      router.push("/auth/login");
      return null;
    }

    return (
        <div>
            <div >
                <Navbar
                links={
                    [
                        { name: 'Home', href: '/' },
                        { name: 'Docs', href: '/docs' },
                        { name: 'Create', href: '/dashboard' },
                    ]
                }
                />
                <main className='mt-12'>
                    {children}
                </main>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
