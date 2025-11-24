import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-dvh bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white px-6">

            {/* Big Glow Number */}
            <h1 className="text-[120px] font-extrabold drop-shadow-2xl tracking-widest">
                404
            </h1>

            {/* Subtitle */}
            <p className="text-2xl font-light opacity-90 -mt-4">
                Oops! Page Not Found
            </p>

            {/* Description */}
            <p className="mt-3 text-center text-lg max-w-md opacity-80">
                The page you are trying to access doesn't exist or has been moved.
            </p>


            {/* Buttons */}
            <div className="mt-8 flex gap-4">
                <Link to="/">
                    <Button className="bg-white text-purple-600 font-semibold px-6 py-2 shadow-md hover:bg-gray-100">
                        Go Home
                    </Button>
                </Link>

            </div>

        </div>
    );
}
