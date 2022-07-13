//Bug: nova collapses if the licence is entered wrong
// Cant get the confi file to reset after the restard
class Licence {
	#path
	#homePath
	#dirContent
	#homeContent
	//check exports.activate()
	//Licence Key Command getLicence
	constructor() {
		// This is to check if the user has a license already
		this.#path = nova.path.expanduser('~/intelephense/')
		this.#homePath = nova.path.expanduser('~/')
		this.#dirContent = nova.fs.listdir(`${this.#path}`)
		this.#homeContent = nova.fs.listdir(`${this.#homePath}`)
	}

	getLicence(workSpace) {
		workSpace.showInputPalette(
			'Type in your intelephense Licence Key',
			{
				placeholder: 'XXXXXXXXX',
			},
			this.registerLicence.bind(this)
		)
	}

	registerLicence(licenceKey) {
		console.log(licenceKey)
		if (!this.#homeContent.includes('intelephense')) {
			nova.fs.mkdir(`${this.#homePath}/intelephense`)
		}

		try {
			let licenceFile = nova.fs.open(`${this.#path}/licence.txt`, 'x')
			licenceFile.write(licenceKey.trim())
			licenceFile.close()
		} catch {
			return //this is not required if conifg changes in restart
		}
	}

	exists() {
		return this.#dirContent.includes('licence.txt')
	}

	console() {
		console.log([this.#path, this.#homePath, this.#homeContent])
	}
}

module.exports = Licence
