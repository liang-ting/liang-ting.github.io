"use strict"
//讓所有的表用grid包起來
document.write("<article class=\"grid\">")
var k = 1;
var num;

for(let i = 1; i <= 6; i++){
	document.write("<div>")
	document.write("<table class=\"t\">")
	num = k;
	document.write("<tr><th colspan=\"8\">第" + i + "張卡片<input type=\"checkbox\" name=\"vehicle3\" value=\"Airplane\" ></th></tr>");
	
	//開始填卡片
	while(num <= 63){
		document.write("<tr>")
		for(let j = 0; j < 8; j++){
			document.write("<td>")
			document.write(num)
			document.write("</td>")
			if(num%k == k-1) num += (k+1);
			else num++;
		}
		document.write("</tr>")
	}
	document.write("</table>")
	document.write("</div>")

	k = 2*k;
}

document.write("</article>")