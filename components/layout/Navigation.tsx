'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserMenu } from '@/components/auth/UserMenu';

export function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/assessment', label: 'Energy Assessment' },
    { href: '/hexagram', label: 'Decision Guidance' },
    { href: '/almanac', label: 'Daily Energy' },
    { href: '/blog', label: 'Blog' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg"></div>
            <span className="text-xl font-bold text-slate-900">ClarityPath</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
