'use client'

import React, { startTransition, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from "next/image"
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2'
import { zodResolver } from "@hookform/resolvers/zod"

import { Box, Button, Checkbox, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material'

import { FormControl } from '@mui/material';
import { title } from 'process'
import queryString from 'query-string'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import HandleEnqueueSnackbar from '@/utils/HandleEnqueueSnackbar'
import { RegisterProductSchema, TProductSchema, TRegisterProductSchema } from '@/ZSchemas/ProductSchema'

type Props = {
    add: boolean
    searchParams: string
    productInfo: TProductSchema
}

function ProductForm({ add, searchParams, productInfo }: Props) {

    const router = useRouter()
    const [age, setAge] = useState('');
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const userId = session?.user._id

    const accessToken = session?.user && session?.user?.accessToken || ''

    const [isPending, startTransition] = useTransition()

    const {
        category: editCategory,
        description: editDescription,
        images: editImage,
        price: editPrice,
        discount: editDiscount,
        propertys: editPropertys,
        ratings: editRatings,
        recipe: editRecipe,
        reviews: editReviews,
        seller: editSeller,
        author: editAuthor,
        slug: editSlug,
        title: editTitle,
        stock: editStock,
        _id,
    } = productInfo


    const form = useForm<TRegisterProductSchema>({
        resolver: zodResolver(RegisterProductSchema),
        defaultValues: {
            // category: editCategory || '',
            // description: editDescription || '',
            // images: editImage || [],
            // price: editPrice || 0,
            // discount: editDiscount || '',
            // propertys: editPropertys || [{ title: '', value: { id: '', name: '' } }],
            // ratings: editRatings || '',
            // recipe: editRecipe || '',
            // reviews: editReviews || [],
            // seller: editSeller,
            // author: editAuthor,
            slug: editSlug || '',
            title: editTitle || '',
            stock: editStock || '',

        }
    })

    if (form === undefined) {
        return <h3>loading...</h3>
    }

    const onSubmit = (values: TRegisterProductSchema | TProductSchema) => {
        // form.setValue('author', user?._id)
        // values.author = user?._id
        add && startTransition(() => {
            // form.setValue('parent', parentId)
            // // values.parent = parentId || ''
            // parentId ? values.parent = parentId || '' : delete values.parent
            console.log(values);

            // createCategory({ values, accessToken })
            //     .then((data) => {
            //         console.log(data)

            //         if (data.success === true) {

            //             HandleEnqueueSnackbar({ variant: 'success', msg: data.msg })

            //             // parent ?
            //             //     router.push(`/dashboard/siteSettings/`) :
            //             //     router.push(`/dashboard/siteSettings`)
            //         } else {

            // HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })
            //         }

            //     })
        })
        !add && startTransition(() => {
            // updateCategory({ _id: catId, values, accessToken })
            //     .then((data) => {
            //         console.log(data)

            //         if (data.success === true) {

            //             HandleEnqueueSnackbar({ variant: 'success', msg: data.msg })

            //             parent ?
            //                 router.push(`/dashboard/siteSettings/`) :
            //                 router.push(`/dashboard/siteSettings`)
            //         } else {

            //             HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })
            //         }

            //     })
        })
    }



    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <>


            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="title">نام محصول</InputLabel>
                            <OutlinedInput
                                id='title'
                                // inputComponent={TextMaskCustom as any}
                                {...field}
                                autoComplete='title'
                                disabled={isPending}
                                // onInvalid={true}
                                error={fieldState.error ? true : false}
                                type={'text'}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            // onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="start"
                                        >
                                            {/* {<SendToMobileRoundedIcon />} */}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="نام محصول"
                                fullWidth
                            />
                            {/* <Input
                                value={values.textmask}
                                onChange={handleChange}
                                name="textmask"
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustom as any}
                            /> */}
                            <FormHelperText
                                component={'div'}
                                sx={{
                                    color: 'error.main',
                                }}
                            >
                                {fieldState.error?.message ?? ''}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl
                            component="div"
                            fullWidth
                            sx={{ my: 1 }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="price">قیمت</InputLabel>
                            <OutlinedInput
                                id='price'
                                {...field}
                                autoComplete='price'
                                disabled={isPending}
                                error={fieldState.error ? true : false}
                                type={'number'}
                                label="قیمت"
                                fullWidth
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="start"
                                        >
                                            {/* {<EmailRoundedIcon />} */}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText
                                component={'div'}
                                sx={{
                                    color: 'error.main',
                                }}
                            >
                                {fieldState.error?.message ?? ''}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="type"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                        <FormControlLabel
                            label="فعال کردن"
                            labelPlacement='start'
                            control={
                                <Switch
                                    onChange={onChange}
                                    checked={value}
                                    {...{ inputProps: { 'aria-label': 'Switch demo' } }}
                                    color="info"
                                />
                            }
                        />
                    )}
                />

                <Controller
                    name="type"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                        <FormControlLabel
                            label="فعال کردن"
                            labelPlacement='start'
                            control={<>

                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </>
                                // <Switch
                                //     onChange={onChange}
                                //     checked={value}
                                //     {...{ inputProps: { 'aria-label': 'Switch demo' } }}
                                //     color="info"
                                // />
                            }
                        />
                    )}
                />

                <Button
                    type='submit'
                    disabled={isPending}
                    variant='contained'
                    color='info'
                    sx={{ width: '100%' }}
                >
                    {add ? (
                        <Box component={'span'}>ثبت</Box>
                    ) : (
                        <Box component={'span'}>ویرایش</Box>
                    )}
                </Button>
            </form>
        </>

    )
}

export default ProductForm