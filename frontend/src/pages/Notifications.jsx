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
        like: <Heart className="text-red-500 fill-red-500 w-5 h-5" />,
        follow: <UserPlus className="text-blue-500 fill-blue-500 w-5 h-5" />,
        comment: <MessageCircle className="text-green-500 fill-green-500 w-5 h-5" />,
    };

    return (
        <div className="relative top-14 flex flex-col px-2 h-full">

            <h2 className="text-4xl font-bold py-2">Notifications</h2>

            <div className="flex gap-2 flex-col">
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        className="flex items-center gap-4 p-3 rounded-lg shadow-sm border"
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
                            <p className=" text-xs">{n.time} ago</p>
                        </div>

                        {/* Icon */}
                        {iconMap[n.type]}
                    </div>
                ))}
            </div>
        </div>
    );
}
