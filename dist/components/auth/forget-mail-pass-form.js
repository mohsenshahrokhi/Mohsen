'use client';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import React, { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar } from 'notistack';
import { useSearchParams } from 'next/navigation';
import { forgetPassword } from '@/actions/register';
import { ForgetPass } from '@/ZSchemas/UserSchema';
function ForgetMailPassForm() {
    const searchParams = useSearchParams();
    const params = searchParams.get('callbackUrl');
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const form = useForm({
        resolver: zodResolver(ForgetPass),
        defaultValues: {
            email: ''
        }
    });
    const handleClickVariant = (variant, meg) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(meg, { variant });
    };
    const onSubmit = async (values) => {
        // console.log(values);
        const variant = 'success';
        // startTransition(async () => {
        const res = await forgetPassword(values);
        if (res)
            enqueueSnackbar('Password Changed Success', { variant });
        // })
    };
    return (<Box sx={{ width: '100%' }}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller name="email" control={form.control} render={({ field, fieldState }) => {
            var _a, _b;
            return (<FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="email">ایمیل</InputLabel>
                            <OutlinedInput id='email' {...field} disabled={isPending} error={fieldState.error ? true : false} type={'text'} label="ایمیل" autoComplete='email' fullWidth startAdornment={<InputAdornment position="start">
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

                <Button type='submit' disabled={isPending} variant='contained' color='info' sx={{ width: '100%' }}>
                    بازنشانی رمز ورود
                </Button>
            </form>
        </Box>);
}
export default ForgetMailPassForm;
//# sourceMappingURL=forget-mail-pass-form.js.map