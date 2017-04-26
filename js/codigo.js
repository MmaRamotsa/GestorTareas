var contador=0;
var ref, refTareas, numTareasPendientes;

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


  //Al eliminar una tarea desaparece de la lista.
  refTareas.on('child_removed', snap => {
    var filaAEliminar = document.getElementById(snap.key);
    filaAEliminar.remove();
    contador--;
  });

  //Mostramos todas las tareas que hay pendientes
  mostrarTareas();

  $("#addTarea").on("click",nuevaTarea);

  $("#editar").on("click",editaTarea);

  $("#cancelar").on("click",escondeFormulario);

});

//Esta función muestra todas las tareas en una tabla.
//TODO: Las tareas que están terminadas deberían mostrarse en otro color o tachadas
//Pero todavía no está hecho.
function mostrarTareas(){
  var tbodyTareas = document.getElementById("tabla-listatareas");
  var numTareas = document.getElementById("contador");
  var numTareasPendientes=0;

  //Al añadir una tarea, se crea una nueva fila en la tabla.
  refTareas.on('child_added', snap => {
    var trTarea = document.createElement("tr");
    var tdAsunto = document.createElement("td");
    var tdFecha = document.createElement("td");
    var tdBtnEdit = document.createElement("td");
    var tdBtnMark = document.createElement("td");
    var tdBtnDelete = document.createElement("td");

    var btn = '<button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-sm btn-primary" type="button">';
    var btnDelete = '<button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-sm btn-danger" type="button">';


    var btnEdit = btn +
                  "<i class='material-icons pmd-xs' onclick='editaEstaTarea(" + snap.key +")' >mode_edit</i>" +
                  "</button>";
    var btnMark = btn +
                  "<i class='material-icons pmd-xs' onclick='marcaCompletadaEstaTarea(" + snap.key +")' >check</i>" +
                  "</button>";
    btnDelete = btnDelete +
                  "<i class='material-icons pmd-xs' onclick='borraEstaTarea(" +  snap.key +")''>delete_forever</i>" +
                  "</button>";

    trTarea.id = snap.key;
    tdAsunto.innerText = snap.val().asunto;
    tdFecha.innerText =  (snap.val().fechaLimite ==undefined)?"---":snap.val().fechaLimite;
    tdBtnEdit.innerHTML = btnEdit;
    tdBtnMark.innerHTML = btnMark;
    tdBtnDelete.innerHTML = btnDelete;

    numTareasPendientes++;
    numTareas.innerHTML = "(" + numTareasPendientes + ")";
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
  contador--;
}


function marcaCompletadaEstaTarea(id){
  alert("Marca completada la tarea: " + id);
}

function editaEstaTarea(id){
  var tarea = refTareas.child(id);

  //Muestra el formulario con los datos de la tarea
  //Ponemos los datos en el formulario
  tarea.once("value", snap => {
    var datos = snap.val();

    $("#asunto").val(datos.asunto);
    $("#detalle").val(datos.detalle);
    $("#fecha-limite").val(datos.fechaLimite);
  });


  //Mostramos el formulario
  $("#datosEntrada").css("display","block");
}

function escondeFormulario(){
  $("#datosEntrada").css("display","none");
}

function editaTarea(){
  //para guardar los cambios en la tarea
}