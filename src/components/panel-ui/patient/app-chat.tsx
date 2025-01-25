import Image from "next/image"


export function Message({ avatarUrl, message, sender }: { avatarUrl: string, message: string, sender: string }) {
    return (
        <div className="flex items-start space-x-4 p-4">
            <Image
                src={avatarUrl}
                alt={`${sender}'s avatar`}
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
            />
            <div className="flex flex-col">
                <span className="font-bold">{sender}</span>
                <p className="dark:text-gray-200">{message}</p>
            </div>
        </div>
    )
}