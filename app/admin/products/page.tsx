import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
    return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize
    console.log(page, pageSize, skip)

    const products = await prisma.product.findMany({
        take: pageSize,
        skip,
        include: {
            category: true
        }
    })
    return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {
    const pageParam = await searchParams;
    const page = +pageParam.page || 1
    const pageSize = 10

    if (page < 0) redirect('/admin/products')

    const productsData = getProducts(page, pageSize)
    const totalProductsData = productCount()

    const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
    const totalPages = Math.ceil(totalProducts / pageSize)

    if (page > totalPages) redirect('/admin/products')

    return (
        <>
            <Heading>Administrar productos</Heading>

            <div className="flex flex-col lg:flex-row gap-5 lg:justify-between">
                <Link
                    href={'/admin/products/new'}
                    className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
                >
                    Crear Producto
                </Link>

                <ProductSearchForm />
            </div>

            <ProductTable
                products={products}
            />
            <ProductsPagination
                page={page}
                totalPages={totalPages}
            />
        </>
    )
}
