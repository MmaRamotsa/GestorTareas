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

  //Hacemos referencia a la base de datos al objeto tarea
  var ref = firebase.database().ref().child("tarea");
  var refMetadatos = firebase.database().ref().child("metadatos");
  var ulTareas = document.getElementById("listaTareas");

  //Sincronizar cambios de la lista
  ref.on('child_added',snap => {
    var li = document.createElement("li");
    li.innerText = snap.val().asunto;
    li.id = snap.key;
    ulTareas.appendChild(li);
  });

  //Esto no funciona
  // refMetadatos.on('child_changed',snap => {
  //   var numChanged = document.getElementById(snap.key);
  //   numChanged.innerText = snap.val();
  // });


  $("#addTarea").on("click", nuevaTarea);
});

function nuevaTarea(){
  $("#datosEntrada").slideDown("slow");
}

function muestraTareas(){

}