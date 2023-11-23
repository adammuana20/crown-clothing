import { InputHTMLAttributes, FC } from 'react'

import { FormInputLabel, Input, Group } from './FormInput.styles'

type FormInputProps = {
    label?: string;
    inputOptions: {
        type: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        name: string;
        value: string;
        minLength?: number | 0;
        required?: boolean;
        'data-search'?: boolean;
        placeholder?: string;
        step?: number;
        min?: number;
        autoComplete?: string;
        ref?: React.RefObject<HTMLInputElement>;
    }
} & InputHTMLAttributes<HTMLInputElement>



const FormInput: FC<FormInputProps> = ({ label, inputOptions }) => {
    return (
        <Group data-search={inputOptions['data-search']}>
        <Input {...inputOptions} />
        {
            label && (
                <FormInputLabel $shrink={Boolean(inputOptions['data-search'] ? false : inputOptions.value && typeof inputOptions.value === 'string' && inputOptions.value.length)}>
                    { label }
                </FormInputLabel>
            )
        }
        </Group>
    )
}

export default FormInput