'use client';

import { Asterisk } from "lucide-react";
import { Input } from "../../ui";
import { ErrorText } from "../error-text";
import { ClearButton } from "..";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = (
    {
        className,
        name,
        label,
        required = false,
        ...props

    }) => {

    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext();


    const value = watch(name);
    const error = errors[name];

    return <div className={className}>
        {
            label && <p className="flex font-medium mb-2">
                {label} {required && <Asterisk className="text-red-500" />}
            </p>
        }

        <div className="relative">
            <Input
                className="h-12 text-md"
                {...register(name)}
                {...props} />

            {value && <ClearButton onClick={() => setValue(name, '')} />}

        </div>

        {
            error && <ErrorText text={error.message as string} />}

    </div>
};