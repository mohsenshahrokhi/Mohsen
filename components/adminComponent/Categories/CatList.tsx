// 'use client'

// import React, { useState } from 'react'
// import EditNoteIcon from '@mui/icons-material/EditNote'
// import Accordion from '@mui/material/Accordion'
// import AccordionDetails from '@mui/material/AccordionDetails'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import Typography from '@mui/material/Typography'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import { TCategorySchema } from '@/ZSchemas'
// import { Box, Button, Fab, IconButton, Tooltip } from '@mui/material'
// import AddIcon from '@mui/icons-material/Add'
// import { getAllCategoryOption, getCategoryOption } from '@/lib/controllers/categoryOptionController'
// import queryString from 'query-string'
// import { getCategories } from '@/actions/category'
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'
// import Link from 'next/link'
// import CloseIcon from '@mui/icons-material/Close'
// import PreviewIcon from '@mui/icons-material/Preview'

// type Props = {
//     parentId: string
//     pathname: string
//     backUrl: string
//     parseSearchParams: string
// }

// async function getData(cId: string, accessToken: string) {

//     const params = {
//         parent: cId,
//         select: 'name'
//     }

//     const stringifyParams = queryString.stringify(params)

//     const { categories, success } = await getCategories({ stringifyParams, accessToken })

//     return categories as TCategorySchema[]
// }


// function CatList({ parentId, pathname, parseSearchParams }: Props) {

//     const router = useRouter()
//     const { data: session } = useSession({
//         required: true,
//         onUnauthenticated() {
//             router.push('/login')
//         },
//     })

//     const user = session?.user

//     const accessToken = user?.accessToken || ''
//     const [categories, setCategories] = useState<TCategorySchema[]>()
//     async function loadMore() {
//         const cats = await getData(parentId, accessToken!)
//         setCategories(cats)
//     }

//     function hideSubCats() {
//         setCategories([])
//     }

//     return (

//         <div className=' flex flex-col justify-between'>

//             {
//                 categories && categories?.length > 0 && <Box className=' flex justify-around border-b-2 items-center'>
//                     <p className=' font-xs text-lime-700 '>زیر شاخه ها</p>
//                     <Tooltip title="بستن زیر شاخه ها" placement="top">
//                         <Button
//                             onClick={hideSubCats}
//                         >
//                             <Fab color="secondary" size="small" aria-label="view">
//                                 <CloseIcon />
//                             </Fab>
//                         </Button>

//                     </Tooltip>
//                 </Box>
//             }
//             {
//                 categories && categories.map((category) => (
//                     <div className=' flex flex-col w-full p-2' key={category._id}>

//                         <Link
//                             className=' font-xs p-1'
//                             href={`${pathname}/${encodeURIComponent(category._id)}?${parseSearchParams}`}
//                         >
//                             {category.name}
//                         </Link>
//                     </div>
//                 ))
//             }
//             <div className=' flex w-full justify-between p-2'>

//                 <Tooltip title="اضافه کردن زیر شاخه" placement="top">
//                     <Link
//                         href={`/dashboard/siteSettings/addSetting/add_new_cat?parentId=${parentId}&${parseSearchParams}`}
//                     >
//                         {/* <Fab color="info" size="small" aria-label="add"> */}
//                         <AddIcon color="info" />
//                         {/* </Fab> */}
//                     </Link>
//                 </Tooltip>
//                 <Tooltip title="دیدن زیر شاخه ها" placement="top">
//                     <Button
//                         onClick={loadMore}
//                     >
//                         {/* <Fab color="secondary" size="small" aria-label="view"> */}
//                         <PreviewIcon color='secondary' />
//                         {/* </Fab> */}
//                     </Button>

//                 </Tooltip>
//             </div>
//         </div>
//     )
// }

// export default CatList

// /*  <div
//                             className=' flex justify-between items-center h-full w-full text-center border rounded-md p-3 border-gray-300'
//                             key={cat._id}
//                         >
//                             <Button
//                                 color='info'
//                                 variant='text'
//                                 className=' rounded-full py-2'
//                             >

//                                 {cat.name}

//                             </Button>
//                             <div
//                                 className=' flex gap-2'
//                             >
//                                 <Tooltip title="add" placement="top">
//                                     <Link
//                                         href={`${encodeURIComponent(parsed.parent)}/${encodeURIComponent(cat._id)}`}
//                                     >
//                                         <IconButton color="info" aria-label="add an alarm">
//                                             <AddIcon />
//                                         </IconButton>
//                                     </Link>
//                                 </Tooltip>
//                                 <Tooltip title="view" placement="top">

//                                     <IconButton color="secondary" aria-label="add an alarm">
//                                         <EditNoteIcon />
//                                     </IconButton>
//                                 </Tooltip>

//                             </div>
//                         </div> */