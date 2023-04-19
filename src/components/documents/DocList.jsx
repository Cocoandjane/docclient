import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { EditOutlined, ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';
import Alert from '../alerts/Alert'
import Invite from './Invite';
import Link from 'next/link'


const { Title } = Typography
const { Meta } = Card;

export default function DocList({ documents, setDocuments, title }) {
    const [alertType, setAlertType] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)
    const [showInvite, setShowInvite] = useState(false)
    const [docId, setDocId] = useState(0)

    async function DeleteDocument({ documentId, invitationId }) {
        if (title === "My Documents") {
           const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/document/${documentId}`)
          if(res.status === 200){
            setAlertType("green")
            setAlertMessage(res.data.message)
            setDocuments(documents.filter(document => document.id !== documentId))
            }else{
                setAlertType('red')
                setAlertMessage(res.data.message)
            }
        } else {
            const res =  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/invitation/${invitationId}`)
            if(res.status === 200){
                setAlertType("green")
                setAlertMessage(res.data.message)
                setDocuments(documents.filter(document => document.invitationId !== invitationId))
                }else{
                    setAlertType('red')
                    setAlertMessage(res.data.message)
                }     
               
        }
    }




    const renderCards = documents.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).
        map((document, index) => {
            return (
                <Col 
                key ={index}
                // key={title === "My Documents" ? document.id : document.invitationId}
                 xxl={4} xl={6} lg={8} md={12} xs={24}>
                    <Card
                        key={document.id}
                        hoverable
                        style={{ width: '100%', height: '100%', marginBottom: 16, overflow: 'hidden' }}
                        actions={[
                            // <SettingOutlined key="setting" />,
                            <Link href={`/document/${document?.id}`}><EditOutlined key="edit" /></Link>,
                            <DeleteOutlined
                                onClick={() => DeleteDocument({ documentId: document.id, invitationId: document.invitationId })}
                                key="delete" />,
                            < ShareAltOutlined
                                onClick={() => { setShowInvite(true), setDocId(document.id) }}
                                key="share" />
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://cdn.pixabay.com/photo/2023/04/06/01/15/bird-7902532__480.jpg" />}
                            title={document?.title}
                            description={`revision: ${new Date(document?.updatedAt).toLocaleString("en-GB", {
                                day: "numeric",
                                month: "short",
                                // year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            })}`}

                        />
                        <div style={{ height: 100, overflowY: 'scroll', marginTop: 10 }}>
                            <div dangerouslySetInnerHTML={{ __html: document?.body }} />
                        </div>
                    </Card>
                </Col>
            );
        });



    return (
        <>
            <Alert alertType={alertType} alertMessage={alertMessage} setAlertType={setAlertType} />
            {showInvite && <Invite showInvite={showInvite} setShowInvite={setShowInvite} docId={docId}
            />}
            <div style={{ width: '85%', margin: '3rem auto', }}>
                <Title level={2}> {title} </Title>
                <Row gutter={[16, 16]}>
                    {renderCards}
                </Row>
            </div>
        </>

    )
}

