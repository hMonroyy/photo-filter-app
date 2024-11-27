export class CanvasHandler {
    constructor(idCanvas) {
        this.idCanvas = idCanvas;
        this.margin = "10px";
    }

    getContext() {
        const c = document.getElementById(this.idCanvas);
        this.ctx = c.getContext("2d");
    }

    dibuixarImg(src, margin) {
        const img = new Image();
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.canvas.width = img.width * 2 + margin * 2; 
            this.ctx.canvas.height = img.height + margin * 2;
            this.ctx.drawImage(img, margin, margin, img.width, img.height);
        };
        img.src = src;
    }

    dibuixarImgWithFilter(originalSrc, filteredSrc, margin) {
        const originalImg = new Image();
        originalImg.onload = () => {
            const filteredImg = new Image();
            filteredImg.onload = () => {
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                this.ctx.canvas.width = originalImg.width * 2 + margin * 3;
                this.ctx.canvas.height = originalImg.height + margin * 2;
                this.ctx.drawImage(originalImg, margin, margin, originalImg.width, originalImg.height);
                this.ctx.drawImage(filteredImg, originalImg.width + margin * 2, margin, originalImg.width, originalImg.height);
            };
            filteredImg.src = filteredSrc;
        };
        originalImg.src = originalSrc;
    }    

    netejarCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    getMargin() {
        this.margin;
    }

    getCanvasDataUrl() {
        return this.ctx.canvas.toDataURL();
    }

    setMargin(margin) {
        this.margin = margin;
    }
}