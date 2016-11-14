//Extending Internal modules

interface ILogger {
    write: (msg: string) => void;
}

var LoggerMode = {
    Console: 1,
    Alert: 2,
    Toastr: 3
}

namespace App.Tools.Utils {
    export class Logger implements ILogger {
        private writer: any;

        constructor (public mode: number = LoggerMode.Console) {
            switch (this.mode) {
                case LoggerMode.Console:
                    this.writer = (msg: string) => console.log(msg);
                    break;
                case LoggerMode.Alert:
                    this.writer = (msg: string) => alert(msg);
                    break;
                case LoggerMode.Toastr:
                    this.writer = (msg: string) => toastr.info(msg);
                    break;
            }
        }

        write(msg) {
            this.writer(msg);
        };

    }
}

interface IPoint {
    getDist(): number;
}

namespace App.Tools.Shapes {
    export class Point implements IPoint {
        constructor (public x: number, public y: number) { }
        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    }

}

interface IRectangle {
    height: number;
    width: number;
    getPerimeter(): number;
    getArea(): number;
}

namespace App.Tools.Shapes {
    export class Rectangle implements IRectangle {
        constructor (public height: number, public width: number) { }
        getPerimeter() { return this.height * 2 +  this.width * 2; }
        getArea() { return this.height * this.width; }
    }

}
