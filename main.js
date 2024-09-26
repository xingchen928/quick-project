const {
	app,
	BrowserWindow,
	globalShortcut,
	Menu,
	session,
} = require('electron')

let mainWindow
const mainWindowPartition = 'persist:mainWindow'
let mainWindowSession

app.whenReady().then(() => {
	mainWindowSession = session.fromPartition(mainWindowPartition)

	mainWindow = new BrowserWindow({
		title: 'Quick Project',
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			partition: mainWindowPartition,
			webSecurity: false,
		},
	})

	let root = process.env.QUICK_PROJECT_UI_ROOT
	console.log(root)
	if (typeof root !== 'string' || root.trim().length === 0) {
		mainWindow.loadFile('./html/index.html')
	}
	else {
		mainWindow.loadURL(root)
	}

	Menu.setApplicationMenu(
		Menu.buildFromTemplate([
			{
				label: 'View',
				submenu: [
					{
						label: 'Reload',
						accelerator: 'F5',
						click: () => {
							mainWindow.reload()
						},
					},
					{
						label: 'Toggle Full Screen',
						accelerator: 'F11',
						click: () => {
							mainWindow.setFullScreen(!mainWindow.isFullScreen())
						},
					},
					{
						label: 'Toggle Menu',
						accelerator: 'F1',
						click: () => {
							mainWindow.setMenuBarVisibility(!mainWindow.isMenuBarVisible())
						},
					},
					{
						label: 'Developer Tools',
						accelerator: 'F12',
						click: () => {
							if (mainWindow.webContents.isDevToolsOpened()) {
								mainWindow.webContents.closeDevTools()
							} else {
								mainWindow.webContents.openDevTools()
							}
						},
					},
				],
			},
		])
	)
	mainWindow.setMenuBarVisibility(true)

	mainWindow.on('closed', () => {
		mainWindow = null
		globalShortcut.unregisterAll()
	})
})
