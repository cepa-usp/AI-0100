// Current frame


/*
 * Step frame forward
 */
function stepForward () {
	var next_frame = frame + 1;
	if (next_frame <= N_FRAMES) {
		setFrame(next_frame);
	}
}

/*
 * Step frame backward
 */
function stepBackward () {
	var next_frame = frame - 1;  
	if (next_frame >= 0) {
		setFrame(next_frame);
	}
}

/*
 * Sets current frame to <targetFrame>
 */
function setFrame(targetFrame) {
	if (!isNaN(targetFrame) && targetFrame >= 0 && targetFrame <= N_FRAMES) { 
			if(frame!=targetFrame && frame>=0){
				var oldContentElement = content[frame].id;
				callLeaveFrame(oldContentElement);
			}
			
			var contentElement = content[targetFrame].id;
			var htmlContent = $(content[targetFrame]).html();
			$('#textArea').html(htmlContent);

			
			callEnterFrame(contentElement);
			

			frame = targetFrame;	
			memento.frame = frame;
			//postSetFrameHook(targetFrame);
	}
}

// Auxiliary function: counts the amount of frames
function countFrames () {
	return $(".frame").length - 1;
}

// Auxiliary function: shows a given <element>
function show (element) {
  $(element).show();
}

// Auxiliary function: hides a given <element>
function hide (element) {
  $(element).hide();
}