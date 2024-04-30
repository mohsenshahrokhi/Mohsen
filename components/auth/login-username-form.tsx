'use client'

import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import React, { useState, useTransition } from 'react'
import { TLoginUsernameSchema, LoginUsernameSchema } from '@/ZSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

function LoginUsernameForm() {

    const searchParams = useSearchParams()
    const params = searchParams.get('callbackUrl')
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const form = useForm<TLoginUsernameSchema>({
        resolver: zodResolver(LoginUsernameSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = async (values: TLoginUsernameSchema) => {

        startTransition(async () => {
            const res = await signIn('UsernameCredentials', { ...values, callbackUrl: params || '/dashboard' })
        })

    }

    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='on'>
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl
                            component="div"
                            fullWidth
                            sx={{ my: 1 }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="username">نام کاربری</InputLabel>
                            <OutlinedInput
                                id='username'
                                {...field}
                                autoComplete='username'
                                disabled={isPending}
                                error={fieldState.error ? true : false}
                                type={'text'}
                                label="نام کاربری"
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
                                autoComplete='current-password'
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

export default LoginUsernameForm