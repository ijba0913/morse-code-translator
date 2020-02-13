const { Board } = require("johnny-five");

// Johnny-Five will try its hardest to detect the port for you,
// however you may also explicitly specify the port by passing
// it as an optional property to the Board constructor:

// The board's pins will not be accessible until
// the board has reported that it is ready
function translate(word) {
  const board = new Board({
    // port: "/dev/tty.usbmodem14201"
    port: "/dev/cu.morse-DevB"
  });

  board.on("ready", () => {
    board.pinMode(13, board.MODES.OUTPUT);
    board.loop(500, () => {
      // Whatever the last value was, write the opposite
      board.digitalWrite(13, board.pins[13].value ? 0 : 1);
      // piezo.play({ song: ["C4", 1 / 2]})
    });
  });
}

module.exports = {
  translate
}

