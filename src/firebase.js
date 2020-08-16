import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyAV-_DWAZIv8Ah6Q2kZ3FX11zNKvOZTz5U",
    authDomain: "custom-menu-generator.firebaseapp.com",
    databaseURL: "https://custom-menu-generator.firebaseio.com/",
    projectId: "custom-menu-generator",
    storageBucket: "custom-menu-generator.appspot.com",
    messagingSenderId: "152979872272",
    appId: "1:152979872272:web:4d12a1e635da5cb9490895",
    measurementId: "G-320XP3VWEC"
};

//Initialize
    firebase.initializeApp(config)

export default firebase;