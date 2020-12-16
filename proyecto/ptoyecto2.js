//******************Clases************************ */
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
class Servicio {
    constructor(idProducto, nombre, descripcion, img, precio) {
        this.idProducto = idProducto;
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
class Cita {
    constructor(idCliente, nombre, matricula, fecha, hora) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.matricula = matricula;
        this.fecha = fecha;
        this.hora = hora;
    }
}
//******************Pedir Datos******************* */
//**let */
/**arrys */
let sesionClienteLogeado = []
let sesionEmpleadoLogeado = []
let datosEmpleados;
let dateProductos;
let datosCoches;
let datosClientes;
let datosRevisions;
let datosCesta;
let datosServicios
let datosCita = [];
/**funcion */
(function pedirDatos() {
    async function conectarEmpleados() {
        //Objeto
        let array = [];
        await fetch('datos/datosEmpleados.json')
            //Promises
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
    /********************************************* */

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
        dateProductos = tmp;
    }
    trasformarDatosProductos();
    /********************************************* */

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
    /********************************************* */
    async function conectarCliente() {
        let array = [];
        await fetch('datos/datosCliente.json')
            .then(response => response.json())
            .then(datos => array = datos)
        return array;
    }
    async function trasformarDatosClientes() {
        let arrayclientes = await conectarCliente();
        let tmp = arrayclientes.datosClientes;
        datosClientes = tmp;
    }
    trasformarDatosClientes();
    /********************************************* */
    async function conectarRevision() {
        let array = [];
        await fetch('datos/datosRevision.json')
            .then(response => response.json())
            .then(datos => array = datos)
        return array;
    }
    async function trasformarDatosRevision() {
        let arrayclientes = await conectarRevision();
        let tmp = arrayclientes.datosRevision;
        datosRevisions = tmp;
    }
    trasformarDatosRevision();
    /********************************************* */
    async function conectarCesta() {
        let array = [];
        //fetch
        await fetch('datos/datosCesta.json')
            .then(response => response.json())
            .then(datos => array = datos)
        return array;
    }
    async function trasformarDatosCesta() {
        let arraycesta = await conectarCesta();
        let tmp = arraycesta.datosCesta;
        datosCesta = tmp;
    }
    trasformarDatosCesta();
    /********************************************* */
    async function conectarServicio() {
        let array = [];
        await fetch('datos/datosServicios.json')
            .then(response => response.json())
            .then(datos => array = datos)
        return array;
    }
    async function trasformarDatosServicios() {
        let arrayservicios = await conectarServicio();
        let tmp = arrayservicios.datosServicios;
        datosServicios = tmp;
    }
    trasformarDatosServicios();
})()

//*********************************************************** */
//*****************Barra superior*************************** */
function crearBarraSuperior() {
    document.body.innerHTML += `
    <div class="barraSuperrior">
        <div class="barraItems">
            <button type="submit" id="solicitarCita" onclick="crearCita()">Solicitar cita</button>
        </div>
        <div class="barraItems">
            <button type="submit" id="botonProductosBarra" onclick="crearServicios()">Servicios</button>
        </div>
        <div class="barraItems">
            <button type="submit" id="botonProductosBarra" onclick="crearProductos()">Productos</button>
        </div>
        <div class="barraItems"><span id="sobreNosotros">Sobre nosotros</span></div>
        <div class="barraItems">
            <button type="submit" id="botonLoginBarra" onclick="crearLogin()">Login</button>
        </div>
    </div>
    `;
}
//************************CITA**************************** */
function verCitas() {
    document.body.innerHTML = '';
    if (getCookie("username").length != 0) {
        usuarioLogeado();
    } else {
        crearBarraSuperior(); //aqui
    }
    let citastmp = [];
    for (let item of datosCita) {
        if (item.idCliente == sesionClienteLogeado.id) {
            citastmp.push(item);
        }
    }
    document.body.innerHTML += '<h2>Tus Citas</h2>';
    let crearTarjetaCita = '<div class="citaContenedor">';
    for (let i = 0; i < citastmp.length; i++) {
        crearTarjetaCita += `<div class="tarjetaCita">
                        <div class="itemCita">
                            <h2>Cita : ` + (i + 1) + `</h2>
                        </div>
                        <div class="itemCita">
                            <h4>` + citastmp[i].matricula + `</h4>
                        </div>
                        <div class="itemCita">
                            <h4>` + citastmp[i].fecha + ` a las ` + citastmp[i].hora + `</h4>
                        </div>
                    </div>`;
    }
    crearTarjetaCita += `</div>`
    document.body.innerHTML += crearTarjetaCita;
    eventoMenuOpciones();
}

function crearCita() {
    document.body.innerHTML = '';
    if (getCookie("username").length != 0) {
        usuarioLogeado();
    } else {
        crearBarraSuperior(); //aqui
    }
    document.body.innerHTML += `
    <h3>Solicitar Cita</h3>
    <div class="container-fluid">
        <form action="">
            <div class="citaItemsContenedor">
                <div class="citaItems">
                    <label for="name">Nombre</label>
                    <input type="text" id="name" class="form-control">
                </div>
                <div class="citaItems">
                    <label for="matricula">Matricula</label>
                    <input type="text" id="matricula" class="form-control">
                </div>
                <div class="citaItems2">
                    <div class="citaItems">
                        <label for="fechaYhora">Fecha</label>
                        <input type="date" id="fecha" class="form-control">
                    </div>
                    <div class="citaItems">
                        <label for="fechaYhora">Hora</label>
                        <input type="number" id="hora" class="form-control" min="9" max="20">
                    </div>
                </div>
                <div class="tengoCuenta">
                    
                </div>
                <div class="login">
                    
                </div>
                <div class=" citaItems ">
                    <span id="errorDatos"></span>
                    <button type="button" id="pedirCita" class="btn btn-primary ">Solicitar cita</button>
                </div>
            </div>
        </form>
    </div>`;

    // console.log(();
    if (getCookie("username").length == 0) {
        document.querySelector('.tengoCuenta').innerHTML = `
                <label for="tengoCuenta">Tengo cuenta:</label>
                <input type="checkbox" name="tengoCuenta" id="tengoCuenta">`;

        let tengoCuenta = document.querySelector('#tengoCuenta');
        tengoCuenta.addEventListener('click', () => {
            if (tengoCuenta.checked) {
                document.querySelector('.login').innerHTML = `
                <div class="loginCita">
                    <form action="">
                        <div class="loginCitaItems">
                            <div class="loginItemsContenedor">
                                <label for="email">Email</label>
                                <input type="email" id="email" autofocus class="form-control">
                                <span id="error"></span>
                            </div>
                            <div class="loginItemsContenedor">
                                <label for="pswd">Password</label>
                                <input type="password" id="pswd" class="form-control">
                                <span id="error"></span>
                            </div>
                            <div class="loginItemsContenedor">
                                <button type="button" id="iniciarSesion" class="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </form>
                </div>`;
                let eventoIniciarSesion = document.querySelector('#iniciarSesion');
                eventoIniciarSesion.addEventListener('click', () => {
                    let adderrors = document.querySelectorAll('#error');
                    let email = document.querySelector('#email');
                    let pswd = document.querySelector('#pswd');
                    if (email.value == "") {
                        // console.log(inputs[0].value);
                        adderrors[0].innerHTML = "Cambo email vacio."
                    } else {
                        adderrors[0].innerHTML = ""
                    }
                    if (pswd.value == "") {
                        // console.log(inputs[0].value);
                        adderrors[1].innerHTML = "Cambo password vacio."
                    } else {
                        adderrors[1].innerHTML = ""
                    }
                    if (email.value != "" && pswd.value != "") {
                        /**iteradores */
                        for (let item of datosClientes) {
                            if (item.email == email.value) {
                                email.setAttribute("readonly", "");
                                pswd.setAttribute("readonly", "");
                                eventoIniciarSesion.removeAttribute("class", "btn-primary");
                                eventoIniciarSesion.setAttribute("class", "btn-success");
                                eventoIniciarSesion.setAttribute("class", "btn btn-success");
                                eventoIniciarSesion.innerHTML = "Login Corecto!"
                                document.cookie = "username=" + item.nombre;
                            }
                        }
                    }
                });
            } else {
                document.querySelector('.login').innerHTML = "";
            }
        });
    } else {
        document.querySelector('#name').value = sesionClienteLogeado.nombre;
    }
    let pedirCita = document.querySelector('#pedirCita');
    pedirCita.addEventListener('click', () => {
        let nombre = document.querySelector('#name').value;
        let matricula = document.querySelector('#matricula').value;
        let fecha = document.querySelector('#fecha').value;
        let hora = document.querySelector('#hora').value;
        if (nombre == '' || matricula == '' || fecha == '' || hora == '') {
            document.querySelector('#errorDatos').innerHTML = 'Intoducza los datos correctos!'
        } else {
            cita = new Cita(sesionClienteLogeado.id, nombre, matricula, fecha, hora) ///Aqui
            datosCita.push(cita);
            console.log(datosCita);
            verCitas();
        }

    })

    eventoMenuOpciones();
}
//************************LOGIN*************************** */
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
    if (cookieUsername != undefined) {
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
                    <button type="button" class="btn btn-primary" id="botonRegistrarse">Solicitar cita</button>\
                </div>\
            </div>\
        </form>\
    </div>';
    let eventoNuevoliente = document.querySelector('#botonRegistrarse');
    eventoNuevoliente.addEventListener('click', () => {
        let nom = document.querySelector('#nombre');
        let email = document.querySelector('#email');
        let pswd = document.querySelector('#pswd');
        let pswdConfirm = document.querySelector('#pswdConfirm');
        let formularioOK = false;

        if (nom.value.length > 4) {
            formularioOK = true;
        }
        if (email.value.length > 4) {
            formularioOK = true;
        }
        if (pswd.value == pswdConfirm.value) {
            formularioOK = true;
        }
        if (email.value.length > 4) {
            formularioOK = true;
        }
        if (formularioOK == 4) {

        }
    });
}

function iniciarSesion() {
    let emailLogin = document.getElementById("email").value;
    let pswdLogin = document.getElementById("pswd").value;
    let loginOK = false;
    for (let i = 0; i < datosClientes.length; i++) {
        if (datosClientes[i].email == emailLogin) {
            if (datosClientes[i].pwsd == pswdLogin) {
                sesionClienteLogeado = datosClientes[i]; //REVISAR
                document.cookie = "username=" + sesionClienteLogeado.nombre;
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

function usuarioLogeado() {
    if (getCookie("username").length != 0) {
        let cookieUsername = getCookie("username");
        for (let i = 0; i < datosClientes.length; i++) {
            if (datosClientes[i].nombre == cookieUsername) {
                sesionClienteLogeado = datosClientes[i]; //volver aqui
            }
        }
    }
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
    if (getCookie("username").length != 0) {

        let mensajeBienvenida = document.createElement("h3");
        mensajeBienvenida.innerHTML = "Hola " + sesionClienteLogeado.nombre //cambiar ahora
            //Modificar el nodes
        document.body.appendChild(mensajeBienvenida);
    }



    // let barraAnterior = document.querySelectorAll(".barraSuperrior");
    // barraAnterior[1].remove();
    eventoMenuOpciones();
}

function eventoMenuOpciones() {
    let eventoBotonBarraOpciones = document.querySelector('#botonBarraOpciones');
    eventoBotonBarraOpciones.addEventListener('click', () => {
        crearMenuParaClienteLogeado();
    });

}

function crearMenuParaClienteLogeado() {
    document.body.innerHTML += '<div class="menuUsuarioOpciones">\
            <a id="verPerfil">Ver Perfil</a>\
            <a id="verRevisiones">Revisiones</a>\
            <a id="verCitas">Tus Citas</a>\
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
    let eventoVerCita = document.querySelector('#verCitas');
    eventoVerCita.addEventListener('click', () => {
        verCitas();
    });
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
//**************************************Opciones********************************************* */
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
    document.querySelector('#nombre').setAttribute("value", sesionClienteLogeado.nombre);
    document.querySelector('#email').setAttribute("value", sesionClienteLogeado.email);
    document.querySelector('#pswd').setAttribute("value", sesionClienteLogeado.pwsd);

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

            var idParaModificar = datosClientes.map(function(item) { return item.id; }).indexOf(sesionClienteLogeado.id);
            datosClientes[idParaModificar].nombre = nombreModificado;
            datosClientes[idParaModificar].email = emailModificado;
            verPerfil();
        });
    });
    eventoMenuOpciones();
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
    let revisionesDelCliente = datosRevisions.filter(word => word.idCliente == sesionClienteLogeado.id);

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

function cerrarSesion() {
    sesionClienteLogeado = undefined;
    deleteAllCookies();
    let cookies = document.cookie.split(";");
    console.log(cookies.username);
    let cookisUserName = cookies.filter(word => word.nombre == "username");

    // let cookisUserName = cookies.indexOf("username");
    document.body.innerHTML = '';
    crearBarraSuperior();
}
//***********************Productos**************************** */
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
    for (let i = 0; i < dateProductos.length; i++) {
        tarjeta = `<div class="tarjetaProducto">
                        <img src="` + dateProductos[i].img + `" alt="Imagen del producto">
                        <p>` + dateProductos[i].descripcion + `</p>
                        <div class="precioYboton">
                            <span><h3>` + dateProductos[i].precio + `</h3></span>
                            <button id="botonComprarProducto" class="btn btn-success ` + dateProductos[i].idProducto + ` ">Comprar</button>
                        </div>
                    </div>`;
        contenedorTarjetas.innerHTML += tarjeta;
    }
    let botonComprarProducto = document.querySelectorAll('#botonComprarProducto');
    let tarjetaComprar = document.querySelectorAll('p')
    for (const button of botonComprarProducto) {
        button.addEventListener('click', function(event) {
            if (getCookie("username").length != 0) {
                // console.log(document.querySelector(''));
                cesta = new Cesta(button.classList[2], sesionClienteLogeado.id);
                let cestatmp = [];
                for (let item of datosCesta) {
                    if (item.idCliente == sesionClienteLogeado.id) {
                        cestatmp.push(item);
                    }
                }
                // cestatmp.push());
                if (cestatmp.find(element => element.idProducto == button.classList[2]) == undefined) {
                    datosCesta.push(cesta);
                    tarjetaComprar[button.classList[2] - 1].innerHTML = "Este Producto ya esta en la cesta";
                } else {
                    tarjetaComprar[button.classList[2] - 1].innerHTML = "Este Producto ya esta en la cesta";
                }
            } else {
                let tarjetaComprar = document.querySelectorAll('.tarjetaProducto')
                tarjetaComprar[button.classList[2] - 1].innerHTML = "<h3>Debes iniciar sesion</h3>"
            }
        });
    }

}
//***********************************Cesta********************* */
function crearCesta() {
    document.body.innerHTML = '';
    if (getCookie("username").length != 0) {
        usuarioLogeado();
    } else {
        crearBarraSuperior(); //aqui
    }
    //**Saber cuantos productos ha comprado X cliente */

    let contenedorServicios = document.createElement('div');
    contenedorServicios.setAttribute("class", "contenedorServicios");
    document.body.appendChild(contenedorServicios);
    let tarjetaCesta;

    let cestatmp = [];
    for (let item of datosCesta) {
        if (item.idCliente == sesionClienteLogeado.id) {
            cestatmp.push(item);
        }
    }
    let productostmp = [];
    for (let i = 0; i < dateProductos.length; i++) { ///Buscar una mejor manera de hacerlo
        for (let j = 0; j < cestatmp.length; j++) {
            if (dateProductos[i].idProducto == cestatmp[j].idProducto) {
                productostmp.push(dateProductos[i])
            }
        }
    }
    for (let i = 0; i < datosServicios.length; i++) { ///Buscar una mejor manera de hacerlo
        for (let j = 0; j < cestatmp.length; j++) {
            if (datosServicios[i].idProducto == cestatmp[j].idProducto) {
                productostmp.push(datosServicios[i])
            }
        }
    }
    console.log(productostmp);
    if (productostmp.length != 0) {
        for (let i = 0; i < productostmp.length; i++) {
            // if (cestatmp.idProducto == dateProductos.idProducto) {
            tarjetaCesta = `
                <div class="tarjetaCesta">
                    <img src="` + productostmp[i].img + `" alt="">
                        <div>
                            <h4>` + productostmp[i].nombre + `</h4>
                            <p>` + productostmp[i].descripcion + `</p>
                        </div>
                        <div>
                            <label for="cantidad">Cantidad</label>
                            <div class="cantidadDeProudctoContener">
                                <input type="number" id="cantidad" class="cantidadProducto input-sm" min="0" value="1">
                                <span><h2>` + productostmp[i].precio + `</h2></span>
                                <button id="eliminarArticulo" class="btn btn-danger btn-sm ` + productostmp[i].idProducto + `">Eliminar</button>
                            </div>
                        </div>
                </div>`;
            console.log(productostmp[i].idProducto);
            // }
            // <button class="btn btn-danger btn-sm" id="menos">-</button>
            // <button class="btn btn-info btn-sm" id="mas">+</button>
            contenedorServicios.innerHTML += tarjetaCesta;


        }
        contenedorServicios.innerHTML += `<button class="btn btn-success">Comprar</button>`;

        let eliminarArticulo = document.querySelectorAll("#eliminarArticulo");
        console.log(datosCesta);
        for (const item of eliminarArticulo) {
            item.addEventListener('click', function(event) {
                let idProducto = item.classList[3];
                let idUsuario = sesionClienteLogeado.id;
                let eliminarIndex;
                for (let i of datosCesta) {
                    if (i.idProducto == idProducto && i.idCliente == idUsuario) {
                        eliminarIndex = datosCesta.indexOf(i)
                    }
                }
                datosCesta.splice(eliminarIndex, 1);
                crearCesta();
            });
        }
    }

}
/*******************************Servicios********************** */
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
    for (let i = 0; i < datosServicios.length; i++) {
        tarjetaServicio = `<div class="tarjetaServicio">
                                <img src="` + datosServicios[i].img + `" alt="Imagen del producto">
                                <div class="DescriocionYnombre">
                                    <h4>` + datosServicios[i].nombre + `</h4>
                                    <p>` + datosServicios[i].descripcion + `</p>
                                </div>
                                <div class="precioYbotonServicio">
                                    <span><h2>` + datosServicios[i].precio + `</h2></span>
                                    <button id="botonAddServicio" class="btn btn-success ` + datosServicios[i].idProducto + ` ` + i + `">Solicitar</button>
                                </div>
                            </div>`;
        contenedorServicios.innerHTML += tarjetaServicio;
    }

    let botonComprarServicio = document.querySelectorAll('#botonAddServicio');
    let tarjetaComprar = document.querySelectorAll('p')
    for (const button of botonComprarServicio) {
        button.addEventListener('click', function(event) {
            if (getCookie("username").length != 0) {
                cesta = new Cesta(button.classList[2], sesionClienteLogeado.id);
                let cestatmp = [];
                for (let item of datosCesta) {
                    if (item.idCliente == sesionClienteLogeado.id) {
                        cestatmp.push(item);
                    }
                }

                // cestatmp.push());
                if (cestatmp.find(element => element.idProducto == button.classList[2]) == undefined) {
                    datosCesta.push(cesta);
                    tarjetaComprar[button.classList[3]].innerHTML = "Este Servisio se a añadido a la cesta";
                } else {
                    tarjetaComprar[button.classList[3]].innerHTML = "Este Servisio ya esta añadido a su cesta";
                }

            } else {
                let tarjetaComprar = document.querySelectorAll('.tarjetaServicio')
                tarjetaComprar[button.classList[3]].innerHTML = "<h3>Debes iniciar sesion</h3>"
            }
        });

    }

    // console.log(button.classList[2]);

}
//******************************Nuevo Cliente****************** */
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
        // console.log(baseDadosClientes);
    } else {
        //crearLogin()
        crearRegistrarse();
    }
}

function nuevoCliente() {
    cliente = new Cliente(datosClientes.length + 1, '', document.getElementById("nombre").value, document.getElementById("email").value, document.getElementById("pswd").value, '');
    datosClientes.push(cliente);
    console.log(datosClientes);
    crearLogin();
}

//******************************Empleados************************* */
function procesaLoginEmpleado() {
    let dniEmpleado = document.querySelector('#dni').value;
    let pswdEmpleado = document.querySelector('#pswd').value;
    let loginOK = false;
    //Validació de formularis
    for (let i = 0; i < datosEmpleados.length; i++) {
        if (datosEmpleados[i].dni == dniEmpleado) {
            if (datosEmpleados[i].pswd == pswdEmpleado) {
                sesionEmpleadoLogeado = datosEmpleados[i]; //REVISAR
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
    //Registre d'events W3C //No estoy seguro
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

//************************Nueva Revision************************ */
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
            buscarMatricula = datosCoches.filter(word => word.matricula == target.value);

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
                //Selectors
                let botonAddCliente = document.querySelector('#addCliente');

                botonAddCliente.addEventListener('click', () => {
                    let matricula = document.querySelector("#matricula").value;
                    let nombre = document.querySelector('#nombre').value;
                    let dni = document.querySelector('#dni').value;
                    //buscar cliente en base de datos
                    let revisionesDelCliente = datosCoches.filter(word => word.nombre == nombre);
                    /// si el cliente no existe
                    if (revisionesDelCliente.length == 0) {
                        let idNuevoCliente = datosClientes.length + 1;
                        // Objectes predefinits
                        let pswd = Math.floor(Math.random() * 101)
                        cliente = new Cliente(idNuevoCliente, dni, nombre, nombre + '@cliente.com', pswd, '');
                        datosClientes.push(cliente);

                        //Añadir la matricula a la bd
                        coche = new Coche(idNuevoCliente, matricula);
                        datosCoches.push(coche);
                    } else {
                        /// si el cliente existe
                        if (revisionesDelCliente[0].nombre == nombre) {
                            var objetolClientePosicion = datosClientes.map(function(item) { return item.id; }).indexOf(revisionesDelCliente[0].id);
                            datosClientes[objetolClientePosicion].dni = dni;
                            // console.log(datosCoches);
                            let matriculaa = document.querySelector('#matricula').value;
                            coche = new Coche(objetolClientePosicion, matriculaa);
                            datosCoches.push(coche);
                            console.log(datosCoches);
                        }
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
    let idClienteActual;
    for (let item of datosCoches) {
        if (item.matricula === matriculaa) {
            idClienteActual = item.idCliente;
        }
    }
    revision = new Revisione(idClienteActual, tipoRevision, piezasCambiadas, fechaYhoraActual, 1, observaciones, matriculaa);



    // revision = new Revisione(2, tipoRevision, matriculaa, piezasCambiadas, fechaYhoraActual, sesionEmpleadoLogeado.idEmpleado, observaciones);
    datosRevisions.push(revision);
    console.log(datosRevisions);
    empleadoLogeado();
}
//******************************Nuevo Producto o servicio*********** */

function nuevoProductoOServicio() {
    document.body.innerHTML = '';
    empleadoLogeado();
    /** Template literals*/
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
                    <label for="nombre">Nombre producto o servicio</label>
                    <input type="text" id="nombre">
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

    //Expresion de funcion/ Funcions fletxa
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

function addServicio() {
    let nombre = document.querySelector('#nombre').value;
    let descipcion = document.querySelector('#descripcionProducto').value;
    let precio = document.querySelector('#precioProducto').value;
    servicio = new Servicio(datosServicios[datosServicios.length - 1].idProducto - 1, nombre, descipcion, "rutaImg", precio + "€");
    datosServicios.push(servicio);
    console.log(datosServicios);
    empleadoLogeado();
}

function addProducto() {
    let nombre = document.querySelector('#nombre').value;
    let descipcion = document.querySelector('#descripcionProducto').value;
    let precio = document.querySelector('#precioProducto').value;
    producto = new Producto(dateProductos[dateProductos.length - 1].idProducto - 1, nombre, descipcion, "rutaImg", precio + "€");
    dateProductos.push(producto);
    console.log(dateProductos);
    empleadoLogeado();
}

//*************************************************** */
/**Funcions autoinvocades */
(function() {
    //use strict
    "use strict";
    document.addEventListener("DOMContentLoaded", function() {
        //**declarar funcion */
        crearBarraSuperior();
        // pedirDatos();
    });
})();

//Cookies i LocalStorage
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

function iniciarSesionCookie() {
    let cookieUsername = getCookie("username");
    for (let i = 0; i < datosClientes.length; i++) {
        if (datosClientes[i].nombre == cookieUsername) {
            sesionClienteLogeado = datosClientes[i]; //volver aqui
            usuarioLogeado();
        }
    }
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