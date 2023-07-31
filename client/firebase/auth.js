
//THIS IS AUTHUSERPROVIDER
import {createContext, useState, useContext, useEffect} from 'react';
import {onAuthStateChanged, signOut as authSignOut} from 'firebase/auth';
import {auth} from './firebase'
const AuthUserContext = createContext({//Storing default value of user that components will use
    authUser: null,
    isLoading:true//to know if firebase is loading data
});



export function useFirebaseAuth(){
    const[authUser, setAuthUser] = useState(null);
    const[isLoading, setIsLoading] = useState(true);

    const authStateChanged = async (user)=>{//Handling Authentication Logic
        setIsLoading(true);
        if(!user){
            setAuthUser(null);
            setIsLoading(false);
            return
        }
        setAuthUser({
            uid: user.uid,
            email:user.email
        });
        setIsLoading(false);
    }    


    const signOut = () => authSignOut(auth).then(()=>{

        setAuthUser(null);
        setIsLoading(false)

    });

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged)//listen for state changes - changes whenever user logs in

    }, []);

    return{
        authUser,
        isLoading,
        signOut
    }

}

export function AuthUserProvider({children}){// To return a provider for the context created above
    const auth = useFirebaseAuth();
    return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
}

export const useAuth = () => useContext(AuthUserContext)