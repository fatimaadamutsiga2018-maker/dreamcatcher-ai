"use client";

import { useState } from "react";

export default function MessageForm() {
    const [content, setContent] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setStatus("submitting");

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, contactInfo }),
            });

            if (res.ok) {
                setStatus("success");
                setContent("");
                setContactInfo("");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
            {status === "success" ? (
                <div className="text-center py-6 px-4">
                    <div className="text-emerald-400 text-2xl mb-1">✨</div>
                    <p className="text-white/90 font-medium text-sm">Message received!</p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-2 text-[10px] text-white/40 hover:text-white underline uppercase tracking-wider"
                    >
                        Send another
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-4 space-y-3">
                    <div>
                        <textarea
                            id="content"
                            required
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-sm text-white placeholder-white/20 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all resize-none"
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            id="contact"
                            type="text"
                            className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-sm text-white placeholder-white/20 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all"
                            placeholder="Email or phone (Optional)"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "submitting" || !content.trim()}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {status === "submitting" ? "Sending..." : "Send Message"}
                    </button>

                    {status === "error" && (
                        <p className="text-[10px] text-red-400 text-center">
                            Something went wrong.
                        </p>
                    )}
                </form>
            )}
        </div>
    );
}
