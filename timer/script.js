function getTimeRemaining(endtime) {
	const total = Date.parse(endtime) - Date.parse(new Date());
	const seconds = Math.floor((total / 1000) % 60);
	const minutes = Math.floor((total / 1000 / 60) % 60);
	return {
		total,
		minutes,
		seconds
	};
}

function getEndTime(limit) {
	return new Date(Date.parse(new Date()) + limit * 1000);
}

function initializeClock(id) {
	getLimit();
	const oglimit = 120;
	let limit = oglimit;

	let started = false;
	
	let paused = false;
	
	let t = {'total':0};
	
	const clock = document.getElementById(id);
	
	const minutesSpan = clock.querySelector('.minutes');
	const secondsSpan = clock.querySelector('.seconds');
	
	const startBtn = document.getElementById('start');
	const pauseBtn = document.getElementById('pause');
	const addBtn = document.getElementById('add');
	const removeBtn = document.getElementById('remove');
	const resetBtn = document.getElementById('reset');
	
	let timeinterval;
	
	function updateClock() {
		
		t = getTimeRemaining(endtime);
		
		s = Math.floor(t.total/1000);
		
		if (0 === s % 2) {
			console.log('even');
			clock.classList.remove('clockstate-A');
			clock.classList.add('clockstate-B');
		} else {
			console.log('odd');
			clock.classList.remove('clockstate-B');
			clock.classList.add('clockstate-A');
		}
		
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		
		maybeSetLastStretch(t);

		if (false === started) {
			pauseBtn.setAttribute('disabled',true);
			startBtn.removeAttribute('disabled');
		} else {
			startBtn.setAttribute('disabled',true);
			pauseBtn.removeAttribute('disabled');
		}
		
		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}
	
	function maybeSetLastStretch(t) {
		if (0 === t.minutes && t.seconds <=30) {
			clock.classList.add('laststretch');
		} else {
			clock.classList.remove('laststretch');
		}
	}
	
	function getLimit(og) {
		let params = new URLSearchParams(document.location.search);
		let mylimit = params.get("limit");
		if (null === mylimit) {
			return og;
		}
		mylimit = parseInt(mylimit, 10);
		if (isNaN(mylimit)) {
			return og;
		} else {
			console.log(mylimit)
		}
		if (mylimit > 3599) {
			return 3599;
		}
		return mylimit
	}
	
	function startClock() {
		clock.classList.remove('clockstate-stopped');
		clock.classList.remove('clockstate-paused');
		clock.classList.add('clockstate-running');
		console.log(started);
		console.log(paused);
		if (true === started && false === paused) {
			return;
		}
		started = true;
		paused = false;
		endtime = getEndTime(limit);
		updateClock();
		timeinterval = setInterval(updateClock, 1000);
	}
	
	function pauseClock() {
		if (true !== started) {
			return;
		}
		if (true === paused) {
			limit = t.minutes * 60 + t.seconds;
			startClock();
			return;
		}
		clock.classList.add('clockstate-paused');
		clock.classList.remove('clockstate-running');
		clearInterval(timeinterval);
		paused = true;
	
	}
	
	function addTime() {
		if (typeof endtime === 'undefined') {
			return;
		}
		console.log('add 10s');
		endtime = new Date(endtime.getTime() + 10000);
		updateClock();
	}
	
	function removeTime() {
		if (typeof endtime === 'undefined') {
			return;
		}
		console.log('remove 10s');
		endtime = new Date(endtime.getTime() - 10000);
		updateClock();
	}
	
	function resetClock() {
		clock.classList.remove('clockstate-A');
		clock.classList.remove('clockstate-B');
		clock.classList.remove('clockstate-paused');
		clock.classList.remove('clockstate-running');
		clock.classList.remove('laststretch');
		clock.classList.add('clockstate-stopped');
		clearInterval(timeinterval);
		limit = getLimit(oglimit);
		endtime = getEndTime(limit);
		started = false;
		updateClock();
	}
	resetClock();

	startBtn.addEventListener("click", startClock);
	addBtn.addEventListener("click", addTime);
	removeBtn.addEventListener("click", removeTime);
	resetBtn.addEventListener("click", resetClock);
	pauseBtn.addEventListener("click", pauseClock);

}

initializeClock('clockdiv');

