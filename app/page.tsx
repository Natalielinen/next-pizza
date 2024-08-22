import {Container, Filters, ProductCard, Title, TopBar} from "@/components/shared";
import {ProductsGroupList} from "@/components/shared/products-group-list";

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size='lg' className="font-extrabold"/>
            </Container>

            <TopBar/>

            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    {/* Фильтрация */}
                    <div className="w-[250px]">
                        <Filters/>
                    </div>

                    {/* Список товаров */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Пиццы"
                                items={[
                                    {
                                        id: 1,
                                        name: 'Сырная',
                                        imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D610D2925109AB2E1C92CC5383C.avif',
                                        items: [
                                            {
                                                price: 289
                                            },
                                            {
                                                price: 389
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: 'Чоризо фреш',
                                        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61706D472F9A5D71EB94149304.avif',
                                        items: [
                                            {
                                                price: 289
                                            },
                                            {
                                                price: 389
                                            }
                                        ]
                                    },
                                    {
                                        id: 3,
                                        name: 'Карбонара',
                                        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61389AB51A8F648A0DBA5B1689.avif',
                                        items: [
                                            {
                                                price: 469
                                            },
                                            {
                                                price: 669
                                            }
                                        ]
                                    },
                                    {
                                        id: 4,
                                        name: 'Сырный цыпленок',
                                        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610E8BBB248F31270BE742B4BD.avif',
                                        items: [
                                            {
                                                price: 429
                                            },
                                            {
                                                price: 529
                                            }
                                        ]
                                    }
                                ]}
                                categoryId={1}
                            />
                            <ProductsGroupList
                                title="Комбо"
                                items={[
                                    {
                                        id: 1,
                                        name: 'Сырная',
                                        imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D610D2925109AB2E1C92CC5383C.avif',
                                        items: [
                                            {
                                                price: 289
                                            },
                                            {
                                                price: 389
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: 'Чоризо фреш',
                                        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61706D472F9A5D71EB94149304.avif',
                                        items: [
                                            {
                                                price: 289
                                            },
                                            {
                                                price: 389
                                            }
                                        ]
                                    },
                                    {
                                        id: 3,
                                        name: 'Карбонара',
                                        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61389AB51A8F648A0DBA5B1689.avif',
                                        items: [
                                            {
                                                price: 469
                                            },
                                            {
                                                price: 669
                                            }
                                        ]
                                    },
                                    {
                                        id: 4,
                                        name: 'Сырный цыпленок',
                                        imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610E8BBB248F31270BE742B4BD.avif',
                                        items: [
                                            {
                                                price: 429
                                            },
                                            {
                                                price: 529
                                            }
                                        ]
                                    }
                                ]}
                                categoryId={2}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>

    );
}
