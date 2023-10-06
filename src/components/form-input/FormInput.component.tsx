import { InputHTMLAttributes, FC } from 'react'

import { FormInputLabel, Input, Group } from './FormInput.styles'

type FormInputProps = {
    label: string;
    inputOptions: {
        type: string;
        onChange: Function;
        name: string;
        value: string;
        minLength?: string;
        required: boolean;
    }
} & InputHTMLAttributes<HTMLInputElement>



const FormInput: FC<FormInputProps> = ({ label, ...inputOptions }) => {
    return (
        <Group>
        <Input {...inputOptions} />
        {
            label && (
                    <FormInputLabel shrink={Boolean(inputOptions.value && typeof inputOptions.value === 'string' && inputOptions.value.length)}>
                        { label }
                    </FormInputLabel>
            )
        }
        </Group>
    )
}

export default FormInput