import AddProduct from "../../components/product/add-product/AddProduct.component"
import { requireAuth } from "../../utils/loaders/Loaders.utils";

export async function loader(currentUser) {
    return await requireAuth(currentUser)
}

const Product = () => {

    return (
        <AddProduct/>
    )
}

export default Product