"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Arrow } from "./Arrow";
import { Firebase } from "./Firebase";
import { useUserSession } from "../hooks/use-user-session";
import { signInWithGoogle, signOutWithGoogle } from "../libs/firebase/auth";
import { createSession, removeSession } from "../actions/auth-actions";

export function Header({session}: {session: string | null}) {
  const pathname = usePathname();
  const userSessionId = useUserSession(session);

  const handleSignIn = async () => {
    // Sign in with Google
    const userUid = await signInWithGoogle();
    if (userUid) {
      console.log("User signed in with Google", userUid);
      await createSession(userUid);
    }
  }

  const handleSignOut = async () => {
    // Sign out with Google
    console.log("User signed out");
    await signOutWithGoogle();
    await removeSession();
  }

  if (!userSessionId) {
    return (
      <button className="button" onClick={handleSignIn}>
        Sign in with Google
      </button>
    );
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href='#'>Menu A</a>
          </li>
          <li>
            <a href='#'>Menu B</a>
          </li>
          <li>
            <a href='#'>Menu C</a>
          </li>
        </ul>
      </nav>
      <button onClick={handleSignOut}>Sign Out</button>
    </header>
  );
}
