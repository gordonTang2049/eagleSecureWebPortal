import firebase, { auth } from 'firebase'
import {
    Dispatch,
    SetStateAction
} from 'react'


export type initialAuthContext = firebase.User | null

export type AuthContextType = any | {
    currentUser: initialAuthContext
    setCurrentUser: Dispatch<SetStateAction<initialAuthContext>>

}


// type firebase.auth.UserCredential = {
//     additionalUserInfo?: auth.AdditionalUserInfo | null | undefined;
//     credential: auth.AuthCredential | null;
//     operationType?: string | null | undefined;
//     user: firebase.auth.User | null;
//     }

//     A structure containing a User,
//      an AuthCredential,
//       the operationType,
//        and any additional user information that was returned from the identity provider.
//         operationType could be 'signIn' for a sign-in operation,
//          'link' for a linking operation and 'reauthenticate' for a reauthentication operation