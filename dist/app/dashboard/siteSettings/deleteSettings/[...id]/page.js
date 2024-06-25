import { getCBy, getCategories } from '@/actions/category';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BasicModal from '@/components/ui/BasicModal';
import { Box, Button } from '@mui/material';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import queryString from 'query-string';
import React from 'react';
async function getData(catId, accessToken) {
    const params = {
        parent: catId
    };
    const stringifyParams = queryString.stringify(params);
    const exist = await getCategories({ stringifyParams, accessToken });
    return exist;
}
async function getCatData(catId) {
    const params = {
        parent: catId
    };
    const stringifyParams = queryString.stringify(params);
    const category = await getCBy(stringifyParams);
    return category;
}
async function DeleteCat({ params, searchParams }) {
    const session = await getServerSession(authOptions);
    const accessToken = session === null || session === void 0 ? void 0 : session.user.accessToken;
    // const verify = accessToken && verifyJwt(accessToken) || null
    // const categories: TCategorySchema[] = []
    // const categories = await getData(params.id.slice(-1)[0], accessToken!)
    const parseSearchParams = queryString.stringify(searchParams);
    const { success } = await getData(params.id.slice(-1)[0], accessToken);
    const { category } = await getCatData(params.id.slice(-1)[0]);
    return (<Box className='w-full items-center justify-between'>

            {success ?
            <Box className=' flex w-full items-center justify-between'>
                    <p>
                        این دسته بندی دارای زیر دسته است قابل پاک کردن نیست ابتدا باید تمام زیر دسته ها پاک شوند !
                    </p>
                    <Button variant='contained'>
                        <Link href={`/dashboard/siteSettings/${category.parent}?${parseSearchParams}`}>
                            برگشت
                        </Link>
                    </Button>
                </Box>
            :
                <Box className=' flex flex-col w-full items-center justify-center'>
                    <p className=' flex w-full justify-start items-center p-2 mb-4'>
                        شما در حال پاک کردن دسته بندی {category.name} هستید !
                    </p>
                    <Box className='flex w-full justify-around items-center'>
                        <BasicModal label='بله حذف شود' disc='آیا از حذف این دسته بندی مطمئن هستید ؟' catId={category._id} accessToken={accessToken}/>
                        <Button variant='contained'>
                            <Link href={`/dashboard/siteSettings/${category.parent}?${parseSearchParams}`}>
                                {success ? 'برگشت' : 'انصراف'}
                            </Link>
                        </Button>
                    </Box>
                </Box>}
        </Box>);
}
export default DeleteCat;
//# sourceMappingURL=page.js.map