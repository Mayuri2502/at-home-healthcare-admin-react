import React from 'react';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Password reset requested');
  };

  const handleBackToLogin = () => {
    // Navigate back to login
    window.history.back();
  };

  return (
    <div className="antialiased flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="w-full py-8 flex justify-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white relative overflow-hidden">
            <i className="fa-solid fa-house text-sm z-10"></i>
            <div className="absolute inset-0 opacity-40 border-2 border-white rounded-full scale-150"></div>
            <div className="absolute inset-0 border border-white/30 rounded-full rotate-45 scale-110"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-primary">At-Home</span>
        </div>
      </header>

      {/* Main Content: Forgot Password Card */}
      <main className="flex-grow flex items-start justify-center pt-12 px-4">
        <section className="w-full max-w-[440px]">
          <div className="bg-surface rounded-2xl shadow-soft border border-border p-8 md:p-10">
            {/* Back Link */}
            <div className="mb-8">
              <button 
                onClick={handleBackToLogin}
                className="text-xs font-semibold text-textMuted hover:text-primary flex items-center gap-2 transition-colors"
              >
                <i className="fa-solid fa-arrow-left"></i>
                Back to Admin Login
              </button>
            </div>

            <div className="mb-8">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-6">
                <i className="fa-solid fa-key text-xl"></i>
              </div>
              <h1 className="text-2xl font-semibold mb-2">Forgot Password?</h1>
              <p className="text-textMuted text-sm leading-relaxed">
                Enter your administrative email address and we'll send you
                instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-textMain uppercase tracking-wider">
                  Work Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textMuted">
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@at-home.health"
                    required
                    className="input-field w-full h-12 pl-11 pr-4 border border-border rounded-xl bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  Send Reset Instructions
                  <i className="fa-solid fa-paper-plane text-[10px]"></i>
                </button>
              </div>
            </form>

            {/* Security Microcopy */}
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-0.5 text-success">
                  <i className="fa-solid fa-circle-info"></i>
                </div>
                <p className="text-[12px] leading-relaxed text-textMuted">
                  <span className="font-semibold text-textMain">Security Notice:</span> If
                  an account exists for this email, you will receive a reset link
                  shortly. Please check your spam folder if it doesn't arrive
                  within 5 minutes.
                </p>
              </div>
              <div className="flex items-start gap-3 opacity-60">
                <div className="mt-0.5 text-textMuted">
                  <i className="fa-solid fa-shield-check"></i>
                </div>
                <p className="text-[11px] leading-relaxed text-textMuted uppercase tracking-tight">
                  All password reset requests are logged and audited for HIPAA
                  compliance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Copyright */}
      <footer className="py-8 text-center">
        <p className="text-xs text-textMuted/60 font-mono uppercase">
          © 2026 AT-HOME HEALTHCARE SYSTEMS V2.4.0
        </p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
