import { useEffect, useState } from "react";

import { onAuthStateChanged } from "../libs/firebase/auth";

export function useUserSession(initSession: string | null) {
    const [userUid, setUserUid] = useState<string | null>(initSession);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (user) => { 
            if(user) {
                setUserUid(user.uid);
            } else {
                setUserUid(null);
            }
        });

        return () => unsubscribe();
    }, [])

    return userUid;
}