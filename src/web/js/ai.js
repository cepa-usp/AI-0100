var TOLERANCE = 0.1; // Tolerância nas respostas: 10%
var LOCAL_STORAGE_KEY = "AI-0100";
var MAX_INIT_TRIES = 60;
var init_tries = 0;
var scorm = pipwerks.SCORM; // Seção SCORM
scorm.version = "2004"; // Versão da API SCORM
var memento = {}; // Dados da AI
var session = {}; // Dados da sessão SCORM
var t1;
var debug = true;
var content = {};
var frame = -1;
var valendoNota = false;
var attempts = 0;
var N_FRAMES = 0;
var learnername = ""; // Nome do aluno
var completed = false; // Status da AI: completada ou não
var score = 0; // Nota do aluno (de 0 a 100)
var scormExercise = 1; // Exercício corrente relevante ao SCORM
var screenExercise = 1; // Exercício atualmente visto pelo aluno (não tem relação com scormExercise)
var N_EXERCISES = 5; // Quantidade de exercícios desta AI
var ai; // Referência para a AI (Flash)
var state = {};
var ggbApplet 

$(document).ready(init); // Inicia a AI.
$(window).unload(uninit); // Encerra a AI.

/*
 * Inicia a Atividade Interativa (AI)
 */
function init () {
	createInitScreen();
	loadContent();

	
}

function showGGB(){
	$("#ai-container").show();
}

function hideGGB(){
	$("#ai-container").hide();
}

function createInitScreen(){
	$("#start-dialog").dialog({
		buttons: {
			"Praticar": function () {
				valendoNota = false;
				$("#start-dialog").dialog("close");
			},
			"Valendo nota": function () {
				valendoNota = true;
				$("#start-dialog").dialog("close");				
			}
		},
		autoOpen: false,
		modal: true,
		draggable: false,
		beforeClose: function(){
			showGGB();
			loadState();
			if(lastFinished==1 || memento.funcaoSelecionada==undefined){
				restart();
				setFrame(0);
			} else {
				setFrame(0);	
			}
			
		},
		position: "center",
		stack: true,
		zIndex: 4000,
		width: 400
	});	
}

function loadContent(){
	$('#total').load("content.html #conteudo", onContentLoaded);	
}
function onContentLoaded(){
	content = $('#total').find(".texto");
	$('#total').remove();
	frame = -1;
	N_FRAMES = content.length;
	configButtons();
	memento = fetch();
	fetchDataFromScorm(memento);	
	ggbApplet = document.ggbApplet;	
	
	hideGGB();
	$("#start-dialog").dialog("open");	
}

function callEnterFrame(contentElement){
	var funcname = contentElement + "_enterFrame()";
	try {
		var ret = eval(funcname);	
	} catch(e){
		
	}
}
function callLeaveFrame(contentElement){
	var funcname = contentElement + "_leaveFrame()";
	try {
		var ret = eval(funcname);	
	} catch(e){
		
	}	
}


/*
 * Encerra a Atividade Interativa (AI)
 */ 
function uninit () {
  //commit(memento);
  //scorm.quit();
}

/*
 * Reinicia a AI: retorna tudo ao valor padrão (NÃO apaga a nota no LMS quando a atividade já estiver concluída) 
 */
function reset () {
	
  movie.reset();
  setFrame(0);
  
}

/*
 * Inicia a conexão SCORM.
 */ 
function fetch () {
 
  var ans = {};
  ans.completed = false;
  ans.score = 0;
  ans.learner = "";
  ans.frame = 0;
  
  // Conecta-se ao LMS
  session.connected = scorm.init();
  session.standalone = !session.connected;
  
  // Se estiver rodando como stand-alone, usa local storage (HTML 5)
  if (session.standalone) {
  
      var stream = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stream != null) ans = JSON.parse(stream);
  }
  // Se estiver conectado a um LMS, usa SCORM
  else {
  
    // Obtém o status da AI: concluída ou não.
    var completionstatus = scorm.get("cmi.completion_status");
    
    switch (completionstatus) {
    
      // Primeiro acesso à AI
      case "not attempted":
      case "unknown":
      default:
      	ans.learner = scorm.get("cmi.learner_name");
        break;
        
      // Continuando a AI...
      case "incomplete":
        var stream = scorm.get("cmi.location");
        if (stream != "") ans = JSON.parse(stream);
      	ans.learner = scorm.get("cmi.learner_name");
        break;
        
      // A AI já foi completada.
      case "completed":
        var stream = scorm.get("cmi.location");
        if (stream != "") ans = JSON.parse(stream);
      	ans.learner = scorm.get("cmi.learner_name");
        break;
    }    
  }
  
  return ans;
}

/*
 * Salva cmi.score.raw, cmi.location e cmi.completion_status no LMS (ou local storage, se não houver um LMS)
 */ 
function commit (data) {

  var success = false;
  
  // Se estiver rodando como stand-alone, usa local storage (HTML 5)
  if (session.standalone) {
	
    var stream = JSON.stringify(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, stream);
    
    success = true;
  }
  // Se estiver conectado a um LMS, usa SCORM
  else {  

    if (session.connected) {
    
      // Salva no LMS a nota do aluno.
      success = scorm.set("cmi.score.raw", data.score);
      
      // Salva no LMS o status da atividade: completada ou não.
      success = scorm.set("cmi.completion_status", (data.completed ? "completed" : "incomplete"));
      
      // Salva no LMS os demais dados da atividade.
      var stream = JSON.stringify(data);      
      success = scorm.set("cmi.location", stream);
    }
  }
  
  return success;
}

// Mensagens de log
function message (m) {
	try {
		if (debug) console.log(m);
	}
	catch (error) {
		// Nada.
	}
}