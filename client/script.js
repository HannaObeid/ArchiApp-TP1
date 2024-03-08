const factorial = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

console.log("Factorial of 6:", factorial(6));

const apply = (f, arr) => {
    return arr.map((element) => {
        return f(element);
    });
}

console.log("Factorials of the array:", apply(factorial, [1, 2, 3, 4, 5, 6]));

console.log("Array with anonymous function:", apply((n) => n + 1, [1, 2, 3, 4, 5, 6]));

// ------------------------------
// Default micro-service address
let microServiceAddress = process.env.MICROSERVICE_ADDRESS;

const update = (msgs) => {
    var messagesList = document.getElementById("messages-list");
    messagesList.innerHTML = "";

    msgs.forEach((message) => {
        var listItem = document.createElement("li");
        listItem.textContent = message.msg;
        messagesList.appendChild(listItem);
    });
}

let messages = [];

const updateMessageList = () => {
    fetch(`${microServiceAddress}/msg/getAll`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            messages = data.map((msg) => ({ "msg": msg }));
            update(messages);
        });
}

const updateAddrressLabel = () => {
    const serviceAddressLabel = document.getElementById("service-address-label");
    serviceAddressLabel.textContent = microServiceAddress;
}

updateMessageList();
updateAddrressLabel();

document.getElementById("update-button").addEventListener("click", e => {
    e.preventDefault();

    const messageInput = document.getElementById("message");
    const message = messageInput.value;

    fetch(`${microServiceAddress}/msg/${encodeURIComponent(message)}`, { method: 'POST' })
        .then(response => response.json())
        .then(() => {
            updateMessageList();
            messageInput.value = "";
        })
        .catch(error => console.error('Error:', error));

});

document.getElementById("set-address-button").addEventListener("click", e => {
    e.preventDefault();

    const serviceAddressInput = document.getElementById("service-address-input");
    microServiceAddress = serviceAddressInput.value;
    updateAddrressLabel();

    updateMessageList();
});
