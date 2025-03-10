"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase"; // Note: removed auth import since we're not using Firebase Auth directly
import { collection, getDocs, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";



export default function PreferencesPage() {
    const [styles, setStyles] = useState<any[]>([]);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    
    useEffect(() => {
        const checkSession = async () => {
            try {
                
                const userSession = localStorage.getItem("userSession");
                
                if (userSession) {
                    const sessionData = JSON.parse(userSession);
                    console.log("Found user session:", sessionData);
                    
                    if (sessionData.isLoggedIn) {
                        setUser({ uid: sessionData.uid, email: sessionData.email });
                        await fetchUserPreferences(sessionData.uid);
                    } else {
                        router.push("/login");
                    }
                } else {
                    
                    const res = await fetch("/api/auth/check-session");
                    const data = await res.json();
                    
                    if (data.isLoggedIn) {
                        setUser({ uid: data.uid, email: data.email });
                        await fetchUserPreferences(data.uid);
                    } else {
                        router.push("/login");
                    }
                }
            } catch (error) {
                console.error("Session check error:", error);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };
        
        checkSession();
    }, [router]);

    // Fetch styles
    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "styles"));
                setStyles(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching styles:", error);
            }
        };
        
        fetchStyles();
    }, []);

    // Fetch user's existing preferences
    const fetchUserPreferences = async (userId: string) => {
        try {
            const userRef = doc(db, "users", userId);
            const docSnap = await getDoc(userRef);
            
            if (docSnap.exists() && docSnap.data().preferences) {
                setSelectedStyles(docSnap.data().preferences);
            } else if (docSnap.exists()) {
                await updateDoc(userRef, { preferences: [] });
                setSelectedStyles([]);
            } else {
                await setDoc(userRef, { preferences: [] });
                setSelectedStyles([]);
            }
        } catch (error) {
            console.error("Error fetching user preferences:", error);
        }
    };

    const handleSelectStyle = (style: string) => {
        setSelectedStyles(prev =>
            prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
        );
    };

    const savePreferences = async () => {
        if (!user) {
            console.error("User not authenticated.");
            router.push("/login");
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                await updateDoc(userRef, { preferences: selectedStyles });
            } else {
                await setDoc(userRef, { preferences: selectedStyles });
            }

            router.push("/swipe-page");
        } catch (error) {
            console.error("Error saving preferences:", error);
        }
    };
    
    if (loading) {
        return <div className="p-6">Loading...</div>;
    }
    
    if (!user) {
        return <div className="p-6">Please log in to set preferences.</div>;
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Select Your Style Preferences</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-2xl">
                {styles.map(style => (
                    <button
                        key={style.id}
                        onClick={() => handleSelectStyle(style.id)}
                        className={`p-4 rounded-lg shadow-md text-center transition-all duration-300 font-semibold text-lg 
                        ${selectedStyles.includes(style.id) ? "bg-blue-600 text-white shadow-lg scale-105" : "bg-white text-gray-800 hover:bg-gray-200"}`}
                    >
                        {style.name}
                    </button>
                ))}
            </div>
            <button 
                onClick={savePreferences} 
                className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
            >
                Save Preferences
            </button>
            <div className="mt-6">
            </div>
        </div>
    );
}