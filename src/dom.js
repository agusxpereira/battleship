const uiPlayerOne = document.getElementById("ui-player-one");
const uiPlayerTwo = document.getElementById("ui-player-two"); 

console.log(uiPlayerOne)

const drawBoard = function(board, userBoard){
    console.log(`${userBoard}`)
    const boardUser = document.getElementById(`${userBoard}`);
    let rowBoard = -1;
    let columnBoard = -1;
    board.forEach(row => {
        rowBoard++;
        columnBoard = -1;
        row.forEach(box=>{
            columnBoard++;
            let boxBoard = document.createElement("div"); 
            boxBoard.classList.add("box"); 
            //boxBoard.classList.add("row-center")
            boxBoard.innerHTML = "";
            boardUser.appendChild(boxBoard);
            boxBoard.dataset.row = rowBoard;
            boxBoard.dataset.column = columnBoard;
        });


    });

} 


const setDragShips = function(){
    /*
        
                <div id="battleship" draggable="true">
                    <div class="ship"></div>
                    <div class="ship"></div>
                    <div class="ship"></div>
                    <div class="ship"></div>
                </div>
                <div id="cruiser" draggable="true">
                    <div class="ship"></div>
                    <div class="ship"></div>
                    <div class="ship"></div>
                </div>
                <div id="submarine" draggable="true">
                    <div class="ship"></div>
                    <div class="ship"></div>
                    <div class="ship"></div>
                </div>
                <div id="destroyer" draggable="true">
                    <div class="ship"></div>
                    <div class="ship"></div>
                </div>
    */
   
    const fleetUserOne = document.getElementById("fleet-user-one");
    

    const divCarrier = document.createElement("div"); 
    divCarrier.id = "carrier"; 
    divCarrier.classList.add("carrier-one"); 
    divCarrier.setAttribute("draggable", "true");
    for(let i = 0; i < 6; i++){
        const divShip = document.createElement("div"); 
        divShip.classList.add("ship");
        divCarrier.appendChild(divShip);
    }
    fleetUserOne.appendChild(divCarrier);
    console.log(fleetUserOne)
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        console.log(box);
        box.addEventListener("dragenter", (event)=>{
            event.preventDefault();
            console.log("dragenter")
        });
        box.addEventListener("dragover", (event)=>{
            //event.preventDefault();
            console.log("dragOver")
        });

    });


    const carrierPlayerOne = document.querySelector(".carrier-one");
    carrierPlayerOne.addEventListener("click", ()=>{
        carrierPlayerOne.classList.toggle("row-center")
    }); 

    carrierPlayerOne.addEventListener("dragstart", (event)=>{
        console.log(event);
    });
}



const setInfo = function(name){
    let titleName = document.querySelector(".user-name"); 
    titleName.textContent = name;
}

const handleBoard = function( target, board){
    console.log("Esta funcion se llamo correctamente")
    const boardBoardDom = document.getElementById(target); 
    const currentBoard = board.board; 
    const missesShots = board.getMissesShots();
   // const accurateShots = currentBoard.getAccurateShots(); 

    missesShots.forEach(shot =>{
        //let box = currentBoard.getBox(shot);
        let boxes = document.querySelectorAll(`${target}.box`);
        boxes.forEach(box =>{
            if(box.dataset.row == shot.x && box.dataset.column == shot.y ){
                
            }
        });
    })
}


const handleShift = function(box, target, player){
    
    /*La idea acá es que si es el turno del player2 se muestre el board del player1 nada más, no revelar la posicion de las naces
    y mostrar todos los disparos fallidos*/
    
   

    let missesShots = player.userBoard.getMissesShots();
    let successful_shots = player.userBoard.getSuccessful_shots();


    let boxes = document.querySelectorAll(`#${target}>.box`);


    boxes.forEach(box=>{
        
        missesShots.forEach(shot => {
            if(shot.x == box.dataset.row && box.dataset.column == shot.y){
                box.textContent = "X";
            }
        });
        
        successful_shots.forEach(shot => {
            if(shot.x == box.dataset.row && box.dataset.column == shot.y){
                box.textContent = "O";
            }
            
        });

    })

}

const handlePlayerShift = function(player1, player2){

    if (player1.getShift() == true && player2.getShift()==false) {

        document.querySelector("#shift-sunked-one").textContent = `${player1.getSunkenShips()}`;
        
        document.querySelector("#shift-player-one").textContent = "It's your shift!";
        document.querySelector("#shift-player-two").textContent = "";
        let boxes = document.querySelectorAll(`#display-board-two>.box`);
        boxes.forEach(box =>{
            box.classList.add("clickeable");
        });

        let enemyBoxes = document.querySelectorAll(`#display-board-one>.box`);
        enemyBoxes.forEach(box =>{
            box.classList.remove("clickeable");
        });
        return;
    }else if(player1.getShift() == false && player2.getShift()==true){
        document.querySelector("#shift-sunked-two").textContent = `${player2.getSunkenShips()}`;
        document.querySelector("#shift-player-one").textContent = "";
        document.querySelector("#shift-player-two").textContent = "It's your shift!";
        let boxes = document.querySelectorAll(`#display-board-one>.box`);
        boxes.forEach(box =>{
            box.classList.add("clickeable");
        });

        let enemyBoxes = document.querySelectorAll(`#display-board-two>.box`);
        enemyBoxes.forEach(box =>{
            box.classList.remove("clickeable");
        });
        return;
    }
}
export default { drawBoard, setDragShips, setInfo, handleBoard, handleShift, handlePlayerShift }