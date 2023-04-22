import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useState } from 'react'
// import DocHubSignalR from "./DocHubSignalR"
import { useEffect, useCallback } from 'react'
import { cookies } from 'next/dist/client/components/headers'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})


const modules = {
  toolbar: [
    [{ header: [] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ 'code-block': true }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  "script",
  'blockquote',
  'list',
  'bullet',
  'indent',
  'align',
  'color',
  'background',
  'code-block',
  'link',
  'image',
  'video',
]


export default function Home({ document, setDocument, onSendInvoke, joinDoc }) {

  const handleChange = (value) => {
    setDocument({ ...document, body: value });
    if (typeof onSendInvoke === 'function' ) {
      onSendInvoke({ ...document, body: value });
    }
  };
  const [newDocCreated, setNewDocCreated] = useState(false);
  
  function UpdateDocument() {
    if (document.id) {
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/document/${document.id}`, document).then((res) => {
        // console.log(res.data)
      })
      // console.log(document.id)
      if (typeof onSendInvoke === 'function') {
      joinDoc(document.id)
      }
    } else {
      if(document.title.length > 1 || document.body.length > 1){
        if (!newDocCreated) {
          axios.post(`${process.env.NEXT_PUBLIC_API_URL}/document`, document)
            .then((res) => {
              console.log(res.data);
              setDocument({ ...document, id: res.data.id });
              setNewDocCreated(true);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  }


  return (

    <>
      <div className='flex items-center justify-center  '>
        <div className="flex items-center border-b border-gray-400 mt-14 w-1/4">
          <input
            defaultValue={document.title}
            onChange={(e) => {
              setDocument({ ...document, title: e.target.value }), UpdateDocument()
            }}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter Title"
            aria-label="title" />
        </div>
      </div>
      <QuillNoSSRWrapper
        value={document.body}
        onChange={(e) => {
          handleChange(e),
         UpdateDocument() }}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </>
  );
};