var respostaUsuario1 = -9999;
var respostaUsuario2 = -9999;
var respostaUsuario3 = -9999;
respostaUsuario4_1 = -9999;
respostaUsuario4_2 = -9999;
respostaUsuario4_3 = -9999;
var lastFinished = 0;
var pontuacaoAtual = 0;
var pontuacaoMaxima = 6;
var xaIni = -9999;

function loadState(){
	memento = fetch();
	if(memento.funcaoSelecionada==undefined) return;
	if(memento ==null) return;
	if(memento.respostaUsuario1 == null) return;
	
	respostaUsuario1 = parseFloat(memento.respostaUsuario1);
	respostaUsuario2 = parseFloat(memento.respostaUsuario2); 
	respostaUsuario3 = parseFloat(memento.respostaUsuario3);  
	respostaUsuario4_1 = parseFloat(memento.respostaUsuario4_1);  
	respostaUsuario4_2 = parseFloat(memento.respostaUsuario4_2);  
	respostaUsuario4_3 = parseFloat(memento.respostaUsuario4_3);
	score = parseFloat(memento.score);
	attempts = parseInt(memento.attempts);
	var funcaoSelecionada1 = memento.funcaoSelecionada;
	for(var i=0; i<funcao.length;i++){
		var str1 = funcao[i].f_ggb;
		var str2 = funcaoSelecionada1.f_ggb;
		if(str1 == str2){
			sorteado = i;
			funcaoSelecionada = funcao[i];
			applyGGb();
		}
	}
	lastFinished = parseInt(memento.lastFinished);
	xaIni = parseFloat(memento.xaIni);
}
function restart(){
	if(valendoNota) attempts++;
	respostaUsuario1 = -9999;
	respostaUsuario2 = -9999;
	respostaUsuario3 = -9999;
	respostaUsuario4_1 = -9999;
	respostaUsuario4_2 = -9999;
	respostaUsuario4_3 = -9999;
	xaIni = -9999;
	//score = 0;
	notaAtual = 0;
	lastFinished = 0;
	applyAndSortFunctions();
	saveState();
	fetch();
	
}

function saveState(){	
	memento.respostaUsuario1 = parseFloat(respostaUsuario1);
	memento.respostaUsuario2 = parseFloat(respostaUsuario2);
	memento.respostaUsuario3 = parseFloat(respostaUsuario3);
	memento.respostaUsuario4_1 = parseFloat(respostaUsuario4_1);
	memento.respostaUsuario4_2 = parseFloat(respostaUsuario4_2);
	memento.respostaUsuario4_3 = parseFloat(respostaUsuario4_3);
	memento.funcaoSelecionada = funcaoSelecionada;
	memento.xaIni = parseFloat(xaIni);	
	memento.score = parseFloat(score);
	memento.attempts = parseInt(attempts);
	memento.lastFinished = parseInt(lastFinished);
	commit(memento);
}

function t1_enterFrame(){
	loadState();
	setResetButtonEnabled(false);
	setBackwardButtonEnabled(false);
	setForwardButtonEnabled(true);
}

function t2_enterFrame(){
	setBackwardButtonEnabled(true);
}

function i1_enterFrame(){
	setForwardButtonEnabled(false);
	xaIni = ggbApplet.getXcoord("A");
	if(respostaUsuario1!=-9999){
		$("#i1_textfield1").val(respostaUsuario1);	
		i1_answer();
	}
}
function i1_answer(){
	if(!validateAnswer("i1_textfield1")){
		alert("Valor inválido!");
		return;
	}
	
	var xa = ggbApplet.getXcoord("A");
	var xb = ggbApplet.getXcoord("B");
	var ya = ggbApplet.getYcoord("A");	
	var yb = ggbApplet.getYcoord("B");
	var resposta = (yb - ya)/(xb - xa);
	respostaUsuario1 = toNumber($("#i1_textfield1").val());
	res = checkAnswer(resposta, respostaUsuario1, 0.01);
	setInputEnabled2("i1_textfield1", false, res);
	setInputEnabled("i1_button", false);
	addNota(res);
	var htmlResposta = "A resposta correta é <b>" + formatNumber(resposta) + "</b>!"; 
	$("#i1_resposta").html(htmlResposta);	
	$("#i1_resposta").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
	saveState();
	setForwardButtonEnabled(true);
	
	// Exibir os elementos C, A¯C, B¯C e , no applet.
	// ggbApplet.setVisible("B", true); ???
	
}
function i2_enterFrame(){
	setForwardButtonEnabled(false);
	if(respostaUsuario2!=-9999){
		$("#i2_textfield1").val(respostaUsuario2);	
		i2_answer();
	}	
}

function t7_enterFrame(){
	$("#t7func").html(funcaoSelecionada.f_display);

}

function i2_answer(){
	if(!validateAnswer("i2_textfield1")){
		alert("Valor inválido!");
		return;
	}
	var xa = ggbApplet.getXcoord("A");
	resposta = funcaoSelecionada.df(xa);
	respostaUsuario2 = toNumber($("#i2_textfield1").val());
	res = checkAnswer(resposta, respostaUsuario2, 0.1);
	addNota(res);
	var htmlResposta2 = "A resposta correta é <b>" +  formatNumber(resposta) + " </b> ";  
	htmlResposta2+= "Perceba que, há pouco, insistentemente escrevi 'em xA'. Isto é importante por que essa quantidade, a taxa de variação instantânea "; 
	htmlResposta2+= "(ou derivada, ou ";
	htmlResposta2+= "inclinação...) depende do valor de x que escolhemos para calculá-la. Experimente arrastar A (isto é, ";
	htmlResposta2+= "variar xA) e veja como a reta tangente muda. ";

	setInputEnabled2("i2_textfield1", false, res);
	setInputEnabled("i2_button", false);

	
	$("#i2_resposta").html(htmlResposta2);	
	$("#i2_resposta").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
	setForwardButtonEnabled(true);
	
	// Exibir os elementos C, A¯C, B¯C e , no applet.
	ggbApplet.setVisible("C", true);
	ggbApplet.setVisible("segmentoAC", true);
	ggbApplet.setVisible("segmentoBC", true);
	ggbApplet.setVisible("theta", true);
	
}

function i3_enterFrame(){
	setForwardButtonEnabled(false);
	if(respostaUsuario3!=-9999){
		$("#i3_textfield1").val(respostaUsuario3);
		i3_answer();
	}	
}


function i3_answer(){
	if(!validateAnswer("i3_textfield1")){
		alert("Valor inválido!");
		return;
	}
	var xa = xaIni;
	resposta = funcaoSelecionada.df(xa);
	respostaUsuario3 = toNumber($("#i3_textfield1").val());
	res = checkAnswer(resposta, respostaUsuario3, 0.01);
	setInputEnabled2("i3_textfield1", false, res);
	setInputEnabled("i3_button", false);		
	addNota(res);
	var htmlResposta2 = "A resposta correta é <b>" +  formatNumber(resposta) + " </b> ";  

	$("#i3_resposta").html(htmlResposta2);	
	$("#i3_resposta").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
	setForwardButtonEnabled(true);
	
}


function i4_enterFrame(){
	setForwardButtonEnabled(false);
	if(respostaUsuario4_1!=-9999){
		$("#i4_textfield1").val(respostaUsuario4_1);
		$("#i4_textfield2").val(respostaUsuario4_2);
		$("#i4_textfield3").val(respostaUsuario4_3);
		i4_answer();
	}	
}


function i4_answer(){
	if(!(validateAnswer("i4_textfield1") && validateAnswer("i4_textfield1") && validateAnswer("i4_textfield1") )){
		alert("Valor inválido!");
		return;
	}
	var xa = xaIni;
	var resposta1 = ggbApplet.getYcoord("A");
	var resposta2 = funcaoSelecionada.df(ggbApplet.getXcoord("A"));
	var resposta3 = ggbApplet.getXcoord("A");;
	
	var sht1 = toNumber($("#i4_textfield1").val());
	var sht2 = toNumber($("#i4_textfield2").val());
	var sht3 = toNumber($("#i4_textfield3").val());
	
	respostaUsuario4_1 = sht1;
	respostaUsuario4_2 = sht2;
	respostaUsuario4_3 = sht3;
	
	res1 = checkAnswer(resposta1, respostaUsuario4_1, 0.01);
	res2 = checkAnswer(resposta2, respostaUsuario4_2, 0.01);
	res3 = checkAnswer(resposta3, respostaUsuario4_3, 0.01);
	
	addNota(res1);
	addNota(res2);
	addNota(res3);
	
	setInputEnabled2("i4_textfield1", false, res1);	
	setInputEnabled2("i4_textfield2", false, res2);
	setInputEnabled2("i4_textfield3", false, res3);
	setInputEnabled("i4_button", false);		
	
	var htmlResposta4 = "A resposta correta é <b>y(x) = " +  formatNumber(resposta1) + " + " + formatNumber(resposta2) + "(x - (" + formatNumber(resposta3) + ")) </b> ";  

	$("#i4_resposta").html(htmlResposta4);	
	$("#i4_resposta").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
	
	
	salvarNota();
	lastFinished=1;
	saveState();

	
	
	setForwardButtonEnabled(true);
}

function addNota(res){
	if(res) pontuacaoAtual++;
}

function t10_enterFrame(){
	setForwardButtonEnabled(false)
	setResetButtonEnabled(true);
}


function salvarNota(){
	if(lastFinished==1) return;
	if(!valendoNota) return;
	var mediaAnterior = score;
	var notaAtual = (pontuacaoAtual/pontuacaoMaxima) * 100;
	var novaMedia = ((mediaAnterior * attempts) + notaAtual) / attempts+1;
	score = novaMedia;
	lastFinished = 1;
	saveState();
}
