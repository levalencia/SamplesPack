/// <reference path="dataservice.ts" />
var dataservice = new DataService();
var Alerter = (function () {
    function Alerter() {
        this.name = 'John';
    }
    Alerter.prototype.showMessage = function () {
        var msg = dataservice.getMessage();
        alert(msg + ', ' + this.name);
    };
    ;
    return Alerter;
})();
//# sourceMappingURL=alerter.js.map