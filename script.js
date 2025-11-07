// -------------------- Selecting All Needed Elements --------------------

// Select all elements with class "box" (these are the 9 boxes in the game)
let boxes = document.querySelectorAll(".box");

// Select the reset button by its ID
let resetbutn = document.querySelector("#reset");

// Variable to keep track of whose turn it is (true = Player O, false = Player X)
let turnO = true;

// Select the "New Game" button
let newgamebtn = document.querySelector("#New_Game_btn");

// Select the container that shows the winner message
let winnermsgcontainer = document.querySelector(".winner_msg");

// Select the message text where the winner's name will appear
let msg = document.querySelector("#msg");


// -------------------- Winning Patterns --------------------
// These are all possible winning combinations (using box indexes)
const winPtrns = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


// -------------------- Function: Reset Game --------------------
// Resets the game to start again
const resetgame = () => {
    turnO = true; // Set turn back to Player O
    enabledbtns(); // Enable all boxes again
    winnermsgcontainer.classList.add("hide"); // Hide winner message
}


// -------------------- Adding Click Events to Each Box --------------------
// Loop through all boxes and add a click event listener to each
boxes.forEach((box) => {
    box.addEventListener("click", () => {
       

        // If it's Player O's turn
        if (turnO === true) {
            box.innerText = "O"; // Place 'O' in the box
            turnO = false; // Switch turn to Player X
        } else {
            // If it's Player X's turn
            box.innerText = "X"; // Place 'X' in the box
            turnO = true; // Switch turn to Player O
        }

        // Disable the clicked box so player can't click it again
        box.disabled = true;

        // Check if this move causes a win
        checkWinner();
    });
});


// -------------------- Function: Disable All Boxes --------------------
// Disables all boxes when game ends
const disabledbtns = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}


// -------------------- Function: Enable All Boxes --------------------
// Enables all boxes and clears text for a new game
const enabledbtns = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}


// -------------------- Function: Show Winner --------------------
// Displays the winner message on screen
const showWinner = (Winner) => {
    msg.innerText = `Congratulations , The Winner is ${Winner}`;
    winnermsgcontainer.classList.remove("hide"); // Show message container
    disabledbtns(); // Stop further clicks
};


// -------------------- Function: Check for a Winner --------------------
// Checks all winning combinations to find if someone won
const checkWinner = () => {
    for (let patterns of winPtrns) {
        // Get the inner text (X or O) of the 3 boxes in current pattern
        let pos1val = boxes[patterns[0]].innerText;
        let pos2val = boxes[patterns[1]].innerText;
        let pos3val = boxes[patterns[2]].innerText;

        // Check if all three positions are not empty
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            // If all 3 are equal, we have a winner
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val); // Display winner
            }
        }
    }
};


// -------------------- Event Listeners for Buttons --------------------
// When "New Game" button is clicked, reset the game
newgamebtn.addEventListener("click", resetgame);

// When "Reset" button is clicked, also reset the game
resetbutn.addEventListener("click", resetgame);
