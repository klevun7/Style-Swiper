import { NextResponse } from "next/server";
import  { app , db }  from "@/lib/firebase"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);

export async function POST(req: Request) {
  try {
    
    const { email, password } = await req.json();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const user = userCredential.user
    
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: user.email,
      preferences: [],
  });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Signup failed";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
