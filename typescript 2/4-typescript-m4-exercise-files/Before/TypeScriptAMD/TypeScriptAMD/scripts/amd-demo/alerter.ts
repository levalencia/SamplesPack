/// <reference path="dataservice.ts" />

var dataservice = new DataService();

interface IAlerter {
    name: string;
    showMessage(): void;
}

class Alerter implements IAlerter {
    name = 'John';
    showMessage() {
        var msg = dataservice.getMessage();
        alert(msg + ', ' + this.name);
    };
}
