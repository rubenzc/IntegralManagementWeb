/*----------------------------------------------------------------
-----------------------EJECUCIÓN PANELES--------------------------
----------------------------------------------------------------*/

if (document.getElementsByClassName("panelGeneral").length > 0){

    document.getElementById('compraLote').onclick = function (){ 

       window.open("paneles/compralote.html", 'Nueva compra de lote', 'scrollbars=no,width=600,height=820,toolbar=yes');
    }

    document.getElementById('venderTarta').onclick = function (){ 

       window.open("paneles/ventatarta.html", 'Venta tarta unitaria', 'scrollbars=no,width=600,height=820,toolbar=yes');
    }

    document.getElementById('destruirGenero').onclick = function (){ 

        window.open('paneles/destruirgenero.html', 'Destruir lote', 'scrollbars=no,width=600,height=820,toolbar=yes');
    }

    document.getElementById('precioVenta').onclick = function (){ 

        window.open('paneles/calculoprecio.html', 'Calcular precio', 'scrollbars=no,width=600,height=820,toolbar=yes');
    }

    document.getElementById('verCuentas').onclick = function (){ 
        window.open('paneles/informecontable.html', 'Informe contable', 'scrollbars=no,width=600,height=820,toolbar=yes');
    }

    document.getElementById('listarStock').onclick = function (){ 
 
        var ventanaInforme =  window.open('paneles/informestock.html', 'Informe stock', 'scrollbars=yes,width=600,height=820,toolbar=yes');   
        
        var listado = '';

            for(var i = 0; i < almacen.length; i++){
               
               listado += almacen[i].imprimir();
            }

            ventanaInforme.onload = function(){
                ventanaInforme.document.getElementById('contenidoInforme').innerHTML = listado;
            }
    }

    document.getElementById('destruirGenero').onclick = function (){

        var ventanaDestruir = window.open('paneles/destruirgenero.html', 'Destruir género', 'scrollbars=yes,width=600,height=820,toolbar=yes');

    }

    var cuentaContable = false;
    var saldoTotal = 0;
    document.getElementById('verSaldo').onclick = function(){


        if (cuentaContable === false){

            cuentaContable = true;
            var saldoInicial = prompt("Con cuánto dinerito deseas empezar el día");
            var cuenta = new Cuenta();
            var batman = cuenta.setSaldoInicial(saldoInicial);

            saldoTotal = cuenta.getSaldo();
            alert("Su saldo inicial ha sido guardado");
            alert("Saldo actual: " + saldoTotal);

            
        
        }else{

            alert("Saldo actual: " + saldoTotal);

        }

    }

    document.getElementById('informeVisual').onclick = function (){ 

        window.open('paneles/grafico.html', 'Informe stock', 'scrollbars=no,width=1000,height=820,toolbar=yes');
    }

    var contenidoCargado = false;
    document.getElementById('importarDemo').onclick = function(){

        if (!contenidoCargado){

            contenidoCargado = true;

            var lote1 = new Lote();
            lote1.constructorLote("0000AA", "Sacher", "Multipiso (2 pisos)" , "Fantasía caribeña", new Date(2017,11,20), 5, 12, 4, 450);

            var lote2 = new Lote();
            lote2.constructorLote("0001AA", "Hojaldre", "Individual" , "Delichoco", new Date(2017,10,20), 8, 15, 3, 210);

            var lote3 = new Lote();
            lote3.constructorLote("0002AA", "Crocanti", "Familiar" , "Piña colada", new Date(2018,0,11), 7, 18, 3, 118);

            var lote4 = new Lote();
            lote4.constructorLote("0003AA", "Sacher", "Individual" , "Oreo Cake", new Date(2018,2,1), 5, 12, 5, 850);

            var lote5 = new Lote();
            lote5.constructorLote("0004AA", "Queso", "Multipiso (3 pisos)" , "Mandarina primavera", new Date(2017,12,22), 8, 16, 5, 954.5);

            var lote6 = new Lote();
            lote6.constructorLote("0005AA", "Sacher", "Temática" , "Selva cuatro sabores", new Date(2018,10,19), 4, 11, 5, 450);

            almacen.push(lote1,lote2,lote3,lote4,lote5,lote6);

            actualizaStock();

            alert("Se ha importado la información demostrativa");

        }else{

            alert("ERROR: El contenido ya ha sido previamente cargado")
        }
    }
}



/*----------------------------------------------------------------
--------------------------SISTEMA OPENER-------------------------
----------------------------------------------------------------*/

if (document.getElementsByClassName('ventanaAuxiliar').length > 0) {

    if (opener === null) {
        alert("Acceso restringido. Accede desde el panel principal");
        window.location.assign('../index.html');

    }

}

/*----------------------------------------------------------------
----------------------VALIDACIÓN FORMULARIOS----------------------
----------------------------------------------------------------*/




function validarFormularioVenta(){

    var lote = document.getElementById('lote').value;
    var unidades = document.getElementById('unidades').value;

    var objLote = opener.existeLote(lote);

    if (objLote) {


        var unidadesActuales = objLote.getUnidades();

        if(unidadesActuales >= unidades){

            var unidadesRestantes = unidadesActuales - unidades;
            objLote.setUnidades(unidadesRestantes);    
        
            opener.actualizaStock();
            document.getElementById('mensajes').innerHTML = "Se han restado " + unidades + " al lote " + lote + " (" + unidadesRestantes + " uds. restantes)";        

        }else{
            document.getElementById('mensajes').innerHTML = "No hay unidades suficientes en el lote indicado. Ahora quedan " + unidadesActuales + " unidades";        
        }

    } else{

        document.getElementById('mensajes').innerHTML = "El número de lote no se encuentra en almacén";
    }
}


function validarFormularioCalculoPrecio(){

    var lote = document.getElementById('lote').value;
    var unidades = document.getElementById('unidades').value;

    var objLote = opener.existeLote(lote);

    if (objLote) {        

        var objFecha = objLote.getFecha();
        var calidad = objLote.getCalidad();
        var precio = objLote.getPrecio();

        var precioUd = (precio / unidades) * 1.25;

        if (calidad > 2) {
            precioUd = precioUd * 1.10;
        }

        var objFechaActual = new Date();
        var mesFuturo = objFechaActual.getMonth() + 1;
        var objFechaFutura = new Date(objFechaActual.setMonth(mesFuturo));
        //var objFechaFutura = new Date( objFechaActual.setMonth( objFechaActual.getMonth() + 1) );

        if (objFecha < objFechaFutura) {
            precioUd = precioUd * 0.8;
        }

        var resultado = unidades * precioUd;

        document.getElementById('mensajes').innerHTML = "El precio para " + unidades + " debe ser de " + resultado.toFixed(2);
        document.getElementById('mensajes').innerHTML += "€ (" + precioUd.toFixed(2) + "€ por unidad)";

    } else {
        document.getElementById('mensajes').innerHTML = "El número de lote no se encuentra en almacén";
    }

}


function validarFormularioCompra() {

    var textoErrores = "Se han producido los siguientes errores:<br>";
    var hayErrores = false;
    var nivelCalidad = 0;


    with (document) {

        // ALMACENADO
        var lote = getElementById("lote").value;

        var tipoIndex = getElementById("tipo").selectedIndex;
        var tipo = getElementById("tipo").options[tipoIndex].text;

        var claseIndex = getElementById("clase").selectedIndex;
        var clase = getElementById("clase").options[claseIndex].text;

        var modelo = getElementById("modelo").value;

        var fecha = getElementById("fecha").value;

        var porciones = getElementById('porciones').selectedIndex;

        var unidades = getElementById("unidadesTarta").value;

        var calidad = getElementsByName('calidad');
        for (var i = 0; i < calidad.length; i++) {
            if (calidad[i].checked) {
                nivelCalidad = calidad[i].value;     
            }
        }

        var precio = getElementById("precio").value;   

        
        // FECHAS
        var splitFechaCaducidad = fecha.split("/"); 
        var objFechaCaducidad = new Date(splitFechaCaducidad[2],splitFechaCaducidad[1]-1,splitFechaCaducidad[0]);  

        var objFechaActual = new Date();

        var valorEnUnAnho = objFechaActual.getFullYear()+1;
        var objFechaEnUnAnho = new Date();
        objFechaEnUnAnho.setFullYear(valorEnUnAnho);
    
        if(lote===null || tipoIndex===null || claseIndex===null || modelo===null || fecha===null || porciones===null || unidades===null || calidad===null || precio===null){

            alert("Error: no se envió la información");
            return false;

        }else{

            //if (!opener.existeLote(lote))
            if ( opener.existeLote(lote) != undefined ){
                textoErrores += "<br>El ID de lote ya se encuentra en el almacén";
                hayErrores = true;
            }

            if (!/^[0-9]{4}[A-Z]{2}$/.test(lote)){

                textoErrores += "<br>El formato del identificador de lote no es correcto (Ejemplo: 5524JL)";
                hayErrores = true;
            }
            if (tipoIndex === 0){

                textoErrores += "<br>Debe seleccionar un tipo de tarta";
                hayErrores = true;
            }  
            if (claseIndex === 0){

                textoErrores += "<br>Debe seleccionar la clase de tarta";
                hayErrores = true;
            }        
            if (/^\s+$/.test(modelo)){

                textoErrores += "<br>Debe indicar el modelo de la tarta";
                hayErrores = true;
            }

            if (!fecha.match(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/)) {

                textoErrores += "<br>El formato de fecha debe ser dd/mm/aaaa";
                hayErrores = true;
            }

            if (objFechaCaducidad < objFechaActual) {

                textoErrores += "<br>Este lote está caducado, que te la cuelan ¡merluzo!";
                hayErrores = true;
            }

            if (objFechaCaducidad > objFechaEnUnAnho) {

                textoErrores += "<br>No se admiten tartas con una caducidad superior a un año vista";
                hayErrores = true;
            }

            if (porciones === 0){

                textoErrores += "<br>Debe seleccionar las porciones por tarta";
                hayErrores = true;
            } 

            if (unidades < 10){

                textoErrores += "<br>No aceptamos lotes inferiores a 10 unidades";
                hayErrores = true;
            }

            if (nivelCalidad === 0){

                textoErrores += "<br>Debe seleccionar el nivel de calidad de las tartas";
                hayErrores = true;
            }

            if (precio.length==0 || isNaN(precio)){

                textoErrores += "<br>Debe introducir un precio correcto";
                hayErrores = true;
            }

            if (hayErrores){

                getElementById("errores").innerHTML = textoErrores;
                return false;
            }

            else{

                var nuevoLote = new Lote();
                nuevoLote.constructorLote(lote, tipoIndex, claseIndex, modelo, objFechaCaducidad, porciones, unidades, nivelCalidad, precio);

                opener.almacen.push(nuevoLote);

                opener.actualizaStock();


                /*
                alert("Esto sale de la instancia: " + nuevoLote.getId() );
                alert("Esto sale de la instancia: " + nuevoLote.getTipo() );
                alert("Esto sale de la instancia: " + nuevoLote.getClase() );
                alert("Esto sale de la instancia: " + nuevoLote.getModelo() );
                alert("Esto sale de la instancia: " + nuevoLote.getFecha() );
                alert("Esto sale de la instancia: " + nuevoLote.getUnidades() );
                alert("Esto sale de la instancia: " + nuevoLote.getPorciones() );
                alert("Esto sale de la instancia: " + nuevoLote.getCalidad() );
                alert("Esto sale de la instancia: " + nuevoLote.getPrecio() );
                */


                this.close();

            }
        }
    }
}

function validarFormularioDestruccion(){

    var lote = document.getElementById('lote').value;
    var completo = document.getElementById('lotecompleto');
    alert(opener.almacen.length);
    var objLote = opener.existeLote(lote);

    if (objLote && (completo.checked = true)){

        for (var i = 0; i < opener.almacen.length; i++) {

            if (opener.almacen[i].getId() === lote){
                opener.almacen.splice(i,1);
                i--;
                alert(opener.almacen.length);
            }

        }
            
    }else{

        document.getElementById('mensajes').innerHTML = "El número de lote no se encuentra en almacén";
    }

}


/*----------------------------------------------------------------
-------------------------FUNCIONALIDADES--------------------------
----------------------------------------------------------------*/

//HABILITACIÓN EN DESTRUCCIÓN DE LOTE DE CAMPO NÚYMERO TARTAS
if (document.getElementById('lotecompleto')) {

    document.getElementById('lotecompleto').onchange = function(){

        document.getElementById('unidadesC').classList.toggle('hide');
    }
}


// NUMERACION CANTIDAD DE TARTAS A TIEMPO REAL
if (document.getElementById('unidadesTarta')) {

    document.getElementById('unidadesTarta').onchange = function(){

        var valorUnidades = document.getElementById('unidadesTarta').value;  
        document.getElementById('valorRange').innerHTML = valorUnidades;
    }
}

// SANEADO DE CAMPO ID LOTE
if (document.getElementById('lote') != null) {

    document.getElementById('lote').onkeyup = function(){

        var valor = document.getElementById('lote').value;
        var valorSaneado = valor.replace(/[^A-Z0-9]/, '');
        document.getElementById('lote').value = valorSaneado;        
    }
}


// CIERRE AUTOMÁTICO
if (document.getElementsByClassName('ventanaAuxiliar').length > 0) {

    document.onkeyup = function(evt) {

        if (evt.keyCode == 27) {

            var cierre = confirm("¿Seguro que desea cerrar la ventana?\n\nLos cambios que no hayas guardado se perderán.");

            if (cierre) {
                window.close();
            }            
        }
    }
}


// ACTUALIZACIÓN DE STOCK
function actualizaStock() {

    var tartasTotales = 0;

    for (var i = 0; i < almacen.length; i++) {

        var tartas = almacen[i].getUnidades();

        tartasTotales += tartas;
    }

    document.getElementById('lotesTotales').innerHTML = almacen.length;
    document.getElementById('tartasTotales').innerHTML = tartasTotales;
}



// BÚSQUEDA DE LOTE
//La función devuelve el lote (el objeto) o devuelve undefined
function existeLote(arg) {

    for (var i = 0; i < almacen.length; i++) {

        if ( arg === almacen[i].getId() ) {

            return almacen[i];
        }
    }
}



/*----------------------------------------------------------------
---------------------FUNCIONES CONSTRUCTORAS----------------------
----------------------------------------------------------------*/

function Lote() {

    var _id, _tipo, _clase, _modelo, _fecha, _porciones, _unidades, _calidad, _precio;

    this.setId = function(arg){
        this._id = arg;
    }

    this.getId = function(){
        return this._id;
    }

    this.setTipo = function(arg){
        this._tipo = arg;
    }

    this.getTipo = function(){
        return this._tipo;
    }

    this.setClase = function(arg){
        this._clase = arg;
    }

    this.getClase = function(){
        return this._clase;
    }

    this.setModelo = function(arg){
        this._modelo = arg;
    }

    this.getModelo = function(){
        return this._modelo;
    }

    this.setFecha = function(arg){
        this._fecha = arg;
    }

    this.getFecha = function(){
        return this._fecha;
    }

    this.setPorciones = function(arg){
        this._porciones = Number(arg);
    }

    this.getPorciones = function(){
        return this._porciones;
    }

    this.setUnidades = function(arg){
        this._unidades = Number(arg);
    }

    this.getUnidades = function(){
        return this._unidades;
    }

    this.setCalidad = function(arg){
        this._calidad = arg;
    }

    this.getCalidad = function(){
        return this._calidad;
    }

    this.setPrecio = function(arg){
        this._precio = Number(arg);
    }

    this.getPrecio = function(){
        return this._precio;
    }

    this.constructorLote = function(lote, tipo, clase, modelo, fecha, porciones, unidades, calidad, precio) {

        this.setId(lote);
        this.setTipo(tipo);
        this.setClase(clase);
        this.setModelo(modelo);
        this.setFecha(fecha);
        this.setPorciones(porciones);
        this.setUnidades(unidades);
        this.setCalidad(calidad);
        this.setPrecio(precio);

    }

    this.imprimir = function(){

        //Cáculo del resultado de la venta estimada
        var unidades = this._unidades;
        var objFecha = this._fecha;
        var calidad = this._calidad;
        var precio = this._precio;
        

        var precioUd = (precio / unidades) * 1.25;
        if (calidad > 2) {
            precioUd = precioUd * 1.10;
        }
        var objFechaActual = new Date();
        var mesFuturo = objFechaActual.getMonth() + 1;
        var objFechaFutura = new Date(objFechaActual.setMonth(mesFuturo));

        if (objFecha < objFechaFutura) {
            precioUd = precioUd * 0.8;
        }
        var resultado = unidades * precioUd;
        /////////////////////

        var result= '';

        result += "<strong>Lote con ID " + this._id + "</strong> " + "(" + this._tipo + ", " + this._clase + " , modelo: " + this._modelo + ")<br>" 
        result += "Fecha de caducidad: " + this._fecha + "<br>";
        result += "Unidades restantes: " + this._unidades + " de " + this._porciones + " porciones por unidad" + "<br>";
        result += "Precio pagado por el lote: " + this._precio + " euros " + "(Venta estimada en " + resultado.toFixed(2) + " euros) <br><br>"
        
        return result;
    }

}

/*----------------------------------------------------------------
---------------------LISTAR STOCK---------------------------------
----------------------------------------------------------------*/

    

/////////////////////////////////////////////////////////////////


function Cuenta(){
    var _saldo = 0;

    //ESTOS CUATRO SON MÉTODOS DENTRO DEL CONSTRUCTOR CUENTA
    
    //Necesita un argumneto para ver el saldo inicial, por ello es un set
    this.setSaldoInicial = function(arg){
        //Cada vez que invoque este método le paso el saldo inicial con el que partimos
        this._saldo = Number(arg);
    }

    //Imputar ingreso
    this.setIngreso = function(arg){

        this._saldo += Number(arg);
    }

    //Imputar gasto
    this.setGasto = function(arg){

        this._saldo -= Number(arg);
    }

    //Mostrar saldo
    this.getSaldo = function(){

        return this._saldo;
    }


}