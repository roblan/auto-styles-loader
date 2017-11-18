const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

const defaultOptions = {
	tryFilename: false,
	files: ['styles.css', 'style.css', 'main.css'],
};

const toArray = (option) => Array.isArray(option) ? option : [option];

module.exports = function(content) {
	this.cacheable && this.cacheable();
	const options = Object.assign(
		{},
		defaultOptions,
		loaderUtils.getOptions(this)
	);
	if (options.tryFilename === true) {
		options.tryFilename = ['.css'];
	}
	const resource = path.parse(this.resourcePath);
	let files = toArray(options.files);
	if (options.tryFilename) {
		files = toArray(options.tryFilename).map(ext => resource.name + ext).concat(files);
	}
	const stylePath = files.map(file => path.join(resource.dir, file)).find(fs.existsSync);

	if (stylePath) {
		this.addDependency(stylePath);
		return `require('${stylePath}');\n${content}`;
	}
	return content;
}
