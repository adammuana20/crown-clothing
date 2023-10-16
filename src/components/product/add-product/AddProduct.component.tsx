import { ChangeEvent, FormEvent, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { v4 } from "uuid"

import FormInput from "../../form-input/FormInput.component"

import Button from "../../button/Button.component"

import { createProductStart } from "../../../store/categories/Category.action"
import { selectCategories, selectAddProductIsLoading } from "../../../store/categories/Category.selector"
import { selectProductError } from "../../../store/categories/Category.selector"

import { ProductContainer } from "./AddProduct.styles"


const defaultFormFields = {
    productName: '',
    category: '',
    description: '',
    price: '',
    image: null,
}

const AddProduct = () => {

    const [productForm, setProductForm] = useState(defaultFormFields)
    const categories = useSelector(selectCategories)
    const addProductIsLoading = useSelector(selectAddProductIsLoading)
    const error = useSelector(selectProductError)
    const dispatch = useDispatch()

    const { productName, category, description, price, image } = productForm

    const resetFormFields = () => {
        setProductForm(defaultFormFields)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (e.target instanceof HTMLInputElement) {
            // Handle input element (including file input)
            const inputElement = e.target as HTMLInputElement;
            const newValue = inputElement.files ? inputElement.files[0] : value;
            
            setProductForm({ ...productForm, [name]: newValue });
        } else if (e.target instanceof HTMLSelectElement) {
        // Handle select element
        setProductForm({ ...productForm, [name]: value });
        } else {
            // Handle textarea element
            setProductForm({ ...productForm, [name]: value });
        }
    }
    
    

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        function capitalizeEachWord(text: string) {
            const cleanedText = text.replace(/\s+/g, ' ').trim();
            const capsEachWordText = cleanedText.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');

            return capsEachWordText
        }
        
        
        if(image) {
            const productData = {id: v4() ,categoryTitle: category, productName: capitalizeEachWord(productName), imageBlob: image, description: description, price: parseFloat(price) }
            dispatch(createProductStart(productData))
            resetFormFields()
        }
    }

    const categoryElements = categories.map((category, i) => (
        <option value={category.title.toLowerCase()} key={i}>{category.title}</option>
    ))
    
    
    
    return (
        <ProductContainer>
            <form onSubmit={handleSubmit}>
                {error &&
                    <p>{error.message}</p>
                }
                <FormInput
                    label='Product Name'
                    inputOptions={{
                        type:'text',
                        onChange:handleChange,
                        name:'productName',
                        value:productName,
                        required:true
                    }}
                />
                <input type='file' name='image' onChange={handleChange} required/>
                <select
                    value={category}
                    onChange={handleChange}
                    name="category"
                    required
                >
                    <option value=''>Select Category</option>
                    {categoryElements}
                </select><br/><br/>
                <textarea 
                    placeholder="Description.." 
                    name="description" 
                    onChange={handleChange}
                    value={description}
                    required
                />
                <FormInput
                    label='Price'
                    inputOptions={{
                        type:'number',
                        onChange:handleChange,
                        name:'price',
                        value:price,
                        required:true,
                        step:.01,
                        min:1,
                    }}
                />
                <Button isLoading={addProductIsLoading} type='submit'>Add Product</Button>
            </form>
        </ProductContainer>
    )
}

export default AddProduct