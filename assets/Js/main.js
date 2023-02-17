const mostrarlistado = document.getElementById('mostrarlistado');
const addbtn = document.getElementById('agregar');
const inputNombre = document.getElementById('nombref').value;
const inputApellido = document.getElementById('apellidof').value;
const inputTelefono = document.getElementById('telefonof').value;
let listado = document.getElementById('listado');

let On = false;

let url = 'http://www.raydelto.org/agenda.php';
fetch(url).then( response => response.json())
    .then( data => mostrarData(data) )
    .catch( error => console.log(error) )

    mostrarlistado.addEventListener("click", function()
    {
        if(On){
            listado.style.display="block";
            On = false;
        }
        else{
            listado.style.display="none";
            On = true;
        }
    });
    
const mostrarData = (data) => {
    let body = ""
    // En "data.length - 10" funciona para traeme solo los 10 ultimos registro 
    for (var i = data.length - 10; i < data.length; i++) {      
       body+=`<tr><td>${data[i].id}</td><td>${data[i].nombre}</td><td>${data[i].apellido}</td><td>${data[i].telefono}</td></tr>`
    }
    document.getElementById('data').innerHTML = body
    //console.log(body)
}

function Clear() {
    inputNombre.value = "";
    inputNombre.focus();
    inputApellido.value = "";
    inputTelefono.value = "";
  }
   
  function saveContacto(){
    var formulario = document.getElementById("formulario");
    var datos = new FormData(formulario)
    fetch(url, {
        method:'POST',
        body: JSON.stringify({
            nombre: datos.get('nombre'),
            apellido: datos.get('apellido'),
            telefono: datos.get('telefono')
        })
    }).then(Response => Response.json()).then(json => console.log(json))
    }
    addbtn.addEventListener("click", function(){
        saveContacto();
    })