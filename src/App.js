import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  // var firebaseConfig = {
    apiKey: "AIzaSyB9NYQaxzqrn_wwxe7S7wT1NBuYVLE9KS8",
    authDomain: "chat-cf69a.firebaseapp.com",
    databaseURL: "https://chat-cf69a-default-rtdb.firebaseio.com/",
    projectId: "chat-cf69a",
    storageBucket: "chat-cf69a.appspot.com",
    messagingSenderId: "812703598840",
    appId: "1:812703598840:web:0000e72f9a652ca3ea530d"
  // };
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
 
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn /> }
      </section>

    </div>
  );
}

function SignIn() {
  const signinwithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signinwithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
