"use client";

import { useEffect, useState } from "react";

type Message = {
    id: string;
    content: string;
    contactInfo: string | null;
    createdAt: string;
    isRead: boolean;
};

export default function MessageList() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/messages");
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-white/50 text-center py-8">Loading messages...</div>;
    }

    if (messages.length === 0) {
        return <div className="text-white/30 text-center py-8">No messages yet.</div>;
    }

    return (
        <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((msg) => (
                <div key={msg.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-white/40 font-mono">
                            {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        {msg.contactInfo && (
                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/70">
                                {msg.contactInfo}
                            </span>
                        )}
                    </div>
                    <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                    </p>
                </div>
            ))}
        </div>
    );
}
