"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

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

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Helper ──────────────────────────────────────────────────────────────────

function supabaseUserToProfile(
    supabaseUser: SupabaseUser,
    profileData?: {
        name?: string;
        phone?: string;
        gender?: string;
        joined_waitlist?: boolean;
        discount_code?: string;
    } | null
): UserProfile {
    return {
        id: supabaseUser.id,
        name: profileData?.name ?? supabaseUser.user_metadata?.name ?? supabaseUser.email?.split("@")[0] ?? "User",
        email: supabaseUser.email ?? "",
        phone: profileData?.phone ?? undefined,
        gender: (profileData?.gender as UserProfile["gender"]) ?? undefined,
        joinedWaitlist: profileData?.joined_waitlist ?? false,
        discountCode: profileData?.discount_code ?? "",
    };
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalTab, setAuthModalTab] = useState<"signup" | "login">("signup");

    const supabase = createClient();

    // Fetch the user's profile row from public.profiles
    const fetchProfile = async (supabaseUser: SupabaseUser): Promise<UserProfile> => {
        const { data } = await supabase
            .from("profiles")
            .select("name, phone, gender, joined_waitlist, discount_code")
            .eq("id", supabaseUser.id)
            .single();
        return supabaseUserToProfile(supabaseUser, data);
    };

    // Listen for auth state changes (login, logout, token refresh)
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session?.user) {
                    const profile = await fetchProfile(session.user);
                    setUser(profile);
                } else {
                    setUser(null);
                }
            }
        );

        // Check for an existing session on mount
        supabase.auth.getUser().then(async ({ data: { user: supabaseUser } }) => {
            if (supabaseUser) {
                const profile = await fetchProfile(supabaseUser);
                setUser(profile);
            }
        });

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Modal helpers ───────────────────────────────────────────────────────

    const openSignUp = () => { setAuthModalTab("signup"); setIsAuthModalOpen(true); };
    const openLogin = () => { setAuthModalTab("login"); setIsAuthModalOpen(true); };
    const closeAuthModal = () => setIsAuthModalOpen(false);

    // ── Auth actions ────────────────────────────────────────────────────────

    const signUp = async (name: string, email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });

        if (error) throw error;

        // Create the profile row immediately after sign-up
        if (data.user) {
            await supabase.from("profiles").upsert({
                id: data.user.id,
                name,
            });
        }

        setIsAuthModalOpen(false);
    };

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setIsAuthModalOpen(false);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const joinWaitlist = async (email: string, phone?: string, gender?: string) => {
        const discountCode = "MOAN50";

        // Insert into the waitlist table
        const { error: wlError } = await supabase.from("waitlist").insert({
            email,
            phone: phone ?? null,
            gender: gender ?? null,
            discount_code: discountCode,
        });

        if (wlError && wlError.code !== "23505") {
            // 23505 = unique violation (already on waitlist) — safe to ignore
            throw wlError;
        }

        // If the user is logged in, update their profile too
        if (user?.id) {
            await supabase.from("profiles").update({
                phone: phone ?? null,
                gender: gender ?? null,
                joined_waitlist: true,
                discount_code: discountCode,
            }).eq("id", user.id);

            setUser((prev) =>
                prev
                    ? { ...prev, phone, gender: gender as UserProfile["gender"], joinedWaitlist: true, discountCode }
                    : prev
            );
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
