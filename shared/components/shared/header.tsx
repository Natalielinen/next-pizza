'use client';

import React from "react"
import { cn } from "../../lib/utils";
import Image from 'next/image'
import { Container } from "./container";
import Link from "next/link";
import { SearchInput } from "./serch-input";
import { CartButton } from "./cart-button";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal/auth-modal";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}


export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {

    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    const searchParams = useSearchParams();

    React.useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('paid')) {
            toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    return (
        <header className={cn('border border-b', className as string)}>
            <Container className="flex items-center justify-between py-8">
                {/* Левая часть */}
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="logo" width={35} height={35} />
                        <div>
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>

                {/* Поиск */}
                {
                    hasSearch && <div className="mx-10 flex-1">

                        <SearchInput />
                    </div>
                }

                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <AuthModal
                        open={openAuthModal}
                        onClose={() => setOpenAuthModal(false)}
                    />
                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                    {
                        hasCart && <div>
                            <CartButton />
                        </div>
                    }

                </div>
            </Container>
        </header>
    )
}
