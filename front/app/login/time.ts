export function updateTimeElement(elem) {
  updateTime(elem);
  setInterval(updateTime, 10000, elem);
}

function updateTime(element) {
  let now = new Date();
  element.innerHTML = now.toLocaleDateString() + " " + now.toLocaleTimeString();
}
