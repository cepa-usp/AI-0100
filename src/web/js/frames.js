var respostaUsuario1 = -9999;
var respostaUsuario2 = -9999;

function t1_enterFrame(){
	applyAndSortFunctions();
}

function i1_enterFrame(){
	setForwardButtonEnabled(false);
	if(respostaUsuario1!=-9999){
		i1_textfield1.value = respostaUsuario1;
		setInputEnabled("i1_textfield1", false);
		setInputEnabled("i1_button", false);
		
		i1_answer();
	}
}
function i1_answer(){
	if(!validateAnswer(i1_textfield1)){
		alert("Valor inválido!");
		return;
	}
	var xa = ggbApplet.getXcoord("A");
	var xb = ggbApplet.getXcoord("B");
	var ya = ggbApplet.getYcoord("A");	
	var yb = ggbApplet.getYcoord("B");
	var resposta = (yb - ya)/(xb - xa);
	respostaUsuario1 = i1_textfield1.value;
	res = checkAnswer(resposta, respostaUsuario1, 0.01);
	
	var htmlResposta = "A resposta correta é <b>" + formatNumber(resposta) + "</b>!"; 
	$("#i1_resposta").html(htmlResposta);	
	$("#i1_resposta").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
	setForwardButtonEnabled(true);
	
	// Exibir os elementos C, A¯C, B¯C e , no applet.
	// ggbApplet.setVisible("B", true); ???
	
}
function i2_enterFrame(){
	setForwardButtonEnabled(false);
	if(respostaUsuario2!=-9999){
		i2_textfield1.value = respostaUsuario2;
		setInputEnabled("i2_textfield1", false);
		setInputEnabled("i2_button", false);
		
		i2_answer();
	}	
}

function t7_enterFrame(){
	$("#t7func").html(funcaoSelecionada.f_display);

}

function i2_answer(){
	if(!validateAnswer(i2_textfield1)){
		alert("Valor inválido!");
		return;
	}
	var xa = ggbApplet.getXcoord("A");
	resposta = funcaoSelecionada.df(xa);
	respostaUsuario2 = i2_textfield1.value;
	res = checkAnswer(resposta, respostaUsuario2, 0.1);
	
	var htmlResposta2 = "A resposta correta é <b>" +  formatNumber(resposta) + " </b> ";  
	htmlResposta2+= "Perceba que, há pouco, insistentemente escrevi 'em xA'. Isto é importante por que essa quantidade, a taxa de variação instantânea "; 
	htmlResposta2+= "(ou derivada, ou ";
	htmlResposta2+= "inclinação...) depende do valor de x que escolhemos para calculá-la. Experimente arrastar A (isto é, ";
	htmlResposta2+= "variar xA) e veja como a reta tangente muda. ";
	
	$("#i2_resposta").html(htmlResposta2);	
	$("#i2_resposta").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
	setForwardButtonEnabled(true);
	
	// Exibir os elementos C, A¯C, B¯C e , no applet.
	// ggbApplet.setVisible("B", true); ???
	
}



