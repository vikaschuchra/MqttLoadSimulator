// Filename:        app.js
// Description:     The starting point ....
// Author:          Vikas Chuchra
// Date:            Feb-2018
// Version:         1.0.0


// We need following modules
var config = require('./config');
var mqtt = require('mqtt'); 
var sleep = require('system-sleep');

// I dont want variable hoisting to be done by the system.
var mqtt_url  = config.mqtt_config.url;
var mqtt_port = config.mqtt_config.port;
var mqtt_topic = 'devices/' + config.mqtt_config.device_id + '/';

// Let us start, and show the configuration at screen.
console.log("Connection url = " + mqtt_url);
console.log("Topic = " + mqtt_topic);

// Get any random entry from device/app/tag-names array
// Make use of the fact that Math.random returns any 
// value between 0 and 1.
function getRandom(property_array) {
    return property_array[Math.floor(Math.random() * property_array.length)];
}

// Get any random integer between min and max, both inclusive
function getRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get any number up to two decimals between min and max.
function getRandomArbitraryNumberUptoTwoDecimals(min, max) {
    return Math.random().toFixed(3) * (max - min) + min;
}

// Global variable to send unique sequence number in payload
var log_seq_num = 100;

// Let us generate the random payload
function getPayload() {

    // Get any random property
    var property = getRandom(config.payload_config.payload_properties);

    if('Temperature' === property) {

        // Get random value
        var value = getRandomArbitraryNumberUptoTwoDecimals(98,104);

        // Form the payload 
        var payload = {
            ApplicationName: getRandom(config.payload_config.payload_apps),
            Timestamp: Date(),
            Temperature: value,
            SeqNum: log_seq_num++
        };

    } else if('Pressure' === property) {
        
        // Get random value
        var value = getRandomIntegerInRange(70,100);

        // Form the payload 
        var payload = {
            ApplicationName: getRandom(config.payload_config.payload_apps),
            Timestamp: Date(),
            Pressure: value,
            SeqNum: log_seq_num++
        };

    }
    return JSON.stringify(payload);
}

// Let us connect.
var client = mqtt.connect(mqtt_url,{
    clientId: "mqtt_" + Math.floor(Math.random()*1000000),
    port:3000
});

client.on('connect', function() {
    console.log('Good... now you are connected.');

    // Concurrent mode
    if(1 == config.load_config.load_mode) {
        console.log('We will publish ' + config.load_config.total_requests +
            ' requests with ' + config.load_config.num_of_requests_per_sec +
            ' requests every second.');
    }

    // Delay mode
    else {
        console.log('We will publish ' + config.load_config.total_requests +
            ' requests with one request every 1/' + 
            config.load_config.num_of_requests_per_sec +
            'th second.');
    }

    for(let index = 1; index <= config.load_config.total_requests; index++) {

        var publish_payload = getPayload();
        console.log(publish_payload);
      
        client.publish(mqtt_topic, publish_payload, {qos: 0 }, function() {
            console.log('Sent the PUBLISH message.');

        if((config.load_config.total_requests > 1) && 
            (index < config.load_config.total_requests)) {

                // Concurrent mode
                if(config.load_config.load_mode == 1) {

                    // sleep for a second
                    if((index % config.load_config.num_of_requests_per_sec) == 0) {
                        console.log('1 sec sleep. Curr index: ' + index);
                        sleep(1000);
                    }
                }
            }

        });
    } // end of for loop.
});
