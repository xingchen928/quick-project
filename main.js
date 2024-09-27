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
		width: 2000,
		height: 1000,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			partition: mainWindowPartition,
			webSecurity: false,
		},
	})

	let root = process.env.QUICK_PROJECT_UI_ROOT
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
						click: () => {
							mainWindow.reload()
						},
					},
					{
						label: 'Toggle Full Screen',
						click: () => {
							mainWindow.setFullScreen(!mainWindow.isFullScreen())
						},
					},
					{
						label: 'Developer Tools',
						click: () => {
							if (mainWindow.webContents.isDevToolsOpened()) {
								mainWindow.webContents.closeDevTools()
							} else {
								mainWindow.webContents.openDevTools()
							}
						},
					},
					{
						label: 'Close Menu',
						accelerator: 'Ctrl+Alt+F1',
						click: () => {
							mainWindow.setMenuBarVisibility(!mainWindow.isMenuBarVisible())
						},
					},
				],
			},
		])
	)
	mainWindow.setMenuBarVisibility(false)

	mainWindow.on('closed', () => {
		mainWindow = null
		globalShortcut.unregisterAll()
	})
})
