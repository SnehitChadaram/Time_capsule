var mainText = document.getElementById("mainText");
var emailText = document.getElementById("emailText");
var submitBtn = document.getElementById("submitBtn");
var messageRetrieve = document.getElementById("messageRetrieve");

var email;      //Setting it as global variable risky

var messageRetrieveRef = firebase.database().ref().child("Text");

messageRetrieveRef.on('value', function(datasnapshot){
  messageRetrieve.innerText = datasnapshot.child("-LLFqmRXKYvxbbWe9m2N").child("Message").val();
  var messages = document.getElementById("iDiv");
  var secMsg = document.createElement('p');
  messageRetrieve.innerHTML += datasnapshot.child("-LLFYdn6CrKoXIOSqZCo").child("Message").val();

});

function submitClick()
{
  var firebaseRef = firebase.database().ref();
  var messageText = mainText.value;
  var emailReciever = emailText.value;
  firebaseRef.child("Text").push().set({
                                Message: messageText,
                                Email_sender: email,
                                Email_reciever: emailReciever
                              });
//  firebaseRef.child("Text").child("Email").set(messageText);
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();

    var dialog = document.querySelector('#loginDialog');
    /*
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    */
    dialog.close();

  } else {

    $(".login-cover").show();

    // No user is signed in.
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

  }
});


/* LOGIN PROCESS */

$("#loginBtn").click(
  function(){


    email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#loginError").show().text(errorMessage);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
    }
  }
);


/* LOGOUT PROCESS */

$("#signOutBtn").click(
  function(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

  }
);
