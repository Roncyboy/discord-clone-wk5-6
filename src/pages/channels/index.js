import { useState, useEffect } from "react";
import axios from "axios";
import { getAllChannels } from "@/database";
import Link from "next/link";

export default function Channels ({channels}) {

    //Clinet side load vs server side load
    // const [channels, setChannels] = useState([]);

    // useEffect(() => {
    //     axios.get("/api/channels").then((res) => {
    //         setChannels(res.data);
    //     });
    // }, []);


  return (
    <div>
      <h1>Channels</h1>
        <ul>    
            {channels.map((channel) => (
                <li key={channel.id}>
                    <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
                </li>
            ))}
        </ul>
    </div>
  );
}

export async function getServerSideProps(){
    
    const channels = await getAllChannels();

    return {
        props: {
            channels: JSON.parse(JSON.stringify(channels))
        }
    }
}