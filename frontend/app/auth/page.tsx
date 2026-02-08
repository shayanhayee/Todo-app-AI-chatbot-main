import AuthForm from '@/components/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In | TaskMaster AI',
    description: 'Sign in to access your tasks',
};

export default function AuthPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="space-y-2 text-center">
                    <div className="inline-block p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-2 sm:mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                        >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        TaskMaster AI
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg">
                        Sign in to manage your tasks with AI assistance
                    </p>
                </div>

                <AuthForm />

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        By continuing, you agree to our{' '}
                        <a href="#" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
