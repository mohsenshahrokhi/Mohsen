import React from 'react'
import Link from 'next/link'
import Fab from '@mui/material/Fab'
import queryString from 'query-string'
import AddIcon from '@mui/icons-material/Add'
import UndoIcon from '@mui/icons-material/Undo'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { Accordion, AccordionSummary, Box, Button, IconButton, Tooltip } from '@mui/material'
// import CatList from '@/components/adminComponent/Categories/CatList'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { verifyJwt } from '@/lib/jwt'
import { getCategories } from '@/actions/category'
import CloseIcon from '@mui/icons-material/Close'
import PreviewIcon from '@mui/icons-material/Preview'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import HandleURL from '@/utils/HandleURL'
import BasicModal from '@/components/ui/BasicModal'
import { TCategorySchema } from '@/ZSchemas/CategorySchema'

type Props = {
    params: {
        id: string[] | string
    },
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getData(cId: string, accessToken: string) {

    const params = {
        parent: cId,
        populate: 'parent.name,author'
    }
    const stringifyParams = queryString.stringify(params)

    const { categories, success } = await getCategories({ stringifyParams, accessToken })

    return categories as TCategorySchema[]
}

async function Category({ params, searchParams }: Props) {

    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const verify = accessToken && verifyJwt(accessToken) || null

    const { id } = params

    const categories = await getData(id.slice(-1)[0], accessToken!)

    const stringifyParams = queryString.stringify(params)

    const parseSearchParams = queryString.stringify(searchParams)

    const { url, backUrl } = HandleURL(id)
    console.log('ss', url);
    // let url = ''

    // let backUrl = ''

    // // let u = ''

    // if (Array.isArray(id)) {
    //     const addId = [...id]
    //     // u = addId.join('/')
    //     if (id.length > 1) {
    //         url = ''
    //         backUrl = ''
    //         url = id.join('/')
    //         const copyUrl = [...id]
    //         copyUrl.pop()
    //         backUrl = copyUrl.join('/')
    //     } else {
    //         url = id[0]
    //     }
    // }
    // console.log('searchParams', u)

    const stringified = queryString.stringify({ parentCat: params.id.slice(-1) })

    return (
        <Box
            component="div"
            sx={{ m: '2px', width: '100%', justifyContent: 'center' }}
        >
            <Box
                className='flex w-full items-center justify-between'
                component="div"
                sx={{ m: '2px', width: '100%' }}
            >
                <Button
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    aria-label="add"
                >
                    <Link
                        href={`/dashboard/siteSettings/addSetting/add?${stringified}&callbackUrl=${url}`}
                    >
                        اضافه کردن ویژگی جدید
                        <AddIcon sx={{ ml: 1 }} />
                    </Link>
                </Button>
                <Button
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    aria-label="add"
                >
                    <Link
                        href={`/dashboard/siteSettings/${backUrl}?${parseSearchParams}`}

                    >
                        برگشت
                        <UndoIcon sx={{ ml: 1 }} />
                    </Link>
                </Button>
            </Box>
            <Box
                component={'div'}
                sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gap: 2,
                    m: 2,
                }}
            >
                {
                    <Box >
                        {categories.length > 0 && categories.map((cat: TCategorySchema) => (
                            <Box
                                key={cat._id}
                                className=' flex mb-2 w-full justify-between border rounded-md p-3 border-gray-300'>
                                {cat.name}

                                <Box className='flex gap-3'>

                                    <Tooltip title={`ویرایش ${cat.name}`} placement="top">
                                        <Link
                                            href={`/dashboard/siteSettings/addSetting/${encodeURIComponent(cat._id)}?${parseSearchParams}&callbackUrl=${url}`}
                                        >
                                            {/* <Fab color="error" size="small" aria-label="add"> */}
                                            <EditNoteIcon color="info" />
                                            {/* </Fab> */}
                                        </Link>
                                    </Tooltip>
                                    {/* <Tooltip title={`حذف ${cat.name}`} placement="top"> */}
                                    <BasicModal
                                        label={<CloseIcon />}
                                        disc='آیا از حذف این دسته بندی مطمئن هستید ؟'
                                        catId={cat._id}
                                        accessToken={accessToken}
                                        callbackUrl={url}
                                    />
                                    {/* <BasicModal /> */}
                                    {/* <Link
                                            href={`/dashboard/siteSettings/deleteSettings/${encodeURIComponent(cat._id)}?${parseSearchParams}&callbackUrl=${url}`}
                                        >
                                            <CloseIcon color="error" />
                                        </Link> */}
                                    {/* </Tooltip> */}

                                    <Tooltip title={`زیر شاخه های ${cat.name}`} placement="top">
                                        <Link
                                            href={`/dashboard/siteSettings/${url}/${encodeURIComponent(cat._id)}?${parseSearchParams}&callbackUrl=${url}`}
                                        >
                                            {/* <Fab color="info" size="small" aria-label="add"> */}
                                            <PreviewIcon color='info' />
                                            {/* </Fab> */}
                                        </Link>
                                    </Tooltip>

                                    <Tooltip title={`خواص ${cat.name}`} placement="top">
                                        <Link
                                            href={`/dashboard/siteSettings/settingsProperties/${encodeURIComponent(cat._id)}?${parseSearchParams}&callbackUrl=${url}`}
                                        >
                                            {/* <Fab color="info" size="small" aria-label="add"> */}
                                            <ZoomOutMapIcon color='info' />
                                            {/* </Fab> */}
                                        </Link>
                                    </Tooltip>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Category

{/* <Accordion key={cat._id} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel-${cat._id}-bh-content`}
                                    id={`panel-${cat._id}-bh-header`}
                                >
                                    <Box className=' flex w-full justify-between items-center ml-5'>

                                        <Typography sx={{ flexShrink: 0 }}>
                                            {cat.name}
                                        </Typography>

                                        <Box className=' flex gap-3'>
                                            <Tooltip title={`حذف ${cat.name}`} placement="top">
                                                <Link
                                                    href={`/dashboard/siteSettings/deleteSettings/${encodeURIComponent(cat._id)}?${parseSearchParams}`}
                                                >
                          
                                                    <CloseIcon color="error" />
                                              
                                                </Link>
                                            </Tooltip>

                                            <Tooltip title={`ویرایش ${cat.name}`} placement="top">
                                                <Link
                                                    href={`/dashboard/siteSettings/addSetting/${encodeURIComponent(cat._id)}?${parseSearchParams}`}
                                                >
                     
                                                    <EditNoteIcon color='info' />
                                                   
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title={`زیر شاخه های ${cat.name}`} placement="top">
                                                <Link
                                                    href={`/dashboard/siteSettings/${url}/${encodeURIComponent(cat._id)}?${parseSearchParams}`}
                                                >
                           
                                                    <PreviewIcon color='info' />
                                                 
                                                </Link>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        component={'div'}
                                    >
                                        <CatList
                                            backUrl={backUrl}
                                            pathname={`/dashboard/siteSettings/${url}`}
                                            parentId={`${cat._id}`}
                                            parseSearchParams={parseSearchParams}
                                        />
                                    </Box>
                                </AccordionDetails>
                            </Accordion> */}