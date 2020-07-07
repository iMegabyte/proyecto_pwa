function registrar() {
  var correoRegistro = document.getElementById('correoRegistro').value;
  var contrasenaRegistro = document.getElementById('contrasenaRegistro').value;
  if (correoRegistro.length < 1) {
    alert('Favor de registrar una dirección de correo electrónico.');
    return;
  }
  if (contrasenaRegistro.length < 1) {
    alert('Favor de ingresar una contraseña.');
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(correoRegistro, contrasenaRegistro)
    .then(function () {
      alert('Cuenta registrada satisfactoriamente.');
      document.getElementById('correoRegistro').value = "";
      document.getElementById('contrasenaRegistro').value = "";
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('Favor de ingresar contraseña de almenos 6 caracteres');
      } else if(errorCode === 'auth/email-already-in-use'){
        alert('La cuenta ya existe en uso por otro usuario');
      }
      console.log(error);
    });

}

function iniciarSesion() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById('correoSesion').value;
    var password = document.getElementById('contrasenaSesion').value;
    if (email.length < 1) {
      alert('Favor de introducir su correo electrónico.');
      return;
    }
    if (password.length < 1) {
      alert('Favor de introducir su contraseña.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function () {
        window.location = 'inicio.html';
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Contraseña incorrecta.');
        } else if(errorCode == 'auth/user-not-found'){
          alert('Cuenta inexisente, verificar datos');
        }
        // [END_EXCLUDE]
      });
    // [END authwithemail]
  }
  observador();
}
observador();

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var usuName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
      console.log("Sesion activa");
      console.log(user);
    } else {
      // User is signed out.
      // ...
      console.log("Sin sesion activa");
    }
  });
}

function irInicio(user) {
  document.location = "inicio.html";
  var contenedor = document.getElementById('contenedor');
  var usu = user;
  contenedor = "";
  contenedor.innerHTML = usu;
}

function cerrarSesion() {
  firebase.auth().signOut()
    .then(function () {
      window.location = "index.html";
      console.log('Se ha cerrado sesion.');
    })
    .catch(function (error) {
      console.log(error);
    })
}

function resetPass() {
  var email = document.getElementById('correoSesion').value;
  if(email.length < 1){
    
  }
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Se ha enviado un correo de recuperacion al correo: ' + email + 'Si el correo no se visualiza en bandeja de entrada, verifique correo no deseado');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if(email.length < 1){
      alert('Favor de proporcionar un correo electrónico');
    }else if (errorCode == 'auth/invalid-email') {
      alert('Correo electronico no válido, verifique información');
    } else if (errorCode == 'auth/user-not-found') {
      alert('Cuenta inexistente, verifique datos');
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}