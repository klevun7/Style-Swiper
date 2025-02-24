import { NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import  { app }  from "@/lib/firebase"; 

const auth = getAuth(app);

export async function POST(req: Request) {
  try {
    
    const { email, password } = await req.json();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    
  }
}
