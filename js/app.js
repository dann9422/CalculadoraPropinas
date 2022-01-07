let cliente ={
mesa:'',
hora:'',
pedido:[]
    
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
 
}
function mostrarSecciones(){
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
    
       }