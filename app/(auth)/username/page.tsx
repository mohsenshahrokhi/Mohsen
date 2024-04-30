import LoginUsernameForm from '@/components/auth/login-username-form'

async function Username() {

    return (
        <div className=' bg-slate-200 w-96 h-96 overflow-auto m-5 rounded-md'>
            <LoginUsernameForm />
        </div>
    )
}

export default Username