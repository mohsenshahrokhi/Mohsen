import { Box, Button } from '@mui/material';
import React from 'react';
import Image from "next/image";
import { updateCategory } from '@/actions/category';
import HandleEnqueueSnackbar from '@/utils/HandleEnqueueSnackbar';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
function ControlledImage({ image, cat, property, stringifyParams }) {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        },
    });
    const user = session === null || session === void 0 ? void 0 : session.user;
    const accessToken = (user === null || user === void 0 ? void 0 : user.accessToken) || '';
    function handleDelete(catId, property, image) {
        const values = { ...cat };
        if (property === 'icon') {
            values.icon = '';
        }
        if (property === 'colorIcon') {
            values.colorIcon = '';
        }
        if (property === 'images') {
            const oldImg = [...cat.images];
            const filter = oldImg.filter(img => image !== img);
            values.images = filter;
        }
        updateCategory({ _id: catId, values, accessToken })
            .then((data) => {
            if (data.success === true) {
                HandleEnqueueSnackbar({ variant: 'success', msg: data.msg });
                router.push(`/dashboard/siteSettings/settingsProperties/${catId}?${stringifyParams}`);
            }
            else {
                HandleEnqueueSnackbar({ variant: 'error', msg: data.msg });
            }
        });
    }
    return (<Box component={'div'} className="flex flex-col justify-center items-center shadow-lg">

            <Box component={'div'} className="relative overflow-hidden flex flex-col justify-center items-center p-2 rounded-md">
                <Image src={`/uploads/${image}`} width="100" height="100" priority={true} alt={image} className="rounded-lg flex w-20 h-20"/>
                <Box component={'span'} className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,32%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100'><Box component={'span'} className='absolute left-0 top-0'>
                        <Button variant='contained' color='error' onClick={() => handleDelete(cat._id, property, image)}>حذف</Button>
                    </Box>
                </Box>
            </Box>
        </Box>);
}
export default ControlledImage;
//# sourceMappingURL=ControlledImage.js.map