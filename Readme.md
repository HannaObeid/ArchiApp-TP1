# Messages Subject App
This application is a simple client-server architecture that allows users to interact with a collection of messages stored on a server. The server, built with Express, manages a list of messages, while the client, written in JavaScript, fetches and updates the messages dynamically.

- [Github Mono Repo](https://github.com/HannaObeid/ArchiApp-TP1)
- [Replit client](https://replit.com/@hannasobeid/Archi-App-TP1-client)
- [Replit server](https://replit.com/@hannasobeid/ArchiApp-TP1-server)
- [Deploy webapp](https://archiapp-tp1-1.onrender.com)
- [Deploy API](https://archiapp-tp1.onrender.com)


## Client

### 1. Microservice Address

The client-side code begins by declaring a variable `microServiceAddress` that holds the URL of the Express server.

```javascript
let microServiceAddress = "https://archiapp-tp1.onrender.com";
```

### 2. Message Update Function

The `update` function is responsible for updating the HTML representation of the messages based on the data received from the server.

```javascript
const update = (msgs) => {
    var messagesList = document.getElementById("messages-list");
    messagesList.innerHTML = "";

    msgs.forEach((message) => {
        var listItem = document.createElement("li");
        listItem.textContent = message.msg;
        messagesList.appendChild(listItem);
    });
};
```

### 3. Message Handling

The client keeps track of the messages using the `messages` array.

```javascript
let messages = [];
```

### 4. Fetching and Updating Message List

The `updateMessageList` function fetches the list of messages from the server and updates the client-side messages array. It then calls the `update` function to refresh the UI.

```javascript
const updateMessageList = () => {
    fetch(`${microServiceAddress}/msg/getAll`)
        .then((response) => response.json())
        .then((data) => {
            messages = data.map((msg) => ({ "msg": msg }));
            update(messages);
        });
};
```

### 5. Updating Service Address Label

The `updateAddrressLabel` function updates the UI with the current microservice address.

```javascript
const updateAddrressLabel = () => {
    const serviceAddressLabel = document.getElementById("service-address-label");
    serviceAddressLabel.textContent = microServiceAddress;
};
```

### 6. Initial Setup

The `updateMessageList` and `updateAddrressLabel` functions are called initially to populate the message list and display the current microservice address.

```javascript
updateMessageList();
updateAddrressLabel();
```

### 7. Event Listeners

The client-side code includes event listeners for user interactions.

- The "Send" button allows users to add a new message by sending a POST request to the server.

```javascript
document.getElementById("update-button").addEventListener("click", e => {
    // ...
});
```

- The "Set Address" button lets users dynamically change the microservice address and update the UI accordingly.

```javascript
document.getElementById("set-address-button").addEventListener("click", e => {
    // ...
});
```

### 8. Handling Message Update

When the `Update` button is clicked, the client sends a POST request to the server with the new message. Upon a successful response, it updates the message list and clears the input field.

### 9. Handling Address Change

When the `Set Address` button is clicked, the client dynamically updates the microservice address, refreshes the UI, and fetches the updated message list from the new address.

## Server
This document explains the functionality of the provided Express server code. The server utilizes the Express framework to handle HTTP requests and responses. It also includes basic middleware to enable Cross-Origin Resource Sharing (CORS) and exposes several endpoints for managing a simple list of messages.

### 1. Middleware
The server employs middleware to handle CORS, allowing cross-origin requests. This middleware sets the necessary headers to permit requests from any origin and specify accepted headers.

```javascript
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
```

### 2. Message Storage
The server maintains an array called allMsgs to store messages. Initially, it contains three messages: `Hello World,` `foobar,` and `CentraleSupelec Forever.`

```javascript
const allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];
```

### 3. Endpoints
The server exposes several endpoints to interact with the message list.

- Get all messages
    - Endpoint: /msg/getAll
    - Method: GET
    - Response: Returns the entire list of messages in JSON format.

- Get the number of messages
    - Endpoint: /msg/nber
    - Method: GET
    - Response: Returns the total number of messages in the list.

- Post a new message
    - Endpoint: /msg/:message
    - Method: POST
    - Parameters: :message is a URL-encoded parameter containing the new message.
    - Response: Adds the new message to the list and returns a JSON object with a success code (`1`) and the message number.

- Get a specific message by number
    - Endpoint: /msg/:number
    - Method: GET
    - Parameters: :number is the index of the desired message.
    - Response: Returns the specified message along with a success code (`1`). If the index is out of bounds, it returns a failure code (`0`).

- Delete a specific message by number
    - Endpoint: /msg/:number
    - Method: DELETE
    - Parameters: :number is the index of the message to delete.
    - Response: Removes the specified message from the list and returns a success code (`1`). If the index is out of bounds, it returns a failure code (`0`).


### 4. Server Initialization
The server is set to listen on port 8080. After starting, it logs a message to the console.

```javascript
app.listen(8080);
console.log("App listening on port 8080...");
```