const success = '\x1b[32mOK\x1b[0m'
const failure = '\x1b[31mFAILED\x1b[0m'
const homecomixDB = '[\x1b[35mHomeComix-DB\x1b[0m] '
const homecomixDBPath = require('path').join(require('os').homedir(), '/.homecomix/db')
const homecomixTMP = require('path').join(require('os').homedir(), '/.homecomix/tmp')

const setup = {
	async database () {
		if (!require('fs').existsSync(homecomixDBPath)) {
			try {
				await require('mkdirp')(homecomixDBPath)
				console.log(`${homecomixDB}Creating HomeComix database folder at (${homecomixDBPath}) [${success}]`)
			} catch (err) {
				console.log(`${homecomixDB}Creating HomeComix database folder at (${homecomixDBPath}) [${failure}]`)
			}
		} else {
			console.log(`${homecomixDB}Found HomeComix database folder at (${homecomixDBPath}) [${success}]`);
		}
	},

	async temporary () {
		if (!require('fs').existsSync(homecomixTMP)) {
			try {
				await require('mkdirp')(homecomixTMP)
				console.log(`${homecomixDB}Creating HomeComix tmp folder at (${homecomixTMP}) [${success}]`)
			} catch (err) {
				console.log(`${homecomixDB}Creating HomeComix tmp folder at (${homecomixTMP}) [${failure}]`)
			}
		} else {
			console.log(`${homecomixDB}Found HomeComix tmp folder at (${homecomixTMP}) [${success}]`);
		}
	},

   mongod () {
		require('shelljs').exec(`mongod --dbpath ${homecomixDBPath}` , err => {
			if (err) {
				console.log(`${homecomixDB}Starting mongod service [${failure}]`)
				throw (err)
			}
		})
	}
}

setup.database()
setup.temporary()
setup.mongod()
