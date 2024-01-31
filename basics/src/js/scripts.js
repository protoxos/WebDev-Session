const titulo = document.querySelector('#titulo');
const imagen = document.querySelector('#imagen');
const descripcion = document.querySelector('#descripcion');
const button = document.querySelector('[add-form] > .field.b > button');

const imagenes = [];

button.addEventListener('click', () => {
	const t = titulo.value.trim();
	const i = imagen.value.trim();
	const descripcion = window.descripcion.value;
	
	if(t == '' || i == '')
		return alert('El titulo y la ubicación son requeridos');
	
	imagenes.push({
		titulo: t,
		imagen: i,
		descripcion
	})
	console.log(imagenes)
});