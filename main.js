//main.js contents
//Pass a config object to require

require.config({
  "packages": [
    {
      name: "cs",
      main: "cs"
    },
    {
      name: "coffee-script",
      main: "coffee-script"
    }
  ]
});

require(["cs!exec"], function (exec) {

});


/*require({
  paths: {
    cs: 'cs',
    'coffee-script': 'coffee-script'
  }
}, [], function (test) {
    console.log('haha');
});*/