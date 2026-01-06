import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/


// Get the directory of the current file
//const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        outDir: 'dist'
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})