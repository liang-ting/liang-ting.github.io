/*function start(){
	var temp = setTimeout(myMove() ,5000000);
}*/
for(let i = 1; i < 36; i++){
	document.write("<div ");
	document.write("id =\"block_");
	document.write(i);
	document.write("\"");
	document.write(" class=\"block\" style=\"\"></div>");
}
function rule(){
	for(var i = 0; i < 36; i++){
		document.getElementById("block_"+i).style.display = "none";
	}
	document.getElementById("fin").style.display = "block";
	document.getElementById("fin").innerText = `按下 START 後，方塊位置和分數會隨機生成\n(方塊數量低於15的機率小於6.16*10^-6)\n方塊上面的數字是他的分數\n分為3分和1分，3分的需要打三下才能消除\n方塊顏色也分為3種\n粉紅色代表要打三下才能消除，橘色兩下，黃色一下`;
}
rule();
function myMove() {
	document.getElementById("fin").style.display = "none";
	var container = document.getElementById("container");  
	var ball = document.getElementById("animate");   
	var board = document.getElementById("board");  
	var le = false;
	var to = false;
	var pos_left = 0;
	var pos_top = 200;
	var score = 0;
	document.getElementById("animate").style.display = "block";
	ball.style.top = pos_top + "px"; 
	ball.style.left = pos_left + "px"; 
	//var mar_le = container.getAttribute('margin-left');
	//console.log(mar_le);
	this.block = [];
	for(var i = 0; i < 36; i++){
		this.block[i] = {
			elem: document.getElementById("block_"+i),
			show: false,
			score: 1,
			count: 1,
			left: 100+100*(i%6)+10,
			top: 50+30*(Math.floor(i/6))+5
		}
		
		this.block[i].elem.style.background = 'black';
		//this.block[i].elem.style.color = 'black';
		if(Math.random() > 0.2){
			this.block[i].show = true;
			this.block[i].elem.style.background = '#FFFF93';
			//this.block[i].elem.style.color = 'black';
		}
		
		if(this.block[i].show && Math.floor(Math.random()*2) == 0){
			this.block[i].score = 3;
			this.block[i].elem.style.background = '#FF95CA';
		}
		
		this.block[i].count = this.block[i].score;
		this.block[i].elem.innerText = this.block[i].score;
		
		this.block[i].elem.style.top = this.block[i].top+'px';
		this.block[i].elem.style.left = this.block[i].left+'px';
	}
	for(var i = 0; i < 36; i++){
		block[i].elem.style.display = "block";
	}

	
	var id = setInterval(frame, 5);
	function frame() {
		if(!le) pos_left++; 
		else pos_left--;
		if(!to) pos_top++; 
		else pos_top--;

		ball.style.top = pos_top + "px"; 
		ball.style.left = pos_left + "px"; 
	  
		switch(cross(pos_top, pos_left, board)){
			case 1: to = true; break;
			case 2: le = false; break;
			case 3: to = false; break;
			case 4: le = true; break;
			case 5: to = true; le = true; break;
			case 6: to = true; le = false; break;
			case 7: to = false; le = false; break;
			case 8: to = false; le = true; break;
		}

		if(pos_top <= 0) to = false; 
		if(pos_left+ball.offsetWidth >= container.offsetWidth) le = true; 
		else if (pos_left <= 0) le = false; 
		
		for(var i = 0; i < 36; i++){
			if(this.block[i].show){
				var block_cor = cross(pos_top, pos_left, this.block[i].elem);
				if(block_cor != 0){
					switch(block_cor){
						case 1: to = true; break;
						case 2: le = false; break;
						case 3: to = false; break;
						case 4: le = true; break;
						case 5: to = true; le = true; break;
						case 6: to = true; le = false; break;
						case 7: to = false; le = false; break;
						case 8: to = false; le = true; break;
					}
					/*this.block[i].show = false; 
					this.block[i].elem.style.background = 'black';					
					score += this.block[i].score;*/
					this.block[i].count--;
				}
			}
		}
		for(var i = 0; i < 36; i++){
			if(this.block[i].show){
				switch(this.block[i].count){
					case 0: 
						this.block[i].show = false; 
						this.block[i].elem.style.background = 'black';					
						score += this.block[i].score;
						break;
					case 1: this.block[i].elem.style.background = '#FFFF93'; break;
					case 2: this.block[i].elem.style.background = '#FFC78E'; break;
				}
			}
		}
		
		document.getElementById('console').innerText = `Score: `+score;
		var finish = false;
		if(pos_top+16 == 450){
			document.getElementById("fin").style.display = "block";
			document.getElementById("fin").innerText = `LOSE!!!\n Your socre is: `+score+`\n按下 START 可重新開始\n按下 規則 可查看規則`;
			document.getElementById("fin").style.color = "#FFFFFFFF";
			document.getElementById("animate").style.display = "none";
			for(var i = 0; i < 36; i++){
				block[i].elem.style.display = "none";
			}
			clearInterval(id);
		}
		else {
			finish = true;
			for(var i = 0; i < 36; i++){
				if(this.block[i].show) finish = false;
			}
		}
		if(finish){
			document.getElementById("fin").style.display = "block";
			document.getElementById("fin").innerText = `WIN!!!\n Your socre is: `+score+`\n按下 START 可重新開始\n按下 規則 可查看規則`;
			document.getElementById("fin").style.color = "#FFFFFFFF";
			document.getElementById("animate").style.display = "none";
			for(var i = 0; i < 36; i++){
				block[i].elem.style.display = "none";
			}
			clearInterval(id);
		}
	}
}

function cross(pos_top, pos_left, elem){
	var rec_width = elem.offsetWidth;
	var rec_high = elem.offsetHeight;
	var rec_top = elem.offsetTop;
	var rec_left = elem.offsetLeft;
	var rec_x = rec_left+elem.offsetWidth/2;
	var rec_y = rec_top+elem.offsetHeight/2;
	
	var cir_size = 8;
	var cir_x = pos_left+8;
	var cir_y = pos_top+8;
	
	var x = Math.min(Math.abs(rec_left-cir_x), Math.abs(rec_left+rec_width-cir_x));
	var y = Math.min(Math.abs(rec_top-cir_y), Math.abs(rec_top+rec_high-cir_y));
	var cro = false;
	
	if(x*x+y*y <= cir_size*cir_size) cro = true;
	else if(Math.abs(rec_x-cir_x) == (rec_width/2+cir_size) && Math.abs(rec_y-cir_y) < (rec_high/2))
		cro = true;
	else if(Math.abs(rec_y-cir_y) == (rec_high/2+cir_size) && Math.abs(rec_x-cir_x) < (rec_width/2))
		cro = true;
	
	if(!cro) return 0;
	if(cir_x < rec_left){
		if(cir_y < rec_top) return 5;
		else if(cir_y > rec_top+rec_high) return 8;
		else return 4;
	}
	else if(cir_x > rec_left+rec_width){
		if(cir_y < rec_top) return 6;
		else if(cir_y > rec_top+rec_high) return 7;
		else return 2;
	}
	else{
		if(cir_y < rec_y) return 1;
		else return 3;
	}
}

function newCursor(e) {
	if(e.clientX>=240 && e.clientX<=1040){
		e = e || window.event;
		var square = document.getElementById("board");
		square.style.left=e.clientX-50-240+"px";
	}
	else if(e.clientX < 240){
		e = e || window.event;
		var square = document.getElementById("board");
		square.style.left=-50+"px";
	}
	else if(e.clientX > 1040){
		e = e || window.event;
		var square = document.getElementById("board");
		square.style.left=750+"px";
	}
}
if (window.addEventListener)
	// DOM method for binding an event
	window.addEventListener("mousemove", newCursor, false);
else if (window.attachEvent) 
	// IE-exclusive method for binding an event
	document.attachEvent("onmousemove", newCursor);
else
	window.onmousemove = newCursor;

/*function keyFunction() {
	if (event.keyCode==27) {
		myMove();
		return false;
	} 
}
document.onkeydown=keyFunction();*/
