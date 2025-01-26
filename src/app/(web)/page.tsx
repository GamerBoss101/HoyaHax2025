"use client"

import { Hero } from "@/components/hero";
import { Facts } from "@/components/facts";

import Link from "next/link";

export default function Home() {
	return (
		<div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

			<Hero />
			<Facts />

			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
				<Link href="/transcribe">
					<button>Go to Transcribe Page</button>
				</Link>
			</div>
		</div>
	);
}
