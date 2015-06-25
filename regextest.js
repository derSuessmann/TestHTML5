"use strict";

var testRegExpBtn = document.getElementById('testRegExp');

function testRegExp(event) {
	var reText = document.getElementById("regExpPattern").value;
	var textText = document.getElementById("text").value;
	
	if (reText) {
		var re = new RegExp(reText, "g");
		var result = re.exec(textText);
		alert(result);
	}
}

testRegExpBtn.addEventListener("click", testRegExp);
