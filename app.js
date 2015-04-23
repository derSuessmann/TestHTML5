/**
 * 
 */
"use strict";

function calculateESerie(n) {
	var result = [];
	
	var base = Math.pow(10, 1/n);
	
	for (var i = 0; i < n; i++) {
		if (n < 48) {
			result.push(Math.round(10*Math.pow(base, i))/10);
		}
		else {
			result.push(Math.round(100*Math.pow(base, i))/100);			
		}
	}
	
	return result;
}

function normalize(r) {
	var multiplikator = 1;
	
	while (r >= 10) {
		r = r / 10;
		multiplikator = multiplikator * 10;
	}
	
	return [r, multiplikator];
}

function findNearest(rValue, eSeries) {
	var i;
	for (i = 0; i < eSeries.length && eSeries[i] < rValue; i++); 
	
	var left, right 
	if (i === eSeries.length) {
		left = eSeries[i-1];
		right = 10;
	}
	else {
		left = eSeries[i-1];
		right = eSeries[i];
	}
	
	if (rValue < ((left+right)/2)) {
		return left;
	}
	else {
		return right;
	}
}

var rText = document.getElementById('rText');
var eSeriesText = document.getElementById("eSerie");
var calcButton = document.getElementById("calcButton");

var calculate = function(event) {
	var r = parseFloat(rText.value);
	var eSeriesNumber = parseInt(eSeriesText.value);
	var result = document.querySelector("output");
	
	var eSeries = calculateESerie(eSeriesNumber);
	var rNormalized = normalize(r);
	var rValue = findNearest(rNormalized[0], eSeries);
	
	result.innerHTML = "Passender Widerstand aus E" + eSeriesNumber + ": " 
		+ rValue + "x" + rNormalized[1] + " Ohm";
}

function saveValues(event) {
	localStorage.setItem("R", rText.value);
	localStorage.setItem("eSeries", eSeriesText.value)
}

function restore() {
	rText.value = localStorage.getItem("R");
	eSeriesText.value = localStorage.getItem("eSeries");
}

restore();

rText.addEventListener("change", saveValues,false);
eSeriesText.addEventListener("change", saveValues, false);
calcButton.addEventListener("click", calculate, false);

