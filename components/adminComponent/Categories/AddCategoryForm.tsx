'use client'

import { createCategory, updateCategory } from "@/actions/category"
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, Box, Button, Fab, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Switch } from "@mui/material"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, MouseEventHandler, useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add'
import queryString from "query-string"
import { HiXMark } from "react-icons/hi2"
import { RegisterCategorySchema, TCategorySchema, TRegisterCategorySchema } from "@/ZSchemas/CategorySchema"

type Props = {
    cat?: TCategorySchema
    parentId: string
    searchParams: string
    callbackUrl: string
}

function AddCategoryForm({ cat, parentId, callbackUrl }: Props) {

    const router = useRouter()

    const [isPending, startTransition] = useTransition()

    const [property, setProperty] = useState<{ name: string, values: string }[]>([])

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const user = session?.user

    const accessToken = user?.accessToken || ''

    const form = useForm<TRegisterCategorySchema>({
        resolver: zodResolver(RegisterCategorySchema),
        defaultValues: {
            name: '',
            latinName: '',
            slug: '',
            icon: '',
            type: false,
            parent: '',
            propertys: property
        }
    })

    const catId = cat?._id

    // console.log('defaultValues', form.formState.defaultValues);
    console.log('callbackUrl', callbackUrl);

    const onSubmit = (values: TRegisterCategorySchema): void => {
        form.setValue('author', user?._id)
        values.author = user?._id
        startTransition(() => {
            form.setValue('parent', parentId)
            parentId ? values.parent = parentId || '' : delete values.parent
            values.propertys = property
            console.log('form', values);

            createCategory({ values, accessToken })

                .then((data) => {

                    if (data.success === true) {

                        HandleEnqueueSnackbar({ variant: 'success', msg: data.msg })
                        router.push(`/dashboard/siteSettings/${callbackUrl}`)
                    } else {

                        HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })

                    }

                })
        })

    }

    function addProperty(p: { name: string, values: string }): void {
        const oldP = [...property]
        oldP.push(p)
        setProperty(oldP)
        form.formState.defaultValues?.propertys?.push(p)

    }

    function deleteProperty(index: number): void {
        const oldP = [...property]
        oldP.splice(index, 1)
        setProperty(oldP)
        form.formState.defaultValues?.propertys?.splice(index, 1)

    }

    function handlePropertyName(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void {
        const p = e.target.value
        const oldP = [...property]
        oldP[index].name = p
        setProperty(oldP)
    }

    function handlePropertyValues(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void {
        const p = e.target.value
        const oldP = [...property]
        oldP[index].values = p
        setProperty(oldP)
    }

    return (
        <Box
            component="div"
            sx={{ m: '2px', width: '100%', justifyContent: 'center' }}
        >
            <Box
                component={'div'}
                sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gap: 2,
                    width: '100%'
                }}
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                                <InputLabel htmlFor="name">نام دسته بندی</InputLabel>
                                <OutlinedInput
                                    id='name'
                                    // inputComponent={TextMaskCustom as any}
                                    {...field}
                                    autoComplete='name'
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
                                    label="نام دسته بندی"
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
                        name="latinName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormControl
                                component="div"
                                fullWidth
                                sx={{ my: 1 }}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="latinName">نام لاتین دسته بندی</InputLabel>
                                <OutlinedInput
                                    id='latinName'
                                    {...field}
                                    autoComplete='name'
                                    disabled={isPending}
                                    error={fieldState.error ? true : false}
                                    type={'text'}
                                    label="نام لاتین دسته بندی"
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

                    {
                        property.map((p, index) => (
                            <Box
                                className=' flex gap-3 mb-3 justify-start items-center'
                                key={index}
                            >
                                <FormControl
                                    component="div"
                                    className=" flex p-0 m-0"
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor={`propertyName${index}`}>نام خاصیت</InputLabel>
                                    <OutlinedInput
                                        id={`propertyName${index}`}
                                        autoComplete='name'
                                        value={p.name}
                                        disabled={isPending}
                                        type={'text'}
                                        label="نام خاصیت"
                                        onChange={e => handlePropertyName(e, index)}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <IconButton
                                                    aria-label="delete"
                                                    className=" flex p-0 m-0"
                                                    disabled={isPending}
                                                    color='error'
                                                    onClick={() => deleteProperty(index)}
                                                    edge="start"
                                                >
                                                    {<HiXMark />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl
                                    component="div"
                                    className=" flex h-full p-0 m-0"
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor={`propertyVal${index}`}>مقدار خاصیت</InputLabel>
                                    <OutlinedInput
                                        id={`propertyVal${index}`}
                                        autoComplete='name'
                                        disabled={isPending}
                                        value={p.values}
                                        type={'text'}
                                        label="مقدار خاصیت"
                                        onChange={e => handlePropertyValues(e, index)}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="start"
                                                >

                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                            </Box>
                        ))
                    }
                    <Button
                        type='button'
                        disabled={isPending}
                        variant='contained'
                        color='primary'
                        sx={{ width: '100%' }}
                        onClick={() => addProperty({ name: '', values: '' })}
                    >
                        اضافه کردن خواص جدید
                    </Button>
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

                    <Button
                        type='submit'
                        disabled={isPending}
                        variant='contained'
                        color='info'
                        sx={{ width: '100%' }}
                    >

                        <Box component={'span'}>ثبت</Box>

                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default AddCategoryForm