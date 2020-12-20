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
    <>
    <button className="sign-in" onClick={signinwithGoogle}>Sign in with Google</button>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');
}

return (
  <>
  <div>
    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  </div>

<form>

<input value={formValue} />

<button type="submit"></button>

</form>

  </>
)

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>

    </div>
  )

}

export default App;
