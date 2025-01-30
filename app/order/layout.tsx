import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotiifcation from "@/components/ui/ToastNotiifcation";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <>
            <div className="md:flex">
                <OrderSidebar />

                <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-4">
                    {children}
                </main>

                <OrderSummary />
            </div>
            <ToastNotiifcation />
        </>
    )
}