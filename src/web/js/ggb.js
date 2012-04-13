var sorteado;//Indice da função sorteada
var valendo = false;
var funcao = [
  {
    f_ggb: "x^2",
    df_ggb: "2*x",
    f:function (x) {return Math.pow(x,2);},
    df:function(x) {return 2*x;},
    f_display: "x<sup>2</sup>",
    df_display: "2x",
    possiveis_A:[-2,-1,1,2],
    possiveis_B:[-2,-1,1,2],
  },
	{
    f_ggb:"x^3",
    df_ggb:"3*x^2",
    f_display: "x<sup>3</sup>",
    df_display: "3x<sup>2</sup>",    
    f: function (x) {return Math.pow(x,3)},
    df: function(x) {return 3*Math.pow(x,2)},
    possiveis_A:[-1,1],
    possiveis_B:[-1,1],
  },
  {
    f_ggb: "sin(x)",
    df_ggb: "cos(x)",
    f_display: "sin(x)",
    df_display: "cos(x)",
    f: function(x) {return Math.sin(x);},
    df: function(x) {return Math.cos(x);},
    possiveis_A:[-4,-3,-2,-1,0,1,2,3,4],
    possiveis_B:[-4,-3,-2,-1,0,1,2,3,4]
  },
  {
    f_ggb: "cos(x)",
    df_ggb: "-sin(x)",
    f_display: "cos(x)",
    df_display: "-sin(x)",
    f: function(x) {return Math.cos(x);},
    df: function(x) {return -Math.sin(x);},
    possiveis_A:[-4,-3,-2,-1,0,1,2,3,4],
    possiveis_B:[-4,-3,-2,-1,0,1,2,3,4]
  },
  {
    f_ggb: "exp(x)",
    df_ggb: "exp(x)",
    f_display: "e<sup>x</sup>",
    df_display: "e<sup>x</sup>",
    f: function(x) {return Math.exp(x);},
    df: function(x) {return Math.exp(x);},
    possiveis_A:[-2,-1,0,1],
    possiveis_B:[-2,-1,0,1]
  },
  {
    f_ggb: "ln(x)",
    df_ggb: "1/x",
    f_display: "ln(x)",
    df_display: "1/x",
    f: function(x) {return Math.log(x);},
    df: function(x) {return 1/x;},
    possiveis_A:[1,2,3,4],
    possiveis_B:[1,2,3,4]
  }
  ];
  
  
 
var funcaoSelecionada;
function applyAndSortFunctions(){
  sorteado = rand(0,funcao.length-1);
  funcaoSelecionada = funcao[sorteado];
  ggbApplet.evalCommand("f(x)="+funcao[sorteado].f_ggb);
  var aux_A = funcao[sorteado].possiveis_A[rand(0,funcao[sorteado].possiveis_A.length-1)];
  ggbApplet.setCoords("A", aux_A, 0);
  var aux_B = funcao[sorteado].possiveis_B[rand(0,funcao[sorteado].possiveis_B.length-1)];
  while(aux_A == aux_B) aux_B = funcao[sorteado].possiveis_B[rand(0,funcao[sorteado].possiveis_B.length-1)];
  ggbApplet.setCoords("B", aux_B, 0);
}

function firstTimeConfig() {
  switch (screenExercise) {
	// Exercício 01
    case 1:
		
		ggbApplet.setVisible("retaPerpendicular", false);
		ggbApplet.setVisible("retaSecante", true);
		ggbApplet.setVisible("retaTangente", false);
		ggbApplet.setVisible("B", true);
		
		ggbApplet.setColor("retaPerpendicular", 204, 204, 204);
		ggbApplet.setColor("retaSecante", 255, 51, 51);
		ggbApplet.setColor("retaTangente", 204, 204, 204);
		
		break;
		
	// Exercício 02
    case 2:
		
		ggbApplet.setVisible("retaPerpendicular", false);
		ggbApplet.setVisible("retaSecante", true);
		ggbApplet.setVisible("retaTangente", true);
		ggbApplet.setVisible("B", true);
		
		ggbApplet.setColor("retaPerpendicular", 204, 204, 204);
		ggbApplet.setColor("retaSecante", 255, 51, 51);
		ggbApplet.setColor("retaTangente", 204, 204, 204);
		
		break;
		
	// Exercício 03
    case 3:
		
		ggbApplet.setVisible("retaPerpendicular", false);
		ggbApplet.setVisible("retaSecante", false);
		ggbApplet.setVisible("retaTangente", true);
		ggbApplet.setVisible("B", false);
		
		ggbApplet.setColor("retaPerpendicular", 204, 204, 204);
		ggbApplet.setColor("retaSecante", 204, 204, 204);
		ggbApplet.setColor("retaTangente", 204, 204, 204);
		
		$(".adendo").html(funcao[sorteado].f_display);
		
		break;
		
	// Exercício 04
	case 4:
	
		ggbApplet.setVisible("retaPerpendicular", false);
		ggbApplet.setVisible("retaSecante", false);
		ggbApplet.setVisible("retaTangente", true);
		ggbApplet.setVisible("B", false);
		
		ggbApplet.setColor("retaPerpendicular", 204, 204, 204);
		ggbApplet.setColor("retaSecante", 204, 204, 204);
		ggbApplet.setColor("retaTangente", 255, 51, 51);
		
		break;
		
	// Exercício 05
	case 5:
	
		ggbApplet.setVisible("retaPerpendicular", true);
		ggbApplet.setVisible("retaSecante", false);
		ggbApplet.setVisible("retaTangente", true);
		ggbApplet.setVisible("B", false);
		
		ggbApplet.setColor("retaPerpendicular", 255, 51, 51);
		ggbApplet.setColor("retaSecante", 204, 204, 204);
		ggbApplet.setColor("retaTangente", 204, 204, 204);
		
		break;
  }
}

function evaluateExercise (event) {
	
  var currentScore = 0;
  
  $('.nota-button').hide();
  
  switch (screenExercise) {
  
    // Avalia a nota dos exercícios
    // ----------------------------------
	// ----------------------------------
	// Exercício 01
    case 1:
		
		$(event.target).hide();
		
		var success = true;
		var field = $("#U-top-ex1");
		var user_answer = parseFloat(field.val().replace(",", "."));
		var right_answer = (ggbApplet.getYcoord("B")-ggbApplet.getYcoord("A"))/(ggbApplet.getXcoord("B")-ggbApplet.getXcoord("A"));
		
		console.log("---- Exercício 1 ----");
		console.log("Usuário: " + user_answer);
		console.log("Resposta esperada: " + right_answer);
		
		if (Math.abs(user_answer - right_answer) <= 0.01 * Math.abs(right_answer)) {
			currentScore += SCORE_UNIT;
			field.css("background-color", "#33CC33");
			state.u_top_ex1 = user_answer;
		}
		else {
			success = false;
			//field.val(right_answer.toFixed(2).replace(".", ","));
			field.css("background-color", "#CC3333");
		}
		
		if (success) {
        $("#feedback-ex" + screenExercise).html('Correto!');
        $("#feedback-ex" + screenExercise).removeClass().addClass("right-answer");
		}
		else {
		$("#feedback-ex" + screenExercise).html('Errado! A resposta certa seria: '+ right_answer.toFixed(2).replace(".", ","));
		$("#feedback-ex" + screenExercise).removeClass().addClass("wrong-answer");
		}
		
		break;
		
	// Exercício 02
    case 2:
	
		var field = $("#U-top-ex2");
		var user_answer = parseFloat(field.val().replace(",", "."));
		var right_answer = funcao[sorteado].df(ggbApplet.getXcoord("A"));
		
		console.log("---- Exercício 2 ----");
		console.log("Usuário: " + user_answer);
		console.log("Resposta esperada: " + right_answer);
		
		if (Math.abs(user_answer - right_answer) <= 0.1 * Math.abs(right_answer)) {
			currentScore += SCORE_UNIT;
			field.css("background-color", "#33CC33");
			state.u_top_ex2 = user_answer;
			$("#feedback-ex" + screenExercise).html('Correto!');
			$("#feedback-ex" + screenExercise).removeClass().addClass("right-answer");
		}
		else if(Math.abs(user_answer - right_answer) > 0.1 * Math.abs(right_answer) && Math.abs(user_answer - right_answer) < 0.2 * Math.abs(right_answer)) {
		  currentScore += SCORE_UNIT;
			field.css("background-color", "#CC3333");
			$("#feedback-ex" + screenExercise).html("Seu resultado é um pouco diferente do esperado (" + right_answer.toFixed(2).replace(".", ",") + "), mas isto provavelmente se deve à uma imprecisão da própria medida das coordenadas dos pontos A e B. Vamos considerar como um acerto!");
			$("#feedback-ex" + screenExercise).removeClass().addClass("right-answer");
		}
		else {
			field.css("background-color", "#CC3333");
			$("#feedback-ex" + screenExercise).html('Errado! A resposta certa seria: '+ right_answer.toFixed(2).replace(".", ","));
			$("#feedback-ex" + screenExercise).removeClass().addClass("wrong-answer");
		}
				
		$('.dica-button1-ex2').hide();
		
		break;
		
	// Exercício 03
    case 3:
		
		$(event.target).hide();
		//TODO: PERGUNTAR AMANHÃ PARA O IVAN
		var success = true;
		var field = $("#U-top-ex3");
		var user_answer = parseFloat(field.val().replace(",", "."));
		var right_answer = funcao[sorteado].df(ggbApplet.getXcoord("A"));
		
		console.log("---- Exercício 3 ----");
		console.log("Usuário: " + user_answer);
		console.log("Resposta esperada: " + right_answer);
		
		if (Math.abs(user_answer - right_answer) <= 0.01 * Math.abs(right_answer)) {
			currentScore += SCORE_UNIT;
			field.css("background-color", "#33CC33");
			state.u_top_ex3 = user_answer;
		}
		else {
			success = false;
			//field.val(right_answer.toFixed(1).replace(".", ","));
			field.css("background-color", "#CC3333");
		}
		
		if (success) {
        $("#feedback-ex" + screenExercise).html('Correto!');
        $("#feedback-ex" + screenExercise).removeClass().addClass("right-answer");
		}
		else {
		$("#feedback-ex" + screenExercise).html('Errado! A resposta certa seria: '+ right_answer.toFixed(2).replace(".", ","));
		$("#feedback-ex" + screenExercise).removeClass().addClass("wrong-answer");
		}
		
		$('.dica-button1-ex3').hide();
		
		break;
		
	// Exercício 04
	case 4:
		/*
		i) a = f'(x_A)
		ii) b = f(x_A) - f'(x_A) * x_A
		*/
		$(event.target).hide();
		//TODO: PERGUNTAR AMANHÃ PARA O IVAN
		var success = true;
		var field = $("#U-top-ex4");
		var field2 = $("#K-top-ex4");
		var xA = ggbApplet.getXcoord("A");
		
		var user_answer = parseFloat(field.val().replace(",", "."));
		var user_answer2 = parseFloat(field2.val().replace(",", "."));
		var right_answer = funcao[sorteado].df(xA);
		var right_answer2 = funcao[sorteado].f(xA) - right_answer * xA;
		
		console.log("---- Exercício 4 ----");
		console.log("xA = " + xA);
		console.log("f(x) = " + funcao[sorteado].f_ggb + " --> f(xA) = " + funcao[sorteado].f(xA));
		console.log("f'(x) = " + funcao[sorteado].df_ggb + " --> f'(xA) = " + funcao[sorteado].df(xA));
		console.log("Usuário: " + user_answer);
		console.log("Resposta esperada: " + right_answer);
		console.log("Usuário 2: " + user_answer2);
		console.log("Resposta esperada 2: " + right_answer2);
		
		if (Math.abs(user_answer - right_answer) <= 0.01 * Math.abs(right_answer) && Math.abs(user_answer2 - right_answer2) <= 0.01 * Math.abs(right_answer2)) {
			currentScore += SCORE_UNIT;
			field.css("background-color", "#33CC33");
			field2.css("background-color", "#33CC33");
			state.u_top_ex4 = user_answer;
		}
		else {
			success = false;
			field.css("background-color", "#CC3333");
			field2.css("background-color", "#CC3333");
		}
		
		if (success) {
		$("#feedback-ex" + screenExercise).html('Correto!');
		$("#feedback-ex" + screenExercise).removeClass().addClass("right-answer");
		}
		else {
		$("#feedback-ex" + screenExercise).html('Errado! A resposta certa seria: '+ right_answer + ' e ' + right_answer2);
		$("#feedback-ex" + screenExercise).removeClass().addClass("wrong-answer");
		}
		
		$('.dica-button1-ex4').hide();
		$('.dica-button2-ex4').hide();
		$('.dica-button3-ex4').hide();
		
		break;
		
	// Exercício 05
	case 5:
		/*
		i) a = -1/f'(x_A)
		ii) b = f(x_A) + 1/f'(x_A)
		*/
		$(event.target).hide();
		//TODO: PERGUNTAR AMANHÃ PARA O IVAN
		var success = true;
		var field = $("#U-top-ex5");
		var field2 = $("#K-top-ex5");
		var user_answer = parseFloat(field.val().replace(",", "."));
		var user_answer2 = parseFloat(field2.val().replace(",", "."));
		
		var xA = ggbApplet.getXcoord("A");
		var right_answer = -1/funcao[sorteado].df(xA);
    var right_answer2 = funcao[sorteado].f(xA) - right_answer * xA;
		
		console.log("---- Exercício 5 ----");
		console.log("xA = " + xA);
		console.log("f(x) = " + funcao[sorteado].f_ggb + " --> f(xA) = " + funcao[sorteado].f(xA));
		console.log("f'(x) = " + funcao[sorteado].df_ggb + " --> f'(xA) = " + funcao[sorteado].df(xA));
		console.log("Usuário: " + user_answer);
		console.log("Resposta esperada: " + right_answer);
		console.log("Usuário 2: " + user_answer2);
		console.log("Resposta esperada 2: " + right_answer2);
		
		if (Math.abs(user_answer - right_answer) <= 0.01 * Math.abs(right_answer) && Math.abs(user_answer2 - right_answer2) <= 0.01 * Math.abs(right_answer2)) {
			currentScore += SCORE_UNIT;
			field.css("background-color", "#33CC33");
			field2.css("background-color", "#33CC33");
			state.u_top_ex5 = user_answer;
		}
		else {
			success = false;
			field.css("background-color", "#CC3333");
			field2.css("background-color", "#CC3333");
		}
		
		if (success) {
		$("#feedback-ex" + screenExercise).html('Correto!');
		$("#feedback-ex" + screenExercise).removeClass().addClass("right-answer");
		}
		else {
		$("#feedback-ex" + screenExercise).html('Errado! A resposta certa seria: '+ right_answer + ' e ' + right_answer2);
		$("#feedback-ex" + screenExercise).removeClass().addClass("wrong-answer");
		}
		
		$('.dica-button1-ex5').hide();
		
		break;
  }
  
  // Atualiza a nota do LMS (apenas se a questão respondida é aquela esperada pelo LMS)
  if (!completed && screenExercise == scormExercise) {
    score = Math.max(0, Math.min(Math.round(score + currentScore), 100));
    
    if (scormExercise < N_EXERCISES) {
      nextExercise();
    }
    else {
		if(valendo){
		  completed = true;
		  scormExercise = 1;
		  save2LMS();
		  scorm.quit();
		}
    }
  }
}

function seeCheats (event) {
	
	switch (screenExercise) {

	// Exercício 01
    case 1: break;
	
	case 2: 
		alert(event.target);
	}
}

/*
 * Atualiza o campo da energia mecânica (= U + K).
 */ 
function update (exercise, checkpoint) {

  var field = $("#U-" + checkpoint + "-ex" + exercise);
  var u = parseFloat(field.val().replace(",", "."));
  if (isNaN(u)) {
    u = 0;
    field.val(0);
  }
  
  field = $("#K-" + checkpoint + "-ex" + exercise);
  var k = parseFloat(field.val().replace(",", "."));
  if (isNaN(k)) {
    k = 0;
    field.val(0);
  }
 
  $("#E-" + checkpoint + "-ex" + exercise).html((u + k).toString().replace(".", ","));
  
  updateError(exercise);
}

/*
 * Atualiza a incerteza na energia.
 */ 
function updateError (exercise) {
                                 
  var field = $("#U-top-ex" + exercise);
  var u = parseFloat(field.val().replace(",", "."));
  if (isNaN(u)) {
    u = 0;
    field.val(0);
  }
  
  field = $("#K-bottom-ex" + exercise);
  var k = parseFloat(field.val().replace(",", "."));
  if (isNaN(k)) {
    k = 0;
    field.val(0);
  }
  
  if (u == 0 || k == 0) {
    $("#error-ex" + exercise).html("indefinida."); 
  }
  else {
    $("#error-ex" + exercise).html(Math.round(Math.abs(100 * (u - k) / u)).toFixed(1).replace(".", ",") + "%");
  }
}

function updateEnergy (exercise) {
             
  var field = $("#U-top-ex" + exercise);
  var u = parseFloat(field.val().replace(",", "."));
  if (isNaN(u)) {
    u = 0;
    field.val(0);
  }
  
  field = $("#K-top-ex" + exercise);
  var k = parseFloat(field.val().replace(",", "."));
  if (isNaN(k)) {
    k = 0;
    field.val(0);
  }
  
  $("#E-top-ex" + exercise).html((u + k).toFixed(1).replace(".", ","));
   
  field = $("#U-bottom-ex" + exercise);
  u = parseFloat(field.val().replace(",", "."));
  if (isNaN(u)) {
    u = 0;
    field.val(0);
  }
  
  field = $("#K-bottom-ex" + exercise);
  k = parseFloat(field.val().replace(",", "."));
  if (isNaN(k)) {
    k = 0;
    field.val(0);
  }
  
  $("#E-bottom-ex" + exercise).html((u + k).toFixed(1).replace(".", ","));
}

function rand(l,u) // lower bound and upper bound
{
	return Math.floor((Math.random() * (u-l+1))+l);
}

var log = {};
