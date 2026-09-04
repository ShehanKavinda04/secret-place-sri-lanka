import React from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import CustomerRegisterForm from '@/Components/Auth/CustomerRegisterForm';

export default function Register() {
    return (
        <AuthLayout 
            title="Create an Account" 
            description="Join our ecosystem to book exclusive retreats, unique experiences, and authentic crafts."
        >
            <CustomerRegisterForm />
        </AuthLayout>
    );
}
