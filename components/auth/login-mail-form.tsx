'use client'

import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Tab, Tabs, Tooltip } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import React, { useState, useTransition } from 'react'
import { LoginMailSchema, TLoginMailSchema } from '@/ZSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
// import { login } from '@/actions/login'
import { VariantType, enqueueSnackbar } from 'notistack'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginMailForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    // const callbackUrl = searchParams.get('callbackUrl')
    const error = searchParams.get('error')
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const form = useForm<TLoginMailSchema>({
        resolver: zodResolver(LoginMailSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleClickVariant = (variant: VariantType, meg: string) => {
        enqueueSnackbar(meg, { variant })
    }

    const onSubmit = (values: TLoginMailSchema) => {

        startTransition(async () => {
            // const res = await signIn('EmailCredentials', { ...values, callbackUrl: callbackUrl || '/dashboard' })
            await signIn('EmailCredentials', { ...values, redirect: false })
                .then((res) => {
                    if (res?.ok) router.push("/dashboard")
                    if (res?.error) handleClickVariant('error', res?.error)

                })
        })
    }




    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='on'>
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

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="password">گذرواژه</InputLabel>
                            <OutlinedInput
                                id='password'
                                {...field}
                                autoComplete='email'
                                disabled={isPending}
                                error={fieldState.error ? true : false}
                                type={showPassword ? 'text' : 'password'}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="start"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="گذرواژه"
                                fullWidth
                            />
                            <FormHelperText
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
                    ورود
                </Button>
            </form>
        </Box>
    )
}

export default LoginMailForm