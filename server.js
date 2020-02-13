var five = require("johnny-five"); // Load the node library that lets us talk JS to the Arduino
var board = new five.Board({
  port: "/dev/cu.morse-DevB"

}); // Connect to the Arduino using that library

let morse = {
  // 0: "-----",
  // 1: ".----",
  // 2: "..---",
  // 3: "...--",
  // 4: "....-",
  // 5: ".....",
  // 6: "-....",
  // 7: "--...",
  // 8: "---..",
  // 9: "----.",
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  // ".": ".-.-.-",
  // ",": "--..--",
  // "?": "..--..",
  // "!": "-.-.--",
  // "-": "-....-",
  // "/": "-..-.",
  // "@": ".--.-.",
  // "(": "-.--.",
  // ")": "-.--.-"
}

board.on("ready", function () { // Once the computer is connected to the Arduino
  // Save convenient references to the LED pin and an analog pin
  var LEDpin = new five.Pin(12);
  var analogPin = new five.Pin('A0');

  var express = require('express'); // Load the library we'll use to set up a basic webserver
  var app = express(); // And start up that server

  app.get('/', function (req, res) { // what happens when we go to `/`
    res.send("Hello from `server.js`!"); // Just send some text
  });

  app.get('/hello', function (req, res) { // what ha1ppens when we go to `/hello`
    res.sendFile('hello.html', { root: '.' }); // Send back the file `hello.html` located in the current directory (`root`)
  });

  app.get('/:pin/state', function (req, res) { // what happens when someone goes to `/#/state`, where # is any number
    console.log("Someone asked for the state of pin", req.params.pin + "…");
    var pins = {
      'analog': analogPin,
      'led': LEDpin
    };
    if (pins.hasOwnProperty(req.params.pin)) { // If our pins dictionary knows about the pin name requested
      pins[req.params.pin].query(function (state) { // Look up the pin object associated with the pin name and query it
        res.send(state); // sending back whatever the state we get is
      });
    }
    else {
      var errorMessage = "Sorry, you asked for the state of pin `" + req.params.pin + '`, ' + "but I haven't been told about that pin yet.";
      res.send(errorMessage);
    }
  });

  app.get('/led/off', function (req, res) { // what happens when someone goes to `/led/off`
    console.log("Someone told me to turn the led off…");
    LEDpin.low(); // Set the pin referred to by the `LEDpin` variable 'low' (off)
    res.send("Now the LED for pin 13 should be off."); // And tell the user that it should be off in the webpage
  });

  app.get('/buzz/:input', function (req, res) { // what happens when someone goes to `/led/off`
    console.log("Someone told me to turn the led on…");
    console.log('input', req.params.input)
    const chars = req.params.input.split('')

    console.log('chars', chars)
    let codes = ''
    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === ' ') codes += '&'
      else codes += morse[chars[i]] + '_';
    }
    console.log('codes', codes)
    // const fullMorseCode = morse[char]
    // console.log('char', char)
    // console.log('morseCode', morseCode)
    // // board.on("ready", () => {


    let array = []
    for (let i = 0; i < codes.length; i++) {
      console.log(codes[i])
      if (codes[i] === '.') {
        array = [...array, 1, 0]
      } else if (codes[i] === '-') {
        array = [...array, 1, 1, 1, 0]
      } else if (codes[i] === '_') {
        array = [...array, 0, 0]
      } else if (codes[i] === '&') {
        array = [...array, 0, 0, 0, 0, 0, 0]
      }
    }

    console.log('array', array)
    board.pinMode(13, board.MODES.OUTPUT);
    let i = 0;

    board.loop(80, () => {
      board.digitalWrite(13, array[i]);
      board.digitalWrite(12, array[i]);
      i++;
    });
  


    let output = ''
    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === ' ') output += '   '
      else output += morse[chars[i]] + ' ';
    }
    res.send(output) // And tell the user that it should be off in the webpage
  });

  app.listen(3000, function () { // Actually turn the server on
    console.log("Server's up at http://localhost:3000!");
  });
});
