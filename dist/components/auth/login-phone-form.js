'use client';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import React, { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendSms } from '@/actions/register';
import { enqueueSnackbar } from 'notistack';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LoginPhoneSchema, LoginSmsSchema } from '@/ZSchemas/UserSchema';
function LoginPhoneForm() {
    const searchParams = useSearchParams();
    const params = searchParams.get('callbackUrl');
    const [isPending, startTransition] = useTransition();
    const [showPhoneCode, setPhoneCode] = useState(false);
    const [user, setUser] = useState();
    const form = useForm({
        resolver: zodResolver(LoginPhoneSchema),
        defaultValues: {
            phone: '',
        }
    });
    const smsForm = useForm({
        resolver: zodResolver(LoginSmsSchema),
        defaultValues: {
            phone: user === null || user === void 0 ? void 0 : user.phone,
            verifyPKey: ''
        }
    });
    const handleClickVariant = (variant, meg) => {
        enqueueSnackbar(meg, { variant });
    };
    const onSubmit = (values) => {
        startTransition(() => {
            sendSms(values)
                .then((data) => {
                if (data.success) {
                    handleClickVariant('success', data.msg);
                    setUser(data.userUp);
                    setPhoneCode(true);
                }
                else {
                    handleClickVariant('error', data.msg);
                }
            });
        });
    };
    const onSmsSubmit = (values) => {
        console.log('values', values);
        startTransition(async () => {
            await signIn('UserPhoneCredentials', { ...values, callbackUrl: params || '/dashboard' });
        });
    };
    return (<Box sx={{ width: '100%' }}>
            {showPhoneCode ? <form onSubmit={smsForm.handleSubmit(onSmsSubmit)}>
                <Controller name="phone" control={smsForm.control} render={({ field, fieldState }) => {
                var _a, _b;
                return (<FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="phone">تلفن</InputLabel>
                            <OutlinedInput id='phone' {...field} autoComplete='tel-national' disabled={true} error={fieldState.error ? true : false} type={'text'} label="تلفن" fullWidth startAdornment={<InputAdornment position="start">
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
                <Controller name="verifyPKey" control={smsForm.control} render={({ field, fieldState }) => {
                var _a, _b;
                return (<FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="verifyPKey">گذرواژه دریافتی</InputLabel>
                            <OutlinedInput id='verifyPKey' {...field} autoFocus={true} autoComplete='off' disabled={isPending} error={fieldState.error ? true : false} type={'text'} label="گذرواژه دریافتی" fullWidth startAdornment={<InputAdornment position="start">
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
                    ورود
                </Button>
            </form> : <form onSubmit={form.handleSubmit(onSubmit)}>
                <Controller name="phone" control={form.control} render={({ field, fieldState }) => {
                var _a, _b;
                return (<FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="phone">تلفن</InputLabel>
                            <OutlinedInput id='phone' {...field} autoComplete='tel-national' disabled={isPending} error={fieldState.error ? true : false} type={'text'} label="تلفن" fullWidth startAdornment={<InputAdornment position="start">
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
                    ارسال گذرواژه
                </Button>
            </form>}
        </Box>);
}
export default LoginPhoneForm;
//# sourceMappingURL=login-phone-form.js.map