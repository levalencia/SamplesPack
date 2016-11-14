(function () {

    var perfHub = $.connection.perfHub;
    $.connection.hub.logging = true;
    $.connection.hub.start();

    perfHub.client.newMessage = function (message) {
        model.addMessage(message);
    };

    perfHub.client.newCounters = function (counters) {
        model.addCounters(counters);
    };

    var ChartEntry = function (name) {
        var self = this;

        self.name = name;
        self.chart = new SmoothieChart({ millisPerPixel: 50, labels: { fontSize: 15 } });
        self.timeSeries = new TimeSeries();
        self.chart.addTimeSeries(self.timeSeries, { lineWidth: 3, strokeStyle: "#00ff00" });

    };

    ChartEntry.prototype = {
        addValue: function (value) {
            var self = this;
            self.timeSeries.append(new Date().getTime(), value);
        },

        start: function () {
            var self = this;
            self.canvas = document.getElementById(self.name);
            self.chart.streamTo(self.canvas);
        }
    };

    var Model = function () {
        var self = this;
        self.message = ko.observable(""),
        self.messages = ko.observableArray()
        self.counters = ko.observableArray()
    };

    Model.prototype = {

        addCounters: function(updatedCounters){
            var self = this;

            $.each(updatedCounters, function (index, updateCounter) {
                var entry = ko.utils.arrayFirst(self.counters(),
                    function (counter) {
                        return counter.name == updateCounter.name;
                    });
                if (!entry) {
                    entry = new ChartEntry(updateCounter.name);
                    self.counters.push(entry);
                    entry.start();
                }
                entry.addValue(updateCounter.value);

            });
        },

        sendMessage: function () {
            var self = this;
            perfHub.server.send(self.message());
            self.message("");
        },

        addMessage: function (message) {
            var self = this;
            self.messages.push(message);
        }

    };

    var model = new Model();

    $(function () {
        ko.applyBindings(model);
    });

}());