"use client"

export function HeroOne() {
    return (
        <section className="bg-white dark:bg-neutral-950 w-full">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto">
                <div className="ml-auto place-self-center lg:col-span-7 text-right">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        Our Mission 
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        We are a team of passionate individuals dedicated to making a positive impact in the world. 
                        We want to inspire an age of easier communication and collaboration bewteen doctors and patients.
                    </p>
                </div>
            </div>
        </section>
    )
}