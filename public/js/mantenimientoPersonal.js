// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBetQG19kY4G6VItzXqvLCroFbH-8ViS6A",
    authDomain: "directoriopt-12423.firebaseapp.com",
    projectId: "directoriopt-12423"
});
var db = firebase.firestore();
//Agregar documento
function guardar() {
    var forma = document.getElementById('forma');
    //validarForma(forma);
    if (validarForma(forma)) {
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellidos').value;
        var tecs = document.getElementsByName('tecnologias');
        var tecnologias = new Array();
        for (var i = 0, j = tecs.length; i < j; i++) {
            var tec = tecs[i];
            if (tec.checked) {
                tecnologias.push(tec.value);
            }
        }
        var genero = document.querySelector('input[name=genero]:checked').value;
        var estudios = forma['estudios'].value;
        var experiencia = document.querySelector('input[name=experiencia]:checked').value;
        var correo = document.getElementById('correo').value;

        db.collection("personal_tecnico").add({
            nombre: nombre,
            apellido: apellido,
            tecnologias: tecnologias,
            genero: genero,
            estudios: estudios,
            experiencia: experiencia,
            correo: correo
        })
            .then(function (docRef) {
                limpiarForma();
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
}
//Leer documento
var tabla = document.getElementById('tabla');
db.collection("personal_tecnico").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `
                    <tr>
                        <td>${doc.id}</td>
                        <td>${doc.data().nombre}</td>
                        <td>${doc.data().apellido}</td>
                        <td>${doc.data().tecnologias}</td>
                        <td>${doc.data().genero}</td>
                        <td>${doc.data().estudios}</td>
                        <td>${doc.data().experiencia}</td>
                        <td>${doc.data().correo}</td>
                        <td><button class = "btn btn-danger" onClick = "eliminar('${doc.id}')">Eliminar</buttton></td>
                        <td><button class = "btn btn-warning" onClick = "editar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().tecnologias}','${doc.data().genero}','${doc.data().estudios}','${doc.data().experiencia}','${doc.data().correo}')">Editar</buttton></td>
                    </tr>
                    
        `;
    });
});
//Borrar documento
function eliminar(id) {
    db.collection("personal_tecnico").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}
//Edita documento
function editar(pid, pnombre, papellido, ptecnologias, pgenero, pestudios, pexperiencia, pcorreo) {
    document.getElementById('nombre').value = pnombre;//nombre
    document.getElementById('apellidos').value = papellido;//apellidos
    var cadena = ptecnologias;//tecnologias
    var tecs = document.getElementsByName('tecnologias');
    for (var x = 0; x < tecs.length; x++) {
        var tec = tecs[x].value;
        if (cadena.includes(tec)) {
            tecs[x].checked = true;
        }
    }
    var gens = document.getElementsByName('genero');//genero
    var g = pgenero;
    for (var y = 0; y < gens.length; y++) {
        var gen = gens[y].value;
        if (g == gen) {
            gens[y].checked = true;
        }
    }
    document.getElementById('estudios').value = pestudios;//estudios
    var expSiNo = document.getElementsByName('experiencia');//experiencia laboral
    var exp = pexperiencia;
    for (var z = 0; z < expSiNo.length; z++) {
        var editExp = expSiNo[z].value;
        if (exp == editExp) {
            expSiNo[z].checked = true;
        }
    }
    document.getElementById('correo').value = pcorreo;//correo
    var boton = document.getElementById('boton');
    boton.value = 'Actualizar información'
    boton.onclick = function () {
        if (validarForma()) {
            var personalTecnicoRef = db.collection("personal_tecnico").doc(pid);
            var nombre = document.getElementById('nombre').value;
            var apellido = document.getElementById('apellidos').value;
            var tecs = document.getElementsByName('tecnologias');
            var tecnologias = new Array();
            for (var i = 0, j = tecs.length; i < j; i++) {
                var tec = tecs[i];
                if (tec.checked) {
                    tecnologias.push(tec.value);
                }
            }
            var genero = document.querySelector('input[name=genero]:checked').value;
            var estudios = forma['estudios'].value;
            var experiencia = document.querySelector('input[name=experiencia]:checked').value;
            var correo = document.getElementById('correo').value;
            return personalTecnicoRef.update({
                nombre: nombre,
                apellido: apellido,
                tecnologias: tecnologias,
                genero: genero,
                estudios: estudios,
                experiencia: experiencia,
                correo: correo
            })
                .then(function () {
                    console.log("Document successfully updated!");
                    limpiarForma();
                    boton.value = 'Guardar';
                    boton.onclick = function () {
                        guardar();
                    }
                    alert("Información actualizada correctamente.");
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }
    }
}
//validacion formulario
function validarForma() {
    //Validando nombre
    const pattern = new RegExp("^[A-Za-z ]+$");
    var nombre = forma.nombre;
    if (nombre.value == "") {
        alert("Favor de proporcionar nombre");
        nombre.focus();
        nombre.select();
        return false;
    }
    if (!pattern.test(nombre.value)) {
        alert("Nombre no válido.");
        nombre.focus();
        nombre.select();
        return false;
    }
    //Validamos el apellidos
    var apellidos = forma.apellidos;
    if (apellidos.value == "") {
        alert("Favor de proporcionar apellidos");
        apellidos.focus();
        apellidos.select();
        return false;
    }
    if (!pattern.test(apellidos.value)) {
        alert("Apellido no válido.");
        apellidos.focus();
        apellidos.select();
        return false;
    }
    //Validamos las tecnologias
    var tecnologias = forma.tecnologias;
    var checkSeleccionado = false;
    for (i = 0; i < tecnologias.length; i++) {
        if (tecnologias[i].checked) {
            checkSeleccionado = true;
        }
    }
    if (!checkSeleccionado) {
        alert("Favor de indicar las tecnologías que domina.");
        return false;
    }
    //Validamos el Genero
    var generos = forma.genero;
    var radioSeleccionado = false;
    for (i = 0; i < generos.length; i++) {
        if (generos[i].checked) {
            radioSeleccionado = true;
        }
    }
    if (!radioSeleccionado) {
        alert("Favor de seleccionar su género");
        return false;
    }
    //Validamos la grado de estudios
    var estudios = forma.estudios;
    if (estudios.value == "") {
        alert("Favor de indicar su grado de estudios.");
        return false;
    }
    //Validamos la experiencia laboral
    var exp = forma.experiencia;
    var radioSelected = false;
    for (i = 0; i < exp.length; i++) {
        if (exp[i].checked) {
            radioSelected = true;
        }
    }
    if (!radioSelected) {
        alert("Favor de indicar si posee experiencia laboral.");
        return false;
    }
    //Validando correo
    const patternCorreo = new RegExp("^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$");
    var correo = forma.correo;
    if (correo.value == "") {
        alert("Favor de proporcionar correo válido");
        correo.focus();
        correo.select();
        return false;
    }
    if (!patternCorreo.test(correo.value)) {
        alert("Favor de intoducir un correo válido.");
        correo.select();
        correo.focus();
        return false;
    }
    //Formulario validado
    alert("Formulario válido, datos enviados con éxito.");
    return true;
}
//Limpia el formulario
function limpiarForma() {
    var boton = document.getElementById('limpiarForma');
    boton.click();
}