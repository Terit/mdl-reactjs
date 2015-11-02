/** @jsx React.DOM */
var React = require("react"),
    cx = require('classnames'),
    _ = require('lodash');

var _defaultProps = {
	type: "text",
	floatingLabel: false,
	expandable: false,
	multiline: false,
	icon: "",
	label: "",
	error: "",
  onChange: null,
  autogrow: false,
  rows: 1,
  required: false,
  disabled: false
};

module.exports = React.createClass({
	displayName : 'MDL.Textfield',

	propTypes: {

	},

  getDefaultProps: function() {
		return _defaultProps;
	},

  _getClasses: function() {
		var classes = {
			'mdl-textfield': true,
			'mdl-js-textfield': true,
			'mdl-textfield--floating-label': this.props.floatingLabel,
			'mdl-textfield--expandable': this.props.expandable,
		};
		return cx(classes);
	},

  change: function (a,b,c) {
    if (this.props.onChange) {
      this.props.onChange(a,b,c);
    }
    if (this.props.multiline && this.props.autogrow) {
      var element = React.findDOMNode(this.refs.mdlTextfield);
      element.style.height = 'auto';
      element.style.height = element.scrollHeight+'px';
    }
  },

  _getElement: function() {
		var children = {};
		var tag = this.props.multiline ? 'textarea' : 'input';

		children =_.extend(children, { 'input': React.createElement(tag, {
			className : "mdl-textfield__input",
			defaultValue : this.props.defaultValue,
			value : this.props.value,
			id : this.props.id,
			name : this.props.id,
			rows : this.props.rows,
			type : this.props.type,
			pattern : this.props.pattern,
			disabled : this.props.disabled,
			onChange : this.change,
			ref: 'mdlTextfield',
			required: this.props.required
		}) });

		if (this.props.label.length > 0) {
			children =_.extend(children, { 'label': <label className="mdl-textfield__label" htmlFor={this.props.id}>{this.props.label}</label>});
		}

		if (this.props.error.length > 0) {
			children =_.extend(children, { 'error': <label className="mdl-textfield__error">{this.props.error}</label>});
		}

		if (this.props.expandable > 0) {
			children = {
				'icon': <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={this.props.id}><i className="material-icons">{this.props.icon}</i></label>,
				'holder': <div className="mdl-textfield__expandable-holder">{children}</div>
			};
		}

		return <div>{children}</div>
  },

  render: function () {
    var element = this._getElement();
		var newProps = __functions.joinProps(_defaultProps, this.props, element.props, this._getClasses());
    return React.cloneElement(element, newProps);
  },

  componentDidMount: function() {
		componentHandler.upgradeDom();
	}
});
