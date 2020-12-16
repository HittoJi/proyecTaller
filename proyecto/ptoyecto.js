class Cliente {
    constructor(id, dni, nombre, email, pwsd, numtlf) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.email = email;
        this.pwsd = pwsd;
        this.numtlf = numtlf;
    }
}
class Coche {
    constructor(idCliente, matricula) { //marca, modelo,
        this.idCliente = idCliente;
        this.matricula = matricula;
    }
}

class Revisione {
    constructor(idCliente, tipoRevision, piezasCambiadas, fechaYhora, mecanidoId, observaciones, matricula) {
        this.idCliente = idCliente;
        this.tipoRevision = tipoRevision;
        this.piezasCambiadas = piezasCambiadas;
        this.fechaYhora = fechaYhora;
        this.mecanidoId = mecanidoId;
        this.observaciones = observaciones;
        this.matricula = matricula;
    }
}
class Empleado {
    constructor(idEmpleado, nombre, dni, pswd) {
        this.idEmpleado = idEmpleado;
        this.nombre = nombre;
        this.dni = dni;
        this.pswd = pswd;
    }
}
class Producto {
    constructor(idProducto, nombre, descripcion, img, precio) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.img = img;
        this.precio = precio;
    }
}
var baseDatosProducto = [];
class Servicio {
    constructor(idServicio, nombre, descripcion, img, precio) {
        this.idServicio = idServicio;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.img = img;
        this.precio = precio;
    }
}
class Cesta {
    constructor(idProducto, idCliente) {
        this.idProducto = idProducto;
        this.idCliente = idCliente;
    }
}
var baseDatosServicio = [];
var listDeProductos = [];
// Datos para hacer pruebas Matricula------------------------------------------------------
var baseDadosCoches = []
coche = new Coche(1, "1234ABC");
baseDadosCoches.push(coche);
console.log(baseDadosCoches);

// Datos para hacer pruebas Empleado------------------------------------------------------
var baseDadosEmpleados = [];
empledo = new Empleado(1, "paco", "20611370D", 12);
baseDadosEmpleados.push(empledo);
empledo = new Empleado(1, "admin", "20611371D", 12);
baseDadosEmpleados.push(empledo);
var sesionEmpleadoLogeado = baseDadosEmpleados[0];
// Datos para hacer pruebas Clientes------------------------------------------------------
var baseDadosClientes = [];
cliente = new Cliente(1, '', "jit", "jit@alumno.com", "12", '', "4535ADG");
baseDadosClientes.push(cliente);

cliente = new Cliente(2, '', "juan", "juan@alumno.com", "12", '', "6663GFS");
baseDadosClientes.push(cliente);
// Datos para hacer pruebas Revisiones------------------------------------------------------
var date = new Date();
var fechaYhoraActual = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " - " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

var baseDadosRevisiones = [];

// Datos para hacer pruebas Revisiones------------------------------------------------------
let datosEmpleados;
let dateClientes;
let datosCoches;
let datosClientes;

function pedirDatos() {
    async function conectarEmpleados() {
        let array = [];
        await fetch('datos/datosEmpleados.json')
            .then(response => response.json())
            .then(datos => array = datos)
        return array;
    }
    async function trasformarDatosEmpleado() {
        let arraydos = await conectarEmpleados();
        let tmp = arraydos.datosEmpleados;
        datosEmpleados = tmp;
    }
    trasformarDatosEmpleado();

    async function conectarProductos() {
        let array = [];
        await fetch('datos/datosProductos.json')
            .then(response => response.json())
            .then(datos => array = datos)
        return array;
    }
    async function trasformarDatosProductos() {
        let arraydos = await conectarProductos();
        let tmp = arraydos.datosProductos;
        dateClientes = tmp;
    }
    trasformarDatosProductos();

    async function conectarCoches() {
        let array = [];
        await fetch('datos/datosCoches.json')
            .then(response => response.json())
            .then(datos => array = datos)
        return array;
    }
    async function trasformarDatosCoches() {
        let arraydos = await conectarCoches();
        let tmp = arraydos.datosCoches;
        datosCoches = tmp;
    }
    trasformarDatosCoches();

    async function conectarCliente() {
        let array = [];
        await fetch('datos/datosCliente.json')
            .then(response => response.json())
            .then(datos => array = datos)
        return array;
    }
    async function trasformarDatosClicnte() {
        let arraydos = await conectarCliente();
        let tmp = arraydos.datosCliente;
        datosClientes = tmp;
    }
    trasformarDatosClicnte();
}

var sesionUsuarioLogeado; // = baseDadosClientes[1];
console.log(baseDadosClientes);

function crearBarraSuperior() {
    document.body.innerHTML += '<div class="barraSuperrior">\
    <div class="barraItems"><span>LOGO O IMG</span></div>\
    <div class="barraItems">\
        <button type="submit" id="botonProductosBarra" onclick="crearServicios()">Servicios</button>\
    </div>\
    <div class="barraItems">\
        <button type="submit" id="botonProductosBarra" onclick="crearProductos()">Productos</button>\
    </div>\
    <div class="barraItems"><span id="sobreNosotros">Sobre nosotros</span></div>\
    <div class="barraItems">\
        <button type="submit" id="botonLoginBarra" onclick="crearLogin()">Login</button>\
    </div>\
</div>';
}

function crearLogin() {
    let cookieUsername = getCookie("username");
    document.body.innerHTML = '';
    crearBarraSuperior();
    document.body.innerHTML += '<h3>Iniciar Sesion</h3>\
    <div class="container-fluid">\
    <form action="">\
        <div class="loginItemsContenedor">\
            <div class="loginItemsContenedor">\
                <label for="email">Email</label>\
                <input type="text" id="email" autofocus class="form-control">\
            </div>\
            <div class="loginItemsContenedor">\
                <label for="pswd">Password</label>\
                <input type="password" id="pswd" class="form-control">\
            </div>\
            <div class="loginItemsContenedor">\
            <button id="iniciarSesion" class="btn btn-primary">Login</button>\
            </div>\
            <a id="soyNuevo">Eres nuevo?</a>\
            <a id="soyEmpleado">Soy Empleado!</a>\
        </div>\
    </form>\
</div>';
    if (cookieUsername != undefined) { ///Aqui
        // document.querySelector('#email').setAttribute('value', cookieUsername);
        iniciarSesionCookie();
    }

    let eventoCrearRegistro = document.querySelector('#soyNuevo');
    eventoCrearRegistro.addEventListener('click', () => {
        crearRegistrarse();
    });
    let eventoIniciarSesion = document.querySelector("#iniciarSesion");
    eventoIniciarSesion.addEventListener('click', () => {
        iniciarSesion();
    });
    let eventoSoyEmpleado = document.querySelector("#soyEmpleado");
    eventoSoyEmpleado.addEventListener('click', () => {
        crearSoyEmpleado();
    });
}

function crearCita() {
    document.body.innerHTML = '';
    crearBarraSuperior();
    document.body.innerHTML += ' <h3>Solicitar Cita</h3>\
    <div class="container-fluid">\
        <form action="">\
            <div class="citaItemsContenedor">\
                <div class="citaItemsContenedor">\
                    <label for="name">Nombre</label>\
                    <input type="text" id="name" class="form-control">\
                </div>\
                <div class="citaItemsContenedor">\
                    <label for="matricula">Matricula</label>\
                    <input type="text" id="matricula" class="form-control">\
                </div>\
                <div class="citaItemsContenedor">\
                    <label for="fechaYhora">Fecha y Hora</label>\
                    <input type="datetime-local" id="fechaYhora" class="form-control">\
                </div>\
                <div class=" citaItemsContenedor ">\
                    <button class="btn btn-primary ">Solicitar cita</button>\
                </div>\
            </div>\
        </form>\
    </div>';
}

function crearRegistrarse() {
    document.body.innerHTML = '';
    crearBarraSuperior();
    document.body.innerHTML += '<h3>Crear Cuenta</h3>\
    <div class="container-fluid">\
        <form action="">\
            <div class="citaItemsContenedor">\
                <div class="citaItemsContenedor">\
                    <label for="nombre">Nombre</label>\
                    <input type="text" id="nombre" class="form-control">\
                    <span id="errorNombre"></span>\
                </div>\
                <div class="citaItemsContenedor">\
                    <label for="email">Email</label>\
                    <input type="text" id="email" class="form-control">\
                    <span id="errorEmail"></span>\
                </div>\
                <div class="citaItemsContenedor">\
                    <label for="pswd">Password</label>\
                    <input type="password" id="pswd" class="form-control">\
                    <span id="errorPswd"></span>\
                </div>\
                <div class="citaItemsContenedor">\
                    <label for="pswdConfirm">Password confirm</label>\
                    <input type="password" id="pswdConfirm" class="form-control">\
                    <span id="errorPswdConfirm"></span>\
                </div>\
                <div class=" citaItemsContenedor ">\
                    <button class="btn btn-primary" id="botonRegistrarse">Solicitar cita</button>\
                </div>\
            </div>\
        </form>\
    </div>';
    let eventoNuevoliente = document.querySelector('#botonRegistrarse');
    eventoNuevoliente.addEventListener('click', () => {
        nuevoClienteProcesaDatos();
    });
}


function usuarioLogeado() {
    document.body.innerHTML = "";
    crearBarraSuperior();
    let cambiarFuncionDeBoton = document.querySelector("#botonLoginBarra");
    cambiarFuncionDeBoton.setAttribute("id", "botonBarraOpciones");
    cambiarFuncionDeBoton.removeAttribute("onclick", "crearLogin()");
    cambiarFuncionDeBoton.innerHTML = "Opciones";

    let borrarSobreNosotrsos = document.querySelector('#sobreNosotros');
    borrarSobreNosotrsos.remove();
    let crearCesta = document.querySelectorAll('.barraItems');
    crearCesta[3].innerHTML = '<button type="submit" id="botonCestaBarra" onclick="crearCesta()">Cesta</button>';
    let mensajeBienvenida = document.createElement("h3");
    mensajeBienvenida.innerHTML = "Hola " + sesionClienteLogeado.nombre
    document.body.appendChild(mensajeBienvenida);
    // let barraAnterior = document.querySelectorAll(".barraSuperrior");
    // barraAnterior[1].remove();
    eventoMenuOpciones();
}

function eventoMenuOpciones() {
    let eventoBotonBarraOpciones = document.querySelector('#botonBarraOpciones');
    eventoBotonBarraOpciones.addEventListener('click', () => {
        crearMenuParaUsuarioLogeado();
    });

}

function crearMenuParaUsuarioLogeado() {
    document.body.innerHTML += '<div class="menuUsuarioOpciones">\
            <a id="verPerfil">Ver Perfil</a>\
            <a id="verRevisiones">Revisiones</a>\
            <a href="">Compras</a>\
            <a href="">Proxima opcion</a>\
            <a id="logOutSesion">Cerrar sesion</a>\
        </div>'
    let eventoBotonBarraOpciones = document.querySelector('#botonBarraOpciones');
    eventoBotonBarraOpciones.addEventListener('click', () => {
        // usuarioLogeado();
        let menuSuperiorOnOff = document.querySelector('.menuUsuarioOpciones');
        if (menuSuperiorOnOff.style.getPropertyValue('display') != "none" || menuSuperiorOnOff.style.getPropertyValue('display') == undefined) {
            menuSuperiorOnOff.style.display = "none";
        } else {
            menuSuperiorOnOff.style.display = "flex";
        }

    });

    let eventoVerPerfil = document.querySelector('#verPerfil');
    eventoVerPerfil.addEventListener('click', () => {
        verPerfil()
    });
    let eventoCerrarSesion = document.querySelector('#logOutSesion');
    eventoCerrarSesion.addEventListener('click', () => {
        cerrarSesion();
    });
    let eventoVerRevisiones = document.querySelector('#verRevisiones');
    eventoVerRevisiones.addEventListener('click', () => {
        crearRevisiones();
    });
}

function verPerfil() {
    usuarioLogeado();
    document.body.innerHTML += ' <h3>Tus Datos</h3>\
    <div class="container-fluid">\
        <form action="">\
            <div class="citaItemsContenedor">\
                <div class="citaItemsContenedor">\
                    <label for="nombre">Nombre</label>\
                    <input type="text" id="nombre" class="form-control" readonly>\
                    <span id="errorNombre"></span>\
                </div>\
                <div class="citaItemsContenedor">\
                    <label for="email">Email</label>\
                    <input type="text" id="email" class="form-control" readonly>\
                    <span id="errorEmail"></span>\
                </div>\
                <div class="citaItemsContenedor">\
                    <label for="numtlf">Numero movil</label>\
                    <input type="number" id="numtlf" class="form-control" readonly>\
                    <span id="errorPswd"></span>\
                </div>\
                <div class="citaItemsContenedor">\
                    <label for="pswd">Password</label>\
                    <input type="password" id="pswd" class="form-control" readonly>\
                    <span id="errorPswd"></span>\
                </div>\
                <a id="modificarDatosUsuario">Modificar Datos</a>\
            </div>\
        </form>\
    </div>';
    document.querySelector('#nombre').setAttribute("value", sesionUsuarioLogeado.nombre);
    document.querySelector('#email').setAttribute("value", sesionUsuarioLogeado.email);
    document.querySelector('#pswd').setAttribute("value", sesionUsuarioLogeado.pwsd);

    let eventoModificarDatosUsuario = document.querySelector('#modificarDatosUsuario');
    eventoModificarDatosUsuario.addEventListener('click', () => {
        let inputsTusDatos = document.querySelectorAll("input");
        for (let i = 0; i < inputsTusDatos.length; i++) {
            inputsTusDatos[i].removeAttribute("readonly");
        }
        inputsTusDatos[3].setAttribute("type", "text");
        document.querySelector('#modificarDatosUsuario').setAttribute("id", "guardarDatosUsuario")
        document.querySelector('#guardarDatosUsuario').innerHTML = 'Guardar Datos'
            // Evento para gardar los datos-------------------------------------------------
        let eventoGuardarDatosUsuario = document.querySelector('#guardarDatosUsuario');
        eventoGuardarDatosUsuario.addEventListener('click', () => {
            let nombreModificado = document.getElementById("nombre").value;
            let emailModificado = document.getElementById("email").value;

            var idParaModificar = baseDadosClientes.map(function(item) { return item.id; }).indexOf(sesionUsuarioLogeado.id);
            baseDadosClientes[idParaModificar].nombre = nombreModificado;
            baseDadosClientes[idParaModificar].email = emailModificado;
            verPerfil();
        });
    });
    eventoMenuOpciones();
}



function nuevoClienteProcesaDatos() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let pswd = document.getElementById("pswd").value;
    let pswdConfirm = document.getElementById("pswdConfirm").value;
    let datosOk = true;
    // crearRegistrarse();
    if (nombre === '') {
        let error = document.querySelector("#errorNombre");
        let errorText = document.createTextNode("Nombre de usuario vacio");
        error.appendChild(errorText);
        datosOk = false;
    }
    if (email === '') {
        let error = document.querySelector("#errorEmail");
        let errorText = document.createTextNode("Email de usuario vacio");
        error.appendChild(errorText);
        datosOk = false;
    }
    if (pswd === '') {
        let error = document.querySelector("#errorPswd");
        let errorText = document.createTextNode("Password de usuario vacio");
        error.appendChild(errorText);
        datosOk = false;
    }
    if (pswdConfirm === '') {
        let error = document.querySelector("#errorPswdConfirm");
        let errorText = document.createTextNode("Password confirm de usuario vacio");
        error.appendChild(errorText);
        datosOk = false;
    }
    if (datosOk == true) {
        nuevoCliente();
        console.log(baseDadosClientes);
    } else {
        //crearLogin()
        //crearRegistrarse();
    }
}

function nuevoCliente() {
    cliente = new Cliente(baseDadosClientes.length + 1, '', document.getElementById("nombre").value, document.getElementById("email").value, document.getElementById("pswd").value, '');
    baseDadosClientes.push(cliente);
    crearLogin();
}

function iniciarSesion() {
    let emailLogin = document.getElementById("email").value;
    let pswdLogin = document.getElementById("pswd").value;
    let loginOK = false;
    for (let i = 0; i < baseDadosClientes.length; i++) {
        if (baseDadosClientes[i].email == emailLogin) {
            if (baseDadosClientes[i].pwsd == pswdLogin) {
                sesionUsuarioLogeado = baseDadosClientes[i]; //REVISAR
                document.cookie = "username=" + sesionUsuarioLogeado.nombre;
                loginOK = true;
            }
        }
    }
    if (loginOK == false) {
        crearLogin();
    } else {
        usuarioLogeado();
    }
}

function iniciarSesionCookie() {
    let cookieUsername = getCookie("username");
    for (let i = 0; i < baseDadosClientes.length; i++) {
        if (baseDadosClientes[i].nombre == cookieUsername) {
            sesionUsuarioLogeado = baseDadosClientes[i]; //volver aqui
            usuarioLogeado();
        }
    }
}

function cerrarSesion() {
    sesionUsuarioLogeado = undefined;
    deleteAllCookies();
    let cookies = document.cookie.split(";");
    console.log(cookies.username);
    let cookisUserName = cookies.filter(word => word.nombre == "username");

    // let cookisUserName = cookies.indexOf("username");
    document.body.innerHTML = '';
    crearBarraSuperior();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    let cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function crearRevisiones() {
    let test = "holllaa";
    usuarioLogeado();
    document.body.innerHTML += '<h3>Tus Revisiones</h3>\
    <table class="table table-striped">\
        <thead>\
            <th>Tipo de Revision</th>\
            <th>Piezas cambiadas</th>\
            <th>Fecha y Hora</th>\
            <th>Revisado por</th>\
            <th>Observaciones</th>\
        </thead>\
        <tbody>\
        </tbody>\
    </table>';
    let revisionesDelCliente = baseDadosRevisiones.filter(word => word.idCliente == sesionUsuarioLogeado.id);

    for (let i = 0; i < revisionesDelCliente.length; i++) {
        let tbody = document.querySelector("tbody")
        let trTipoRevision = document.createElement("tr");
        tbody.appendChild(trTipoRevision);

        let tdTipoRevision = document.createElement("td");
        tdTipoRevision.innerHTML = revisionesDelCliente[i].tipoRevision;
        trTipoRevision.appendChild(tdTipoRevision);

        let tdPiezasCambiadas = document.createElement("td");
        tdPiezasCambiadas.innerHTML = revisionesDelCliente[i].piezasCambiadas;
        trTipoRevision.appendChild(tdPiezasCambiadas);

        let tdFechaYhora = document.createElement("td");
        tdFechaYhora.innerHTML = revisionesDelCliente[i].fechaYhora;
        trTipoRevision.appendChild(tdFechaYhora);

        let tdMecanidoId = document.createElement("td");
        tdMecanidoId.innerHTML = revisionesDelCliente[i].mecanidoId;
        trTipoRevision.appendChild(tdMecanidoId);

        let tdObservaciones = document.createElement("td");
        tdObservaciones.innerHTML = revisionesDelCliente[i].observaciones;
        trTipoRevision.appendChild(tdObservaciones);

    }
    eventoMenuOpciones();
}

function crearSoyEmpleado() {
    document.body.innerHTML = '';
    crearBarraSuperior();
    document.body.innerHTML += `<h3>Empleados</h3>
    <div class="container-fluid">
        <form action="">
            <div class="loginItemsContenedor">
                <div class="loginItemsContenedor">
                    <label for="dni">DNI</label>
                    <input type="text" id="dni" autofocus class="form-control">
                </div>
                <div class="loginItemsContenedor">
                    <label for="pswd">Password</label>
                    <input type="password" id="pswd" class="form-control">
                </div>
                <div class="loginItemsContenedor">
                    <button id="iniciarSesion" class="btn btn-primary">Login</button>
                </div>
            </div>
        </form>
    </div>`
    let eventoIniciarSesion = document.querySelector('#iniciarSesion');
    eventoIniciarSesion.addEventListener('click', () => {
        procesaLoginEmpleado();
    });
}

function procesaLoginEmpleado() {
    let dniEmpleado = document.querySelector('#dni').value;
    let pswdEmpleado = document.querySelector('#pswd').value;
    let loginOK = false;
    for (let i = 0; i < baseDadosEmpleados.length; i++) {
        if (baseDadosEmpleados[i].dni == "20611370D") { //dniEmpleado) {
            if (baseDadosEmpleados[i].pswd == "12") { //pswdEmpleado) {
                sesionEmpleadoLogeado = baseDadosEmpleados[i]; //REVISAR
                loginOK = true;
            }
        }
    }
    if (loginOK == false) {
        crearLogin();
    } else {
        empleadoLogeado();
    }
}

console.log(baseDadosEmpleados);

function empleadoLogeado() {
    document.body.innerHTML = '<div class="barraSuperrior">\
        <div class="barraItems"><span>LOGO O IMG</span></div>\
        <div class="barraItems">\
            <button type="submit" id="nuevaRevision" onclick="crearLogin()">Nueva Revision</button>\
        </div>\
        <div class="barraItems">\
            <button type="submit" id="botonLoginBarra" onclick="crearLogin()">Tu horario</button>\
        </div>\
        <div class="barraItems">\
            <button type="submit" id="botonLoginBarra" onclick="crearLogin()">Salir</button>\
        </div>\
    </div>';
    let eventoNuevaRevision = document.querySelector('#nuevaRevision');
    eventoNuevaRevision.addEventListener('click', () => {
        nuevaRevision();
    });
    if (sesionEmpleadoLogeado.nombre == "admin") {
        document.body.innerHTML = '<div class="barraSuperrior">\
        <div class="barraItems"><span>LOGO O IMG</span></div>\
        <div class="barraItems">\
            <button type="submit" id="nuevoProducto" onclick="nuevoProductoOServicio()">Nuevo Producto o Servicio</button>\
        </div>\
        <div class="barraItems">\
            <button type="submit" id="botonLoginBarra" onclick="crearLogin()">Crear horario</button>\
        </div>\
        <div class="barraItems">\
            <button type="submit" id="botonLoginBarra" onclick="crearLogin()">Salir</button>\
        </div>\
    </div>';
    }
    let mensajeBienvenida = document.createElement("h3");
    mensajeBienvenida.innerHTML = "Empleado: " + sesionEmpleadoLogeado.nombre
    document.body.appendChild(mensajeBienvenida);
}

let idCliente;

function nuevaRevision() {
    empleadoLogeado();
    document.body.innerHTML += `<h3>Nueva Revision</h3>
    <div class="container-fluid">
        <form action="">
            <div  class="loginItemsContenedor2">
                <div class="loginItemsContenedor">
                    <label for="matricula">Matricula</label>
                    <input type="text" id="matricula" maxlength="7" class="form-control">
                    <div id="laMatriculaNoExiste">
                    </div>
                </div>
                <div class="loginItemsContenedor">
                    <label for="revisionPor">Revisado por</label>
                    <input type="text" id="revisionPor" class="form-control" readonly>
                </div>
            </div>
            <div class="loginItemsContenedor">
                <div class="loginItemsContenedor">
                    <label for="tipoRevision">Tipo de Revision</label>
                    <textarea name="tipoRevision" id="tipoRevision" rows="4" class="md-textarea form-control"></textarea>
                </div>
                <div class="loginItemsContenedor">
                    <label for="piezasCambiadas">Piezas cambiadas</label>
                    <textarea name="tipoRevision" id="piezasCambiadas" rows="4" class="md-textarea form-control"></textarea>
                </div>
                <div class="loginItemsContenedor">
                    <label for="observaciones">Observaciones</label>
                    <textarea name="observaciones" id="observaciones" rows="4" class="md-textarea form-control"></textarea>
                </div>
                <div class="loginItemsContenedor">
                    <button id="guardarRevision" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </form>
    </div>`;

    document.querySelector('#revisionPor').setAttribute("value", sesionEmpleadoLogeado.nombre);

    let matriculacheck = document.querySelector('#matricula');
    matriculacheck.addEventListener('input', mareiculaValidar);

    let divLaMatriculaNoExiste = document.querySelector('#laMatriculaNoExiste');
    let matriculaOK = false;

    console.log(sesionEmpleadoLogeado.idEmpleado);

    function mareiculaValidar(e) {
        let target = e.target;
        matriculacheck.style.color = "red";
        target.value = target.value.toUpperCase();

        if (target.value.length < 7 && matriculaOK == true) {
            let divCreaMatricula = document.querySelector('.contenedorMatricula');
            divCreaMatricula.remove();
            matriculaOK = false;
        }
        if (target.value.length == 7) {
            buscarMatricula = baseDadosCoches.filter(word => word.matricula == target.value);

            if (buscarMatricula.length > 0) {
                matriculacheck.style.color = "green";
                // comprobarDatosRevision();
            }

            if (buscarMatricula.length == 0) {
                matriculaOK = true;
                divLaMatriculaNoExiste.innerHTML += `<div class="contenedorMatricula">
                                                        <span>La matricula no existe</span>
                                                        <label for="">Nombre de cliente</label>
                                                        <input type="text" id="nombre">
                                                        <label for="">DNI del cliente</label>
                                                        <input type="text" id="dni">
                                                        <button class="btn btn-success" id="addCliente">Añadir</button>
                                                    </div>`;
                // console.log(document.querySelector('#addCliente'));
                let botonAddCliente = document.querySelector('#addCliente');

                botonAddCliente.addEventListener('click', () => {
                    let nombre = document.querySelector('#nombre').value;
                    let dni = document.querySelector('#dni').value;
                    //buscar cliente en base de datos
                    let revisionesDelCliente = baseDadosClientes.filter(word => word.nombre == nombre);
                    /// si el cliente no existe
                    if (revisionesDelCliente.length == 0) {
                        let idNuevoCliente = baseDadosClientes.length + 1;
                        let pswd = Math.floor(Math.random() * 101)
                        cliente = new Cliente(idNuevoCliente, dni, nombre, '', pswd, '');
                        baseDadosClientes.push(cliente);
                    }
                    /// si el cliente existe
                    if (revisionesDelCliente[0].nombre == nombre) {
                        var objetolClientePosicion = baseDadosClientes.map(function(item) { return item.id; }).indexOf(revisionesDelCliente[0].id);
                        baseDadosClientes[objetolClientePosicion].dni = dni;
                        console.log(baseDadosClientes);
                        let matriculaa = document.querySelector('#matricula').value;
                        coche = new Coche(objetolClientePosicion, matriculaa);
                        baseDadosCoches.push(coche);
                        console.log(baseDadosCoches);
                    }
                    nuevaRevision();
                });
            }
        }
    }
    evantoDatosRevision()
}

function evantoDatosRevision() {
    let eventoComprobarDatosRevision = document.querySelector('#guardarRevision');
    eventoComprobarDatosRevision.addEventListener('click', () => {
        comprobarDatosRevision();
    });
}

function comprobarDatosRevision() {
    let tipoRevision = document.querySelector('#tipoRevision').value;
    let piezasCambiadas = document.querySelector('#piezasCambiadas').value;
    let observaciones = document.querySelector('#observaciones').value;
    let revisionOK = true;
    let error = '';
    if (tipoRevision.length <= 5) {
        revisionOK = false;
        error += '<span id ="error"> Campo tipo de revision vacio</span><br>'

    };
    if (piezasCambiadas.length <= 5) {
        revisionOK = false;
        error += '<span id ="error"> Campo pieza cambiada vacio</span><br>'
    };
    if (observaciones.length <= 5) {
        revisionOK = false;
        error += '<span id ="error">Campo observaciones vacio</span><br>'
    };
    if (revisionOK == true) {
        addNuevaRevision();
    } else {
        nuevaRevision();
        document.body.innerHTML += error;
        evantoDatosRevision();
    }
}

function addNuevaRevision() {
    let matriculaa = document.querySelector('#matricula').value;
    let tipoRevision = document.querySelector('#tipoRevision').value;
    let piezasCambiadas = document.querySelector('#piezasCambiadas').value;
    let observaciones = document.querySelector('#observaciones').value;
    // let idCliente = baseDadosCoches[].idCliente.value;
    date = new Date();
    fechaYhoraActual = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " - " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    revision = new Revisione(1, tipoRevision, piezasCambiadas, fechaYhoraActual, 1, observaciones, matriculaa);



    // revision = new Revisione(2, tipoRevision, matriculaa, piezasCambiadas, fechaYhoraActual, sesionEmpleadoLogeado.idEmpleado, observaciones);
    baseDadosRevisiones.push(revision);
    console.log(baseDadosRevisiones);
    empleadoLogeado();
}

function crearProductos() {
    document.body.innerHTML = '';
    if (getCookie("username").length != 0) {
        usuarioLogeado();
    } else {
        crearBarraSuperior(); //aqui
    }
    let contenedorTarjetas = document.createElement('div');
    contenedorTarjetas.setAttribute("class", "contenedorTarjetas");
    document.body.appendChild(contenedorTarjetas);
    let tarjeta;
    for (let i = 1; i < 8; i++) {
        tarjeta = `<div class="tarjetaProducto">
                    <img src="Productos/0` + i + `.jpg" alt="Imagen del producto">
                    <p>Las pastillas de freno se componen de un soporte metálico y un revestimiento de fricción. La función de las pastillas es apretar la pista del disco de freno para crear fricción capaz de disminuir la rotación de dicho disco, que esta solidario
                        con la rueda.</p>
                    <div class="precioYboton">
                    <span><h2>20€</h2></span>
                    <button id="botonComprarProducto" class="btn btn-success ` + i + ` ">Comprar</button>
                </div>`;
        contenedorTarjetas.innerHTML += tarjeta;
    }
    let botonComprarProducto = document.querySelectorAll('#botonComprarProducto');
    for (const button of botonComprarProducto) {
        button.addEventListener('click', function(event) {
            if (getCookie("username").length != 0) {
                cesta = new Cesta(1, sesionUsuarioLogeado.id);
                listDeProductos.push(cesta);
                console.log(listDeProductos);
            } else {
                let cosas = document.querySelectorAll('.tarjetaProducto')
                    // cosas[button.classList[2] - 1].style.opacity = "30%";
                cosas[button.classList[2] - 1].innerHTML = "<h3>Debes iniciar sesion</h3>"
            }
        })
    }

}

function crearServicios() {
    document.body.innerHTML = '';
    if (getCookie("username").length != 0) {
        usuarioLogeado();
    } else {
        crearBarraSuperior(); //aqui
    }
    let contenedorServicios = document.createElement('div');
    contenedorServicios.setAttribute("class", "contenedorServicios");
    document.body.appendChild(contenedorServicios);
    let tarjetaServicio;
    for (let i = 0; i < 5; i++) {
        tarjetaServicio = `<div class="tarjetaServicio">
                                <img src="servicio01.jpg" alt="Imagen del producto">
                                <p>Cambio de aceite + Cambio de filtro de aceite. Compra ahora y reserva tu cita de montaje. Nuestros expertos te asesorarán para elegir el aceite más adecuado para tu coche si lo necesitas.</p>
                                <div class="precioYbotonServicio">
                                    <span><h2>40€</h2></span>
                                    <button class="btn btn-success">Comprar</button>
                                </div>
                            </div>`;
        contenedorServicios.innerHTML += tarjetaServicio;
    }

}

function nuevoProductoOServicio() {
    document.body.innerHTML = '';
    empleadoLogeado();
    let dibujarPaginaNuevoProducto = `<h3>Nuevo Producto o Servicio</h3>
    <div class="container-fluid">
        <form action="">
            <div class="nuevoProductoItemsContenedor">
                <div class="nuevoProductoItems">
                    <label for="foroProducto">Foto:</label>
                    <div id="foroProductoContenedor">
                        <img id="preview" src="">
                        <input type="file" name="foroProducto" id="foroProducto" onchange="showPreviewOne(event);">
                    </div>
                    <!-- <input type="file" name="foroProducto" id="foroProducto" onchange="showPreviewOne(event);> -->
                </div>
                <div class="nuevoProductoItems">
                    <label for="descripcionProducto">Descripcion</label>
                    <textarea name="descripcionProducto" id="descripcionProducto" rows="4" class="md-textarea form-control"></textarea>
                </div>
                <div class="nuevoProductoItems">
                    <label for="precioProducto">Precio</label>
                    <input type="text" id="precioProducto">
                </div>
                <div class="nuevoProductoItems">
                    <form action="">
                    <label for="tipoDeProducto"><span id="errorTipo"></span>
                    Tipo:</label>
                        <select name="tipoDeProducto" id="tipoDeProducto">
                            <option>¿?</option>
                            <option>Producto</option>
                            <option>Servicio</option>
                        </select>
                    </form>
                </div>
                <div class="nuevoProductoItems">
                    <button id="nuevoProductoBoton" class="btn btn-primary">Añadir</button>
                </div>
            </div>
        </form>
        <script>
            function showPreviewOne(event) {
                if (event.target.files.length > 0) {
                    let src = URL.createObjectURL(event.target.files[0]);
                    let preview = document.getElementById("preview");
                    preview.src = src;
                }
            }
        </script>
    </div>`;
    document.body.innerHTML += dibujarPaginaNuevoProducto;
    let nuevoProductoBoton = document.querySelector('#nuevoProductoBoton');

    nuevoProductoBoton.addEventListener('click', () => {
        let tipoDeProducto = document.querySelector('#tipoDeProducto');
        if (tipoDeProducto.value == "¿?") {
            nuevoProductoOServicio();
            let errorTipo = document.querySelector('#errorTipo');
            errorTipo.innerHTML = "Selecione un";
        }
        if (tipoDeProducto.value == "Servicio") {
            addServicio();
        }
        if (tipoDeProducto.value == "Producto") {
            addProducto();
        }
    });
}

function editarProducto() {

}

function eliminarProducto() {

}

function comprarProdcto() {

}

function addServicio() {
    servicio = new Servicio(1, "cosas", "discriocionDecosas", "rutaImg", "50€");
    baseDatosServicio.push(producto);
    console.log(baseDatosServicio);
    empleadoLogeado();
}

function addProducto() {
    producto = new Producto(1, "cosas", "discriocionDecosas", "rutaImg", "50€"); //aqui
    baseDatosProducto.push(producto);
    console.log(baseDatosProducto);
    empleadoLogeado();
}

function crearCesta() {
    document.body.innerHTML = '';
    if (getCookie("username").length != 0) {
        usuarioLogeado();
    } else {
        crearBarraSuperior(); //aqui
    }
    let contenedorServicios = document.createElement('div');
    contenedorServicios.setAttribute("class", "contenedorServicios");
    document.body.appendChild(contenedorServicios);
    let tarjetaCesta;
    for (let i = 0; i < 2; i++) {
        tarjetaCesta = `<div class="tarjetaCesta">
                                <img src="Productos/01.jpg" alt="Imagen del producto">
                                <p>Cambio de aceite + Cambio de filtro de aceite. Compra ahora y reserva tu cita de montaje. Nuestros expertos te asesorarán para elegir el aceite más adecuado para tu coche si lo necesitas.</p>
                                    <div class="cantidadDeProudctoContener">
                                        <button class="btn btn-danger btn-sm" id="menos">-</button>
                                        <input type="text" class="cantidadProducto input-sm col-xs-3">
                                        <button class="btn btn-info btn-sm" id="mas">+</button>
                                    </div>
                                    <span><h2>40€</h2></span>
                                </div>
                            </div>`;
        contenedorServicios.innerHTML += tarjetaCesta;
    }
    contenedorServicios.innerHTML += `<button class="btn btn-success">Comprar</button>`;

}

var cosas;

(function() {
    "use strict";
    document.addEventListener("DOMContentLoaded", function() {
        crearBarraSuperior();
        // verPerfil();
        // usuarioLogeado();
        // empleadoLogeado();
        //console.log(sesionUsuarioLogeado.id);
        // console.log(baseDadosClientes[0].matricula);

        // let menos = document.querySelector('.menos');
        // menos.addEventListener('click', () => {
        //     document.querySelector('.cantidadProducto').value--;
        // });
        // let mas = document.querySelector('.mas');
        // mas.addEventListener('click', () => {
        //     document.querySelector('.cantidadProducto').value++;
        // });
        pedirDatos();
        // console.log();

    });
})();

function hola() {
    console.log(datosEmpleados);
    console.log(dateClientes);
    console.log(datosCoches);
}

// var cosas;
// async function datos() {
//     let array = [];
//     await fetch('datosProductos.json')
//         .then(response => response.json())
//         .then(datos => array = datos)
//     return array;
// }
// async function test() {
//     let arraydos = await datos();
//     let datosPro = arraydos.datosPro;
//     cosas = datosPro;
//     console.log("desde dento: ");
//     console.log(cosas);
//     return cosas;

// }