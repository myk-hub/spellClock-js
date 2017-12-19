var hours, minutes, to, past, nbsps;
var progress;
var chars = 'abcdefghijklmnopqrstuvwxyz';

var changed = function() {
  console.log(document.getElementById('setTime').value);

  if(!document.getElementById('setTime').value) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    console.log(now);
  } else {
    console.log('elses');
    var now = document.getElementById('setTime').value;
	  var hour = now.split(':')[0];
	  var minute = now.split(':')[1];
  }
	var offset;
	var next;

	hour = hour % 12;
	minute = minute - minute % 5;
}
