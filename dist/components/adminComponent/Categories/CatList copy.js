'use client';
import React from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Fab, Link, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
function CatList({ categories, parsed }) {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => async (event, isExpanded) => {
        // const res = await getAllCategoryOption('')
        // console.log('res', res);
        // const catOptions = await getData(panel)
        // console.log('catOptions', catOptions);
        setExpanded(isExpanded ? panel : false);
    };
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
        {categories.length > 0 && categories.map((cat) => (<Accordion key={cat._id} expanded={expanded === `${encodeURIComponent(cat._id)}`} onChange={handleChange(`${encodeURIComponent(cat._id)}`)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${cat._id}-bh-content`} id={`panel-${cat._id}-bh-header`}>
                    <Typography sx={{ flexShrink: 0 }}>
                        {cat.name}
                    </Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Box component={'div'}>
                        <div className=' flex justify-between'>
                            <Tooltip title="add" placement="top">
                                <Link href={`${parsed}/${encodeURIComponent(cat._id)}`}>
                                    <Fab color="info" size="small" aria-label="add">
                                        <AddIcon />
                                    </Fab>
                                </Link>
                            </Tooltip>
                            <Tooltip title="view" placement="top">
                                <Link href={`${parsed}/${encodeURIComponent(cat._id)}`}>
                                    <Fab color="secondary" size="small" aria-label="add">
                                        <EditNoteIcon />
                                    </Fab>
                                </Link>

                            </Tooltip>
                        </div>
                    </Box>
                </AccordionDetails>
            </Accordion>))}
    </Box>);
}
export default CatList;
//# sourceMappingURL=CatList%20copy.js.map