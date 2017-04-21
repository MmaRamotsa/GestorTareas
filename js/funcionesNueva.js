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


  $("#alta").on("click",altaTarea);
  $("#cancelar").on("click",cancelar);
});

function altaTarea(){
  var nuevoId;
  //Hacemos referencia a la base de datos al objeto tarea
  var ref = firebase.database();
  //Con el método child apuntamos a un elemento de la base de datos.
  var metadatos = ref.ref("metadatos");
  var ultimoid = ref.ref("metadatos/ultimoId");
  var contador = ref.ref("metadatos/contador");

  ultimoid.on("value", snap=>{
    nuevoId = (+snap.val() +1).toString();
  });

  var txtasunto = $("#asunto").val();
  var detalle = $("#detalle").val();


  if (validaEntrada()){
    firebase.database().ref("tarea/"+nuevoId).set({
      asunto: txtasunto,
      detalle: detalle,
      estado: 0,
      tipo: "simple"
    });
    //TODO: CAMBIAR EL VALOR DE ULTIMOID EN METADATOS 
    ultimoid = ref.ref("metadatos").set({
      ultimoId:nuevoId
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
  return ((txtasunto=="")?false: true);
}

function cancelar(){
  location.href ="index.html";
}