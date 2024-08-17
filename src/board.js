function createBoard(fleet=null){
    const MAX = 10;
    //naves
    let board = []; 
    let missesShot = [];
    let userFleet = [];
    let successful_shots = [];


    if(fleet!==null){
        userFleet = fleet;

    }
    
    for (let index = 0; index < MAX; index++) {
        if(board.length < MAX){
            board.push([]);
        }
        for (let jindex = 0; jindex < MAX; jindex++) {
            if(board[index].length < MAX){
                board[index].push("");
            }
        }
    }

    
    const viewBoard = function(){
        for (let i = 0; i < board.length; i++) {
            const element = board[i];
            let currentFila = "";
            
            for(let j = 0; j<element.length; j++){
                if(element[j] === ""){
                    currentFila += ("[" + " " + "]");    
                }else{
                    currentFila += ("[" + element[j] + "]");
                }
            }
            return currentFila;
            
        }
    }

    const getPos = function(x, y){
        return board[x][y];
    } 

    const getShip = function (pos){
        let x = pos.x; 
        let y = pos.y; 

        if(board[x][y] !== ""){
            let currentId = board[x][y]; 

            fleet.forEach(element => {
                if(element.id === currentId){
                    return element;
                }
            });

        }

    }

    const posShip = function(board, ship, posInit, posFinal){
        let currentBoard = board; 
        let currentShip = ship;
        let initX = posInit.x; 
        let initY = posInit.y; 
            
        let finalX = posFinal.x; 
        let finalY = posFinal.y; 
        

        if((currentShip.lenght === (finalX+1)-(initX+1) || currentShip.lenght === (finalY+1)-(initY+1))){

            if(initX == finalX){
                let currentY = initY;
                
                while(currentY < finalY){
                    board[initX][currentY] = ship.id;
                   
                    currentY++;
                } 
                return true;
            }

            if(initY == finalY){
                //console.log(initX)
                let currentX = initX; 
                while(finalX > currentX){
                    board[currentX][initY] = ship.id;
                    currentX++;
                } 
                return true;

            }
            return false;
        }
        return false;
    }

    function automaticPos(ship){
        
        let positionatedShips = 0;
        let availableSpace = 0;
        while(positionatedShips < 1){
            let isVertical = Math.floor(Math.random()*2);
      //      console.log(isVertical);
            let initX = 0;
            let initY = 0;
            let finalX = 0;
            let finalY = 0;
            let posInit = {};
            let posFinal = {}; 

            if(isVertical == 1){
                initX = Math.floor(Math.random() * 10);
                initY = Math.floor(Math.random() * 10);

                finalX = initX + Math.floor(Math.random() * ship.lenght+1);
                finalY = initY;
                availableSpace = 0;
                if(finalX < 10 && board[initX][initY] === ""){
                    for(let i = finalX; i > initX; i--){
                        if(board[i][initY] === ""){
                            availableSpace++;
                        }
                    }
                    posInit = {
                        x:initX, 
                        y:initY
                    }
                    posFinal = {
                        x:finalX, 
                        y:finalY
                    }
                }

            }else{
                initX = Math.floor(Math.random() * 10);
                initY = Math.floor(Math.random() * 10);
        
                finalX = initX;
                finalY = initY + Math.floor(Math.random() * ship.lenght+1); 
                availableSpace = 0;

                if(finalY < 10 && board[initX][initY] === ""){
                    for(let i = finalY; i > initY; i--){
                        if(board[initX][i] === ""){
                            availableSpace++; 
                        }
                    }
                    posInit = {
                        x:initX, 
                        y:initY
                    }
                    posFinal = {
                        x:finalX, 
                        y:finalY
                    }
                }
            }

        if(isVertical=== 1 && finalX < 10 || isVertical=== 0 && finalY < 10){   
            
            
           if((ship.lenght) == (finalX+1)-(initX+1) || (ship.lenght) == (finalY+1)-(initY+1) ){
            let boolean = false;
            if(ship.lenght === availableSpace){
                boolean = posShip(board, ship, posInit, posFinal);
            }
            if(boolean == true){
                positionatedShips = positionatedShips + 1;
                ship.isPositioned = true;
            
            }else{
                console.log("No había posciones definidas")
            }
           }
        }
        
        }
            
    }//automatic pos

    const addMissShot = function(pos){
        let cPos = {
            x:pos.x,
            y:pos.y
        }

        missesShot.push(cPos);
    }

    const getMissesShots = function(){
        return missesShot;
    }

    const addSuccessful_shot = function(pos){
        let cPos = {
            x:pos.x,
            y:pos.y
        }
        successful_shots.push(pos);
    }

    const getSuccessful_shots = function(){
        return successful_shots;
    }

    return{
        board,
        viewBoard, 
        posShip, 
        automaticPos,
        getPos, 
        getShip,
        addMissShot, 
        getMissesShots,
        addSuccessful_shot,
        getSuccessful_shots
    }

} 
export default {createBoard}