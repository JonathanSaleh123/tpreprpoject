const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

var port = 3000;

var arduinoCOMPort = "/dev/cu.usbserial-DN035ZE9";

var SerialPort = require('serialport').SerialPort;

var arduinoSerialPort = new SerialPort({  
 path: arduinoCOMPort,
 baudRate: 9600
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

// app.get('/', function (req, res) {

//     return res.send('Working');
 
// })


app.get('/:action', function (req, res) {
    
   var action = req.params.action || req.param('action');
    
    if(action == 'grey'){
        arduinoSerialPort.write("g");
        return res.send('Grey Led light is on!');
    } 
    if(action == 'green') {
        arduinoSerialPort.write("w");
        return res.send("Green Led light is on!");
    }
    if(action == 'blue') {
        arduinoSerialPort.write("b");
        return res.send("Blue Led light is on!");
    }

    arduinoSerialPort.write("a");
    return res.send('Action: ' + action);
 
});

app.listen(port, function () {
  console.log('Example app listening on port http://0.0.0.0:' + port + '!');
});