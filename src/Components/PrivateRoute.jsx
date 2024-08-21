import React, { useContext } from 'react'
import AuthContext from './Context/AuthContext'
import { Outlet ,Navigate, useLocation} from 'react-router-dom'

function PrivateRoute({children}) {
    const {user}=useContext(AuthContext) 
    const location=useLocation()
    if(!user){ 
        return <Navigate to='/login' replace  state={{ page: location.pathname }}  /> 
    }
 return user ? children: <Navigate to='/login' replace  state={{ page: location.pathname }}  /> 
}

export default PrivateRoute
