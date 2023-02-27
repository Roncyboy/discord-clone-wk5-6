import { getAllMessages } from '@/database';
import { useState } from 'react';
import axios from 'axios';
import OrangeAn from '@/walking'

export default function Channel({channelId, messages: initialMessages}) {

    const [messages, setMessages] = useState(initialMessages)
    const [name, setName] = useState("")
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { text, userName } = e.target.elements
        const res = await fetch(`/api/channels/${channelId}/messages`, {
            method: 'POST',
            body: JSON.stringify({
                text: text.value,
                userName: userName.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data)
        setMessages([...messages, data])
        setText("")
        setName("")
        setLoading(false)
    }

    return (
        <div>
            <h1>Channel {channelId}</h1>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        {message.userName}: {" "}
                        {message.text}
                        </li>
                ))}
            </ul>
            {/* {loading && <>
                <OrangeAn />
            </>} */}
            <form onSubmit={handleSubmit}>
                Text:
                <input type="text" name="text" onChange={(e)=> setText(e.value)}/>
                Name:
                <input type="text" name="userName" onChange={(e)=> setName(e.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const channelId = context.query.channelId
    const messages = await getAllMessages(channelId)
    return {
        props: {
            channelId,
            messages: JSON.parse(JSON.stringify(messages))
        }
    }
}
