# battleship project  

## Reglas

Empecemos con las reglas básicas del juego que vamos a desarrollar:

*Battleship* es un juego de estrategia por turnos basado en adivinar para dos jugadores. Es jugado en sobre columnas regladas (en papel o en un tablero) dónde cada barco está marcado (ocupando una posicion que se extiende por el eje x o bien por el eje y).

La posicion de estos barcos están ocultas de los otros jugadores. Y estos alternadamente van "disparando" en una posicion (a ciegas) con el objetivo de destruir los barcos del jugador contrario.

[Un ejemplo del mapa de uno de los jugadores, los espacios en gris marcan el lugar dónde esta su nave y las cruces son los diparos del enemigo](imgs/Battleship_game_board.svg.png)

- Los tableros generalmente son de 10x10
- Cada cuadrado (celda) se identifica por una letra y un número
- En un grid los jugadores acomodan sus barcos y registran el disparo del oponente, en el otro registran sus propios disparos.

- Antes de arracnar el juego, cada jugador debe ordenar sus naves de forma secreta.
- Cada nave ocupa un numero secuencial de celdas, ya sea horizaontalmente o verticalmente.

- El numero de celdas es determinado por el tipo de nave.

- Los barcos no pueden sobreponerse (dos distintos ocupar el mismo espacio)

- El tipo y número de naves es el mismo para cada openente.

- El juego se trata en ir descubriendo la posicion de las naves enemigas.

- Una nave es destruida cuado se alcanza a todas sus celdas.

- Es un disparo por turno a menos que se alcance a una nave (esto lo implemento despues porque parecen no ser las reglas originales)

Naves:

1 Carrier 5 <br>
2 Battleship 4 <br>
3 Cruiser 3 <br>
4 Submarine 3 <br>
5 Destroyer 2

## Assignaments

1. Comencemos nuestra aplicación creando una clase/fabrica llamada `Ship`  

- Nuestras 'naves'(ships) van a ser objetos que incluyan un largo, el número de veces que fueron golpeadas y si estan o no hundidos.
- **Recordemos** que sólo debemos testear la interfaz publica   de nuestro objeto. Sólo métodos o propiedades que son usados fuera de nuestro objeto 'nave' necesitan unit test.

- Las naves deberian tener un método `hit()` que incremente el numero de 'golpes' en nuestro barco.

- `isSunk()` deberia de ser una funcion que calcula si un barco está hundido comparando el número de golpes con el tamaño del barco.

## 2. Crear una fábrica `Gameboard`

- Notemos que todavía no creamos ninguna interfaz de Usuario. Notamos que el código se está intengrando a medida que ejecutamos los tests. No deberiamos confiar en los `console.log` para asegurarnos que nuestro código hace lo que esperamos.
- El gameboard deberia permitir posicionar las naves en coordenas especificas llamando a la fábrica de naves.

Recordemos que los tableros son de un tamaño 10x10

- El gameboard deberia tener una funcion `receiveAttack` que tome un par de coordenadas, determine si el ataque golpeó o no a un barco y entonces envíe la función 'hit' a la nave correcta, o guarde las coordenadas del disparo errado.  

Para esto primero debemos tener un mecanismo que determine si hay o no un barco. Y para saber si hay o no un barco, debemos tener la posibilidad de agregar barcos:

    [   x  x x
        [][][]y
        [s][s][s]y
        [][][]y
    ]

    x = 0; 
    y = 2; 
    x2 = 2; 
    y2 = 2;
    
    s = ship 
    por lo que podemos agregar el barco en dos posciones, vertical u horizontal. 
    Cada posicion dentro del arreglo, debe guardar una referncia al barco que la ocupa 
    Es decir, un barco es un sólo objeto, pero debe ocupar más de una posicion dentro del board. 
    
    tambien, la longitud del barco debe coincidir con (x2 - x1)+ 1. 
    Esto lo podemos solucionar dandole un id al barco, 
    
    id_1 = Carrier (5 pos) 
    id_2 = Battleship 4 
    id_3 = Cruiser 3 
    id_4 = Submarine 3
    id_5 = Destroyer 2 

    También el máximo de barcos son 5, por lo  que debemos definir un arreglo llamado "flota", dónde almacenar los barcos. Esto para poder distiguir entre ambos barcos que tienen la misma longitud
    Ahora en la funcion de crear barcos, según la cantidad tamaño que ocupe el barco, va a tener un id representando  a un de  estos barcos. Esto igual supongo que lo vamos a hacer cuando tengamos a la clase usuario, o bien en el game. 


    Entonces `reciveAttack()`: 

    if(userX.attack(x, y)){
        if(gameBoard.getSquare(x,y) === someShip){
            let shipUnderAttack = gameBoard.getShip(x, y); 

            shipUnderAttack.hit();
        }else{
            missShots.push({
                turn = this.turn, 
                let x = this.x, 
                let y = this.y 
            })
        }
    }


    Esto seria a rasgos generales lo que haria la funcion,  en turno del rival, recive un ataque, si este es en una coordenada sonde existe un barco, se llama a ese barco y se le indica que ha sido golpeado. Sinó se guarda en un arreglo el turno y las coordenadas del disparo errado. 

```javascript

function createBoard(userName, fleet){
    //naves
    const 1 = fleet[0];
    const 2 = fleet[1];
    const 3 = fleet[2];
    const 4 = fleet[3];
    const 5 = fleet[4];

    //arreglos 
    let missesShot = [];
    let board = []; 

    for (let index = 0; index < 10; index++) {
        board.push([]);
        for (let jindex = 0; jindex < 10; jindex++) {
            board[index].push("");
        }
    }

    const posSheep = function(ship, posInit, posFinal){
        if(this.board[posInit] === ""){
            let initX = posInit.x; 
            let initY = posInit.y; 
            
            let finalX = posFinal.x; 
            let finalY = posFinal.y; 


            if(initX === finalX){
                currentY = initY;
                while(currentY<finalY){
                    this.board[initX][currentY] = ship.id; 
                    currentY++;
                }
            } 

            if(initX === finalX){
                currentX = initX;
                while(currentX<finalX){
                    this.board[initX][currentX] = ship.id; 
                    currentX++;
                }
            }
        //Acá puedo simplificar el código cambio x/y por pos en una funcion aparte, y una vez determinado cuales son iguales pasarlas como parametro 



        }else{
            return "Esa posicion parece estar ocupada."
        }
    }

    function posicionarAutomatico(){
            let x, y; 

            initX = Math.floor(Math.random() * 10);
            initY = Math.floor(Math.random() * 10);
            
            finalX = Math.floor(Math.random() * 10);
            finalY = Math.floor(Math.random() * 10);
            

            (if)
           posShip([initX, initY], [finalX, finalY]);


        }

    return{
        this.board, 
        this.posShip
    }

}


    /*
    
      1  2  3  4
    1[h][h][h]["]
    2["]["][v]["]
    3["]["][v]["]
    4["]["][v]["]
    
    
    Podemos desarrollar una funcionalidad para determinar si el barco va a estar posicionado de manera vertical u horizontal: 
    
    let isVertical = Math.floor(Math.random() * 2);
    
    if(isvertical == 1){
        initX = Math.floor(Math.random() * 10);
        initY = Math.floor(Math.random() * 10);

        finalX = Math.floor(Math.random() * 5);
        finalY = initY;

    }else{
        initX = Math.floor(Math.random() * 10);
        initY = Math.floor(Math.random() * 10);

        finalX = initX;
        finalY = Math.floor(Math.random() * 5); 

        puedo poner que elija un número entre 0 y 4, que es length de nuestro barco más grande


    }


    
    */

```

- El gameboard debe mantener un registro de los ataques errados para poder mostrarlos correctamente.

> En cada turno podemos ir recorriendo el arreglo con las cordenadas erradas e ir imprimiendo una X en dicha posicion

- El gamboard deberia poder ser capaz de reportar si todos los barcos han sido hundidos o no.



>Me acaba de surgir un problema muy interesante a tener en cuenta para futuras implementaciones, cuando comparamos el tamaño de la nave con los valores de por ejemplo posFinal-posInit debemos asegurarnos de en vez de restar 1 al tamaño de la nave, sumar 1 a cada valor de esa comparacion. Porque si el tamaño de las naves es 5, va a tomar como valido el tamaño 4-0, lo que hace que falte un lugar.

>ship.length === (finalX+1)-(initX+1)


## 3. Crear una fábrica `Player`

- Va a haber dos tipos de jugadores 'reales' y jugadores 'computer'

- Cada jugador deberia contener su propio gameboard

```javascript
    function createPlayer(name:"Computer"){
        let fleet = []; 
        //creamos 5 naves, dándole un ID a cada una: 

        const carrier = createShip(1, 5);//creamos una nave, dandole un id = 1 y un lenght = 5 
        const battleship = createShip(2, 4); 
        const cruiser = createShip(3, 3); 
        const submarine = createShip(4, 3); 
        const destroyer = createShip(5, 2); 
        
        fleet.push(carrier);
        fleet.push(battleship);
        fleet.push(cruiser);
        fleet.push(submarine);
        fleet.push(destroyer);
        
        
        
        
        const userBoard = createBoard(userName, fleet); 
        //Ahora posicionariamos las naves. 

        //Este método va a ser en automatico, pensado para la computadora: 

    }

```

No tiene sentido posicionar al elemento según si la posicion inicial es mayor o menor que la segunda, debo hacer que siempre ocurra que la pimer posicion sea menor que la segunda:

- Si x1 < x2: currentX = x1. While currentX < x2. currentX++;

hagamos un ejemplo:

```javascript
/*

[][][][]
[][][][]
[][][][]
[][][][] 

ship = {
    id:3, 
    length: 3
}

queremos posicionar la nave de manera que el tablero quede así: 
0  1 2 3 
[][][][] 0 
[][][3][]1
[][][3][]2
[][][3][]3 

Como podemos ver, la variable x queda constante, mientras que y varia. No tiene sentido distinguir entre y1 y y2, porque van a quedar de la misma manera: 

y1 = 1
y2 = 3

x1 = 2
x2 = 2


Si y1 < y3: x++ 
Si y1 > y2: x++ 

Mejor seria en posicionar automatico armar bien las posiciones de manera que siempre y1 sea el menor valor de y, lo mismo con x si es que estas son las variables que cambian . 
También debe haber un return para indicar que se ha posicionado un valor. Esto para poder seguir generando números al azar hasta que se posicionen. También seria útil saber si las naves han sido posicionadas, tal vez mirando los valores del board y comparandolos con los id de las naves.

Por ahora esto ya está, ahora toca pensar una manera en la que saber si los barcos del usuario están o no en el board ya ubicados, esto además va a ser útil para el sistema de drag and drop. Debe haber una relacion entre el fleet y el posisionatedShips. 


creo que tenemos que tener dos variables: 

let naves posicionadas = []; 

Esta directamente en board. 



*/

```

## 4. DOM

 Importemos nuestras fábricas en otro archivo, y manejemos el juego usando event listeners para interactuar con nuestros objetos. Creemos un modulo que nos ayude a manejar las acciones que deberian pasar en el DOM.

> Si bien acá no se especifica, podemos crear dos modulos, uno maneja el juego y llama a funciones para modificar el DOM. Lo primero es tener designado dos mitades en el front, una para cada jugador.

### handleGame

> Deberiamos comenzar con un "startGame" en el que se pide si se juega un 1vs1 o un 1vsComputer, por ahora vamos a habilitar sólo la segunda opcion. 

> Una vez elegido el método, pedimos el nombre de usuario, y creamos dos players, uno es el jugador 1 y el otro es computadora (valor por defecto). 

> Con player1 lo usamos para obtener los datos a mostrar en el DOM, en la secion de jugador1. 

> También debemos ir contando los turnos, para eso definimos cuando acaba un turno: cuando el jugador no golpea a una nave. Para saber eso, debemos modificar el método attack o reciveAttack del board , para que nos devuelva un true en caso de haber golpeado. Caso contrario, se termina el turno del usuario, pasa al turno de la computadora, y una vez termine su turno, termina el primer round. 

>Al final de cada turno, debemos ver los barcos en el arerglo "flota" y preguntar a cada uno si estan hundidos, si "soankBoats" llega a 5, entonces efectivamente están todos hundidos.


```javascript
   function attack(enemyBoard, pos)= {
    if(enemyBoard.getPos(pos) !== ""){
        let shipUnderAttack = gameBoard.getShip(pos); 
        shipUnderAttack.hit();
    }else{
        enemyBoard.missShots.push({
            x = this.x, 
            y = this.y 
        })
    }
    
}
```
### Como funciona el Juego:

Entonces, el juego funciona de la siguientea forma:

1. Ingresamos al juego y solicitamos jugar contra una computadora.
> Esto crea lo siguiente: un "Game" que inicializa a dos jugadores, uno somos nosotros y otro la PC y da paso al primer round. 

>En cada round, cada jugador tiene 1 turno, que se repite si se le pega a una nave contraria. 

> quedaria algo así: 

```javascript
const user1 = createPlayer("ValorUsuario"); 
let boardUser1 = user1.gameBoard;
let fleetUser1 = user1.fleet;

const user2 = createPlayer("Computer"); 
let boardUser2 = user2.gameBoard;
let fleetUser2 = user2.fleet;
/*Acá preguntariamos al usuario que posicione sus naves, o dentro del while, pero por ahora vamos a hacerlo automaticamente*/
let round = 1; 
let gameOver = false;
let turnoUser1 = true; 
let turnoUser2 = false;

let winner = "";
while(gameOver === false){
    fleetUser1.forEach(element =>{
        boardUser1.automaticPos(element); 
    }); 

    fleetUser2.forEach(element =>{
        boardUser2.automaticPos(element); 
    }); 

    gameOver = true;
}




```

- En este punto podemos crear nuestra interfaz deusuario

- Seteeamos un juego nuevo creando Jugadores. Por ahora llenemos los tableros de cada jugador con coordenadas predeterminadas. Más tarde implementaremos el sistema para permitir que nuestros jugadores posiciones sus naves.

- you should display both the player’s boards and render them using information from the Gameboard class/factory. (You’ll need methods to render each player’s Gameboard, so put them in an appropriate module.)

- Nuestros event listener deben llevarnos paso a paso a través de nuestro juego turno por turno usando sólo métodos de otros objetos. Si en algún punto nos vemos tentados de escribir una nueva función, retrocedamos unos pasos y encontremos la clase o modulo a la que esa funcion deberia pertenecer.

- Para los ataques: dejemos que el usuario clickee en cualquier coordenada del tablero enemigo y enviemos el Input del usuario a métodos en nuestros objetos, y rendericemos el tablero para mostrar nueva información.

  - Los jugadores deberian tener un turno para atacar el gameboard enemigo. Si necesitamos hacer un seguimiento de estos turnos, este es el modulo corrento.
  - La computadora deberia hacer jugadas random. Basta con que sea un movimiento legal.

- Creemos las condiciones que hagan que el juego termina una vez las naves del jugador han sido hundidas. Esta funcion es también apropiada para este módulo.

5. Finish it up by implementing a system that allows players to place their ships. For example, you can let them type coordinates for each ship or have a button to cycle through random placements. ç

**credito extra** <br>
Implement drag and drop to allow players to place their ships.
Create a 2-player option that lets users take turns by passing the laptop back and forth, or by spinning the monitor around on a desktop. Implement a ‘pass device’ screen so that players don’t see each other’s boards!
Polish the intelligence of the computer player by having it try adjacent slots after getting a ‘hit’.
