'use client';
import EditProductForm from '@/components/adminComponent/Products/EditProductForm';
function AddProduct() {
    const productInfo = {};
    return (<div className='flex relative flex-col w-full'>
            <EditProductForm productInfo={productInfo}/>
        </div>);
}
export default AddProduct;
//# sourceMappingURL=page.js.map