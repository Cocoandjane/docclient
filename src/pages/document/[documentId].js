import React, { useEffect, useState,useCallback } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import TextEditor from '@/components/documents/TextEditor'
import ThemeToggle from '@/components/buttons/ThemeToggle'
import DocHubSignalR from '@/components/documents/DocHubSignalR'

export default function Document() {
  const router = useRouter()
  const { documentId } = router.query

  const [document, setDocument] = useState(null)

  useEffect(() => {
    async function fetchDocument() {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/document/' + documentId)
      return res.data
    }

    async function getDocument() {
      const document = await fetchDocument()
      setDocument(document)
    }
    
    if (documentId) {
      getDocument()
    }

  }, [documentId])

  // const handleChange = (value) => {
  //   setDocument({ ...document, body: value })
  //   if (connection && document.id) {
  //     connection.invoke("SendDoc", document.id, { ...document, body: value })
  //   }
  // }



  const { connection } = DocHubSignalR("http://localhost:7101/r/doc");

  const InvokeSendDoc = (doc) => {
    if (connection && document.id) {
      connection.invoke("SendDoc", document.id, doc)
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const joinDoc = useCallback((id) => {
    if (connection) {
      setTimeout(() => {
        connection.invoke("JoinDoc", id)
          .catch((err) => {
            console.log(err);
          });
      }, 100); // delay joining document by 100 milliseconds
    }
  }, [connection]);

  useEffect(() => {
    if (connection ) {
      connection.start()
        .then(() => {
          joinDoc(documentId);
        })
        .catch((err) => {
          console.log(err);
        });

      const receiveDocHandler = (doc) => {
        setDocument(doc);
      };

      connection.on("ReceiveDoc", receiveDocHandler);

      return () => {
        connection.off("ReceiveDoc", receiveDocHandler);
      };
    }
  }, [connection, setDocument, documentId, joinDoc]);


  return (
    <div className='relative'>
      {document ? <TextEditor document={document} setDocument={setDocument} onSendInvoke={InvokeSendDoc} joinDoc={joinDoc} /> : <div>Loading...</div>}
      <ThemeToggle />
    </div>
  )
}
