'use client'

import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Tab, Tabs, Tooltip } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import React, { useState, useTransition } from 'react'
import { ForgetPass, LoginMailSchema, TForgetPassSchema, TLoginMailSchema } from '@/ZSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { VariantType, enqueueSnackbar } from 'notistack'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { forgetPassword } from '@/actions/register'

function ForgetMailPassForm() {
    const searchParams = useSearchParams()
    const params = searchParams.get('callbackUrl')
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const form = useForm<TForgetPassSchema>({
        resolver: zodResolver(ForgetPass),
        defaultValues: {
            email: ''
        }
    })

    const handleClickVariant = (variant: VariantType, meg: string) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(meg, { variant })
    }

    const onSubmit = async (values: TForgetPassSchema) => {
        // console.log(values);
        const variant = 'success'
        // startTransition(async () => {
        const res = await forgetPassword(values)
        if (res) enqueueSnackbar('Password Changed Success', { variant })
        // })

    }

    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl
                            component="div"
                            fullWidth
                            sx={{ my: 1 }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="email">ایمیل</InputLabel>
                            <OutlinedInput
                                id='email'
                                {...field}
                                disabled={isPending}
                                error={fieldState.error ? true : false}
                                type={'text'}
                                label="ایمیل"
                                fullWidth
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="start"
                                        >
                                            {<PersonRoundedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText
                                component={'p'}
                                sx={{
                                    color: 'error.main',
                                }}
                            >
                                {fieldState.error?.message ?? ''}
                            </FormHelperText>
                        </FormControl>

                    )}
                />

                <Button
                    type='submit'
                    disabled={isPending}
                    variant='contained'
                    color='info'
                    sx={{ width: '100%' }}
                >
                    بازنشانی رمز ورود
                </Button>
            </form>
        </Box>
    )
}

export default ForgetMailPassForm