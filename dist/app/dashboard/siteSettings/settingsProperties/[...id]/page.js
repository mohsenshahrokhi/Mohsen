import { getCBy, getCategories } from '@/actions/category';
import { Box } from '@mui/material';
import queryString from 'query-string';
import React from 'react';
import PropertiesDetile from '@/components/adminComponent/Categories/PropertiesDetile';
async function getData(catId, accessToken) {
    const params = {
        parent: catId,
        // populate: 'icon.url,colorIcon.url'
    };
    const stringifyParams = queryString.stringify(params);
    const exist = await getCategories({ stringifyParams, accessToken });
    return exist;
}
async function getCatData(catId) {
    const params = {
        _id: catId
    };
    const stringifyParams = queryString.stringify(params);
    const category = await getCBy(stringifyParams);
    return category;
}
async function CatProperties({ params, searchParams }) {
    const stringifyParams = queryString.stringify(searchParams);
    const { category } = await getCatData(params.id.slice(-1)[0]);
    return (<Box className='w-full items-center justify-between'>
            <Box className=' flex flex-col w-full items-center justify-center'>
                <Box component={'div'} className=' flex flex-col w-full justify-start items-center p-2 mb-4'>
                    <Box component={'span'} className=' flex w-full items-center justify-center my-4'>
                        {category.name}
                    </Box>
                    <PropertiesDetile category={category} stringifyParams={stringifyParams}/>
                </Box>
            </Box>
        </Box>);
}
export default CatProperties;
//# sourceMappingURL=page.js.map