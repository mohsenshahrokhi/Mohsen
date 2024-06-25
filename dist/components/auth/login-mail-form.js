'use client';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import React, { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
// import { login } from '@/actions/login'
import { enqueueSnackbar } from 'notistack';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginMailSchema } from '@/ZSchemas/UserSchema';
function LoginMailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // const callbackUrl = searchParams.get('callbackUrl')
    const error = searchParams.get('error');
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const form = useForm({
        resolver: zodResolver(LoginMailSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const handleClickVariant = (variant, meg) => {
        enqueueSnackbar(meg, { variant });
    };
    const onSubmit = (values) => {
        startTransition(async () => {
            // const res = await signIn('EmailCredentials', { ...values, callbackUrl: callbackUrl || '/dashboard' })
            await signIn('EmailCredentials', { ...values, redirect: false })
                .then((res) => {
                if (res === null || res === void 0 ? void 0 : res.ok)
                    router.push("/dashboard");
                if (res === null || res === void 0 ? void 0 : res.error)
                    handleClickVariant('error', res === null || res === void 0 ? void 0 : res.error);
            });
        });
    };
    return (<Box sx={{ width: '100%' }}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='on'>
                <Controller name="email" control={form.control} render={({ field, fieldState }) => {
            var _a, _b;
            return (<FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="email">ایمیل</InputLabel>
                            <OutlinedInput id='email' {...field} disabled={isPending} error={fieldState.error ? true : false} type={'text'} autoComplete='email' label="ایمیل" fullWidth startAdornment={<InputAdornment position="start">
                                        <IconButton aria-label="toggle password visibility" edge="start">
                                            {<PersonRoundedIcon />}
                                        </IconButton>
                                    </InputAdornment>}/>
                            <FormHelperText component={'p'} sx={{
                    color: 'error.main',
                }}>
                                {(_b = (_a = fieldState.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : ''}
                            </FormHelperText>
                        </FormControl>);
        }}/>

                <Controller name="password" control={form.control} render={({ field, fieldState }) => {
            var _a, _b;
            return (<FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="password">گذرواژه</InputLabel>
                            <OutlinedInput id='password' {...field} autoComplete='off' disabled={isPending} error={fieldState.error ? true : false} type={showPassword ? 'text' : 'password'} startAdornment={<InputAdornment position="start">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="start">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>} label="گذرواژه" fullWidth/>
                            <FormHelperText sx={{
                    color: 'error.main',
                }}>
                                {(_b = (_a = fieldState.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : ''}
                            </FormHelperText>
                        </FormControl>);
        }}/>

                <Button type='submit' disabled={isPending} variant='contained' color='info' sx={{ width: '100%' }}>
                    ورود
                </Button>
            </form>
        </Box>);
}
export default LoginMailForm;
//# sourceMappingURL=login-mail-form.js.map