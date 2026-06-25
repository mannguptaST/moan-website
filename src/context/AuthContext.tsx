"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { submitToGoogleSheet } from "@/lib/googleSheets";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone?: string;
    gender?: "male" | "female" | "other";
    joinedWaitlist: boolean;
    discountCode: string;
}

interface AuthContextType {
    user: UserProfile | null;
    isAuthModalOpen: boolean;
    authModalTab: "signup" | "login";
    openSignUp: () => void;
    openLogin: () => void;
    closeAuthModal: () => void;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    joinWaitlist: (email: string, phone?: string, gender?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "moan_user";

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalTab, setAuthModalTab] = useState<"signup" | "login">("signup");

    // Load persisted user on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setUser(JSON.parse(stored));
        } catch {
            // ignore
        }
    }, []);

    const persist = (u: UserProfile | null) => {
        setUser(u);
        if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        else localStorage.removeItem(STORAGE_KEY);
    };

    // ── Modal helpers ───────────────────────────────────────────────────────

    const openSignUp = () => { setAuthModalTab("signup"); setIsAuthModalOpen(true); };
    const openLogin  = () => { setAuthModalTab("login");  setIsAuthModalOpen(true); };
    const closeAuthModal = () => setIsAuthModalOpen(false);

    // ── Auth actions ────────────────────────────────────────────────────────

    const signUp = async (name: string, email: string, _password: string) => {
        // TODO: replace with real API / Supabase when ready
        const newUser: UserProfile = {
            id: `local_${Date.now()}`,
            name,
            email,
            joinedWaitlist: false,
            discountCode: "",
        };
        persist(newUser);
        setIsAuthModalOpen(false);
    };

    const login = async (email: string, _password: string) => {
        // TODO: replace with real API / Supabase when ready
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const u: UserProfile = JSON.parse(stored);
            if (u.email === email) {
                persist(u);
                setIsAuthModalOpen(false);
                return;
            }
        }
        throw new Error("No account found. Please sign up first.");
    };

    const logout = () => persist(null);

    const joinWaitlist = async (email: string, phone?: string, gender?: string) => {
        const discountCode = "MOAN50";

        // Save to Google Sheet
        await submitToGoogleSheet({ email, phone, gender, source: "waitlist" });

        if (user) {
            const updated: UserProfile = {
                ...user,
                phone,
                gender: gender as UserProfile["gender"],
                joinedWaitlist: true,
                discountCode,
            };
            persist(updated);
        }
        // Store waitlist entry even for guests
        const waitlist = JSON.parse(localStorage.getItem("moan_waitlist") ?? "[]");
        const alreadyIn = waitlist.some((e: { email: string }) => e.email === email);
        if (!alreadyIn) {
            waitlist.push({ email, phone: phone ?? null, gender: gender ?? null, discountCode });
            localStorage.setItem("moan_waitlist", JSON.stringify(waitlist));
        }
    };

    return (
        <AuthContext.Provider value={{
            user, isAuthModalOpen, authModalTab,
            openSignUp, openLogin, closeAuthModal,
            signUp, login, logout, joinWaitlist,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
