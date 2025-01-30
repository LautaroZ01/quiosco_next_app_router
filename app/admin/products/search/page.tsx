import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })

    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {

    const products = await searchProducts(searchParams.search)

    return (
        <>
            <Heading>Resultados de busqueda</Heading>

            <div className="flex flex-col lg:flex-row gap-5 lg:justify-end">
                <ProductSearchForm />
            </div>
            {products.length ? (
                <ProductTable products={products} />

            ) : <p className="text-center text-lg mt-10 text-gray-400">No hay resultados</p>}
        </>
    )
}