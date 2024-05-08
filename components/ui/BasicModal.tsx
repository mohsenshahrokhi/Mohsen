'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'
import { late } from 'zod';
import { deleteCat } from '@/actions/category';
import HandleEnqueueSnackbar from '@/utils/HandleEnqueueSnackbar';
import { useRouter } from 'next/navigation';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    openModal?: boolean
    label: string
    disc: string
    catId: string
    accessToken: string | undefined
}

export default function BasicModal({ openModal, label, disc, catId, accessToken }: Props) {

    const router = useRouter()
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    React.useEffect(() => {
        openModal ? setOpen(true) : setOpen(false)
    }, [openModal])

    function deleteCategory() {

        React.startTransition(() => {

            deleteCat({ id: catId, accessToken })
                .then((data) => {
                    console.log(data)

                    if (data.success === true) {

                        HandleEnqueueSnackbar({ variant: 'success', msg: ' data.msg' })

                        // parent ?
                        //     router.push(`/dashboard/siteSettings/`) :
                        //     router.push(`/dashboard/siteSettings`)
                    } else {

                        HandleEnqueueSnackbar({ variant: 'error', msg: 'data.msg' })
                    }

                })
        })


    }

    return (
        <Box>
            <Button
                variant='contained'
                onClick={handleOpen}
                color='warning'
            >
                {label}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography className=' flex text-xs' id="modal-modal-title" component="p">
                        {disc}
                    </Typography>
                    <Typography className=' flex justify-between' id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button
                            variant='contained'
                            color='error'
                            size='small'
                            onClick={deleteCategory}
                        >بله حذف شود</Button>
                        <Button
                            variant='contained'
                            size='small'
                            onClick={handleClose}
                        >انصراف</Button>
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
}
