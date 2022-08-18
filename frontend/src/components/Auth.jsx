import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { Forbidden } from '../views/Forbidden';

export const Auth = ({element,role=[]}) => {
    const user = useSelector(state => state.login.user)
    if(!user)
        return <Navigate to='/login'/>
        
    if(!role.length)
        return element;
    
    else if(user.role==="admin")
        return element;

    else if(role.includes(user.role))
        return element;
    
    else
        return <Forbidden/>
}
