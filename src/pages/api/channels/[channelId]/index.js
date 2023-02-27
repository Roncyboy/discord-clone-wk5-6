import { getAllMessages, createMessage } from "@/database";

export default async function handler(req, res) {
  const { channelId } = req.query;

  switch (req.method) {
    case "GET":
      // Get all messages for a channel
      res
        .status(200)
        .json({ message: "GET request to /api/channels/[channelId]/messages not implemented yet" });
      break;

    case "POST":
      // Create a new message
      res
        .status(200)
        .json({ message: "POST request to /api/channels/[channelId]/messages not implemented yet" });
      break;

      case "POST":
  // Create a new channel
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "Missing channel name" });
    break;
  }
  const newChannel = await createChannel(name);
  res.status(201).json(newChannel);
  break;

      case "GET":
  // Get a single channel by id
  const channel = await getChannelById(channelId);
  if (!channel) {
    res.status(404).json({ message: "Channel not found" });
    break;
  }
  res.status(200).json(channel);
  break;
    default:
      res.status(405).end();
      
  }
  
}

