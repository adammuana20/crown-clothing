import { FormInputLabel, Input, Group } from './FormInput.styles'
import { StyleSheetManager } from 'styled-components'

const FormInput = ({ label, inputOptions }) => {
    return (
        <Group>
        <Input {...inputOptions} />
        {
            label && (
                <StyleSheetManager shrink={inputOptions.value.length}>
                    <FormInputLabel>{ label }</FormInputLabel>
                </StyleSheetManager>
            )
        }
        </Group>
    )
}

export default FormInput