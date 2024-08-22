import { Metadata } from "next"
import { Header } from "../../shared/components/shared"
import { Suspense } from "react"

export const metadata: Metadata = {
    title: 'Next.js | Оформление заказа',
    description: 'Generated by Next.js',
}

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (

        <main className="min-h-screen bg-[#F4F1EE]">
            <Suspense>
                <Header className="border-bottom-gray-200" hasSearch={false} hasCart={false} />
            </Suspense>

            {children}
        </main>

    )
}