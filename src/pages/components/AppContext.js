import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export default function AuthProvider({children}){
    const [user, setUser] = useState(null)

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try{
                        await auth().signInWithEmailAndPassword(email, password)
                    }catch(e){
                        console.log(e);
                    }
                },
                logout: async () => {
                    try{
                        await auth().signOut();
                    }catch(e){
                        console.log(e);
                    }
                }
            }}
        > 
            {children}
        </AuthContext.Provider>

    );
}