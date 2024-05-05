import Link from 'next/link'
import Fab from '@mui/material/Fab'
import queryString from 'query-string'
import { headers } from "next/headers"
import { TCategorySchema } from '@/ZSchemas'
import AddIcon from '@mui/icons-material/Add'
import UndoIcon from '@mui/icons-material/Undo'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { Accordion, AccordionSummary, Box, Button, IconButton, Tooltip } from '@mui/material'
import CatList from '@/components/adminComponent/Categories/CatList'
import { getAllCategory } from '@/lib/controllers/categoryController'
import { getAllCategoryOption } from '@/lib/controllers/categoryOptionController'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


type Props = {
    params: {
        id: string[] | string
    }
}

async function getData(cId: string) {
    // console.log('cId:', cId)
    const params = {
        parent: cId,
        populate: 'parent.name,author.username'
    }
    const stringifyParams = queryString.stringify(params)
    // console.log('stringifyParams', stringifyParams)

    const categoryChild = await getAllCategory(stringifyParams)
    // const categoryChild = await getAllCategory(`parent=${cId}&populate=categories.name,categories.slug`)
    // console.log('categoryChild', categoryChild)

    return categoryChild as TCategorySchema[]

}

async function Category({ params }: Props) {

    // const categories: TCategorySchema[] = []
    const categories = await getData(params.id.slice(-1)[0])
    console.log('categoryChild', categories)
    console.log('params:', params);

    // const [expanded, setExpanded] = React.useState<string | false>(false)

    const handleChange = (panel: string) => async (event: React.SyntheticEvent, isExpanded: boolean) => {
        // const res = await getAllCategoryOption('')
        // console.log('res', res);
        // const catOptions = await getData(panel)
        // console.log('catOptions', catOptions);
        // setExpanded(isExpanded ? panel : false)
    }

    const {
        id
    } = params

    let url = ''
    let parentId = ''

    console.log('params.idd', id)

    if (Array.isArray(id)) {
        if (id.length > 1) {
            parentId = id.pop() || ''
            url = id.join('/')
        }
    }

    const headersList = headers()

    const { BASE_URL } = process.env

    const pathname = headersList.get("referer")?.replace(BASE_URL!, '')


    const stringified = queryString.stringify({ id: params.id.slice(-1) })

    console.log('params.id.slice(-1)[0]', stringified, ';;')

    return (
        <Box
            component="div"
            sx={{ m: '2px', width: '100%', justifyContent: 'center' }}
        >
            <Fab
                size="medium"
                variant="extended"
                color="secondary"
                aria-label="add"
            >
                <Link
                    href={`/dashboard/siteSettings/addSetting?${stringified}`}
                >
                    اضافه کردن ویژگی جدید
                    <AddIcon sx={{ ml: 1 }} />
                </Link>
            </Fab>
            <Fab
                size="medium"
                variant="extended"
                color="secondary"
                aria-label="add"
            >
                <Link
                    href={`/dashboard/siteSettings/${url}`}
                >
                    برگشت
                    <UndoIcon sx={{ ml: 1 }} />
                </Link>
            </Fab>
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
                    // categories.map((category) => (
                    <div >
                        {categories.length > 0 && categories.map((cat: TCategorySchema) => (
                            <Accordion key={cat._id} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel-${cat._id}-bh-content`}
                                    id={`panel-${cat._id}-bh-header`}
                                >
                                    <Typography sx={{ flexShrink: 0 }}>
                                        {cat.name}
                                    </Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        component={'div'}
                                    >
                                        <div className=' flex justify-between'>
                                            <Tooltip title="add" placement="top">
                                                <Link
                                                    href={`/dashboard/siteSettings/${url}/${encodeURIComponent(cat._id)}`}
                                                >
                                                    <Fab color="info" size="small" aria-label="add">
                                                        <AddIcon />
                                                    </Fab>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="view" placement="top">
                                                <Link
                                                    href={`/dashboard/siteSettings/${url}/${encodeURIComponent(cat._id)}`}
                                                >
                                                    <Fab color="secondary" size="small" aria-label="view">
                                                        <EditNoteIcon />
                                                    </Fab>
                                                </Link>

                                            </Tooltip>
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                    // ))
                    // categories && <CatList
                    //     parsed={`/dashboard/siteSettings/${url}`}
                    //     categories={categories}
                    // />
                }
            </Box>
        </Box>
    )
}

export default Category