const { ArduinoIoTCloud } = require('arduino-iot-js');

async function getArduinoDevices() {
    const client = await ArduinoIoTCloud.connect({
        deviceId: process.env.ADO_ID,
        secretKey: process.env.ADO_KEY,
        onDisconnect: (message) => console.error(message),
    });
    
    const devices = await client.getDevices();
    return devices;
}

module.exports = {
    getArduinoDevices
};