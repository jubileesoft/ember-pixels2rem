import Service from '@ember/service';
import firebase from 'firebase/app';
import 'firebase/firestore';
//const firebase = require("firebase");
// Required for side-effects
//require("firebase/firestore");

export default Service.extend({
  // #region Fields

  _db: null,
  _visitLogged: false,

  // #endregion Fields


  // #region Hooks

  init() {
    this._super(...arguments);

    const config = {
      apiKey: "AIzaSyAIkO7514mUh6caH9l_qlCYdgJfAYPZUe0",
      authDomain: "ember-pixels2rem.firebaseapp.com",
      databaseURL: "https://ember-pixels2rem.firebaseio.com",
      projectId: "ember-pixels2rem",
      storageBucket: "ember-pixels2rem.appspot.com",
      messagingSenderId: "570615026482"
    };
    firebase.initializeApp(config);

    const db = firebase.firestore();

    const settings = {
      timestampsInSnapshots: true
    };

    db.settings(settings);

    this.set('_db', db);
  },

  // #endregion Hooks


  // #region Methods

  async logVisit() {
    if (this._visitLogged) {
      return;
    }

    try {
      const ip = await $.get('https://ipapi.co/json/');

      var docRef = await this._db.collection('visits').add({
        on: firebase.firestore.Timestamp.fromDate(new Date()),
        userAgent: navigator.userAgent,
        ipInfo: ip
      });

      this.set('_visitLogged', true);
    } catch (e) {
      console.log('Firebase error: ' + e);
    }
  },

  getLastVisit() {
    return new Promise(async (resolve, reject) => {
      try {
        let snapshot = await this._db.collection('visits').orderBy('on').limit(1).get();
        snapshot.forEach(doc => {
          resolve(doc.data().on.toDate());
          return;
        });
      } catch (error) {
        reject(error);
        return;
      }
      resolve(null);
    });
  }

  // #endregion Methods
});
