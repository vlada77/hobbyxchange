import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { isAuthenticated: !!user, loading };
}