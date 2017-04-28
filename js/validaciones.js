//FUNCIONES DE VALIDACION DE DATOS DE ENTRADA.
//Hay que incluir este fichero en index.html y en nueva_tarea.html.
function validaEntrada(arg){
  var valid=true;
  //Comprobamos el asunto. Si no es válido ponemos el foco en el campo.
  if (!validaAsunto()) {
    valid = false;
    $("#div-asunto").addClass("has-warning");
    $("#asunto").focus();
  }
  //Comprobamos la fecha.
  if (!validaFecha()) {
    if (valid){ $("#fecha-limite").focus();}
    $("#div-fecha-limite").addClass("has-warning");
    valid = false;
  }
  return valid;
}

//VALIDAR EL ASUNTO
//El asunto no puede estar vacío. Si está vacío o sólo tiene espacios, 
//la función devolverá falso
function validaAsunto(){
  var txtasunto = $("#asunto").val().trim();
  return ((txtasunto=="")?false: true);
}

//La fecha debe ser igual o posterior a la fecha actual
function validaFecha(){
  var fechaActual = new Date();
  var fecha = new Date($("#fecha-limite").val());
  var valid;

  if ($("#fecha-limite").val()==""){
    //La fecha no es dato obligatorio.
    valid=true;
  } else{
    //Comprobamos que es una fecha posterior a la actual
    if ((fecha.getTime()<fechaActual.getTime())){
      alert("La fecha que has introducido está en el pasado.");
      valid=false;
    } else {
      valid=true;
    }
  }
  return valid;
}