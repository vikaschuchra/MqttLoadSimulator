// Filename:        config.js
// Description:     Contains configuration parameters.
// Author:          Vikas Chuchra
// Date:            Feb-2018
// Version:         1.0.0


////////////////////////////////////////////////////////////////////////
//  Generic MQTT configruation containing connection-related parameters
////////////////////////////////////////////////////////////////////////
var mqtt_config = {
    // URL
    url: 'ws://127.0.0.1',

    // port
    port: 3000,

    // Device ID
    device_id: 'DEVICE_LOAD_01'
}


/////////////////////////////////////////////////////////////////////////
// Load specific configuration -- Total requests, Delay per request etc
/////////////////////////////////////////////////////////////////////////
var load_config = {
    // Mode of load setup
    // 1 --> Concurrent mode (n concurrent requests per second)
    // 2 --> Delay mode (1 request per 1/n second)
    // Only concurrent mode is supported right now.
    load_mode: 1,

    // Number of requests per second
    num_of_requests_per_sec: 1,

    // Total number of requests
    total_requests: 6
};

/////////////////////////////////
// Payload specific configuration 
/////////////////////////////////
var payload_config = {
    
    // For multiple application simulation, add it in the array
    payload_apps: ['application_01', 'application_02', 'application_03'],

    // For multiple properties simulation, add it in the array
    payload_properties: ['Temperature', 'Pressure']
};


///////////////////////////////////////
// Export all the above configurations 
///////////////////////////////////////
module.exports = {
    mqtt_config,
    load_config,
    payload_config
}
