import React, { } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Message() {

    const navigate = useNavigate();

    // Dummy chat list
    const chats = [
        {
            id: 1,
            username: "john_doe",
            lastMessage: "Hey, what's up?",
            isMe: false,  // message received
            avatar: "https://i.pravatar.cc/50?img=1"
        },
        {
            id: 2,
            username: "alexx",
            lastMessage: "I'll be there in 10 min",
            isMe: true,   // message sent by me
            avatar: "https://i.pravatar.cc/50?img=2"
        },
        {
            id: 3,
            username: "sarah",
            lastMessage: "Okay ❤️",
            isMe: false,
            avatar: "https://i.pravatar.cc/50?img=3"
        }
    ];

    return (
        <>
            <div className="relative top-14 flex flex-col px-2 h-full">
                {/* Header */}
                <div className="h-14 flex items-center">
                    <p className="text-4xl font-bold py-2">Messages</p>
                </div>

                {/* Chat List */}
                <div className=" flex flex-col gap-2">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md border-2"
                            onClick={() => navigate(`/chat/${chat.id}`)}
                        >
                            {/* Avatar */}
                            <img
                                src={chat.avatar}
                                alt="profile"
                                className="w-12 h-12 rounded-full"
                            />

                            {/* User + Message */}
                            <div className="flex flex-col">
                                <p className="font-semibold">{chat.username}</p>

                                {/* Sent vs Received message color */}
                                <p className={`text-sm ${chat.isMe ? "" : ""}`}>
                                    {chat.isMe ? `You: ${chat.lastMessage}` : chat.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}
