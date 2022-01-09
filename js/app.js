let cliente ={
mesa:'',
hora:'',
pedido:[]
    
}

const categorias ={
1:'Comida',
2:'Bebidas',
3:"Postres"

}


const btnGuardarCliente =document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click',GuardarCliente);

function GuardarCliente(){

    // console.log('prueba del llamado');
    const mesa= document.querySelector('#mesa').value;
    const hora= document.querySelector('#hora').value;

    // validar campos vacios
    const camposVacios =[mesa,hora].some(campo=> campo==='');

    if(camposVacios){
        
        //verificar si hay alerta

        const existeAlerta =document.querySelector('.invalid-feedback');

           if(!existeAlerta){
            const alerta =document.createElement('DIV');
            alerta.classList.add('invalid-feedback','d-block','text-center');
            alerta.textContent = ' Todos los campos son obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta);

            setTimeout(()=>{

            alerta.remove();

            },3000);
}
return;

    }
//datosCliente
   cliente ={...cliente,mesa,hora};
//    console.log(cliente);
   //ocultarModal
   const modalFormulario =document.querySelector('#formulario');
   const modalBooststrap = bootstrap.Modal.getInstance(modalFormulario);
   modalBooststrap.hide();
   //mostraSecciones
mostrarSecciones();

//optener datos de la API
obtenerPlatillos();
 
}
function mostrarSecciones(){
    //oculatando el modal y cargando las secciones
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
    
       }

function obtenerPlatillos(){
const url="http://localhost:4000/platillos";

fetch(url)
.then(respuesta=> respuesta.json())
.then(resultado => mostrarPlatillos(resultado))
.catch(error => console.log(error)); 
}       

function mostrarPlatillos(platillos){

const contenido = document.querySelector('#platillos .contenido');


platillos.forEach(platillo=>{
const  row =document.createElement('div');
row.classList.add('row','py-3','border-top');

const nombre = document.createElement('div');
nombre.classList.add('col-md-4');
nombre.textContent= platillo.nombre;

const precio = document.createElement('div');
precio.classList.add('col-md-3','fw-bold');
precio.textContent = `$${platillo.precio}`;


const categoria = document.createElement('div');
categoria.classList.add('col-md-3');
categoria.textContent=categorias [platillo.categoria];

const inputCntidad = document.createElement('input');
inputCntidad.type='number';
inputCntidad.min=0;
inputCntidad.value=0;
inputCntidad.id=`producto-${platillo.id}`;
inputCntidad.classList.add('form-control');
const agregar = document.createElement('div');
agregar.classList.add('col-md-2');
agregar.appendChild(inputCntidad);

// funcion que detecta la cantiad del platillo
 inputCntidad.onchange = function(){
    const cantidad = parseInt(inputCntidad.value) ;
   agregarPlatillo({...platillo,cantidad});
 };



row.appendChild(nombre);
row.appendChild(precio);
row.appendChild(categoria);
row.appendChild(agregar);
contenido.appendChild(row);


})

}


function agregarPlatillo(producto){
let {pedido} = cliente;
//revisar que la cantidad sea mayor a 0
if(producto.cantidad > 0){
// comprueba si el elemento ya exciste en el array
   if(pedido.some(artituculo => artituculo.id === producto.id)){
//ya existe y actualizamos la cantidad 
      const pedidoActualizado =pedido.map(articulo=>{
         if(articulo.id === producto.id){
            articulo.cantidad= producto.cantidad;

         }
         return articulo;
      });
      // se asigna el nuevo array al cliente.pedido
      cliente.pedido=[...pedidoActualizado];
   }else{
      // articulo no existe y se agrega
      cliente.pedido=[...pedido,producto];
   }


}else{
   // console.log(' no es mayor a 0')
   //eliminar elementos cuando son igual a 0

   const resultado = pedido.filter(articulo => articulo.id !== producto.id)
   cliente.pedido= [...resultado];
}
// console.log(cliente.pedido);

// limpiar html previo
limpiarHtml();

if(cliente.pedido.length){
   // mostrar el resumen
actualizarResumen();
}else{
   mensajePedidoVacio();
}

}


function actualizarResumen(){

   const contenido = document.querySelector('#resumen .contenido');

   const resumen = document.createElement('div');
   resumen.classList.add('col-md-6','card','py-2','px-3','shadow');

// informacion de la mesa
   const mesa= document.createElement('p');
   mesa.textContent = 'Mesa: ';
   mesa.classList.add('fw-bold');

   const mesaSpan = document.createElement('span');
   mesaSpan.textContent = cliente.mesa;
   mesaSpan.classList.add('fw-normal');

   // informacion de la hora
   const hora= document.createElement('p');
   hora.textContent = 'Hora: ';
   hora.classList.add('fw-bold');

   const horaSpan = document.createElement('span');
   horaSpan.textContent = cliente.hora;
   horaSpan.classList.add('fw-normal');
//agregar a los elementos padres
   mesa.appendChild(mesaSpan);
   hora.appendChild(horaSpan);

// titulo de la funcion 

const heading = document.createElement('h3');
heading.textContent='Platillos Consumidos';
heading.classList.add('my-4','text-center');

//iterrar sobre el arreglo de pedidos 

const grupo = document.createElement('Ul');
grupo.classList.add('list-group');

const {pedido} = cliente;
pedido.forEach(articulo =>{
   const {nombre,cantidad,precio,id} = articulo;

   const lista = document.createElement('li');
   lista.classList.add('list-group-item');

   const nombreEl = document.createElement('h4');
nombreEl.classList.add('my-4');
nombreEl.textContent= nombre;
// cantidad del articulo

 const cantidadEL = document.createElement('p');
 cantidadEL.classList.add('fw-bold');
 cantidadEL.textContent= ' Cantiadad: ';

 const cantidadValor = document.createElement('span');
 cantidadValor.classList.add('fw-normal');
 cantidadValor.textContent =cantidad;


 // precio del articulo

 const precioEL = document.createElement('p');
 precioEL.classList.add('fw-bold');
 precioEL.textContent= ' Precio: ';

 const precioValor = document.createElement('span');
 precioValor.classList.add('fw-normal');
 precioValor.textContent =`$${precio}`;

 // subtotal del articulo

 const subEL = document.createElement('p');
 subEL.classList.add('fw-bold');
 subEL.textContent= ' Subtotal: ';

 const subtotalValor = document.createElement('span');
 subtotalValor.classList.add('fw-normal');
 subtotalValor.textContent = cantidadsubtotal(precio,cantidad);
 //botoneleminar

 const btnEliminar = document.createElement('button');
 btnEliminar.classList.add('btn','btn-danger')
 btnEliminar.textContent='Eliminar del pedido';

 btnEliminar.onclick = function(){
    eliminarProducto(id);
 }

 //agregar valores a sus cobtenedores

 cantidadEL.appendChild(cantidadValor);
 precioEL.appendChild(precioValor);
subEL.appendChild(subtotalValor);

//agregar elementos al li
lista.appendChild(nombreEl);
lista.appendChild(cantidadEL);
lista.appendChild(precioEL);
lista.appendChild(subEL);
lista.appendChild(btnEliminar);
//agergar lista al grupo

grupo.appendChild(lista);


})


   //agregar el contenido//
   resumen.appendChild(heading);
   resumen.appendChild(mesa);
   resumen.appendChild(hora);
   
   resumen.appendChild(grupo);

   contenido.appendChild(resumen);
   // mostrar formulario de propinas

   FormularioPropinas();

}

function limpiarHtml(){

   const contenido = document.querySelector('#resumen .contenido');

while(contenido.firstChild){
   contenido.removeChild(contenido.firstChild);
}

}


function cantidadsubtotal( precio,cantidad){

   return `$${precio *cantidad}`


}


function eliminarProducto(id){

   const {pedido} = cliente;
   const resultado = pedido.filter(articulo => articulo.id !== id);
   cliente.pedido= [...resultado];
   limpiarHtml();
   if(cliente.pedido.length){
      // mostrar el resumen
   actualizarResumen();
   }else{
      mensajePedidoVacio();
   }
   // el producto se elimino y cantidades de nuevo a 0

const productoElimidado = `#producto-${id}`;
const inputEliominado = document.querySelector(productoElimidado);
inputEliominado.value=0;

}

function mensajePedidoVacio(){

   const contenido= document.querySelector('#resumen .contenido');

   const texto = document.createElement('p');
   texto.classList.add('text-center');
   texto.textContent='Añade los elementos del Pedido';
   contenido.appendChild(texto);
}


function FormularioPropinas(){


   const contenido = document.querySelector('#resumen .contenido');
   const formulario = document.createElement('div');
   formulario.classList.add('col-md-6','formulario');

   const divFormulario = document.createElement('div');
   divFormulario.classList.add('card','py-2','px-3','shadow')

   const heading = document.createElement('h3');
   heading.classList.add('my-4','text-center');
   heading.textContent='Propina';
// radio button 10%
const radio10 = document.createElement('input');
radio10.type='radio';
radio10.name='Propina';
radio10.value=10;
radio10.classList.add('form-check-input');
radio10.onclick=calcularPropina;

const radio10Label = document.createElement('label');
radio10Label.textContent="10%";
radio10Label.classList.add('form-check-label');

const radio10div = document.createElement('div');
radio10div.classList.add('form-check');

radio10div.appendChild(radio10);
radio10div.appendChild(radio10Label);


// radio button 25%
const radio25 = document.createElement('input');
radio25.type='radio';
radio25.name='Propina';
radio25.value=25;
radio25.classList.add('form-check-input');
radio25.onclick=calcularPropina;
const radio25Label = document.createElement('label');
radio25Label.textContent="25%";
radio25Label.classList.add('form-check-label');

const radio25div = document.createElement('div');
radio25div.classList.add('form-check');

radio25div.appendChild(radio25);
radio25div.appendChild(radio25Label);

// radio button 50%
const radio50 = document.createElement('input');
radio50.type='radio';
radio50.name='Propina';
radio50.value=50;
radio50.classList.add('form-check-input');
radio50.onclick=calcularPropina;
const radio50Label = document.createElement('label');
radio50Label.textContent="50%";
radio50Label.classList.add('form-check-label');

const radio50div = document.createElement('div');
radio50div.classList.add('form-check');

radio50div.appendChild(radio50);
radio50div.appendChild(radio50Label);



   divFormulario.appendChild(heading);
   //agregar al div principal y al formulario
   divFormulario.appendChild(radio10div);
   divFormulario.appendChild(radio25div);
   divFormulario.appendChild(radio50div);


   formulario.appendChild(divFormulario);
   

   contenido.appendChild(formulario);
}

function calcularPropina(){
   const {pedido} = cliente;

   let subtotal = 0;

   //calcylar el subtotal

   pedido.forEach(articulo =>{
      subtotal += articulo.cantidad * articulo.precio;
   });
   //sleccionar con la propina del cliente

   const propinaSeleccionada = document.querySelector('[name="Propina"]:checked').value;

   //calcular propina

const propina =((subtotal* parseInt(propinaSeleccionada))/100);

console.log(propina);

   //calcular total
const totalPagar = subtotal + propina;

console.log(totalPagar);


mostrartotalHtml(subtotal,totalPagar,propina);
  
}

function mostrartotalHtml(subtotal, totalPagar, propina){

const divTotales = document.createElement('div');
divTotales.classList.add('total-pagar','my-5');


   const subtotalParrafo = document.createElement('p');
   subtotalParrafo.classList.add('fs-4','fw-bold','mt-2');
   subtotalParrafo.textContent= 'Subtotal Consumo:' ;

   const subtotalSpan= document.createElement('span');
   subtotalSpan.classList.add('fw-normal');
   subtotalSpan.textContent =`$${subtotal}`;


   subtotalParrafo.appendChild(subtotalSpan);


   //propina

   const propinaParrafo = document.createElement('p');
   propinaParrafo.classList.add('fs-4','fw-bold','mt-2');
   propinaParrafo.textContent= 'Propina: ';

   const propinaSpan= document.createElement('span');
   propinaSpan.classList.add('fw-normal');
   propinaSpan.textContent =`$${propina}`;


   propinaParrafo.appendChild(propinaSpan);

   //total a pagar 

   const totalParrafo = document.createElement('p');
   totalParrafo.classList.add('fs-4','fw-bold','mt-2');
   totalParrafo.textContent= 'Total a Pagar: ';

   const totalSpan= document.createElement('span');
   totalSpan.classList.add('fw-normal');
   totalSpan.textContent =`$${totalPagar}`;


   totalParrafo.appendChild(totalSpan);

   //eliminar ultimo resultado

   const totalPagardiv = document.querySelector('.total-pagar');
   if(totalPagardiv){
      totalPagardiv.remove();
   }

   divTotales.appendChild(subtotalParrafo);
   divTotales.appendChild(propinaParrafo);
   divTotales.appendChild(totalParrafo);
   

   const formulario = document.querySelector('.formulario >div');
   formulario.appendChild(divTotales);

}