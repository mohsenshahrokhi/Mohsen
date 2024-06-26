'use client';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar } from 'notistack';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { resetPassword } from '@/actions/register';
import { ResetPass } from '@/ZSchemas/UserSchema';
function ResetPasswordForm({ jwtUserId }) {
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const form = useForm({
        resolver: zodResolver(ResetPass),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });
    const handleClickVariant = (variant, meg) => {
        enqueueSnackbar(meg, { variant });
    };
    const onSubmit = (values) => {
        startTransition(async () => {
            const result = await resetPassword(jwtUserId, values.password);
            if (result === 'success') {
                handleClickVariant("success", 'گذر واژه شما با موفقیت به روز شد');
            }
            else {
                handleClickVariant('error', 'عملیات موفقیت آمیز نبود');
            }
        });
    };
    return (<Box sx={{ width: '100%' }}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <Controller name="password" control={form.control} render={({ field, fieldState }) => {
            var _a, _b;
            return (<FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="password">گذرواژه</InputLabel>
                            <OutlinedInput id='password' {...field} autoComplete='off' disabled={isPending} error={fieldState.error ? true : false} type={showPassword ? 'text' : 'password'} startAdornment={<InputAdornment position="start">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="start">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>} label="گذرواژه" fullWidth/>
                            <FormHelperText component={'div'} sx={{
                    color: 'error.main',
                }}>
                                {(_b = (_a = fieldState.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : ''}
                            </FormHelperText>
                        </FormControl>);
        }}/>

                <Controller name="confirmPassword" control={form.control} render={({ field, fieldState }) => {
            var _a, _b;
            return (<FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">تکرار گذرواژه</InputLabel>
                            <OutlinedInput id='confirmPassword' {...field} autoComplete='off' disabled={isPending} error={fieldState.error ? true : false} type={showPassword ? 'text' : 'password'} startAdornment={<InputAdornment position="start">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="start">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>} label="تکرار گذرواژه" fullWidth/>
                            <FormHelperText component={'div'} sx={{
                    color: 'error.main',
                }}>
                                {(_b = (_a = fieldState.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : ''}
                            </FormHelperText>
                        </FormControl>);
        }}/>

                <Button type='submit' disabled={isPending} variant='contained' color='info' sx={{ width: '100%' }}>
                    بازنشانی گذرواژه
                </Button>
            </form>

        </Box>);
}
export default ResetPasswordForm;
//# sourceMappingURL=reset-password-form.js.map