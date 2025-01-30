"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Category } from "@prisma/client"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
    const params = useParams<{ category: string }>()

    return (
        <div
            className={`${category.slug === params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="relative size-16">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt='Imagen categoria'
                />
            </div>
            <Link
                className="text-xl font-bold"
                href={`/order/${category.slug}`}
            >
                {category.name}
            </Link>
        </div>
    )
}
