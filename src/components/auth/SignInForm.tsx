import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff, LogIn, Heart, Info, Copy, Zap, Trophy, Star } from 'lucide-react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyTestingCredentials = async () => {
    try {
      await navigator.clipboard.writeText('testing@devpost.com');
      setCopySuccess('Copied with care! 💝');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const fillTestingCredentials = () => {
    setEmail('testing@devpost.com');
    setPassword('testing@devpost.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating caring elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating hearts */}
        <div className="absolute top-10 left-10 text-pink-200 animate-pulse">
          <Heart className="h-4 w-4 opacity-30" />
        </div>
        <div className="absolute top-32 right-16 text-rose-200 animate-pulse delay-1000">
          <Heart className="h-3 w-3 opacity-40" />
        </div>
        <div className="absolute bottom-40 left-20 text-pink-200 animate-pulse delay-2000">
          <Heart className="h-5 w-5 opacity-25" />
        </div>
        <div className="absolute top-1/2 right-8 text-rose-200 animate-pulse delay-500">
          <Heart className="h-3 w-3 opacity-35" />
        </div>
        
        {/* Soft caring glows */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-rose-100 rounded-full blur-3xl opacity-15 animate-pulse delay-1000"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Caring glow around the heart */}
            <div className="absolute inset-0 bg-pink-100 rounded-full animate-pulse blur-md opacity-60"></div>
            <div className="absolute inset-0 bg-primary-100 rounded-full animate-pulse"></div>
            <Heart className="h-12 w-12 text-primary-500 relative animate-pulse" />
            {/* Tiny floating hearts around main heart */}
            <div className="absolute -top-1 -right-1 text-pink-400 animate-bounce delay-300">
              <Heart className="h-2 w-2" />
            </div>
            <div className="absolute -bottom-1 -left-1 text-rose-400 animate-bounce delay-700">
              <Heart className="h-2 w-2" />
            </div>
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900 font-display">
          Welcome back to <span className="text-primary-500">huggy</span> 🤗
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Continue your mental wellness journey with care
        </p>
      </div>

      {/* PROMINENT Hackathon Judge Testing Box */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="relative overflow-hidden">
          {/* Animated background with caring touches */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl blur-sm animate-pulse"></div>
          {/* Subtle caring glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 via-rose-300/20 to-orange-300/20 rounded-xl animate-pulse delay-500"></div>
          
          {/* Main content */}
          <div className="relative bg-white/95 backdrop-blur-sm border-2 border-purple-300 rounded-xl p-4 shadow-lg">
            {/* Compact Header with caring touch */}
            <div className="text-center mb-3">
              <div className="flex justify-center items-center gap-1 mb-1">
                <div className="relative">
                  <Trophy className="h-5 w-5 text-yellow-500 animate-bounce" />
                  <Heart className="h-2 w-2 text-pink-400 absolute -top-0.5 -right-0.5 animate-pulse" />
                </div>
                <h3 className="text-sm font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  WORLD'S LARGEST HACKATHON JUDGE
                </h3>
                <div className="relative">
                  <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
                  <Heart className="h-2 w-2 text-rose-400 absolute -bottom-0.5 -left-0.5 animate-pulse delay-300" />
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-xs font-bold shadow-md">
                <Zap className="h-3 w-3" />
                FAST TRACK ACCESS • $1M+ PRIZES 🤗
                <Zap className="h-3 w-3" />
              </div>
            </div>

            {/* Compact Credentials with caring design */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-3 mb-3 relative overflow-hidden">
              {/* Subtle caring glow inside */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-pink-400/10 rounded-full blur-md"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex-1">
                  <p className="text-xs text-gray-300 mb-1">TEST CREDENTIALS 💝</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-green-400">testing@devpost.com</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                      <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping delay-75"></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">Same for email & password 🤲</p>
                </div>
                <button
                  onClick={copyTestingCredentials}
                  className="p-1 hover:bg-gray-700 rounded transition-colors ml-2 relative group"
                  title="Copy with care"
                >
                  <Copy className="h-4 w-4 text-gray-300 group-hover:text-pink-300 transition-colors" />
                  <Heart className="h-1 w-1 text-pink-400 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              {copySuccess && (
                <div className="flex items-center gap-1 text-green-400 text-xs font-medium mt-1 animate-pulse">
                  <div className="w-1 h-1 bg-pink-400 rounded-full animate-bounce"></div>
                  {copySuccess}
                </div>
              )}
            </div>

            {/* Compact Action with caring touch */}
            <button
              onClick={fillTestingCredentials}
              className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-1 relative overflow-hidden group"
            >
              {/* Caring glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 to-rose-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Zap className="h-4 w-4 relative z-10" />
              <span className="relative z-10">AUTO-FILL WITH CARE 🤗</span>
            </button>
            
            <p className="text-xs text-center text-gray-500 mt-2 flex items-center justify-center gap-1">
              <Heart className="h-3 w-3 text-pink-400 animate-pulse" />
              80K+ participants • Regular signup available below
              <Heart className="h-3 w-3 text-rose-400 animate-pulse delay-500" />
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-neutral-100 relative overflow-hidden">
          {/* Subtle caring glow in form */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-50 rounded-full blur-xl opacity-30"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm relative">
                <Heart className="h-3 w-3 text-pink-400 absolute top-1 right-1 opacity-50" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 flex items-center gap-1">
                Email 
                <Heart className="h-3 w-3 text-pink-300 opacity-50" />
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email with care"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 flex items-center gap-1">
                Password
                <Heart className="h-3 w-3 text-rose-300 opacity-50" />
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full rounded-lg border border-neutral-200 px-4 py-2 pr-10 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password securely"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center group"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-neutral-400 group-hover:text-pink-400 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-neutral-400 group-hover:text-pink-400 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700 flex items-center gap-1">
                  Remember me 
                  <Heart className="h-3 w-3 text-pink-300 opacity-30" />
                </label>
              </div>

              <button
                type="button"
                onClick={() => navigate('/auth/reset-password')}
                className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                Forgot password? 🤲
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {/* Caring glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300/10 to-rose-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" />
              ) : (
                <>
                  <LogIn className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">Sign In with Care 🤗</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500 flex items-center gap-1">
                  <Heart className="h-3 w-3 text-pink-300 opacity-50" />
                  Don't have an account?
                  <Heart className="h-3 w-3 text-rose-300 opacity-50" />
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate('/auth/signup')}
                className="w-full flex justify-center items-center px-4 py-2 border-2 border-primary-500 text-primary-700 rounded-lg font-medium hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Create an account with huggy 🤗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}