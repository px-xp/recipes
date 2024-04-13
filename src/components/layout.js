import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
    return (
        <>
            <main className={`p-5 text-gray-800 ${inter.className}`}>{children}</main>
        </>
    )
}