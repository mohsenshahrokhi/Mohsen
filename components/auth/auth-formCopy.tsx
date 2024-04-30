'use client'

import {
    Box,
    Tab,
    Tabs,
    Tooltip,
} from '@mui/material'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LoginSchema } from '@/ZSchemas'
import PhonelinkLockRoundedIcon from '@mui/icons-material/PhonelinkLockRounded'
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded'
import MailLockRoundedIcon from '@mui/icons-material/MailLockRounded'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import { VariantType, enqueueSnackbar } from 'notistack'
import { login } from '@/actions/login'
import RegisterForm from './register-form'
import LoginForm from './login-phone-form'
import { usePathname, useRouter } from 'next/navigation'
import LoginMailForm from './login-mail-form'
import LoginUsernameForm from './login-username-form'
import LoginPhoneForm from './login-phone-form'

type Props = {
    children?: React.ReactNode
    index: number
    value: { newValue: number, path: string }
}

function CustomTabPanel({ children, value, index, ...other }: Props) {
    // const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {/* {value === index && ( */}
            <Box sx={{ p: 3 }}>
                {/* {value.path === 'phone' && <LoginForm />} */}
                {children}
            </Box>
            {/* )} */}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

function AuthForm() {

    const router = useRouter()
    const pathName = usePathname()
    const [isPending, startTransition] = useTransition()

    const oldValue = pathName === '/username' ? 1 :
        pathName === '/mail' ? 2 : pathName === '/register' ? 3 : pathName === '/phone' && 0 || 0

    const [value, setValue] = useState({ newValue: oldValue, path: pathName || '/phone' })

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleClickVariant = (variant: VariantType, meg: string) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(meg, { variant })
    }

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {

        startTransition(() => {
            login(values)
                .then((data) => {
                    data.success ? handleClickVariant('success', data.msg) : handleClickVariant('error', data.msg)
                    // console.log(data.success)

                })


        })
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        const path = event.currentTarget.ariaLabel || '/phone'
        // console.log('path', path)
        router.push(`${path}`)
        setValue({ newValue, path })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value.newValue} onChange={handleChange} aria-label="icon tabs example">
                    <Tooltip
                        title="ورود با مبایل"
                        placement="top"
                        arrow
                    >
                        <Tab icon={<PhonelinkLockRoundedIcon />} aria-label="/phone" {...a11yProps(0)} />
                    </Tooltip>
                    <Tooltip
                        title="ورود با نام کاربری"
                        placement="top"
                        arrow
                    >
                        <Tab icon={<VpnKeyRoundedIcon />} aria-label="/username" {...a11yProps(1)} />
                    </Tooltip>
                    <Tooltip
                        title='ورود با ایمیل'
                        placement="top"
                        arrow
                    >
                        <Tab icon={<MailLockRoundedIcon />} aria-label="/mail" {...a11yProps(2)} />
                    </Tooltip>
                    <Tooltip
                        title='ایجاد حساب جدید'
                        placement="top"
                        arrow
                    >
                        <Tab icon={<PersonAddAlt1RoundedIcon />} aria-label="/register" {...a11yProps(3)} />
                    </Tooltip>
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {
                    value.path === '/phone' ? <LoginPhoneForm /> :
                        value.path === '/register' ? <RegisterForm /> :
                            value.path === '/mail' ? <LoginMailForm /> :
                                value.path === '/username' && <LoginUsernameForm />

                }
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={1}>
                <LoginForm />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <RegisterForm />
            </CustomTabPanel> */}
        </Box>
    )
}

export default AuthForm