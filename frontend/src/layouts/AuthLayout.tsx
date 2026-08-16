    import { Link, Outlet } from 'react-router-dom';
    import { Home as HomeIcon, ShieldCheck, Clock, Star } from 'lucide-react';
    import { ROUTES } from '@/utils/constants';

    const perks = [
    { icon: ShieldCheck, text: 'Verified & background-checked professionals' },
    { icon: Clock, text: 'Get matched with a pro in minutes' },
    { icon: Star, text: 'Rated 4.8/5 by thousands of homeowners' },
    ];

    export function AuthLayout() {
    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
            <Link to={ROUTES.HOME} className="mb-10 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white">
                <HomeIcon size={18} />
            </div>
            <span className="font-display text-lg font-bold text-surface-900 dark:text-surface-50">
                Home Rescue OS
            </span>
            </Link>
            <div className="mx-auto w-full max-w-sm">
            <Outlet />
            </div>
        </div>

        <div className="relative hidden overflow-hidden gradient-hero lg:flex lg:flex-col lg:justify-center lg:px-16">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-white leading-tight">
                Your home problems, solved by trusted pros.
            </h2>
            <p className="mt-4 text-white/80">
                Join thousands of homeowners who found the right technician in minutes, not days.
            </p>
            <div className="mt-10 space-y-5">
                {perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white">
                    <perk.icon size={20} />
                    </div>
                    <span className="text-white/90 font-medium">{perk.text}</span>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
    }