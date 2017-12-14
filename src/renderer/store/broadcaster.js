import { ipcRenderer } from 'electron';

export default store => {
	ipcRenderer.send('vuex-state', store.state);

	store.subscribe((mutation, state) => {
		console.log('plugin hit');
		ipcRenderer.send('vuex-state', state);
	});
};
