"use client"

export default function Dashboard() {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Card {i + 1}</h2>
                        <p className="">This is some placeholder content for Card {i + 1}.</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

