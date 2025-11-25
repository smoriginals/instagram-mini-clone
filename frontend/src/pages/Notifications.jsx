import { Heart, UserPlus, MessageCircle } from "lucide-react";

export default function Notifications() {
    const notifications = [
        {
            id: 1,
            type: "like",
            user: "john_doe",
            avatar: "https://i.pravatar.cc/100?img=1",
            text: "liked your post",
            time: "2h",
        },
        {
            id: 2,
            type: "follow",
            user: "emma_21",
            avatar: "https://i.pravatar.cc/100?img=2",
            text: "started following you",
            time: "4h",
        },
        {
            id: 3,
            type: "comment",
            user: "alex99",
            avatar: "https://i.pravatar.cc/100?img=3",
            text: "commented on your photo",
            time: "6h",
        }
    ];

    const iconMap = {
        like: <Heart className="text-red-500 w-5 h-5" />,
        follow: <UserPlus className="text-blue-500 w-5 h-5" />,
        comment: <MessageCircle className="text-green-500 w-5 h-5" />,
    };

    return (
        <div className="flex flex-col p-2 mt-3">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>

            <div className="flex gap-2 flex-col">
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-white shadow-sm border"
                    >
                        {/* Avatar */}
                        <img
                            src={n.avatar}
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        {/* Text */}
                        <div className="flex-1">
                            <p className="text-sm">
                                <span className="font-semibold">{n.user}</span> {n.text}
                            </p>
                            <p className="text-gray-500 text-xs">{n.time} ago</p>
                        </div>

                        {/* Icon */}
                        {iconMap[n.type]}
                    </div>
                ))}
            </div>
        </div>
    );
}
