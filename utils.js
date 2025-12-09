import { DOM, config } from "./define.js";

function fillSelect(selectId, max) {
  const select = document.getElementById(selectId);

  for (let i = 0; i <= max; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i.toString();
    select.appendChild(option);
  }
}
fillSelect("hours", 23);
fillSelect("minutes", 59);
fillSelect("seconds", 59);

export function resetUp() {
	DOM.configHours.value = config.up.limitHours.toString();
	DOM.configMinutes.value = config.up.limitMinutes.toString();
	DOM.configSeconds.value = config.up.limitSeconds.toString();
	DOM.configName.textContent = 'limite';
}

export function resetDown() {
	DOM.configHours.value = config.down.initHours.toString();
	DOM.configMinutes.value = config.down.initMinutes.toString();
	DOM.configSeconds.value = config.down.initSeconds.toString();
	DOM.configName.textContent = 'init';
}

