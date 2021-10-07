// date
export function updateDate() {
    const token =sessionStorage.getItem("loginToken");
    if(token){
    var date = document.getElementById("date");
    var newDate = new Date();
    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;
    var days = newDate.getDate();
    var dateJSRead = `${year}/${month}/${days}`;
    date.textContent = dateJSRead;
    }
}
setInterval(updateDate, 1000);

// time
function zeropadder(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

export function updateTime() {
    const token =sessionStorage.getItem("loginToken");
    if(token){
    var currentTime = document.getElementById("time");
    var timeNow = new Date(),
    hh = timeNow.getHours(),
    mm = timeNow.getMinutes(),
    ss = timeNow.getSeconds(),
    formatAMPM = (hh >= 12 ? 'PM' : 'AM');
    hh = hh % 12 || 12;
    var clockJSRead = `${zeropadder(hh)}: ${zeropadder(mm)}: ${zeropadder(ss)}` + ' ' + formatAMPM;
    currentTime.textContent = clockJSRead;
    }
}
setInterval(updateTime, 1000);