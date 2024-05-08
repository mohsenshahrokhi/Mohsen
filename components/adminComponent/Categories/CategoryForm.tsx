'use client'

import { RegisterCategorySchema, TCategorySchema, TRegisterCategorySchema } from "@/ZSchemas"
import { createCategory, updateCategory } from "@/actions/category"
import { verifyJwt } from "@/lib/jwt"
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Fab, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Switch } from "@mui/material"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { startTransition, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"

type Props = {
    cat?: TCategorySchema
    add: boolean
    parentId: string
}

function CategoryForm({ cat, add, parentId }: Props) {

    const router = useRouter()

    const [isPending, startTransition] = useTransition()

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
            name: !add ? cat?.name : '',
            latinName: !add ? cat?.latinName : '',
            slug: !add ? cat?.slug : '',
            // colorIcon: cat?.colorIcon || '',
            // icon: cat?.icon || '',
            // images: cat?.images || '',
            type: !add ? cat?.type : false,
            parent: !add ? cat?.parent : '',
            // propertys: cat?.slug ||[]
        }
    })

    const catId = cat?._id

    console.log(parentId);


    const onSubmit = (values: TRegisterCategorySchema | TCategorySchema) => {
        form.setValue('author', user?._id)
        values.author = user?._id
        add && startTransition(() => {
            form.setValue('parent', parentId)
            // values.parent = parentId || ''
            parentId ? values.parent = parentId || '' : delete values.parent
            console.log(values);

            createCategory({ values, accessToken })
                .then((data) => {
                    console.log(data)

                    if (data.success === true) {

                        HandleEnqueueSnackbar({ variant: 'success', msg: data.msg })

                        // parent ?
                        //     router.push(`/dashboard/siteSettings/`) :
                        //     router.push(`/dashboard/siteSettings`)
                    } else {

                        HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })
                    }

                })
        })
        !add && startTransition(() => {
            updateCategory({ _id: catId, values, accessToken })
                .then((data) => {
                    console.log(data)

                    if (data.success === true) {

                        HandleEnqueueSnackbar({ variant: 'success', msg: data.msg })

                        parent ?
                            router.push(`/dashboard/siteSettings/`) :
                            router.push(`/dashboard/siteSettings`)
                    } else {

                        HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })
                    }

                })
        })
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
                        ثبت
                    </Button>
                </form>

            </Box>
        </Box>
    )
}

export default CategoryForm