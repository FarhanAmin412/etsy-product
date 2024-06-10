export function myClock() {
  setTimeout(function () {
    const d = new Date();
    const n = d.toLocaleTimeString();
    if (document.getElementById("time")) {
      document.getElementById("time").innerHTML = n;
    }
    myClock();
  }, 1000);
}
