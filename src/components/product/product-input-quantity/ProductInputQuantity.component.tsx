import { ChangeEvent, FC } from "react"
import { FiMinus, FiPlus } from "react-icons/fi"

import { ProductInputQuantityContainer, ButtonContainer } from "./ProductInputQuantity.styles"

type ProductInputQuantityProps = {
    value: string | number;
    onChangeQty: (value: string | number) => void;
    onChangeBlur: (value: string) => void;
    addQtyHandler: () => void;
    decQtyHandler: () => void;
}

const ProductInputQuantity: FC<ProductInputQuantityProps> = ({ value, onChangeQty, onChangeBlur, addQtyHandler, decQtyHandler }) => {

    const handleChangeQty = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        
        onChangeQty(value)
    }

    const handleChangeBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        
        onChangeBlur(value)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isNaN(parseInt(e.key))) {
          e.preventDefault();
        }
    };


    return(
        <ProductInputQuantityContainer>
            <ButtonContainer onClick={decQtyHandler} aria-label="minus-button">
                <FiMinus />
            </ButtonContainer>
            <input type='text' name='qty' value={value} onChange={handleChangeQty} onBlur={handleChangeBlur} onKeyPress={handleKeyPress}  />
            <ButtonContainer onClick={addQtyHandler} aria-label="add-button">
                <FiPlus />
            </ButtonContainer>
        </ProductInputQuantityContainer>
    )
}

export default ProductInputQuantity