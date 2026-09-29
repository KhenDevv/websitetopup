import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from './AuthCard';
import api from '../../api/axios';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');
        setIsPending(true);
        try {
            const response = await api.post('/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'We could not process that request.');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <AuthCard subtitle="We’ll send a secure reset link to your inbox.">
            {message && <div className="mb-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center">{message}</div>}
            {error && <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">{error}</div>}
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-xs font-semibold text-[#98a2b3] mb-1.5">Email</label>
                    <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-[#222630] border border-[#333947] focus:border-[#00f2c3] text-white text-sm rounded-xl px-4 py-3 outline-none" />
                </div>
                <button disabled={isPending} className="w-full bg-[#00f2c3] text-[#0a0c10] font-bold text-sm rounded-xl py-3.5 disabled:opacity-50">
                    {isPending ? 'Sending…' : 'Send reset link'}
                </button>
            </form>
            <div className="mt-6 text-center text-xs text-[#98a2b3]"><Link to="/login" className="font-bold text-white hover:text-[#00f2c3]">Back to login</Link></div>
        </AuthCard>
    );
};

export default ForgotPasswordForm;
