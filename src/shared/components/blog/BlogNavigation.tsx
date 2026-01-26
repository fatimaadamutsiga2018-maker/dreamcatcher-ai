import Link from "next/link";

interface BlogNavigationProps {
    backLink?: string;
    backLabel?: string;
}

export default function BlogNavigation({
    backLink = "/",
    backLabel = "BACK"
}: BlogNavigationProps) {
    return (
        <nav className="fixed top-0 right-0 z-50 p-4">
            <div className="flex items-center gap-3">
                <Link
                    href={backLink}
                    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                    <svg className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-xs tracking-wider text-white/70 group-hover:text-white/90 transition-colors">{backLabel}</span>
                </Link>
            </div>
        </nav>
    );
}
