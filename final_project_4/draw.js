var _canvas = document.getElementById('stylized_single');
var ctx = _canvas.getContext('2d');  



$('.color input').change(function(){
  r = $('#red').val();
  g = $('#green').val();
  b = $('#blue').val();
  changeColor(r,g,b);
  //取出input中的數值
});

function changeColor(r,g,b){
  /*colors = {
    red : r,
    green : g,
    blue : b
  }
  $.each(colors, function(_color, _value) {
    $('#v'+_color).val(_value);
  });*/
  ctx.strokeStyle = "rgb("+r+","+g+","+b+")" ;
  //將顏色的值寫到ctx.strokeStyle即可
  document.getElementById('show').style.background = "rgb("+r+","+g+","+b+")";
};

var x = 0;
var y = 0;
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};   
}

function mouseMove(evt) {
	var mousePos = getMousePos(_canvas, evt);
	ctx.lineTo(mousePos.x, mousePos.y);
	ctx.lineWidth = "5";
	ctx.stroke();
}


function start(evt) {
	var mousePos = getMousePos(_canvas, evt);
	evt.preventDefault();
	ctx.beginPath();
	ctx.moveTo(mousePos.x, mousePos.y);  
	_canvas.addEventListener('mousemove', mouseMove, false);
}

var is_drawing = false;
var text = document.getElementById('draw');
function drawing(){
	if(!is_drawing){
		text.innerText = `停止畫畫!`
		_canvas.addEventListener('mousedown', start);

		_canvas.addEventListener('mouseup', function() {
			_canvas.removeEventListener('mousemove', mouseMove, false);
		}, false);
		is_drawing = true;
	}
	else{
		text.innerText = `開始畫畫!`
		_canvas.removeEventListener('mousedown', start);
		is_drawing = false;
	}
}

$('#save').on('click', function(){
  var _url = _canvas.toDataURL();
  //利用toDataURL() 把canvas轉成data:image
  this.href = _url;
  //再把href載入上面的Data:image
});
