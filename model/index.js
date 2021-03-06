'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [{
		name: 'initName',
		message: 'What do you want to name your Model?',
		default: 'Data'
	}, {
		name: 'path',
		message: 'Where would you like to place your Model? root -> public/js/app/models/',
		default: ''
	}, {
		type: 'confirm',
		name: 'collection',
		message: 'Would you like to initialize a Collection with your Model?',
		default: true
	}];

	this.prompt(prompts, function (props) {
		this.initName = props.initName;
		this.collection = props.collection;
		this.path = props.path;
		if (this.path !== '') {
			this.path = this.path.replace(/\/?$/, '/');
		}

		cb();
	}.bind(this));
};

ModelGenerator.prototype.placeModel = function placeModel() {
	this.template('_Model.js', 'public/js/app/models/' + this.path + this.initName + 'Model.js');
};

ModelGenerator.prototype.placeCollection = function placeCollection() {
	if (this.collection) {
		this.template('_Collection.js', 'public/js/app/collections/' + this.path + this.initName + 'Collection.js');
	}
};
