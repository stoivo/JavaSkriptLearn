var sendDate = new Date(2014,04,28,22,46,50);
var today = new Date();
var run = true;
while (run) {
	today = new Date();
	if (sendDate < today ) {
		document.getElementById('troop_confirm_go').click();
		run = false;
	}
}


var string = document.getElementsByClassName('relative_time')[0].innerHTML;
var arrat = string.split(" ");
var time = arrat[arrat.length-1]


console.log
