import handlePlayer from "./player.js";

const user1 = handlePlayer.createPlayer("ValorUsuario"); 
let boardUser1 = user1.userBoard;
let fleetUser1 = user1.fleet;

console.log(user1);


// const user2 = handlePlayer.createPlayer("Computer"); 
// let boardUser2 = user2.userBoard;
// let fleetUser2 = user2.fleet;

let round = 1; 
let gameOver = false;
let turnoUser1 = true; 
let turnoUser2 = false;

let winner = "";
while(gameOver === false){
    fleetUser1.forEach(element =>{
        console.log(element) 
    });

    boardUser1.viewBoard();

  /*   fleetUser2.forEach(element =>{
        boardUser2.automaticPos(element); 
    }); 
    boardUser2.viewBoard();
    ; */
    gameOver = true;
}
