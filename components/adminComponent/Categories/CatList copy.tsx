'use client'

import React from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TCategorySchema } from '@/ZSchemas'
import { Box, Fab, IconButton, Link, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { getAllCategoryOption, getCategoryOption } from '@/lib/controllers/categoryOptionController'

type Props = {
    categories: TCategorySchema[],
    parsed: string
}

function CatList({ categories, parsed }: Props) {

    const [expanded, setExpanded] = React.useState<string | false>(false)

    const handleChange = (panel: string) => async (event: React.SyntheticEvent, isExpanded: boolean) => {
        // const res = await getAllCategoryOption('')
        // console.log('res', res);
        // const catOptions = await getData(panel)
        // console.log('catOptions', catOptions);
        setExpanded(isExpanded ? panel : false)
    }

    //  const handleChange = async (values: string) => {
    //             // console.log(values);
    //             const variant = 'success'
    //             // startTransition(async () => {
    //             const res = await await getAllCategoryOption('')
    //             console.log(res);
    //             setExpanded(isExpanded ? values : false)
    //             // if (res) enqueueSnackbar('Password Changed Success', { variant })
    //             // })

    //∫ }

    return (<Box>
        {categories.length > 0 && categories.map((cat: TCategorySchema) => (
            <Accordion key={cat._id} expanded={expanded === `${encodeURIComponent(cat._id)}`} onChange={handleChange(`${encodeURIComponent(cat._id)}`)}>
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
                                    href={`${parsed}/${encodeURIComponent(cat._id)}`}
                                >
                                    <Fab color="info" size="small" aria-label="add">
                                        <AddIcon />
                                    </Fab>
                                </Link>
                            </Tooltip>
                            <Tooltip title="view" placement="top">
                                <Link
                                    href={`${parsed}/${encodeURIComponent(cat._id)}`}
                                >
                                    <Fab color="secondary" size="small" aria-label="add">
                                        <EditNoteIcon />
                                    </Fab>
                                </Link>

                            </Tooltip>
                        </div>
                    </Box>
                </AccordionDetails>
            </Accordion>
        ))}
    </Box>
    )
}

export default CatList

/*  <div
                            className=' flex justify-between items-center h-full w-full text-center border rounded-md p-3 border-gray-300'
                            key={cat._id}
                        >
                            <Button
                                color='info'
                                variant='text'
                                className=' rounded-full py-2'
                            >

                                {cat.name}

                            </Button>
                            <div
                                className=' flex gap-2'
                            >
                                <Tooltip title="add" placement="top">
                                    <Link
                                        href={`${encodeURIComponent(parsed.parent)}/${encodeURIComponent(cat._id)}`}
                                    >
                                        <IconButton color="info" aria-label="add an alarm">
                                            <AddIcon />
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                                <Tooltip title="view" placement="top">

                                    <IconButton color="secondary" aria-label="add an alarm">
                                        <EditNoteIcon />
                                    </IconButton>
                                </Tooltip>

                            </div>
                        </div> */