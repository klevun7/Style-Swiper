import { NextResponse } from "next/server";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(req: Request) {
  try {
    const auth = getAuth();
    const { email, password } = await req.json();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 400 });
    console.log(error);
  }
}
