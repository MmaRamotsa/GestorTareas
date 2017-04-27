//TODO: Me faltan todas las validaciones
var ref, refTareas;
var nuevoId;
$(document).ready(function() {
 // Initializa Firebase
  var config = {
    apiKey: "AIzaSyDyhTlFeQUOn8DpH9rvjSkbilSNgV7z2Bk",
    authDomain: "gestor-de-tareas-c2032.firebaseapp.com",
    databaseURL: "https://gestor-de-tareas-c2032.firebaseio.com",
    projectId: "gestor-de-tareas-c2032",
    storageBucket: "gestor-de-tareas-c2032.appspot.com",
    messagingSenderId: "198899505899"
  };
  firebase.initializeApp(config);

  ref = firebase.database();
  //---------------------------------------------------------
  //Hacemos referencia a la base de datos al objeto metadatos
  // y leemos el último valor para el id.
  var ultimoId = ref.ref("metadatos/ultimoId");

  ultimoId.on("value", snap=>{
    nuevoId = (+snap.val() +1).toString();
  });
  //Los botones alta y cancelar
  $("#alta").on("click",altaTarea);
  $("#cancelar").on("click",cancelar);
});


function altaTarea(){
  var txtAsunto = $("#asunto").val();
  var txtDetalle = $("#detalle").val();
  var txtFechaLimite = $("#fecha-limite").val();

  if (validaEntrada()){
    //Se añade un nuevo elemento a la base de datos tarea
    ref.ref("tarea/"+nuevoId).set({
      asunto: txtAsunto,
      detalle: txtDetalle,
      fechaLimite: txtFechaLimite,
      estado: 0,
      tipo: "simple"
    });

    //Además de añadir la tarea tenemos que cambiar los valores utimoId y contador
    ref.ref("metadatos").update({
      ultimoId: nuevoId.toString()
    });
    //Una vez dada de alta volvemos a la página de tareas
    location.href ="index.html";
  } else{
    alert("Debe incluir un texto el asunto.");
    $("#asunto").focus();
  }
}

function validaEntrada(arg){
  var txtasunto = $("#asunto").val();
  var txtfecha = $("#fecha-limite").val();

  return ((txtasunto=="")?false: true);

  // if (txtfecha.trim()<>""){

  // }
}

function validaFecha(fecha){

}

function cancelar(){
  location.href ="index.html";
}