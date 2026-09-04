import React from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import LoginForm from '@/Components/Auth/LoginForm';

export default function Login({ status, canResetPassword }) {
    return (
        <AuthLayout 
            title="Welcome Back" 
            description="Sign in to your account to continue your journey with Secret Place Sri Lanka."
        >
            <LoginForm status={status} canResetPassword={canResetPassword} />
        </AuthLayout>
    );
}
