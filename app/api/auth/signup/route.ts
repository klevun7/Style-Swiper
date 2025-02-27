import { NextResponse } from "next/server";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import  { app }  from "@/lib/firebase"; 

const auth = getAuth(app); 

export async function POST(req: Request) {
  try {
    
    const { email, password } = await req.json();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Signup failed";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
