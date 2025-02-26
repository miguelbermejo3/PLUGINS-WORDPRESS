const images = ['coche', 'avion', 'animal', 'moto'];
let tiposCaptcha;
let recuentoImages;
let IntentosFallados = 0;


function mostrarLoading() {
    const loadingOverlay = document.getElementById('carga');
   

    setTimeout(function () {
        loadingOverlay.style.display = 'none';
        document.getElementById('btnVerificar').style.display = 'inline-block';
    }, 2000);
}

function crearCaptcha() {
    const captchaDiv = document.getElementById('captcha');
    tiposCaptcha = images[Math.floor(Math.random() * images.length)];

    recuentoImages = 6;

    const tiposSeleccionados = new Set();

    for (let i = 0; i < 6; i++) {
        let imagenAleatoria;

        if (tiposSeleccionados.size === images.length) {
            imagenAleatoria = images[Math.floor(Math.random() * images.length)];
        } else {
            do {
                imagenAleatoria = images[Math.floor(Math.random() * images.length)];
            } while (tiposSeleccionados.has(imagenAleatoria));
            tiposSeleccionados.add(imagenAleatoria);
        }

        const img = document.createElement('img');
        img.src = `/sellos/wp-content/themes/DIVI/images/${imagenAleatoria}.png`;
        img.alt = imagenAleatoria;
        img.onclick = () => checkImage(img, captchaDiv);
        captchaDiv.appendChild(img);
    }

    const typeDiv = document.createElement('div');

    typeDiv.textContent = `Selecciona todas las imágenes de ${tiposCaptcha}`;
    captchaDiv.appendChild(typeDiv);
}

function checkImage(img, captchaDiv) {
    
    if (img.alt === tiposCaptcha) {
        img.style.display = 'none';
        const imagesOfType = document.querySelectorAll(`img[alt="${tiposCaptcha}"]:not([style="display: none;"])`);
        if (imagesOfType.length === 0) {
            mostrarLoading();
            alert('¡Captcha completado!');
            const verifyButton = document.getElementById('btnVerificar');
            
            const successImg = document.createElement('img');
            successImg.src = '/sellos/wp-content/themes/DIVI/images/verde.png';
            successImg.alt = 'acierto';
            
            captchaDiv.appendChild(successImg);
            verifyButton.disabled = true;
            document.getElementById('btnEnviar').disabled = false;
            console.log('botón activado');
           
        }
        recuentoImages--;
    } else {
        IntentosFallados++;
        if (IntentosFallados >= 3) {
            const captchaDiv = document.getElementById('captcha');
            captchaDiv.innerHTML = '';
            const failedImg = document.createElement('img');
            failedImg.src = '/sellos/wp-content/themes/DIVI/images/eliminar.png';
            failedImg.alt = 'fallo';
            failedImg.id='btnFallo';
            captchaDiv.appendChild(failedImg);
            alert('Has realizado 3 intentos fallidos. Inténtalo nuevamente.');
            IntentosFallados =0;
            crearCaptcha();
        }
    }
}

function checkCaptcha() {
    if (recuentoImages > 0) {
        alert('Aún no has completado el captcha');
    } else {
        alert('¡Captcha completado!');
    }
}

window.onload = crearCaptcha;
