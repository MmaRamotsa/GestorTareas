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

  //Hacemos referencia a la base de datos.
  ref = firebase.database();
  //Con el método child apuntamos a un elemento de la base de datos; en este caso tarea.
  refTareas = ref.ref().child("tarea");
  var refContador = ref.ref().child("metadatos/contador");

  //Mostramos todas las tareas que hay pendientes
  mostrarTareas();

  //Muestra el número total de tareas
  refContador.on('value',snap => {
     var idContador = document.getElementById(snap.key);
     idContador.innerText = "(" + snap.val() + ")";
  });

  $("#addTarea").on("click",nuevaTarea);

});

function mostrarTareas(){
  var tbodyTareas = document.getElementById("tabla-listatareas");

  refTareas.on('child_added', snap => {
    var trTarea = document.createElement("tr");
    var tdAsunto = document.createElement("td");
    var tdFecha = document.createElement("td");
    var tdBtnEdit = document.createElement("td");
    var tdBtnMark = document.createElement("td");
    var tdBtnDelete = document.createElement("td");

    var btnEdit ="<i class='individual material-icons'>mode_edit</i>";
    var btnMark ="<i class='individual material-icons'>check</i>";
    var btnDelete ="<i class='individual material-icons' onclick='borraEstaTarea(" +  snap.key +")''>delete_forever</i>";

    tdAsunto.innerText = snap.val().asunto;
    tdFecha.innerText =  (snap.val().fechaLimite ==undefined)?"---":snap.val().fechaLimite;
    tdBtnEdit.innerHTML = btnEdit;
    tdBtnMark.innerHTML = btnMark;
    tdBtnDelete.innerHTML = btnDelete;

    trTarea.id = snap.key;
    trTarea.appendChild(tdAsunto);
    trTarea.appendChild(tdFecha);
    trTarea.appendChild(tdBtnEdit);
    trTarea.appendChild(tdBtnMark);
    trTarea.appendChild(tdBtnDelete);
    tbodyTareas.appendChild(trTarea);
  });
}

function nuevaTarea(){
  location.href = "nueva_tarea.html";
}

//Cuando se haga click en un botón que tenga como id "borrar_":
// -Acceder a la BD
// -Eliminar el objeto cuyo id coincida
// -Decrementar el contador
function borraEstaTarea(id){
  var tarea = ref.ref("tarea/"+id);
  tarea.remove();

  //Además de eliminar la tarea tenemos que decrementar el valor de contador

  //location.reload();
}