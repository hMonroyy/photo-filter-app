import * as Canvas from "./modules/Canvas.js";
import * as Filter from './modules/Filters.js';

let originalImage = null;
let filteredImage = null;

const canvas = new Canvas.CanvasHandler("canvas");
canvas.getContext();

const images = document.querySelectorAll("#canvas-images img");

images.forEach((image) => {
    image.addEventListener("click", () => {
        slider.setAttribute('style', 'display: none');
        const img = new Image();
        img.onload = () => {
            originalImage = img;
            canvas.dibuixarImg(originalImage.src, 10);
        };
        img.src = image.src;
    });
});

function applyFilterToSecondImage(filter) {
    if (originalImage !== null) {
        const originalSrc = originalImage.src;
        const filteredCanvas = document.createElement("canvas");
        const filteredCtx = filteredCanvas.getContext("2d");
        
        filteredCanvas.width = originalImage.width;
        filteredCanvas.height = originalImage.height;

        filteredCtx.drawImage(originalImage, 0, 0);

        filter.transforma(filteredCtx);

        filteredImage = new Image();
        filteredImage.src = filteredCanvas.toDataURL();

        canvas.dibuixarImgWithFilter(originalSrc, filteredImage.src, 10);
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, selecciona una imagen primero.",
        });
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                originalImage = img;
                canvas.dibuixarImg(originalImage.src, 10);
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}

const btnLightDark = document.getElementById("btn-lightDark");
const btnWhiteBlack = document.getElementById("btn-whiteBlack");
const btnNegative = document.getElementById("btn-negative");
const btnMirror = document.getElementById("btn-mirror");
const btnSepia = document.getElementById("btn-sepia");
const btnSaturation = document.getElementById("btn-saturation");
const btnCleanCanvas = document.getElementById("btn-clean-canvas");
const btnDownload = document.getElementById("btn-download");
const fileInput = document.getElementById("file-input");
const btnUpload = document.getElementById("btn-upload");

let currentFilter = "none";

const slider = document.getElementById("slider-range");
slider.addEventListener("input", () => {
    if (currentFilter === "lightDark") {
        const lightDarkFilter = new Filter.LightDark();
        const intensity = slider.value * -1;
        lightDarkFilter.setIntensity(intensity);
        applyFilterToSecondImage(lightDarkFilter);
    } else if (currentFilter === "sepia") {
        const sepiaFilter = new Filter.Sepia();
        const intensity = slider.value;
        sepiaFilter.setIntensity(intensity);
        applyFilterToSecondImage(sepiaFilter);
    } else if (currentFilter === "saturation") {
        const saturationFilter = new Filter.Saturation();
        const intensity = slider.value;
        saturationFilter.setIntensity(intensity);
        applyFilterToSecondImage(saturationFilter);    
    }
});

btnLightDark.addEventListener("click", () => {
    currentFilter = "lightDark";
    const lightDarkFilter = new Filter.LightDark();
    if (originalImage !== null) {
        slider.setAttribute('style', 'display: inline-block');
    }
    applyFilterToSecondImage(lightDarkFilter);
});

btnWhiteBlack.addEventListener("click", () => {
    const whiteBlackFilter = new Filter.WhiteBlack();
    slider.setAttribute('style', 'display: none');
    applyFilterToSecondImage(whiteBlackFilter);
});

btnNegative.addEventListener("click", () => {
    const negativeFilter = new Filter.Negative();
    slider.setAttribute('style', 'display: none');
    applyFilterToSecondImage(negativeFilter);
});

btnMirror.addEventListener("click", () => {
    const mirrorFilter = new Filter.Mirror();
    slider.setAttribute('style', 'display: none');
    applyFilterToSecondImage(mirrorFilter);
});

btnSepia.addEventListener("click", () => {
    currentFilter = "sepia";
    const sepiaFilter = new Filter.Sepia();
    if (originalImage !== null) {
        slider.setAttribute('style', 'display: inline-block');
    }
    applyFilterToSecondImage(sepiaFilter);
});

btnSaturation.addEventListener("click", () => {
    currentFilter = "saturation";
    const saturationFilter = new Filter.Saturation();
    if (originalImage !== null) {
        slider.setAttribute('style', 'display: inline-block');
    }
    applyFilterToSecondImage(saturationFilter);
});

btnCleanCanvas.addEventListener("click", () => {
    canvas.netejarCanvas();
    slider.setAttribute('style', 'display: none');
    originalImage = null;
    filteredImage = null;
});

btnDownload.addEventListener("click", () => {
    if (filteredImage !== null) {
        const originalFileName = originalImage.src.split("/").pop().split(".")[0];
        const downloadLink = document.createElement("a");
        downloadLink.href = filteredImage.src;
        downloadLink.download = `${originalFileName}_by_hector_monroy.png`;
        downloadLink.click();
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, aplica un filtro a una imagen antes de descargar.",
        });
    }
});

btnUpload.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", handleFileUpload);

