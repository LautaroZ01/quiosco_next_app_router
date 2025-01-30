import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const imagePath = getImagePath(product.image)
    
    return (
        <div className="border bg-white flex flex-col items-center justify-center h-full">
            <Image
                width={400}
                height={500}
                src={imagePath}
                alt={`Imagen platillo ${product.name}`}
                className="flex-1"
            />
            <div className="p-5 w-full flex-1 flex flex-col">
                <h3 className="text-2xl font-bold flex-1">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatCurrency(product.price)}
                </p>
                <AddProductButton product={product} />
            </div>
        </div>
    )
}
