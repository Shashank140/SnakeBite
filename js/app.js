// Javascript for game
// Defining const
 let inpDir = {x:0, y:0}
 const start = new Audio('start.wav');
 const eat = new Audio('eat.wav');
 const end = new Audio('end.wav');
 const move = new Audio('move.wav');
 let score = 0;
 let lastTime = 0;
 let speed = 19;
 let snakeArr = [
     {x:5, y:10}
    ];

let food = {x:15, y:14};

 // Functions
 function main(ctime) {
     window.requestAnimationFrame(main);
     if ((ctime - lastTime)/1000 < 1/speed) {
         return;
    }
    lastTime = ctime;
    gamePlayer();
     
 }

 function isCollide(arr){
     // If snake hits itself
     for (let i = 1; i < snakeArr.length; i++) {
         if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
             return true;
         }
     }
     
     // If snake hits wall

     if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
         return true;
     }
    
 }

 function gamePlayer() {
     // Update snakeArr and food
     if(isCollide(snakeArr)){
         end.play();
         score = 0;
         scorebox.innerHTML = "Score: " + 0;
         move.pause();
         inpDir = {x:0, y:0};
         alert("Game Over! press any key to play again");
         snakeArr = [{x:5, y:10}];
         move.play();
     }

     // When we have eten food regenerate food and increase score
     if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
         eat.play();
         score += 1;
         if(score > high){
            high = score;
            localStorage.setItem("highscore", JSON.stringify(high));
            highscorebox.innerHTML = "HighScore: " + high;
         }
         scorebox.innerHTML = "Score: " + score; 
         snakeArr.unshift({x: snakeArr[0].x + inpDir.x, y: snakeArr[0].y + inpDir.y});
         let a = 2;
         let b = 16;
         food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};

     }

     // Moving snake
     for (let i = snakeArr.length - 2; i >= 0; i--){ 
         snakeArr[i+1] = {...snakeArr[i]};        
     }
     snakeArr[0].x += inpDir.x;
     snakeArr[0].y += inpDir.y;


     // Display snakeArr and food

     // Display snake
     board.innerHTML = "";
     snakeArr.forEach((e, index) => {
         let snakeElement = document.createElement('div');
         snakeElement.style.gridRowStart = e.y;
         snakeElement.style.gridColumnStart = e.x;
         
         if(index == 0){
            snakeElement.classList.add('head'); 
         }
         else{
            snakeElement.classList.add('snake');
         }
         board.appendChild(snakeElement);
     });

     //Display Food
         let foodElement = document.createElement('div');
         foodElement.style.gridRowStart = food.y;
         foodElement.style.gridColumnStart = food.x;
         foodElement.classList.add('food');
         board.appendChild(foodElement);

 }


 // Main logic

 let highscore = localStorage.getItem("highscore");
 if (highscore === null) {
     let high = 0;
     localStorage.setItem("highscore", JSON.stringify(high));
 } 
 else {
     high = JSON.parse(highscore);
     highscorebox.innerHTML = "HighScore: " + highscore; 
 }

 window.requestAnimationFrame(main);
 start.play();
 window.addEventListener('keydown', event => {
    inpDir = {x:0, y:1};
    move.play();
    switch (event.key) {
        case "ArrowUp":
            console.log("Arrowup");
            inpDir.x = 0;
            inpDir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inpDir.x = 0;
            inpDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inpDir.x = -1;
            inpDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inpDir.x = 1;
            inpDir.y = 0;
            break;

        default:
            break;
    }


 });