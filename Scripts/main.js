const Licence = require('./Licence.js')
var licence = new Licence()
var globalStoragePath = nova.path.join(
	nova.extension.globalStoragePath,
	'intelephense'
)
var langserver = null
var requiredVersion = '1.8.2'
var workspaceStoragePath = nova.path.join(
	nova.extension.workspaceStoragePath,
	'intelephense'
)
var packageJsonFile = nova.path.join(workspaceStoragePath, 'package.json')

var install = async function () {
	if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
		console.log("Installing via 'npm' in directory: ", workspaceStoragePath)
	}

	installation = new Process('/usr/bin/env', {
		args: ['npm', 'install', 'intelephense@' + requiredVersion],
		cwd: workspaceStoragePath,
	})

	installation.onStdout(function (output) {
		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log('Installation Output:', output.trim())
		}
	})

	installation.onDidExit(function (status) {
		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log('Installation completed with status:', status)
		}

		langserver = new IntelephenseLanguageServer()
	})

	if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
		console.log('Starting Intelephense installation.')
	}

	const installNotification = new NotificationRequest(
		'genealabs.intelephense.installNotification'
	)
	installNotification.title = 'Installing Intelephense.'
	installNotification.body = 'Inteliphense LSP is being installed.'
	nova.notifications.add(installNotification)

	installation.start()
}

var installIfMissing = async function () {
	if (nova.fs.access(packageJsonFile, nova.fs.F_OK) === false) {
		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log(
				"installIfMissing: 'package.json' not found, creating a default one."
			)
		}

		fileContent =
			`{
          "name": "` +
			nova.extension.name +
			`",
          "description": "` +
			nova.extension.description +
			`",
          "version": "` +
			nova.extension.version +
			`",
          "repository": {
            "type": "git",
            "url": "https://github.com/GeneaLabs/panic-nova-intelephense"
          },
          "keywords": ["languages"],
          "author": "` +
			nova.extension.vendor +
			`",
          "license": "MIT",
          "bugs": {
            "url": "https://github.com/GeneaLabs/panic-nova-intelephense/issues"
          },
          "homepage": "https://extensions.panic.com/extensions/genealabs/genealabs.intelephense/"
        }`

		try {
			let fileJSON = nova.fs.open(packageJsonFile, 'wt')
			fileJSON.write(fileContent)
			fileJSON.close()
		} catch (error) {
			console.warn(
				"installIfMissing: could not create 'package.json' file, error was: ",
				error
			)
		}
	} else {
		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log(
				"installIfMissing: readable 'package.json' found, continuing install with 'npm'..."
			)
		}
	}

	if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
		console.log(
			'installIfMissing: Launching npm in path:',
			workspaceStoragePath
		)
	}

	let process = new Process('/usr/bin/env', {
		args: ['npm', 'list', '--depth 0', '--parseable', '--long', 'intelephense'],
		cwd: /* nova.extension.workspaceStoragePath */ workspaceStoragePath,
	})
	let installedVersion = ''

	process.onStdout(function (output) {
		installedVersion = (output.split(':')[1] || '').split('@')[1] || ''

		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log(
				'installIfMissing: Intelephense currently installed version:',
				installedVersion
			)
		}
	})

	process.onDidExit(function (status) {
		if (installedVersion !== requiredVersion) {
			install()

			return
		}

		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log(
				'installIfMissing: Checking installation did complete with status:',
				status
			)
		}

		langserver = new IntelephenseLanguageServer()
	})

	process.start()
}

var activate = async function () {
	if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
		console.log('Activating extension.')
	}

	try {
		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log(
				'Creating extension workspace storage path:',
				nova.extension.workspaceStoragePath
			)
			console.log(
				'Creating extension global storage path:',
				nova.extension.globalStoragePath
			)
			console.log(
				'Creating Intelephense workspace storage path:',
				workspaceStoragePath
			)
			console.log(
				'Creating Intelephense global storage path:',
				globalStoragePath
			)
		}

		nova.fs.mkdir(nova.extension.workspaceStoragePath)
		nova.fs.mkdir(nova.extension.globalStoragePath)
		nova.fs.mkdir(workspaceStoragePath)
		nova.fs.mkdir(globalStoragePath)
	} catch (error) {
		console.error('Directory creation failed during activation:', error)
	}

	await installIfMissing()
}

var deactivate = async function () {
	if (langserver) {
		langserver.deactivate()
		langserver = null
	}
}

var restart = async function () {
	await deactivate()
	await activate()
}

nova.commands.register('genealabs.intelephense.restart', restart)
nova.commands.register('intelephense.licence', licence.getLicence, licence)

exports.activate = function () {
	activate()
	// licence.console()
	nova.workspace.config.set('licenceExists', licence.exists() ? false : true)
}

exports.deactivate = function () {
	deactivate()
}

class IntelephenseLanguageServer {
	constructor() {
		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log('Constructing language server.')
		}

		this.start()
	}

	activate() {
		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log('Activating language server using:', workspaceStoragePath)
		}
	}

	deactivate() {
		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log('Deactivating language server.')
		}

		this.stop()
	}

	start(path) {
		if (this.languageClient) {
			this.languageClient.stop()
			nova.subscriptions.remove(this.languageClient)
		}

		if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
			console.log('Starting language server with path:', workspaceStoragePath)
		}

		if (!path) {
			path = nova.path.join(
				workspaceStoragePath,
				'node_modules',
				'intelephense',
				'lib',
				'intelephense.js'
			)
		}

		var serverOptions = {
			args: ['node', path, '--stdio'],
			path: '/usr/bin/env',
			type: 'stdio',
		}
		var clientOptions = {
			syntaxes: ['php'],
			initializationOptions: {
				clearCache: false,
				globalStoragePath: globalStoragePath,
				licenseKey: '',
				storagePath: workspaceStoragePath,
			},
		}
		var client = new LanguageClient(
			'genealabs-intelephense',
			'Intelephense LSP',
			serverOptions,
			clientOptions
		)

		try {
			if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
				console.log('Starting client.')
			}

			client.start()
			nova.subscriptions.add(client)
			this.languageClient = client
		} catch (error) {
			console.error('Error when creating client:', error)
		}
	}

	stop() {
		if (this.languageClient) {
			if (nova.config.get('genealabs.intelephense.debugging', 'boolean')) {
				console.log('Stopping language client.')
			}

			this.languageClient.stop()
			nova.subscriptions.remove(this.languageClient)
			this.languageClient = null
		}
	}
}
