import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBIqDwDz-Wd89K8LZ_GaAgEh7-vg1KTr7c",
    authDomain: "todolist-adv-react.firebaseapp.com",
    databaseURL: "https://todolist-adv-react-default-rtdb.firebaseio.com",
    projectId: "todolist-adv-react",
    storageBucket: "todolist-adv-react.appspot.com",
    messagingSenderId: "136405839754",
    appId: "1:136405839754:web:758204c339715a4be0a273",

});

export { firebaseConfig as firebase };