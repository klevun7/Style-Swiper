import { NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";

const auth = getAuth(app);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    // Authenticate the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Generate an ID token
    const idToken = await user.getIdToken();
    
    // Return user info and token
    return NextResponse.json({
      status: "success",
      uid: user.uid,
      email: user.email,
      token: idToken
    });
  } catch (error) {
    console.error("Login Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}