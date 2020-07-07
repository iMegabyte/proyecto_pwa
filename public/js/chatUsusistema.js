// @ts-check
/** Nombre de usuario atenticado por Firebase. */
let usuario = "";
/** Conexión al sistema de autenticación de Firebase. */
// @ts-ignore
const auth = firebase.auth();
/** Tipo de autenticación de usuarios. En este caso es con Google. */
// @ts-ignore
const provider = new firebase.auth.GoogleAuthProvider();
/* Configura el proveedor de Google para que permita seleccionar de una
 * lista. */
provider.setCustomParameters({
  prompt: "select_account"
});
/* Recibe una función que se invoca cada que hay un cambio en la
 * autenticación y recibe el modelo con las características del usuario.*/
auth.onAuthStateChanged(
  /** Recibe las características del usuario o null si no ha iniciado
   * sesión. */
  usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) {
      // Usuario aceptado.
      usuario = usuarioAuth.email;
      // Muestra los mensajes del chat.
      muestraMensajes();
    } else {
      // No ha iniciado sesión. Pide datos para iniciar sesión.
      auth.signInWithRedirect(provider);
    }
  },
  // Función que se invoca si hay un error al verificar el usuario.
  procesaError
);
/** Conexión a la base de datos. */
// @ts-ignore
const firestore = firebase.firestore();
/** Agrega un usuario a la base de datos. */
function agrega() {
  /* "MENSAJE" es el nombre de la colección a la que se agregan los datos.
   * "USUARIO", "TEXTO" y "TIEMPO" son los nombres de los campos en el
   * documento.
   * El timestamp contiene la fecha y hora en que se agrega el registro.*/
  firestore.collection("MENSAJE").add({
    USUARIO: usuario,
    // @ts-ignore
    TEXTO: texto.value.trim(),
    // @ts-ignore
    TIEMPO: firebase.firestore.FieldValue.serverTimestamp()
  });
  limpiarCaja();
}
/** Muestra los mensaje almacenados en la collection "MENSAJE". Se
 * actualiza automáticamente. */
function muestraMensajes() {
  /* Consulta que se actualiza automáticamente. Pide todos los registros
   * de la colección "MENSAJE" ordenador por el campo "TIMESTAMP" de forma
   * descendente. */
  firestore.collection("MENSAJE").orderBy("TIEMPO", "asc")
    .onSnapshot(
      /** Función que muestra los datos enviados por el servidor. Si los
       * datos cambian en el servidor, se vuelve a invocar esta función y
       * recibe los datos actualizados.
       * @param {Object} querySnapshot estructura parecida a un Array, que
       * contiene una copia de los datos en el servidor. */
      querySnapshot => {
        // Vacía la lista con los mensajes.
        // @ts-ignore
        mensajes.innerHTML = "";
        if (querySnapshot.size > 0) {
          /* Cuando el número de registros devueltos por la consulta es
           * mayor que 0, Revisa un por uno los registros de la consulta y
           * los muestra. El iterador "doc" apunta a un registro de la
           * base de datos. */
          querySnapshot.forEach(doc => {
            // recupera los datos almacenados en el registro.
            const data = doc.data();
            /* Agrega un li con los datos del registro, que se codifican
             * para evitar inyección de código. */
            // @ts-ignore
            
            mensajes.innerHTML += /* html */
            
              `<li><b>${cod(data.USUARIO)} dice:</b><br>${cod(data.TEXTO)}</li>`;
            limpiarCaja();
          });
        } else {
          /* Cuando el número de registros devueltos por la consulta es
           * mayor que 0, agrega un texto HTML. */
          // @ts-ignore
          mensajes.innerHTML += /* html */
            `<li>Sin registros de mensajes</li>`;
        }
      },
      /* Función que se invoca cuando hay un error. Muestra el error. Al
       * invocar esta función la conexión se cancela. Por lo mismo, se
       * vuelve a conectar. */
      e => {
        procesaError(e);
        // Intenta conectarse otra vez.
        muestraMensajes();
      }
    );
}

/** Procesa un error. Muestra el objeto en la consola y un cuadro de
 * alerta con el mensaje.
 * @param {Error} e descripción del error. */
function procesaError(e) {
  console.log(e);
  alert(e.message);
}

/** Map que contiene el texto de escape de los caracteres especiales de
 * HTML.
 * @type {Readonly<Map<string, string>> } */
const codMap = Object.freeze(new Map([
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['"', '&quot;'],
  ["'", '&#039;']
]));

/** Codifica un texto para que escape los caracteres especiales y no se
 * pueda interpretar como HTML. Esta técnica evita la inyección de código.
 * @param {string} texto
 * @returns {string} un texto que no puede interpretarse como HTML. */
function cod(texto) {
  return (texto || "").replace(/[&<>"']/g, letra => codMap.get(letra));
}

var ultimo = null;

function marcar(elemento) {
  ultimo = elemento;
}

function limpiar() {
  if (ultimo != null) {
  	ultimo.value = "";
  }
}
function limpiarCaja(){
  var btn = document.getElementById("limpiarCaja");
  btn.click();
}