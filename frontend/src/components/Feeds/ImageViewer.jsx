import React from 'react';
import { useEffect } from "react";

export default function ImageViewer({ src, onClose }) {

    useEffect(() => {
        if (!src) return;

        const handlePopState = () => {
            onClose(); // close modal only
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [src, onClose]);

    if (!src) return null;

    return (
        <>
            <div className="fixed inset-0 z-60 flex items-center justify-center bg-white dark:bg-black">
                <img
                    src={src}
                    className="max-h-full max-w-full object-cover"
                />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl text-black dark:text-white"
                >
                    ✕
                </button>
            </div>
        </>
    )
}