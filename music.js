function start(){
	document.getElementById('display-area').style.display = 'block';

	// Tabs Text to  Tabs Array
	var tabs = document.getElementById('tabs').value;
	var tabsArr = textToArray(tabs);
	var displayWidth = 100;

	// Tabs Array to virtual parent node d with children nodes built up by tabsArray 
	var d = document.createDocumentFragment();
	for (item of tabsArr) {
		var s = document.createElement('SPAN');
		var t = document.createTextNode(item);
		s.style.width = displayWidth + 'px';
		s.style.border = '3px solid red';
		s.style.borderRadius = displayWidth/2 + 'px';
		if (t.length != 0){
			s.style.fontSize = displayWidth/t.length + 'px';
		}
		s.style.height = displayWidth + 'px';

		s.appendChild(t);
		d.appendChild(s);
	}
	chords = document.getElementById('chords');
	chords.appendChild(d);
	
	// Move Tabs nodes (d)
	var bpm = document.getElementById('bpm').value;
	var noteWidth = chords.childNodes[0].offsetWidth;
	var loadInterval = 10; // interval can't be less than 10 milliseconds
	var pixStep = noteWidth*bpm*loadInterval/1000/60;
	// move(chords, loadInterval, chords.offsetWidth + window.innerWidth, pixStep);

	// Adapt Font Size of Notes to the parent width
	// for (const chord of chords.childNodes){
	// 	chord.style.fontSize = (chord.offsetWidth/chord.childNodes.length) + 'px';
	// 	console.log('chord.childNodes.length: ' + chord.childNodes.length + '\n');
	// 	console.log(chord.innerHTML + ': ' + (chord.offsetWidth/chord.childNodes.length) + 'px\n');
	// }
}

function textToArray(text){
	return text.split(" ");
}

function move(container, loadInterval, dist, pixStep){
	// chords 區塊重置
	var posRightOrig = (container.style.right = -container.offsetWidth);
	var posRight = posRightOrig;
	var int = setInterval(frame, loadInterval); // interval can't be less than 10 milliseconds

	function frame(){
		if (posRight - posRightOrig >= dist) {
			clearInterval(int);
		} else {
			posRight += pixStep;
			container.style.right = posRight + 'px';
		}
	}
}