module.exports = function (config) {
    config.set({
        basePath: '../',
        port: 9876,
        frameworks: ['jasmine'],
        files: [
            //Library scripts
            'test/lib/angular.js',  //Ensure Angular is loaded first
            'test/lib/*.js',
            'Scripts/**/*.js',

            //App and test scripts (order matters!)
            'test/helpers/*.js',
            'app/wc.directives/directives/wcOverlay.js',
            'app/wc.directives/directives/menuHighlighter.js',
            'app/expenseApp/app.js', 
            'app/expenseApp/**/*.js',
            'test/unit/*.js'
        ],
        autoWatch: true,
        browsers: ['Chrome'],
        reporters: ['progress']
    });
};

