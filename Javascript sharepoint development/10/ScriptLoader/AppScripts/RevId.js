var s43 = s43 || {};

//use this when you always want the same revision ID across libraries
s43.RevId = "123456";

//use this to generate a random revision ID to force a file to always be downloaded from the server
s43.noCacheId = function () {
    return (Math.floor(Math.random() * 99999) + 1) + "-" + new Date().getTime();
}

