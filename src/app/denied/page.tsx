import Link from "next/link"

export default function Denied() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <section className="flex flex-col gap-12 items-center">
                <h1 className="text-3xl font-extrabold">Access Denied</h1>
                <p className="text-xl max-w-2xl text-center">You do not have the
                    required access level to view this page.
                </p>
                <Link href="/" className="text-xl underline text-blue-800">Return to Your Page</Link>
            </section>
        </div>
    )
    }