'use client'

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from '@mui/material'
import {
    Controller,
    useForm
} from 'react-hook-form'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import React, {
    useEffect,
    useState,
    useTransition
} from 'react'
import {
    zodResolver
} from '@hookform/resolvers/zod'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import SendToMobileRoundedIcon from '@mui/icons-material/SendToMobileRounded'
import { register } from '@/actions/register'
import { IMaskInput } from 'react-imask'
import { passwordStrength } from "check-password-strength"
import HandleEnqueueSnackbar from '@/utils/HandleEnqueueSnackbar'
import { RegisterUserFormSchema, TRegisterUserFormSchema } from '@/ZSchemas/UserSchema'

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="#000000000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        )
    },
)

function RegisterForm() {
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrengt, setPasswordStrengt] = useState(0)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const form = useForm<TRegisterUserFormSchema>({
        resolver: zodResolver(RegisterUserFormSchema),
        defaultValues: {
            phone: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = (values: TRegisterUserFormSchema) => {

        startTransition(() => {
            register(values)
                .then((data) => {
                    data.success ? HandleEnqueueSnackbar({ variant: 'success', msg: data.msg }) : HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })
                    // router.push('/username')
                    // router.refresh()
                })

        })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">شماره تلفن</InputLabel>
                            <OutlinedInput
                                id='phone'
                                inputComponent={TextMaskCustom as any}
                                {...field}
                                autoComplete='tel-national'
                                disabled={isPending}
                                // onInvalid={true}
                                error={fieldState.error ? true : false}
                                type={'text'}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="start"
                                        >
                                            {<SendToMobileRoundedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="تکرار گذرواژه"
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
                                autoComplete='email'
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
                                            {<EmailRoundedIcon />}
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
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="password">گذرواژه</InputLabel>
                            <OutlinedInput
                                id='password'
                                {...field}
                                autoComplete='off'
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
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">تکرار گذرواژه</InputLabel>
                            <OutlinedInput
                                id='confirmPassword'
                                {...field}
                                autoComplete='off'
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
                                label="تکرار گذرواژه"
                                fullWidth
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

export default RegisterForm