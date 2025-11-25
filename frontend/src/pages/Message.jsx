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
            <div className="h-screen bg-white">
                {/* Header */}
                <div className="h-14 flex items-center px-4 border-b">
                    <p className="text-xl font-bold">Messages</p>
                </div>

                {/* Chat List */}
                <div className="p-2 flex flex-col gap-2">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer bg-gray-50 rounded-md border-2 hover:bg-gray-100"
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
                                <p className={`text-sm ${chat.isMe ? "text-gray-500" : "text-black"
                                    }`}>
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
