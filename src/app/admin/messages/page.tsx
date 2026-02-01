
import MessageList from "@/shared/components/guestbook/MessageList";
import BlogNavigation from "@/shared/components/blog/BlogNavigation";

export default function AdminMessagesPage() {
    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col items-center pt-24 pb-12 px-4">
            <BlogNavigation />

            <main className="relative z-10 w-full max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Messages
                        </h1>
                        <p className="text-sm text-white/50">
                            Admin View
                        </p>
                    </div>
                </div>

                <MessageList />
            </main>
        </div>
    );
}
