
import MessageForm from "@/shared/components/guestbook/MessageForm";
import BlogNavigation from "@/shared/components/blog/BlogNavigation";

export default function GuestbookPage() {
    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col items-center pt-24 pb-12 px-4">
            {/* Background Effect */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.15),rgba(0,0,0,0))] pointer-events-none" />

            <BlogNavigation />

            <main className="relative z-10 w-full max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-white to-violet-200">
                        Guestbook
                    </h1>
                    <p className="text-white/60">
                        Leave a note, share your experience, or just say hello.
                    </p>
                </div>

                <MessageForm />
            </main>
        </div>
    );
}
