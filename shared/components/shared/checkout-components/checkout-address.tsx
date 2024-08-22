
'use client';

import { Controller, useFormContext } from "react-hook-form";
import { AdressInput } from "../address-input";
import { FormTextarea } from "../form-components";
import { WhiteBlock } from "../white-block";
import { ErrorText } from "../error-text";

interface Props {
    className?: string
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {

    const { control } = useFormContext()

    return <WhiteBlock title="3. Aдрес доставки" className={className}>
        <div className="flex flex-col gap-5">
            <Controller
                control={control}
                name="address"
                render={({ field, fieldState }) => (
                    <>
                        <AdressInput onChange={field.onChange} />
                        {fieldState.error && <ErrorText text={fieldState.error.message as string} />}
                    </>
                )}
            />

            <FormTextarea
                className="text-base"
                placeholder="Комментарий к заказу"
                rows={5}
                name="comment"
            />
        </div>

    </WhiteBlock>
};