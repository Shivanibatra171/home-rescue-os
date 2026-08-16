    // import { Link } from 'react-router-dom';
    // import { Home as HomeIcon, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
    // import { ROUTES } from '@/utils/constants';

    // const columns = [
    // {
    //     title: 'Company',
    //     links: [
    //     { label: 'About Us', to: ROUTES.ABOUT },
    //     { label: 'Contact', to: ROUTES.CONTACT },
    //     { label: 'Careers', to: '#' },
    //     { label: 'Blog', to: '#' },
    //     ],
    // },
    // {
    //     title: 'Services',
    //     links: [
    //     { label: 'Plumbing', to: '/services/plumber' },
    //     { label: 'Electrical', to: '/services/electrician' },
    //     { label: 'AC Repair', to: '/services/ac-repair' },
    //     { label: 'All Services', to: ROUTES.SERVICES },
    //     ],
    // },
    // {
    //     title: 'For Workers',
    //     links: [
    //     { label: 'Join as a Pro', to: ROUTES.WORKER_REGISTER },
    //     { label: 'Worker Login', to: ROUTES.WORKER_LOGIN },
    //     { label: 'How It Works', to: '#' },
    //     ],
    // },
    // ];
    // export function Footer() {
    // return (
    //     <footer className="border-t border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-950">
    //     <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
    //         <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
    //         <div className="md:col-span-2">
    //             <Link to={ROUTES.HOME} className="flex items-center gap-2">
    //             <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white">
    //                 <HomeIcon size={18} />
    //             </div>
    //             <span className="font-display text-lg font-bold text-surface-900 dark:text-surface-50">
    //                 Home Rescue OS
    //             </span>
    //             </Link>
    //             <p className="mt-4 max-w-xs text-sm text-surface-500 dark:text-surface-400">
    //             Verified home service professionals, matched to your problem in minutes. Trusted by thousands of homeowners.
    //             </p>
    //             <div className="mt-5 flex gap-3">
    //             {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
    //                 <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950 dark:hover:text-brand-400">
    //                 <Icon size={16} />
    //                 </a>
    //             ))}
    //             </div>
    //         </div>

    //         {columns.map((col) => (
    //             <div key={col.title}>
    //             <h4 className="font-display text-sm font-semibold text-surface-900 dark:text-surface-50">{col.title}</h4>
    //             <ul className="mt-4 space-y-2.5">
    //                 {col.links.map((link) => (
    //                 <li key={link.label}>
    //                     <Link to={link.to} className="text-sm text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400">
    //                     {link.label}
    //                     </Link>
    //                 </li>
    //                 ))}
    //             </ul>
    //             </div>
    //         ))}
    //         </div>

    //         <div className="mt-12 grid grid-cols-1 gap-4 border-t border-surface-100 dark:border-surface-800 pt-8 sm:grid-cols-3">
    //         <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
    //             <Phone size={15} /> +92 300 1234567
    //         </div>
    //         <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
    //             <Mail size={15} /> support@homerescueos.com
    //         </div>
    //         <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
    //             <MapPin size={15} /> Karachi, Pakistan
    //         </div>
    //         </div>

    //         <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-surface-100 dark:border-surface-800 pt-6 text-xs text-surface-400 sm:flex-row">
    //         <span>© {new Date().getFullYear()} Home Rescue OS. All rights reserved.</span>
    //         <div className="flex gap-4">
    //             <Link to="#">Privacy Policy</Link>
    //             <Link to="#">Terms of Service</Link>
    //         </div>
    //         </div>
    //     </div>
    //     </footer>
    // );
    // }

    import { Link } from 'react-router-dom';
    import { Home as HomeIcon, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
    import { ROUTES } from '@/utils/constants';

    const columns = [
    {
        title: 'Company',
        links: [
        { label: 'About Us', to: ROUTES.ABOUT },
        { label: 'Contact', to: ROUTES.CONTACT },
        { label: 'Careers', to: '#' },
        { label: 'Blog', to: '#' },
        ],
    },
    {
        title: 'Services',
        links: [
        { label: 'Plumbing', to: '/services/plumber' },
        { label: 'Electrical', to: '/services/electrician' },
        { label: 'AC Repair', to: '/services/ac-repair' },
        { label: 'All Services', to: ROUTES.SERVICES },
        ],
    },
    {
        title: 'For Workers',
        links: [
        { label: 'Join as a Pro', to: ROUTES.WORKER_REGISTER },
        { label: 'Worker Login', to: ROUTES.WORKER_LOGIN },
        { label: 'How It Works', to: '#' },
        ],
    },
    ];

    const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/sk.batra.507' },
    { icon: Instagram, href: 'https://www.instagram.com/shivo.batra_/' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/shivani-darshan-lal-a4736432a/' },
    ];

    export function Footer() {
    return (
        <footer className="border-t border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
                <Link to={ROUTES.HOME} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white">
                    <HomeIcon size={18} />
                </div>
                <span className="font-display text-lg font-bold text-surface-900 dark:text-surface-50">
                    Home Rescue OS
                </span>
                </Link>
                <p className="mt-4 max-w-xs text-sm text-surface-500 dark:text-surface-400">
                Verified home service professionals, matched to your problem in minutes. Trusted by thousands of homeowners.
                </p>
                <div className="mt-5 flex gap-3">
                {socialLinks.map(({ icon: Icon, href }, i) => (
                    <a
                    key={i}
                    href={href}
                    target={href !== '#' ? '_blank' : undefined}
                    rel={href !== '#' ? 'noopener noreferrer' : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950 dark:hover:text-brand-400"
                    >
                    <Icon size={16} />
                    </a>
                ))}
                </div>
            </div>

            {columns.map((col) => (
                <div key={col.title}>
                <h4 className="font-display text-sm font-semibold text-surface-900 dark:text-surface-50">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => (
                    <li key={link.label}>
                        <Link to={link.to} className="text-sm text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400">
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-surface-100 dark:border-surface-800 pt-8 sm:grid-cols-3">
            <a href="tel:+923123269180" className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400">
                <Phone size={15} /> +92 312 3269180
            </a>
            <a href="mailto:shivanibatra978@gmail.com" className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400">
                <Mail size={15} /> shivanibatra978@gmail.com
            </a>
            <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
            <MapPin size={15} /> Block 5 Gulshan-e-Iqbal, Karachi, 75300
            </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-surface-100 dark:border-surface-800 pt-6 text-xs text-surface-400 sm:flex-row">
            <span>© {new Date().getFullYear()} Home Rescue OS. All rights reserved.</span>
            <div className="flex gap-4">
                <Link to="#">Privacy Policy</Link>
                <Link to="#">Terms of Service</Link>
            </div>
            </div>
        </div>
        </footer>
    );
    }