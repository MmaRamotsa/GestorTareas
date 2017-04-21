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
  var ref = firebase.database();
  //Con el método child apuntamos a un elemento de la base de datos.
  var dbTareas = ref.ref().child("tarea");
  var dbMetadatos = ref.ref().child("metadatos/numero");
  var ulTareas = document.getElementById("listaTareas");


  var consulta = dbTareas.orderByChild("estado").equalTo("0").limitToFirst(1);
  console.log(consulta);

  //Sincronizar cambios de la lista
  dbTareas.on('child_added', snap => {
    var li = document.createElement("li");
    li.innerText = snap.val().asunto;
    li.id = snap.key;
    ulTareas.appendChild(li);
  });

  //Esto no funciona
  dbMetadatos.on('value',snap => {
     var numChanged = document.getElementById(snap.key);
     numChanged.innerText = "(" + snap.val() + ")";
  });

  $("#addTarea").on("click",nuevaTarea)

});

function muestraTareas(){

}

function nuevaTarea(){
  location.href = "nueva_tarea.html";
}
