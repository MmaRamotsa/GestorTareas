var nuevoId, nuevoCont;
var contador;
var ref, refTareas;
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
  // y leemos los últimos valores para el id y para elcontador
  var ultimoid = ref.ref("metadatos/ultimoId");
  var contador = ref.ref("metadatos/contador");

  ultimoid.on("value", snap=>{
    nuevoId = (+snap.val() +1).toString();
  });
  contador.on("value", snap=>{
    nuevoCont = (+snap.val() +1).toString();
  });
  //---------------------------------------------------------

  $("#alta").on("click",altaTarea);
  $("#cancelar").on("click",cancelar);
});


function altaTarea(){
  var txtAsunto = $("#asunto").val();
  var txtDetalle = $("#detalle").val();
  var txtFechaLimite = $("#fecha-limite").val();
  var lista = "simple";

  if ($("#lista").attr('checked')){
    lista = "lista";
  }

  if (validaEntrada()){
    //Se añade un nuevo elemento a la base de datos tarea
    ref.ref("tarea/"+nuevoId).set({
      asunto: txtAsunto,
      detalle: txtDetalle,
      fechaLimite: txtFechaLimite,
      estado: 0,
      tipo: lista
    });

    //Además de añadir la tarea tenemos que cambiar los valores utimoId y contador
    ultimoid = ref.ref("metadatos").update({
      ultimoId: nuevoId.toString(),
      contador: nuevoCont.toString()
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