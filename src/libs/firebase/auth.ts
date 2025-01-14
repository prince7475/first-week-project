// libs/firebase/auth.ts

import {
    type User,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';

import {firebaseAuth} from './config';

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
    return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle (): Promise<string | null> {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(firebaseAuth, provider);
        if(!result.user) {
            throw new Error("Google sign-in failed");
        }
        return result.user.uid;

    } catch (error) {
        console.error("Error signing out with google",error);
    }

    return null
}

export async function signOutWithGoogle() {
    try {
        await firebaseAuth.signOut();
    } catch (error) {
        console.error("Error signing out with google", error);
    }
}