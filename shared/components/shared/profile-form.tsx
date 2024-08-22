'use client';

import { FormProvider, useForm } from "react-hook-form";
import { cn } from "../../lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { formRegisterSchema, TFormRegisterValues } from "./modals/auth-modal/forms/schemas";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { updateUserInfo } from "../../../app/actions";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form-components";
import { Button } from "../ui";

interface Props {
    className?: string,
    data: User
}

export const ProfileForm: React.FC<Props> = ({ className, data }) => {

    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullname: data.fullname,
            email: data.email,
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullname: data.fullname,
                password: data.password,
            });

            toast.error('Данные обновлены 📝', {
                icon: '✅',
            });
        } catch (error) {
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌',
            });
        }
    };

    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/',
        });
    };

    return <Container className={cn('my-10', className)}>
        <Title text={`Личные данные | #${data.id}`} size="md" className="font-bold" />

        <FormProvider {...form}>
            <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="fullName" label="Полное имя" required />

                <FormInput type="password" name="password" label="Новый пароль" required />
                <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

                <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                    Сохранить
                </Button>

                <Button
                    onClick={onClickSignOut}
                    variant="secondary"
                    disabled={form.formState.isSubmitting}
                    className="text-base"
                    type="button">
                    Выйти
                </Button>
            </form>
        </FormProvider>
    </Container>;
};