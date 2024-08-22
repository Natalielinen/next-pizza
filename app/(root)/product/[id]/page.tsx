import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/prisma-client";
import { ChooseProduct } from "../../../../shared/components/shared/choose-product";
import { Container } from "../../../../shared/components/shared";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {

    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            items: true
                        }
                    }
                }

            },
            items: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });


    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <ChooseProduct product={product} />
        </Container>
    )
}