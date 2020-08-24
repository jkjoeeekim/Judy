// Possible elements in password //
var lowBox = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var upBox = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
var numBox = ["1","2","3","4","5","6","7","8","9","0"]
var spcBox = ["!","@","#","$","%","^","&","*","?","~"]
var allChars = [lowBox, upBox, numBox, spcBox]

// Function to pick a random element within the array //
function getRandomLow() {
    return lowBox[Math.floor(Math.random() * lowBox.length)]
}
function getRandomUp() {
    return upBox[Math.floor(Math.random() * upBox.length)]
}
function getRandomNum() {
    return numBox[Math.floor(Math.random() * numBox.length)]
}
function getRandomSpc() {
    return spcBox[Math.floor(Math.random() * spcBox.length)]
}

// Calling on DOM element //
var passwordEl = document.getElementById("password");
var lowerEl = document.getElementById("lowBox");
var upperEl = document.getElementById("upBox");
var numberEl = document.getElementById("numBox");
var specialEl = document.getElementById("spcBox");
var charactersEl = document.getElementById("characters");
var createEl = document.getElementById("createBtn");

// Possible list of random elements to be chosen from random arrays //
var randomGen = {
    lower: getRandomLow,
    upper: getRandomUp,
    number: getRandomNum,
    special: getRandomSpc,
};

// Event listener to respond to generate button //
createEl.addEventListener("click", () => {
    var incLower = lowerEl.checked;
    var incUpper = upperEl.checked;
    var incNumber = numberEl.checked;
    var incSpecial = specialEl.checked;
    var length = charactersEl.value;

    passwordEl.innerText = generatePassword(
        incLower,
        incUpper,
        incNumber,
        incSpecial,
        length,
    );
});

// Generating the password //
function generatePassword(lower, upper, number, special, length) {
    let generatedPassword = "";

    var typesCount = lower + upper + number + special;

    var typesArr = [{ lower }, { upper }, { number }, { special }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        alert("Please highlight at least 1 box")
        return "";
    }

    if (length < 8) {
        alert("Password is too short");
        return "";
    }

    if (length > 16) {
        alert("Password is too long");
        return "";
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            var rand = Object.keys(type)[0];
            generatedPassword += randomGen[rand]();
        });
    }

    var finalPassword = generatedPassword.slice(0, length);

    return finalPassword; 
}

// Function to only allow numbers in input characters box //
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}