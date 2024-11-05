import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, user, isAuthentication } = useAuth()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) login(email, password)
    }

    useEffect(() => {
        if (isAuthentication) navigate("/", { replace: true })
    }, [isAuthentication, navigate])

    return (
        <div className='my-8 mx-auto max-w-96 border border-solid -border--text-300 p-4 rounded-2xl'>
            <h2 className='mb-4'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4 relative'>
                    <label className='block mb-1' htmlFor="email">Email :</label>
                    <input
                        className='border border-solid -border--text-400 p-2 rounded-lg w-full'
                        type="text"
                        name='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-4 relative'>
                    <label className='block mb-1' htmlFor="password">Password :</label>
                    <input
                        className='border border-solid -border--text-400 p-2 rounded-lg w-full'
                        type="password"
                        name='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className='flex items-center justify-between'>
                    <button type='submit' className='w-full py-2 px-4 rounded-lg -bg--primary-600 text-[#fff]'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login