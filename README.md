# MqttLoadSimulator
Basic MQTT Load Simulator. All configurations can be done in a single configuration file config.js. 

Configuration comprises of three sections:
First, you can configure MQTT URL, MQTT Port and Topic.
Second, you can define load parameters (Requests/second and Total requests to send).
Finally, you can customize the payload. It will randomly pick properties to be sent in the payload.

How to use the simulator:
Step 1) Clone this repository.
Step 2) Do "npm install".
Step 3) Make changes in config.js file.
Step 4) Issue "npm start". You are done.

Happy testing.
