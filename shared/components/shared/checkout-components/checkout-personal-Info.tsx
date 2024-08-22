import { FormInput } from "../form-components";
import { WhiteBlock } from "../white-block";

interface Props {
    className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
    return <WhiteBlock title="2. Персональная информация" className={className}>
        <div className="grid grid-cols-2 gap-5">
            <FormInput name="firstName" placeholder="Имя" className="text-base" />
            <FormInput name="lastName" placeholder="Фамилия" className="text-base" />
            <FormInput name="email" placeholder="E-mail" className="text-base" />
            <FormInput name="phone" placeholder="Телефон" className="text-base" />
        </div>

    </WhiteBlock>;
};