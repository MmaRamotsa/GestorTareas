//TODO: Me faltan todas las validaciones
//TODO: Arreglar formato de fecha
var contador=0;
var ref, refTareas;
var numTareasPendientes=0;

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
    if (parseInt(snap.val().estado) ==0){
      actualizaTareasPendientes("--");
    }
    filaAEliminar.remove();
  });

  //Al editar una tarea se vuelve a mostrar su valor.
  refTareas.on('child_changed', snap => {
    var claseAplicada = "pendiente";
    var filaACambiar = document.getElementById(snap.key);
    var tbodyTareas = document.getElementById("tabla-listatareas");
    var btn = '<button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-sm btn-primary" type="button">';
    var btnDelete = '<button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-sm btn-danger" type="button">';
    var btnDescription = '<button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-sm btn-success" type="button" data-toggle="modal" data-target="#myModal">';

    //Botón para editar la tarea
    var btnEdit = btn +
                  "<i class='material-icons pmd-xs' onclick='editaEstaTarea(" + snap.key +")' >mode_edit</i>" +
                  "</button>";
    //Botón para completar la tarea
    var btnMark = btn +
                  "<i class='material-icons pmd-xs' onclick='marcaCompletadaEstaTarea(" + snap.key +")' >check</i>" +
                  "</button>";
    //Botón que muestra un modal cn la descripción de la tarea
    btnDescription = btnDescription +
                    "<i class='material-icons pmd-xs' onclick='verEstaTarea(" + snap.key +")' >description</i>" +
                    "</button>";
    //Botón para eliminar la tarea
    btnDelete = btnDelete +
                  "<i class='material-icons pmd-xs' onclick='borraEstaTarea(" +  snap.key +")''>delete_forever</i>" +
                  "</button>";

    //Modificamos la fila de la tarea que ha cambiado poniendo los nuevos valores.
    filaACambiar.innerHTML= "<td>" + snap.val().asunto + "</td>" +
                            "<td>" + snap.val().fechaLimite + "</td>" +
                            "<td>" + btnDescription + "</td>";
    if (parseInt(snap.val().estado)==1){
      claseAplicada = "completada";
      //En el caso de que la tarea ya esté completada, no se muestran los botones editar y copletar
      filaACambiar.innerHTML += "<td></td>"  +
                                "<td></td>";
    } else{
      claseAplicada = "pendiente";
      filaACambiar.innerHTML += "<td>" + btnEdit + "</td>"  +
                                "<td>" + btnMark + "</td>";
    }
    filaACambiar.innerHTML = filaACambiar.innerHTML +
                            "<td>" + btnDelete + "</td>" ;
    //Añadimos una clase que da estilo a la línea  en función de  si
    //la tarea ya está completada o si está pendiente:
    // La tarea completada se muestra en gris y tachada.
    // La tarea pendiente se muestra en color rojo.
    $(filaACambiar).addClass(claseAplicada);
  });


  //Mostramos todas las tareas.
  mostrarTareas();

  //Eventos para los botones generales.
  $("#addTarea").on("click",nuevaTarea);

  $("#editar").on("click",guardarCambios);

  $("#cancelar").on("click",escondeFormulario);

});

//Esta función muestra todas las tareas en una tabla.
//TODO: Las tareas que están terminadas deberían mostrarse en otro color o tachadas
//Pero todavía no está hecho.
function mostrarTareas(){
  var tbodyTareas = document.getElementById("tabla-listatareas");
  var numTareas = document.getElementById("contador");

  //Al añadir una tarea, se crea una nueva fila en la tabla.
  refTareas.on('child_added', snap => {
    var claseAplicada = "pendiente";
    //Para cada tarea creamos una fila dentro del body de la tabla
    var trTarea = document.createElement("tr");
    var btnEdit = "";
    var btnMark = "";
    var btn = '<button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-sm btn-primary" type="button">';
    var btnDelete = '<button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-sm btn-danger" type="button">';
    var btnDescription = '<button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-sm btn-success" type="button" data-toggle="modal" data-target="#myModal">';

    if (parseInt(snap.val().estado)==1){
      claseAplicada = "completada";
    } else {
      //Los botones editar y completar sólo aparecen cuando la tarea está pendiente
      btnEdit = btn +
                    "<i class='material-icons pmd-xs' onclick='editaEstaTarea(" + snap.key +")' >mode_edit</i>" +
                    "</button>";
      btnMark = btn +
                    "<i class='material-icons pmd-xs' onclick='marcaCompletadaEstaTarea(" + snap.key +")' >check</i>" +
                    "</button>";
    }

    //El botón de borrado aparece siempre
    btnDelete = btnDelete +
                  "<i class='material-icons pmd-xs' onclick='borraEstaTarea(" +  snap.key +")''>delete_forever</i>" +
                  "</button>";
    btnDescription = btnDescription +
                    "<i class='material-icons pmd-xs' onclick='verEstaTarea(" + snap.key +")' >description</i>" +
                    "</button>";

    var fecha = (snap.val().fechaLimite ==undefined)?"---":snap.val().fechaLimite;
    trTarea.id = snap.key;
    trTarea.innerHTML = "<td>" + snap.val().asunto + "</td>" +
                    "<td>" + fecha + "</td>" +
                    "<td>" + btnDescription + "</td>" +
                    "<td>" + btnEdit + "</td>" +
                    "<td>" + btnMark + "</td>" +
                    "<td>" + btnDelete + "</td>";

    if (parseInt(snap.val().estado) ==0){
      actualizaTareasPendientes("++");
    }else{
      if (numTareasPendientes==1){
        numTareas.innerHTML = "(tienes " + numTareasPendientes + " tarea pendiente)";
      } else {
        numTareas.innerHTML = "(tienes " + numTareasPendientes + " tareas pendientes)";
      }
    }

    trTarea.id = snap.key;
    $(trTarea).addClass(claseAplicada);
    tbodyTareas.appendChild(trTarea);
  });
}

function nuevaTarea(){
  location.href = "nueva_tarea.html";
}


function verEstaTarea(id){
  var tarea = refTareas.child(id);
  //Mostramos un modal con los detalles de la tarea
  tarea.once("value", snap => {
    var datos = snap.val();
    var descripcion = (datos.detalle =="")?"<i>No hay más detalles de esta tarea.</i>":datos.detalle;

    $(".modal-title").html(datos.asunto);
    $(".modal-body").html("<p>" + descripcion + "</p>");
  });
}
//Cuando se haga click en un botón de borrar:
// -Acceder a la BD
// -Eliminar el objeto cuyo id coincida
// -Decrementar el contador
function borraEstaTarea(id){
  var tarea = ref.ref("tarea/"+id);
  var estado = tarea.estado;
  tarea.remove();
  if (estado=="0"){actualizaTareasPendientes("--");}
}

function marcaCompletadaEstaTarea(id){
  refTareas.child(id).update({
    estado: "1"
  });
  actualizaTareasPendientes("--");
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
    $("#idtarea").val(id);
  });

  //Mostramos el formulario
  //$("#datosEntrada").css("visibility","visible");
  $("#datosEntrada").slideDown("slow");

}

function escondeFormulario(){
  //$("#datosEntrada").fadeOut("slow");
  $("#datosEntrada").slideUp("slow");
}

function guardarCambios(){
  refTareas.child($("#idtarea").val()).update({
    asunto: $("#asunto").val(),
    detalle: $("#detalle").val(),
    fechaLimite:  $("#fecha-limite").val()
  });
  escondeFormulario();
}

function actualizaTareasPendientes(arg){
  var mensaje = " tareas pendientes)"
  if (arg=="++"){ numTareasPendientes++;}
  else {numTareasPendientes--;}

  if (numTareasPendientes==1){
    mensaje = " tarea pendiente)"
  }
  $("#contador").html("(tienes " + numTareasPendientes + mensaje);
}