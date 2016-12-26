'use strict';

const assert = require('assert');
const SEPARATOR = {
	start: '<%',
	stop: '%>',
};

const TOKENS = new RegExp(`(${SEPARATOR.start}[=]?|${SEPARATOR.stop})`);
const TYPES = /(=)/;

const STRING_TYPE = Symbol('string');
const INTERPOLATION_TYPE = Symbol('interpolation');
const BLOCK_TYPE = Symbol('block');

class Compiler {

	constructor(type = STRING_TYPE, level = 0) {
		this.content = [];
		this.active = null;
		this.ready = false;
		this.type = type;
		this.level = level;

	}

	write(chunk = '') {

		if (this.active) {
			this.active.write(chunk);
			if (this.active.ready) {
				this.content.push(...this.active.content);
				this.active = null;
			}

			return this;
		}


		if (TOKENS.test(chunk)) {

			let [sign, type] = chunk.split(TYPES);

			type = type === '='
				? INTERPOLATION_TYPE
				: BLOCK_TYPE;

			switch (this.type) {
			case STRING_TYPE:
				if (sign === SEPARATOR.start) {
					this.active = new Compiler(type, this.level + 1);
				}

				const activeReleased = !this.active || this.active.ready;
				if (activeReleased) {
					this.ready = true;
				}

				break;

			case INTERPOLATION_TYPE:
				this.ready = true;
				break;

			case BLOCK_TYPE:
				if (sign === SEPARATOR.start) {
					this.active = new Compiler(type, this.level + 1);
				} else {
					this.active = new Compiler(STRING_TYPE, this.level + 1);
				}

				break;
			}

			return this;
		}

		const prefix = (new Array(this.level)).fill(' ').join('');

		switch (this.type) {
		case STRING_TYPE:
			this.content.push(prefix + 'body.push(`' + chunk + '`);');
			break;
		case INTERPOLATION_TYPE:
			this.content.push(prefix + 'body.push(' + chunk.trim() + ');');
			break;
		case BLOCK_TYPE:

			let hasOpen = chunk.includes('{');
			let hasClose = chunk.includes('}');

			if ((!hasOpen && !hasClose) || hasClose) {
				this.ready = true;
			}

			this.content.push(prefix + chunk.trim());
			break;

		}

		return this;
	}

	render() {
		this.content.push(`return Promise.all(body).then(data => data.join(''));`)
		return [`let body = [];`, ...this.content].join('\n');
	}
}



const compile = (str, data = {}) => {

	const compiler = new Compiler();
	let preparedString = str
		.replace(/(%>)[\s]+?(<%[=])/g, '$1$2')
		.trimRight() + '\n'
		;


	let template = preparedString
		.split(TOKENS)
		.reduce((c, chunk) => c.write(chunk), compiler)
		.render();

	let AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
	return new AsyncFunction('data', template);
};

module.exports = compile;
