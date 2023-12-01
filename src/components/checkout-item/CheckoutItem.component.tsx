import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import ProductInputQuantity from '../product/product-input-quantity/ProductInputQuantity.component'

import { CartItem as TCartItem } from '../../store/cart/Cart.types'

import { CheckoutItemContainer, ImageContainer, BaseSpan, ProductInputContainer, RemoveItem, ProductDetailsContainer, ProductLink } from './CheckoutItem.styles'
import { removeItemFromCartStart, updateQtyItemFromCartStart } from '../../store/cart/Cart.action'
import { useToast } from '../../contexts/Toast.context'

// import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/Cart.action'

type CheckoutItemProps = {
    cartItem: TCartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    const dispatch = useDispatch()
    const { showToast } = useToast()

    const { name, imageUrl, quantity, price, id, category } = cartItem

    const [qty, setQty] = useState<string | number>(quantity)
    const [isUpdating, setIsUpdating] = useState(false)

    const onChangeInput = (value: string | number) => {
        if(Number(value) > 10) {
            showToast('warning', 'Up to 10 max input only')
            setQty(10);
            return
        }
        setQty(value)
    }

    const onChangeBlur = (value: string) => {
        if(!value) {
            setIsUpdating(true)
            setQty(quantity)
            dispatch(updateQtyItemFromCartStart(id, quantity, setIsUpdating, showToast))
            return
        } else if(Number(value) === 0) {
            setIsUpdating(true)
            setQty(quantity)
            dispatch(updateQtyItemFromCartStart(id, quantity, setIsUpdating, showToast))
            return
        }

        setIsUpdating(true)
        dispatch(updateQtyItemFromCartStart(id, Number(qty), setIsUpdating, showToast))
    }

    const addQtyHandler = () => {
        const newQuantity = Number(qty) + 1

        if(Number(qty) >= 10) {
            showToast('warning', 'Up to 10 max input only')
            setQty(10);
            return
        }

        setIsUpdating(true)
        dispatch(updateQtyItemFromCartStart(id, newQuantity, setIsUpdating, showToast))
        setQty(newQuantity);
    }

    const decQtyHandler = () => {
        const newQuantity = Number(qty) - 1

        if(Number(qty) <= 1) {
            setQty(1);
            return
        }

        setIsUpdating(true)
        dispatch(updateQtyItemFromCartStart(id, newQuantity, setIsUpdating, showToast))
        setQty(newQuantity);
    }
    
    const clearItemHandler = () => {
        setIsUpdating(true)
        dispatch(removeItemFromCartStart(id, setIsUpdating, showToast))
    }

    return (
        <CheckoutItemContainer $isUpdating={isUpdating}>
            <ImageContainer>
                <ProductLink to={`/shop/${category}/${id}`}>
                    <img src={imageUrl} alt={name} />
                </ProductLink>
            </ImageContainer>
            <ProductDetailsContainer>
                <ProductLink to={`/shop/${category}/${id}`}>
                    {name}
                </ProductLink>
                <ProductInputContainer>
                    <ProductInputQuantity value={qty} onChangeQty={onChangeInput} onChangeBlur={onChangeBlur} addQtyHandler={addQtyHandler} decQtyHandler={decQtyHandler} />
                </ProductInputContainer>
                <BaseSpan>${price}</BaseSpan>
                <BaseSpan>${quantity * price}</BaseSpan>
                <RemoveItem onClick={clearItemHandler}>&#10005;</RemoveItem>
            </ProductDetailsContainer>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem