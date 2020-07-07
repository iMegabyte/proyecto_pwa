function validarForma(forma) {
    //Validando nombre
    var nombre = forma.nombre;
    if (nombre.value == "") {
        alert("Debe proporcionar un Nombre");
        nombre.focus();
        nombre.select();
        return false;
    }
    //Validamos el apellidos
    var apellidos = forma.apellidos;
    if (apellidos.value == "") {
        alert("Debe proporcionar un apellidos");
        apellidos.focus();
        apellidos.select();
        return false;
    }
    //Validamos las tecnologias
    var tecnologias = forma.tecnologias;
    var checkSeleccionado = false;
    //revisamos si se selecciono algun checkbox
    for (i = 0; i < tecnologias.length; i++) {
        if (tecnologias[i].checked) {
            checkSeleccionado = true;
        }
    }
    if (!checkSeleccionado) {
        alert("Debe indicar las tecnologías que domina.");
        return false;
    }
    //Validamos el Genero
    var generos = forma.genero;
    var radioSeleccionado = false;
    //revisamos si se selecciono algun radiobutton
    for (i = 0; i < generos.length; i++) {
        if (generos[i].checked) {
            radioSeleccionado = true;
        }
    }
    if (!radioSeleccionado) {
        alert("Debe seleccionar su Género");
        return false;
    }
    //Validamos la grado de estudios
    var ocupacion = forma.ocupacion;
    if (ocupacion.value == "") {
        alert("Debe indicar su grado de estudios.");
        return false;
    }
    //Validamos la experiencia laboral
    var exp = forma.experiencia;
    var radioSelected = false;
    //revisamos si se selecciono algun radiobutton
    for (i = 0; i < exp.length; i++) {
        if (exp[i].checked) {
            radioSelected = true;
        }
    }
    if (!radioSelected) {
        alert("Debe indicar si posee experiencia laboral.");
        return false;
    }
    //Validando habilidades sociales
    var social = forma.comentarios;
    if(social == ""){
        alert("Favor de indicar habilidades sociales.");
        social.focus();
        social.select();
        return false;
    }
    //Formulario validado
    alert("Formulario valido, datos enviados con éxito.");
    return true;
}