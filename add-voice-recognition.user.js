let textArea;
let transcript = '';
var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;

let recognizing = false;
recognition.onstart = function () {
	textArea.parentElement.style.borderColor = 'red';
	textArea.value = '';
	recognizing = true;
	transcript = '';
};
recognition.onresult = function (event) {
	transcript = '';
	for (var i = event.resultIndex; i < event.results.length; ++i) {
		transcript += event.results[i][0].transcript;
	}
	textArea.focus();
	textArea.value = transcript;
	let ev = new Event('input', { bubbles: true });
	textArea.dispatchEvent(ev);
};
recognition.onend = function () {
	textArea.parentElement.style.borderColor = 'lightgray';
	recognizing = false;
	transcript = '';
	textArea.parentElement.querySelector('button').click();
};
recognition.onerror = function (event) {
	console.log('error', event);
	textArea.parentElement.style.borderColor = 'lightgray';
};

document.addEventListener(
	'keydown',
	(e) => {
		if (e.code === 'Tab') {
			e.preventDefault();
			e.stopImmediatePropagation();
			textArea = document.querySelector('textarea');
			if (recognizing) {
				recognizing = false;
				recognition.stop();
			} else recognition.start();
		}
	},
	true
);
