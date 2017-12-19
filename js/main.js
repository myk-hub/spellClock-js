let hours;
let minutes;
let to;
let past;
let nbsps;
let progress;

const chars = 'abcdefghijklmnopqrstuvwxyz';

const changed = () => {
  console.log(document.getElementById('setTime').value);

  if(!document.getElementById('setTime').value) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
  } else {
    var now = document.getElementById('setTime').value;
	  var hour = now.split(':')[0];
	  var minute = now.split(':')[1];
  }
	let offset;
	let next;

	hour = hour % 12;
	minute = minute - minute % 5;

	for (var i in minutes) {
		minutes[i].removeClass('on');
	}
	for (var i in hours) {
		hours[i].removeClass('on');
	}

	to.removeClass('on');
	past.removeClass('on');


	if (minute > 30) {
		hours[(hour + 1) % 12].addClass('on');
		to.addClass('on');

	} else {
		hours[hour].addClass('on');
		if (minute !== 0) {
			past.addClass('on');
		}
	}

	offset = (minute > 30)?(60-minute):minute;

	if (offset in minutes) {
		minutes[offset].addClass('on');
	} else if (offset === 25) {
		minutes[20].addClass('on');
		minutes[5].addClass('on');
	}

	now.setTime(Date.now());
	next = new Date(now.getTime());
	next.setMinutes(minute + 5);
	next.setSeconds(0);
	next.setMilliseconds(0);
	console.log((next - now) / 1000);
	setTimeout(changed, next - now);

};

const adjustProgress = () => {
	const now = new Date();
	const passed = (now.getMinutes() % 5) * 60 + now.getSeconds();
	const percent = passed / (5 * 60) * 100;

	progress.width(`${percent}%`)
		.css('transition', 'width 1s linear');

	if (percent < 0.5) {
		progress.hide();
		setTimeout(() => {
			progress.fadeIn();
		}, 500);
	}

	setTimeout(adjustProgress, 1000);
};

const first = () => {
	nbsps.each(function() {
		const c = chars.charAt(Math.floor(Math.random() * chars.length));
		$(this).text(c);
	});

	setTimeout(() => {
		progress.fadeIn();
	}, 1000);
};

$(() => {
	minutes = {
		0: $('#clock #m_0'),
		5: $('#clock #m_5'),
		10: $('#clock #m_10'),
		15: $('#clock #m_15'),
		20: $('#clock #m_20'),
		30: $('#clock #m_30'),
	};

	hours = {
		0: $('#clock #h_0'),
		1: $('#clock #h_1'),
		2: $('#clock #h_2'),
		3: $('#clock #h_3'),
		4: $('#clock #h_4'),
		5: $('#clock #h_5'),
		6: $('#clock #h_6'),
		7: $('#clock #h_7'),
		8: $('#clock #h_8'),
		9: $('#clock #h_9'),
		10: $('#clock #h_10'),
		11: $('#clock #h_11'),
	};

	to = $('#clock #to');
	past = $('#clock #past');

	nbsps = $('#clock .nbsp');

	progress = $('#progressbar');


	changed();
	adjustProgress();

	first();
});
