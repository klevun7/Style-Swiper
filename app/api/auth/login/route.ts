import { NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req: Request) {
  try {
    const auth = getAuth();
    const { email, password } = await req.json();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    console.log(error)
  }
}
