const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const capitals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const specials = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+',
'[', ']', '{', '}', ';', ':', "'", '"', '\\', '|', ',', '.', '<', '>',
'/', '?', '`', '~'];

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const min = Math.ceil( document.getElementById("min").value );
    const max = Math.floor( document.getElementById("max").value );
    const capital = document.getElementById("capital").checked;
    const special = document.getElementById("special").checked;          

    if (min > max) {
        alert("Podaj odpowiednie wartości!");
        return;
    }

    let characters = letters.concat(numbers);

    if (capital) {
        characters = characters.concat(capitals);
    }
    if (special) {
        characters = characters.concat(specials);
    }

    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    let password = ""

    for(let i = 0 ; i < n ; i++){
        password += characters[ Math.floor(Math.random() * characters.length) ];
    }

    //event.target.reset()
    alert("Twoje hasło to:\n" + password);
});