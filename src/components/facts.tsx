"use client"

export function Facts() {
    return (
        <section className="mx-auto my-auto bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className=" max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                    Our Mission
                </h1>
                <p className="float-right max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                At PostCare we want to ensure the health of those throughout the world.
                    Our goal is to make sure that our services can ensure clarity and accessibility
                    <center>As well as a smooth experience</center>
                </p>
            </div>
        </div>
    </section>
    )
}