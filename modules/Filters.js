export class Filter {
    constructor() {
        
    }

    transforma() {

    }
}

export class WhiteBlack extends Filter {
    constructor() {
        super();
    }   

    transforma(ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            const grayscale = red * 0.299 + green * 0.587 + blue * 0.114;

            data[i] = data[i + 1] = data[i + 2] = grayscale;
        }

        ctx.putImageData(imageData, 0, 0);
    }
}

export class LightDark extends Filter {

    constructor() {
        super();
    }

    setIntensity(intensity) {
        this.intensity = intensity;
    }

    transforma(ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;
        let adjustment = 0;

        if (this.intensity !== undefined) {
            adjustment = this.intensity;
        } 

        for (let i = 0; i < data.length; i += 4) {
            data[i] -= adjustment;
            data[i + 1] -= adjustment;
            data[i + 2] -= adjustment;
        }

        ctx.putImageData(imageData, 0, 0);
    }

}

export class Negative extends Filter {

    constructor() {
        super();
        this.intensity = 0;
    }

    setIntensity(intensity) {
        this.intensity = intensity;
    }

    transforma(ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i] + this.intensity;
            data[i + 1] = 255 - data[i + 1] + this.intensity;
            data[i + 2] = 255 - data[i + 2] + this.intensity;
        }

        ctx.putImageData(imageData, 0, 0);
    }

}

export class Mirror extends Filter {

    constructor() {
        super();
    }

    transforma(ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width / 2; x++) {
                const index = (y * width + x) * 4;
                const mirrorIndex = (y * width + (width - x - 1)) * 4;

                for (let i = 0; i < 4; i++) {
                    const temp = data[index + i];
                    data[index + i] = data[mirrorIndex + i];
                    data[mirrorIndex + i] = temp;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

}

export class Sepia extends Filter {
    constructor() {
        super();
        this.intensity = 0;
    }

    setIntensity(intensity) {
        this.intensity = intensity;
    }

    transforma(ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;
        const saturationFactor = 1 + (this.intensity / 100);

        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];

            data[i] = Math.min(255, (red * 0.393) + (green * 0.769) + (blue * 0.189)) * saturationFactor;
            data[i + 1] = Math.min(255, (red * 0.349) + (green * 0.686) + (blue * 0.168)) * saturationFactor;
            data[i + 2] = Math.min(255, (red * 0.272) + (green * 0.534) + (blue * 0.131)) * saturationFactor;
        }

        ctx.putImageData(imageData, 0, 0);
    }
}

export class Saturation extends Filter {
    constructor() {
        super();
        this.intensity = 0;
    }

    setIntensity(intensity) {
        this.intensity = intensity;
    }

    transforma(ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;
        const saturationFactor = 1 + (this.intensity / 100);

        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];

            const gray = 0.299 * red + 0.587 * green + 0.114 * blue;
            data[i] = gray + saturationFactor * (red - gray);
            data[i + 1] = gray + saturationFactor * (green - gray);
            data[i + 2] = gray + saturationFactor * (blue - gray);
        }

        ctx.putImageData(imageData, 0, 0);
    }
}