
// Tabs
function showTab(tab) {
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.container').forEach(el => el.classList.add('hidden'));
  document.getElementById(`${tab}-tab`).classList.remove('hidden');
  document.querySelector(`.tab:contains(${tab})`);
  document.querySelector(`.tab:nth-child(${['clock','stopwatch','alarm'].indexOf(tab)+1})`).classList.add('active');
}

// Clock
function updateClock() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  document.getElementById('clock-time').textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  document.getElementById('clock-ampm').textContent = ampm;
  document.getElementById('clock-day').textContent = days[now.getDay()];
  document.getElementById('clock-date').textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  checkAlarm(h, m, ampm);
}
setInterval(updateClock, 1000);
updateClock();

// Stopwatch
let stopwatchInterval, stopwatchTime = 0;
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function startStopwatch() {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    document.getElementById('stopwatch-display').textContent = formatTime(stopwatchTime);
  }, 1000);
}
function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}
function resetStopwatch() {
  stopStopwatch();
  stopwatchTime = 0;
  document.getElementById('stopwatch-display').textContent = formatTime(stopwatchTime);
}

// Alarm
let alarmHour = null, alarmMinute = null, alarmPeriod = null;
function setAlarm() {
  const input = document.getElementById('alarmTime').value;
  if (!input) return alert("Please select a time.");
  let [h, m] = input.split(":").map(Number);
  const now = new Date();
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;

  alarmHour = h;
  alarmMinute = m;
  alarmPeriod = period;

  document.getElementById('alarmMsg').textContent = `Alarm set for ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')} ${period}`;
}
function clearAlarm() {
  alarmHour = null;
  alarmMinute = null;
  alarmPeriod = null;
  document.getElementById('alarmMsg').textContent = '';
}
function checkAlarm(h, m, period) {
  if (alarmHour === h && alarmMinute === m && alarmPeriod === period) {
    alert("⏰ Alarm Ringing!");
    clearAlarm();
  }
}
