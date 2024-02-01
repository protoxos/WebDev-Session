const titulo = document.querySelector('#titulo');
const imagen = document.querySelector('#imagen');
const descripcion = document.querySelector('#descripcion');
const button = document.querySelector('[add-form] > .field.b > button');

var currentEditId = 0;
var imagenes = [];

button.addEventListener('click', () => {
	const t = titulo.value.trim();
	const i = imagen.value.trim();
	const d = descripcion.value;
	
	if(t == '' || i == '')
		return alert('El titulo y la ubicación son requeridos');
	
	if(currentEditId > 0) 
		imagenes.forEach(img => {
			if(img.id == currentEditId) {
				img.titulo = t;
				img.imagen = i;
				img.descripcion = d;
			}
		});
	else 
		imagenes.push({
			id: getRandomInt(1, 99999),
			titulo: t,
			imagen: i,
			descripcion: d
		});

	titulo.value = '';
	imagen.value = '';
	descripcion.value = '';
	button.innerHTML = 'Agregar';

	renderCards();
	guardar();
});

window.addEventListener('load', () => {
	const imgs = localStorage.getItem('imagenes');
	if(imgs != null){
		imagenes = JSON.parse(imgs);
		renderCards();
	}
})

function edit(id) {
	const img = imagenes.find(imagen => imagen.id == id);
	if(img) {
		currentEditId = id;
		titulo.value = img.titulo;
		imagen.value = img.imagen;
		descripcion.value = img.descripcion;
		button.innerHTML = 'Guardar';
	}
}
function remove(id) {
	imagenes = imagenes.filter(img => img.id != id);
	renderCards();
	guardar();
}
function renderCards() {
	const template = document.querySelector('#tarjeta').innerHTML;
	let newContent = '';

	imagenes.forEach(img => {
		newContent += template
			.replaceAll('{{id}}', img.id)
			.replaceAll('{{titulo}}', img.titulo)
			.replaceAll('{{descripcion}}', img.descripcion)
			.replaceAll('{{imagen}}', img.imagen);
	});

	document.querySelector('.contenedor').innerHTML = newContent;
}

function guardar() {
	const imgs = JSON.stringify(imagenes);
	localStorage.setItem('imagenes', imgs);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
  }