function createBoard(fleet=null){
    const MAX = 10;
    //naves
    let board = []; 
    let missesShot = [];
    let userFleet = [];
    
    if(fleet!==null){
        userFleet = fleet;

    }
    console.log(userFleet);
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
            console.log(currentFila)
            
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
        
        if((currentShip.lenght === (finalX+1)-(initX+1) || (currentShip.lenght === (finalX+1)-(initX+1)))){

            if(initX == finalX){
                currentY = initY;
                
                while(finalY > currentY){
                    board[initX][currentY] = ship.id;
                    currentY++;
                } 
                return true;
            }

            if(initY == finalY){
                currentX = initX
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
        while(positionatedShips < 1){
            let isVertical = Math.floor(Math.random()*2);
            let initX = 0;
            let initY = 0;
            let finalX = 0;
            let finalY = 0;
            let posInit = {};
            let posFinal = {}; 

            console.log("reinicializamos valroes y verificamos si es vertical o no")
            if(isVertical == 1){
                initX = Math.floor(Math.random() * 10);
                initY = Math.floor(Math.random() * 10);
        
                finalX = initX + Math.floor(Math.random() * 6);
                finalY = initY;
        
            }else{
                initX = Math.floor(Math.random() * 10);
                initY = Math.floor(Math.random() * 10);
        
                finalX = initX;
                finalY = initY + Math.floor(Math.random() * 6); 
            }

            console.log("Ahora que sabemos que es vertical, definimimos pos Init y pos Final"); 
            console.log("Es vertical?:" + isVertical);

            if(isVertical===1 && finalX < 10 || isVertical===0&&finalY<10){   
                posInit = {
                    x:initX, 
                    y:initY
                }
                posFinal = {
                    x:finalX, 
                    y:finalY
                }
            
            console.log(posInit)
            console.log(posFinal)

            console.log("Ahora verificamos si coincide con el tamaño del barco:"); 
            console.log("ship" + ship.lenght);
            console.log("x lenght" + ((finalX+1)-(initX+1)));
            console.log("y lenght" + (finalY-initY+1));
           if((ship.lenght) == (finalX+1)-(initX+1) || (ship.lenght) == (finalX+1)-(initX+1) ){
               let boolean = posShip(board, ship, posInit, posFinal);
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

    return{
        viewBoard, 
        posShip, 
        automaticPos,
        getPos, 
        getShip  
    }

} 
export default {createBoard}