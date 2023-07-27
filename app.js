const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
  passphrase: '1234'  // The passphrase you set when generating the certificate
};

// Serve static files from the root folder
app.use(express.static(path.join(__dirname, '/')));

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
    
    if(action == 'led'){
        arduinoSerialPort.write("w");
        return res.send('Led light is on!');
    } 
    if(action == 'off') {
        arduinoSerialPort.write("t");
        return res.send("Led light is off!");
    }

    
    return res.send('Action: ' + action);
 
});

https.createServer(httpsOptions, app).listen(port, function () {
  console.log('Example app listening on port https://0.0.0.0:' + port + '!');
});