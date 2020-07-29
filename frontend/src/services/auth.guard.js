import React from 'react';
import { Redirect } from "react-router-dom"
import authService from './auth.service';
import messageService from './message.service';
export default function AuthGuard(Component) {
    return () => {
        const isAuth = authService.getCurrentUser()
        if (!isAuth) {
            messageService.error('You must be logged in')
        }
        return isAuth ? <Component /> : <Redirect to="/signIn" />
    }
}