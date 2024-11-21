import { useEffect } from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { isAuthentication } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthentication) navigate("/login")
    }, [isAuthentication])

    return isAuthentication ? children : null
}

export default ProtectedRoute