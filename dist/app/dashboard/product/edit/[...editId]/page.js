import { getPBy } from '@/actions/product';
import queryString from 'query-string';
async function getData(pId, accessToken) {
    const params = {
        _id: pId,
        populate: 'parent.name,author'
    };
    const stringifyParams = queryString.stringify(params);
    const { product } = await getPBy(stringifyParams);
    return product;
}
async function EditOnProduct({ params }) {
    return (<div className='flex flex-col w-full border rounded-md shadow-md p-10 my-2'>
            {/* <ProductForm productInfo={product} /> */}
        </div>);
}
export default EditOnProduct;
//# sourceMappingURL=page.js.map