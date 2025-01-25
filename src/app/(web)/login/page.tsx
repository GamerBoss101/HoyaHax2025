import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
	return (
		<div className="min-h-screen flex bg-gray-100">
			<Card className="h-1/4 w-1/4 mx-auto my-20">
				<CardHeader className="text-center">
					<CardTitle>Welcome</CardTitle>
					<CardDescription>Choose your login type</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<Button asChild className="w-full">
						<Link href="/patient-login">Patient Login</Link>
					</Button>
					<Button asChild variant="outline" className="w-full">
						<Link href="/doctor-login">Doctor Login</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}

