"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import EnergyDisplay from "./EnergyDisplay";
import EnergyModal from "./EnergyModal";

type UserMenuProps = {
  onLoginClick: () => void;
};

export default function UserMenu({ onLoginClick }: UserMenuProps) {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [energyModalOpen, setEnergyModalOpen] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("UserMenu - status:", status);
    console.log("UserMenu - session:", session);
  }, [status, session]);

  // Get user initials for avatar
  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "?";
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <EnergyDisplay compact />
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
          <div className="w-4 h-4 rounded-full bg-white/10 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Not logged in - show LOGIN button
  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <EnergyDisplay compact />
        <button
          onClick={onLoginClick}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <svg className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs tracking-wider text-white/70 group-hover:text-white/90 transition-colors">LOGIN</span>
        </button>
      </div>
    );
  }

  // Logged in - show energy + user avatar
  return (
    <>
      <div className="flex items-center gap-3">
        {/* Energy Display */}
        <EnergyDisplay onOpenModal={() => setEnergyModalOpen(true)} />

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all"
          >
            <span className="text-xs tracking-wider text-white/90 hidden sm:block">
              {session.user?.name || session.user?.email?.split("@")[0]}
            </span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
              {getInitials(session.user?.name, session.user?.email)}
            </div>
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="p-3 border-b border-white/10">
                  <p className="text-sm font-medium text-white truncate">
                    {session.user?.name || "User"}
                  </p>
                  <p className="text-xs text-white/50 truncate">
                    {session.user?.email}
                  </p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: window.location.origin });
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Energy Modal */}
      <EnergyModal
        open={energyModalOpen}
        onClose={() => setEnergyModalOpen(false)}
      />
    </>
  );
}
