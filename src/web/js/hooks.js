/*
 * Before fetch hook (executes setup that are independent of AI status).
 */
function configButtons () {
	$("#step-backward").button().click(onButtonBackward);
	$("#step-forward").button().click(onButtonForward);
	$(":input").keypress(function (event) {
		if (event.which == 13) onButtonForward();
	});

	// reset
	$("#reset").button({disabled: true}).click(function () {
		hideGGB();
		$("#start-dialog").dialog("open");	

	});
	$("#reset-dialog").dialog({
		buttons: {
			"Ok": function () {
				$(this).dialog("close");
				restart();
			},
			"Cancelar": function () {
				$(this).dialog("close");
			}
		},
		autoOpen: false,
		modal: true,
		width: 350
	});
}


function fetchDataFromScorm(state) {
	// Pega o nome do usu�rio
	if (state.learner != "") {
		var prename = state.learner.split(",")[1];
		$("#learner-prename").html(prename + ",");
	}

	if (memento.completed) $(".completion-message").show();
	else $(".completion-message").hide();
	
	// Espera os callbacks do filme Flash ficarem disponíveis
	t1 = new Date().getTime();
}

//
///*
// * After set-frame hook.
// */
//function postSetFrameHook (targetFrame) {
//	memento.frame = targetFrame;
//	
//	// Configura os botões "avançar" e "recomeçar"
//	var allow_reset = memento.completed && memento.frame > 0;
//	$("#reset").button({disabled: !allow_reset});
//	$("#step-forward").button({disabled: (memento.frame == N_FRAMES && memento.completed)});
//  
//	
//}


/*
 * After step-forward hook.
 */
function persistSCORMData () {
	memento.frame = frame;  
	var allow_reset = memento.completed && memento.frame > 0;
	$("#reset").button({disabled: !allow_reset});	
	commit(memento);
}


/*
 * Finish this AI
 */
function finish () {
	
	$(".completion-message").show();
	$("#score").html(memento.count);
	$("#finish-dialog").dialog("open");
	$("#step-forward").button({disabled: true});
	$("#reset").button({disabled: false});
	
	if (!memento.completed) {
		memento.completed = true;
		commit(memento);
	}
}

/*
 * Move forward, stepping to the next frame or finishing this AI
 */
function onButtonForward () {
	if (memento.frame < N_FRAMES) stepForward();
	else finish();
}

function onButtonBackward () {
	if (memento.frame > 0) stepBackward();
}

function setForwardButtonEnabled(booleanValue){
	$("#step-forward").button({disabled: !booleanValue});
}

function setResetButtonEnabled(booleanValue){
	$("#reset").button({disabled: !booleanValue});
}

function setInputEnabled(textfieldId, booleanValue){
	if(!booleanValue){
		$("#" + textfieldId).attr('disabled', 'disabled');	
	} else {
		$("#" + textfieldId).removeAttr('disabled');
	}
}
function setInputEnabled2(textfieldId, booleanValue, booleanCorrectness){
	if(!booleanValue){
		$("#" + textfieldId).attr('disabled', 'disabled');	
	} else {
		$("#" + textfieldId).removeAttr('disabled');
	}
	if(booleanCorrectness){
		$("#" + textfieldId).css('background-color', '#DBFCD4');
	} else {
		$("#" + textfieldId).css('background-color', '#FCD4D8');
	}
}

function setBackwardButtonEnabled(booleanValue){
	$("#step-backward").button({disabled: !booleanValue});
}

// Checks if given selector (type input) is a valid number. If not, resets field.
function validateAnswer (selector) {
  var value = $('#' + selector).val().replace(",", ".");
  var isValid = !isNaN(value) && value != "";
  if (!isValid) $(selector).val("");
  return isValid;
}

// Check given answer against expected one, with relative tolerance also given
function checkAnswer (correct_answer, user_answer, tolerance) {
	var dist = Math.abs(correct_answer - user_answer.toFixed(2));
	var tol = Math.abs(correct_answer.toFixed(2)) * tolerance;
	return dist < tol;
}

// Format a given number with 2 decimal places, and substitute period by comma.
function formatNumber (string) {
	return new Number(string).toFixed(2).replace(".", ",");
}

function toNumber(string){
	return parseFloat(string.replace(",", "."))
}