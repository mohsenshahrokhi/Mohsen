import ResetPasswordForm from '@/components/auth/reset-password-form';
import { verifyJwt } from '@/lib/jwt';
import Box from '@mui/material/Box';
import React from 'react';
function ResetPasswordPAge({ params }) {
    const payload = verifyJwt(params.jwt);
    if (!payload) {
        return (<div className=' flex w-screen h-screen items-center justify-center text-red-500 text-2xl'>
            اشکالی در سرور رخ داده است
        </div>);
    }
    return (<Box sx={{ width: '100%', padding: '12px' }}>
            <ResetPasswordForm jwtUserId={params.jwt}/>
        </Box>);
}
export default ResetPasswordPAge;
//# sourceMappingURL=page.js.map