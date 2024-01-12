var alphabet = 'ABCDIFGHIJKLMNOPQRSTUVWXYZ';
var keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.appendChild(keyboard);

var inputField = document.createElement('input');
document.body.appendChild(inputField);

for (var i = 0; i < alphabet.length; i++) {
    var button = document.createElement('button');
    button.textContent = alphabet[i];
    keyboard.appendChild(button);

    button.addEventListener('click', function (event) {
        inputField.value += event.target.textContent;
    });
}

document.addEventListener('keydown', function (event) {
    var key = event.key.toUpperCase();
    if (alphabet.includes(key)) {
        inputField.value += key;
    }
});

