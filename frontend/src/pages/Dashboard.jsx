import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, ImageIcon, Users, UserPlus } from "lucide-react";

export default function Dashboard() {
	const stats = [
		{
			title: "Total Likes",
			value: "12.4k",
			icon: Heart,
		},
		{
			title: "Comments",
			value: "3.1k",
			icon: MessageCircle,
		},
		{
			title: "Shares",
			value: "980",
			icon: Share2,
		},
		{
			title: "Posts",
			value: "220",
			icon: ImageIcon,
		},
		{
			title: "Followers",
			value: "8,530",
			icon: Users,
		},
		{
			title: "Following",
			value: "1,120",
			icon: UserPlus,
		},
	];

	return (
		<div className="p-4 mt-14">
			<h1 className="text-2xl font-bold mb-4">Dashboard</h1>

			{/* Stats Grid */}
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
				{stats.map((item, idx) => (
					<Card key={idx} className="shadow-md border">
						<CardHeader className="flex justify-center items-center">
							<CardTitle className="text-sm font-medium text-center">{item.title}</CardTitle>
							<item.icon className="h-5 w-5 text-blue-500 fill-blue-500" />
						</CardHeader>

						<CardContent>
							<p className="text-2xl font-bold text-center">{item.value}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
