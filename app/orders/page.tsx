import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { prisma } from "@/src/lib/prisma";

async function getOrders() {
    const orders = await prisma.order.findMany({
        take: 5,
        where: {
            orderReadyAt: {
                not: null
            }
        },
        orderBy: {
            orderReadyAt: 'desc'
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })

    return orders
}

export default async function OrdersPage() {
    const orders = await getOrders()

    return (
        <>
            <h1 className="text-center mt-20 text-6xl font-black">Ordenes Listas</h1>
            <Logo />

            {orders.length ? (
                <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
                    {orders.map(order => (
                        <LatestOrderItem
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) :
                <p className="text-center my-10">No hay ordenes listas</p>
            }
        </>
    )
}
