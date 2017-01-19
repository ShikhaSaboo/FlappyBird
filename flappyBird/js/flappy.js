(function() {
	var OFFSET = 200;
	var WIDTH = 1000;
	var HEIGHT = 600;
	var TimeLoop = 50;
	var count = 0;
	var flag = 0;
	var Overgame;
	var button;
	function getRandom(min, max) {
    	return Math.floor(Math.random()*(max-min+1)+min);
    }
   

	function Obstacle() {
	
		this.x=1000;
		this.y=0;
		this.obstacleWidth=130;
		this.obstacleHeight;
		this.dx=0;
		this.dy=0;
		this.element;
		this.index;


		this.init=function(){
			this.element = document.createElement('div');
			this.element.setAttribute('class','Obstacle');
			// this.element.style.background = "black";
			this.element.style.top = this.y + "px";
			this.element.style.left = this.y + "px";
			this.element.style.height = this.obstacleHeight + "px";
			this.element.style.width= this.obstacleWidth+"px";
			document.getElementsByClassName('container')[0].appendChild(this.element);
		}

		this.redraw = function(){
			this.element.style.top = this.y + "px";
			this.element.style.left = this.x + "px";
			this.element.style.height = this.obstacleHeight + "px";
			this.element.style.width = this.obstacleWidth+"px";
		}
		this.setHeight = function (Height){
			this.obstacleHeight = Height;
			this.element.style.obstacle_height = this.obstacleHeight+ "px";
			//console.log(this.obstacleHeight);
		}
		this.delete = function(){
			
			this.element.remove();

		}
}
	function Bird() {

		this.x = 400;
		this.y = 100;
		this.dx = 1;
		this.dy = 1;
		this.element;
		this.birdHeight = 60;
		this.birdWidth = 57;
		var that = this;

		this.init= function(){
			this.element= document.createElement('div');
			this.element.setAttribute('class','bird');
			
			this.element.style.top = this.y + "px";
			this.element.style.left = this.x + "px";
			this.element.style.width = this.birdWidth + "px";
			this.element.style.height = this.birdHeight + "px";
			document.getElementsByClassName('container')[0].appendChild(this.element);

		}
		this.redraw = function(){
			this.element.style.top = this.y + "px";
			this.element.style.left = this.x + "px";
		}
		this.moveBird = function(){
			
			that.y = that.y+4;
			that.redraw();

		}
		this.delete = function(){
			this.element.remove();

		}
	}

	function GameMain(){
		var that = this;
		var bird = new Bird();
		var obstaclesArray = [];
		var intervalSet;
		var gameOver;
		
		
		this.init =function() {
			console.log("init");
			bird.init();
			window.addEventListener("keydown", function(evt) {
			if(evt.keyCode==32) { /* 32 is keycode for spacebar*/
			
				bird.y-=70;
		 	}

			
		});


			intervalSet = setInterval(gameRun, 30);
		}
		
		var gameRun= function() {
			
			

			count++;

			if(count % 60 == 0){
				createObstacles();
			}

			
			
			if(wallCollisionDetection())
			{
				
				gameOver();
			}
			
			
			if(obstacleCollisionDetection())
			{
				
				gameOver();
			}
			
			moveObstacles();
			deleteObstacles();
			bird.moveBird();
		
		}
		

		var createObstacles= function(){
			var obstacle1 = new Obstacle();
			var obstacle2 = new Obstacle();
			obstacle1.init();
			obstacle2.init();
			var pipe1Height = getRandom(80,400);
			obstacle1.setHeight(pipe1Height);
			var pipe2Height = HEIGHT-(pipe1Height+OFFSET);
		
			obstacle2.setHeight(pipe2Height);
			obstacle2.y = pipe1Height +OFFSET;
			
			
			obstaclesArray.push(obstacle1);
			obstaclesArray.push(obstacle2);
						

		}
		var moveObstacles = function(){
			
			for(var i= 0; i<obstaclesArray.length; i++) {
				
				obstaclesArray[i].x = obstaclesArray[i].x-10;
				obstaclesArray[i].redraw();
							
			}	

		}
		var deleteObstacles = function(){
			for(var i = 0; i<obstaclesArray.length; i++) {
				if((obstaclesArray[i].x+obstaclesArray[i].obstacleWidth) < 0)
				{
					
					obstaclesArray[i].delete();
					obstaclesArray.shift();
				}
			}
		}

		var wallCollisionDetection = function() {
			if((bird.y <= 0)||(bird.y >= (HEIGHT-bird.birdHeight))) {
				
				clearInterval(intervalSet);
				return true;

			} 
		}
		
		var obstacleCollisionDetection = function() {
			for(var i = 0; i <obstaclesArray.length; i++) {
				
				if(((bird.x +bird.birdWidth >= obstaclesArray[i].x && bird.x +bird.birdWidth <= obstaclesArray[i].x +obstaclesArray[i].obstacleWidth) ||
					(bird.x <= obstaclesArray[i].x+obstaclesArray[i].obstacleWidth && bird.x+bird.birdWidth >= obstaclesArray[i].x+obstaclesArray[i].obstacleWidth))
 						&& ((bird.y+ bird.birdHeight>= obstaclesArray[i].y) &&(bird.y <= obstaclesArray[i].y+obstaclesArray[i].obstacleHeight )))

				{
					clearInterval(intervalSet);
					return true;
				}
			
			}
		}
		var gameOver= function() {

			Overgame = document.createElement('div');
			Overgame.setAttribute('class','gameOver');
			Overgame.style.margin = "0 auto";
			Overgame.style.padding = "40px";
			Overgame.style.border = "3px solid black";
			Overgame.style.top = "150px";
			Overgame.style.left= "400px";
			Overgame.style.width = "150px";
			Overgame.innerHTML = "GAME OVER <br /> <br />Click reset to restart the game <br /> ";
			Overgame.style.color = "red";
			Overgame.style.height="80px";
			Overgame.style.background = "#ffffff";
			document.getElementsByClassName('container')[0].appendChild(Overgame);
			button = document.createElement('button');
			button.setAttribute('class','button');
			button.style.padding = "10px";
			button.style.width="80px";
			button.style.background = "#386F79";	
			button.style.color = "#EDF5F6";
			button.innerHTML = "Reset";
			button.margin = "0 auto";
			document.getElementsByClassName('gameOver')[0].appendChild(button);
			button.onclick = function(){
				reset();
			}

			
		}
		var reset = function()
		{	
			location.reload();
		}

		
		
	} 


new GameMain().init();

})();