import { createContext, useState, useEffect, useContext } from 'react'
import {jwtDecode} from 'jwt-decode';

import cartContext from '../Cart/CartContext';


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    

    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
    let [loading, setLoading] = useState(true)
    
    
   
    const loginUser = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch('https://frameyourmemories.up.railway.app/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: e.target.email.value, password: e.target.password.value })
        });
        if(!response.ok){ 
            return 'false'
        }
       else{
        const data = await response.json()
        localStorage.setItem('authTokens', JSON.stringify(data));
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        return 'true'
       }
        }catch(error){ 
           console.log(error)
          
        }
        
    }

    let logoutUser = () => {
        localStorage.removeItem('authTokens')
        localStorage.removeItem('cart')
        localStorage.removeItem('product')
        setAuthTokens(null)
        setUser(null)
    
    }

    const updateToken = async () => {
        const response = await fetch('https://frameyourmemories.up.railway.app/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })

        const data = await response.json()
        if (response.ok) {
            const newAccessToken=data.access
            const storedAuthTokens=authTokens
            console.log(storedAuthTokens)
            const newRefreshToken = storedAuthTokens?.refresh;
            setAuthTokens({ access: newAccessToken, refresh: newRefreshToken });
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify({ access: newAccessToken, refresh: newRefreshToken }));
            
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=>{
       
        const REFRESH_INTERVAL = 1000 * 60 *5  // 5 minutes
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    },[authTokens,loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}