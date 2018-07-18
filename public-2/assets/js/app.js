 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBIaXhQUE5n807-HjgCOira_GgRLrmz1h0",
  authDomain: "e-shopping-1995e.firebaseapp.com",
  databaseURL: "https://e-shopping-1995e.firebaseio.com",
  projectId: "e-shopping-1995e",
  storageBucket: "e-shopping-1995e.appspot.com",
  messagingSenderId: "201233628689"
};
firebase.initializeApp(config);


// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var password = getInputVal('password');
  var email = getInputVal('email');
  var phone = getInputVal('phone');


  // Save message
  saveMessage(name, password, email, phone);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, password, email, phone){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    password:password,
    email:email,
    phone:phone,
    
  });
}


+ function($) {
  'use strict';

  // UPLOAD CLASS DEFINITION
  // ======================

  var dropZone = document.getElementById('drop-zone');
  var uploadForm = document.getElementById('js-upload-form');

  var startUpload = function(files) {
      console.log(files)
  }

  uploadForm.addEventListener('submit', function(e) {
      var uploadFiles = document.getElementById('js-upload-files').files;
      e.preventDefault()

      startUpload(uploadFiles)
  })

  dropZone.ondrop = function(e) {
      e.preventDefault();
      this.className = 'upload-drop-zone';

      startUpload(e.dataTransfer.files)
  }

  dropZone.ondragover = function() {
      this.className = 'upload-drop-zone drop';
      return false;
  }

  dropZone.ondragleave = function() {
      this.className = 'upload-drop-zone';
      return false;
  }

}(jQuery);