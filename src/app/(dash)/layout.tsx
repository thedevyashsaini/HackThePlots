import type {Metadata} from "next";
import localFont from "next/font/local";
import "../globals.css";
import Sidebar from "@/components/sidebar-component";
import { headers } from 'next/headers'

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "TechHunt | Hack The Plot",
    description: "",
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const headersList = await headers()
    const pathname = headersList.get('x-invoke-path') || ''
    console.log("---" + pathname)

    return (
        <html className={"dark"} lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <Sidebar>{children}</Sidebar>
        </body>
        </html>
    );
}
