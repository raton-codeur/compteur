export const config = {
	up : {
		limitHours: 0,
		limitMinutes: 40,
		limitSeconds: 0
	},
	down : {
		initHours: 0,
		initMinutes: 0,
		initSeconds: 0
	}
};

export const DOM = {
	modeButton: document.getElementById('mode'),
	chronoElement: document.getElementById('chrono'),
	startButton: document.getElementById('start'),
	stopButton: document.getElementById('stop'),
	resetButton: document.getElementById('reset'),
	configName: document.getElementById('config-name'),
	configHours: document.getElementById('hours'),
	configMinutes: document.getElementById('minutes'),
	configSeconds: document.getElementById('seconds'),
	resetConfigButton: document.getElementById('reset-config')
};
