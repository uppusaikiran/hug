import { useLocation, Navigate } from 'react-router-dom';
import { Mail, Heart } from 'lucide-react';

export default function VerifyEmailPage() {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/auth/signup" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-100 rounded-full animate-pulse"></div>
            <Heart className="h-12 w-12 text-primary-500 relative" />
          </div>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-neutral-100">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
              <Mail className="h-6 w-6 text-primary-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900 font-display">
              Check your email
            </h2>
            <p className="mt-2 text-center text-sm text-neutral-600">
              We sent a verification link to
            </p>
            <p className="mt-1 text-center text-sm font-medium text-neutral-900">
              {email}
            </p>
            <p className="mt-4 text-sm text-neutral-600">
              Click the link in the email to verify your account. If you don't see it, check your spam folder.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                Resend verification email
              </button>
              <button 
                onClick={() => window.location.href = 'https://gmail.com'} 
                className="w-full px-4 py-2 border-2 border-primary-500 text-primary-700 rounded-lg font-medium hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                Open Gmail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}