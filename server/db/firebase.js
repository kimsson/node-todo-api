var firebase = require('firebase')
var config = require('../config/firebase.js')

module.exports = {

  DB: {},

  init: function () {
    this.DB = firebase.initializeApp(config.firebase)
    // this.connect()
  },

  connect: function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('User already signed in.', user.uid)
      } else {
        console.log('Sign in...')
        firebase.auth().signInAnonymously().catch(function (error) {
          console.log('error', error)
        })
      }
    })
  },

  load: function (ref, callback) {
    this.DB.database()
      .ref(ref)
      .once('value')
      .then(callback)
  },

  push: function (ref, object, callback) {
    this.DB.database()
      .ref(ref)
      .push(object)
      .then(callback)
  },

  set: function (ref, object, callback) {
    this.DB.database()
      .ref(ref)
      .set(object)
      .then(callback)
  },

  update: function (ref, object, callback) {
    this.DB.database()
      .ref(ref)
      .update(object)
      .then(callback)
  },

  listen: function (event, ref, callback) {
    this.DB.database()
      .ref(ref)
      .on(event, callback)
  }
}
