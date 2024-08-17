import handlePlayer from "./player.js";
import handleDom from "./dom.js";


/*Funciones globales*/
const attack = function(box, player1, player2){
        
    let pos = {};
    if(pos != {}){
    pos.x = Number(box.dataset.row);
    pos.y = Number(box.dataset.column)
    }
    let hit;

    if (player1.getShift() === true && player2.getShift() === false) {
        if(!hit){
            hit = player1.attack(player2.userBoard, pos);
            if (hit == false) {
                player1.setShift(false);
                player2.setShift(true);
                return;
            }
            console.log(hit);
            return;
        }
    }
    if (player2.getShift() === true && player1.getShift() === false) {
        if(!hit){
            hit = player2.attack(player1.userBoard, pos);
            if (hit == false) {
                player1.setShift(true);
                player2.setShift(false);
                return;
            }
            return;
        }
    }
    
}

const prepareAttack = function(target,player1, player2){
    let enemyBox = document.querySelectorAll(target);
    enemyBox.forEach(box=>{
            box.addEventListener("click",(e)=>{
               
                if(player1.getShift() === true && e.target.parentNode.id == "display-board-two"){
                    if(box.textContent == ""){
                       // box.textContent = "X";
                       attack(box, player1, player2);
                       handleDom.handleShift(box, "display-board-two", player2);
                        return;
                    }else{
                        handleDom.handleShift(box, "display-board-two", player2);
                        attack(box, player1, player2);
                        return;
                    }
                }else if(player2.getShift() === true && e.target.parentNode.id == "display-board-one"){
                    if(box.textContent == ""){
                        //box.textContent = "X";
                        attack(box, player1, player2);
                        handleDom.handleShift(box, "display-board-one", player1);
                        return;
                    }else{
                        attack(box, player1, player2);
                        handleDom.handleShift(box, "display-board-one", player1);
                        return;
                    }
                }

                
                return;
        }, {once:true});

    });

};
const playervsPc = function(userName){
    
    let gameOver = false;
    let winner = "";


    const player1 = handlePlayer.createPlayer(userName); 
    let fleetPlayer1 = player1.fleet;
    player1.setShift(true);

    const player2 = handlePlayer.createPlayer("Computer"); 
    player2.setShift(false);
    let fleetPlayer2 = player2.fleet;

    /*Primer paso: posicionamos las naves*/
    fleetPlayer1.forEach(element =>{
        player1.userBoard.automaticPos(element); 
    }); 

    fleetPlayer2.forEach(element =>{
        player2.userBoard.automaticPos(element); 
    }); 
    handleDom.setInfo(player1.userName);
    handleDom.drawBoard(player1.userBoard.board, "display-board-one");
    handleDom.drawBoard(player2.userBoard.board, "display-board-two");
        
   /*Preparamos el tablero*/
    prepareAttack("#display-board-two>.box", player1, player2);
    prepareAttack("#display-board-one>.box", player1, player2);
 
    
    const handleShift = function(){
        
        if (player1.getShift() == true && player2.getShift() == false) {

            //handleDom.handleBoard("#display-board-two>", boardPlayer2)
            //vamos a esconder nuestro tablero y mostrar el enemigo
            if (player1.isFleetSunked() === true) {
                gameOver = true;
                winner = "PC";
                return;
            }
        }
        if(player2.getShift() == true && player1.getShift() == false) {               
            
            if (player2.isFleetSunked() === true) {
                gameOver = true;
                winner = "Player 1";
                return;
            }
        }
    }

    let gameInterval = function(){
        if(gameOver == false){
            handleShift(); 
        }else{
            clearInterval(idInterval);
        }
    }

    let idInterval = setInterval(gameInterval, 1000);
        
}
//manejamos el flujo del juego llamando a funciones
document.addEventListener("DOMContentLoaded", ()=>{
    let modal = document.querySelector(".choose-game"); 
    modal.classList.toggle("show");
    console.log("modal"); 
    const btnConfirm = document.getElementById("confirm-player-vs-pc"); 
    btnConfirm.addEventListener("click", ()=>{
        console.log("click")
        
        
        let divPlayerVsPc = document.querySelector(".player-vs-pc"); 
        modal.classList.toggle("show");
        divPlayerVsPc.classList.toggle("show");


        document.getElementById("send-info-user").addEventListener("click", (e)=>{
            e.preventDefault();
            let username = "";

            if(document.getElementById("username").value !== null){
                username = document.getElementById("username").value;
                document.getElementById("username").value = "";
            }else{
                username = "Player 1"
            }
            const formInfo = document.getElementById("get-info-user"); 
            formInfo.reset(); 
            divPlayerVsPc.classList.toggle("show");
            playervsPc(username);

        });
    });
});



    
