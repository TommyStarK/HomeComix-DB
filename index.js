const success = '\x1b[32mOK\x1b[0m';
const failure = '\x1b[31mFAILED\x1b[0m';
const homecomix_db = '[\x1b[35mHomeComix-DB\x1b[0m] ';
const homecomix_db_path = require('path').join(
	require('os').homedir(),
	'/.homecomix/db'
);

const setup = {
	folder() {
		if (!require('fs').existsSync(homecomix_db_path)) {
			require('mkdirp')(homecomix_db_path, (err) => {
				if (err) {
					console.log(`${homecomix_db}creating HomeComix database folder at (${homecomix_db_path}) [${failure}]`);
					throw(err)
				} else {
					console.log(`${homecomix_db}creating HomeComix database folder at (${homecomix_db_path}) [${success}]`);
				}
			});
		} else {
			console.log(`${homecomix_db}found HomeComix database folder at (${homecomix_db_path}) [${success}]`);
		}
	},
	mongod() {
		require('shelljs').exec(`mongod --dbpath ${homecomix_db_path}`, (err) => {
			if (err) {
				console.log(`${homecomix_db}Starting mongod service [${failure}]`);
				throw(err);
			}
		});
	}
};

setup.folder();
setup.mongod();
