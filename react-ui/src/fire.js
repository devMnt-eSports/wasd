import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC7SgVaoK9lpaf1uteFDDbyTGeC-EnwB6w",
  authDomain: "wasd-2cc89.firebaseapp.com",
  databaseURL: "https://wasd-2cc89.firebaseio.com",
  projectId: "wasd-2cc89",
  storageBucket: "gs://wasd-2cc89.appspot.com",
  messagingSenderId: "643670495055"
};

const fire = firebase.initializeApp(config);

export { fire };
