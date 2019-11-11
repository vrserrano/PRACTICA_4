// se define la variable global para el contenedor del video
var video = document.getElementById('video');
// se define la variable global para mp4_src
var video_src = document.getElementById('mp4_src');
// se define la variable global para el h3 de los mensajes de soporte
var no_soportado = document.getElementById('no_soportado');

// Comprobacion de que el navegador soporta las APIs necesarias
if (!(window.File && window.FileReader && window.FileList)) {
	// se hace que el elemento video quede no visible
	video.hidden = true;
	// se hace que el elemento no_soportado quede visible
	no_soportado.hidden = false;
	// se establece el texto del elemento no_soportado
	no_soportado.textContent = 'La API de FILE no es soportada en este navegador';
}

// Funcion recibe el evento al subir el archivo y efectua una accion con el
function handleFileSelect(inputEvent) {
	if (inputEvent.target.files[0].type == "video/mp4") {
		// se hace que el elemento video sea visible
		video.hidden = false;
		// se asegura que el elemento no_soportado quede oculto
		no_soportado.hidden = true;
		// se configura el atributo source del elemento mp4_src con el primer (y unico) archivo del FileList del evento
		video_src.setAttribute("src", URL.createObjectURL(inputEvent.target.files[0]));
		// se setea un poster temporal hasta que termine de cargar el video
		video.setAttribute("poster", "img/loading.gif");
		// carga del video en el elemento "video"
		video.load();
	} else {
		// se para el video (para protegernos en caso de que se estuviese reproduciendo algun video anteriormente)
		stopVideo();
		// se hace que el elemento video quede no visible
		video.hidden = true;
		// se hace que el elemento no_soportado quede visible
		no_soportado.hidden = false;
		// se establece el texto del elemento no_soportado
		no_soportado.textContent = "Archivo no soportado";
	}
}

// reproduce el video, desde la posicion en la que se encuentre
function playVideo() {
	// checkea si existe un video cargado antes de intentar hacer un play
	if (video.readyState > 2) {
		video.play();	
	}
}

// para el video, y retrocede la posicion de reproduccion al segundo 0
function stopVideo() {
	// checkea si existe un video cargado antes de intentar hacer un stop
	if (video.readyState > 2) {
		// se pausa el video
		video.pause();
		// se vuelve al segundo 0 del video
		video.currentTime = 0;
	}
}

// aumenta el volumen gradualmente
function volumeUp() {
	// no intentar subir el volumen por encima de 1, para evitar errores
	if (video.volume < 1) {
		// redondear el valor resultado para evitar tener problemas con los condicionales
		video.volume = Math.round( (video.volume + 0.1) * 10 ) / 10;
	}
}

// reduce el volumen gradualmente
function volumeDown() {
	// no intentar bajar el volumen por debajo de 0, para evitar errores
	if (video.volume > 0) {
		// redondear el valor resultado para evitar tener problemas con los condicionales
		video.volume = Math.round( (video.volume - 0.1) * 10 ) / 10;
	}
}