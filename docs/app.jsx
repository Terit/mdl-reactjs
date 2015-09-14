"use strict";

var React = require('react');
var Router = require('react-router');
var MDL = require('../components/');
var Link = Router.Link;
var _ = require('lodash');

// Views
var Views = require('./views');

var navRoutes = [
	{ name: "home", 		to: "/", 			text: "Home", 				icon: "domain", 				view: Views.Start },
	{ name: "badges", 		to: "/badges", 		text: "Badges", 			icon: "chat_bubble", 			view: Views.Badges },
	{ name: "buttons", 		to: "/buttons", 	text: "Buttons", 			icon: "chevron_right", 			view: Views.Buttons },
	{ name: "cards", 		to: "/cards", 		text: "Cards (partial)", 	icon: "web", 					view: Views.Cards },
	{ name: "layout", 		to: "/layout", 		text: "Layout (partial)", 	icon: "view_quilt", 			view: Views.Layout },
	{ name: "loading", 		to: "/loading", 	text: "Loading (partial)", 	icon: "replay", 				view: Views.Loading },
	{ name: "menus", 		to: "/menus", 		text: "Menus (partial)", 	icon: "format_align_justify", 	view: Views.Menus },
	{ name: "sliders", 		to: "/sliders", 	text: "Sliders (partial)", 	icon: "tune", 					view: Views.Sliders },
	{ name: "toggles", 		to: "/toggles", 	text: "Toggles (partial)", 	icon: "exposure", 				view: Views.Toggles },
	{ name: "tables", 			to: "/tables", 			text: "Tables (todo)", 		icon: "view_list", view: Views.Tables },
	{ name: "textfields", 	to: "/textfields", 	text: "Text fields (partial)", icon: "font_download", 			view: Views.Textfields },
	{ name: "", 			to: "/", 			text: "Tooltips (todo)", 	icon: "beenhere" },
];

var App = React.createClass({
	getNav: function () {
		return (<MDL.Navigation id="docs-navigation">
			{navRoutes.map(function (item, i) {
	    	return (
					<Link className="mdl-navigation__link" to={item.to} key={i}>
						<MDL.Button icon={item.icon} colored fab style={{marginRight: 10}} size="mini" /> {item.text}
					</Link>
	    	);
			})}
		</MDL.Navigation>);
	},

	render : function() {
		return (
			<MDL.Layout isFixedDrawer={true} className="docs-layout">
				<MDL.LayoutHeader>
					<MDL.LayoutHeaderRow>
						<MDL.LayoutTitle>
							Material Design Lite components for ReactJS
						</MDL.LayoutTitle>
					</MDL.LayoutHeaderRow>
				</MDL.LayoutHeader>
				<MDL.LayoutDrawer>
					<MDL.LayoutTitle>MDL-REACTJS</MDL.LayoutTitle>
					{this.getNav()}
				</MDL.LayoutDrawer>
				<MDL.LayoutContent>
					<Router.RouteHandler />
				</MDL.LayoutContent>
			</MDL.Layout>
		);
	},
});


var routes = (
	<Router.Route handler={App} >
		<Router.DefaultRoute key="default" name={navRoutes[0].name} handler={navRoutes[0].view} />
		{_.map(navRoutes, function (route) {
			if (route.to.length > 1) {
				return <Router.Route key={route.name} name={route.name} path={route.to} handler={route.view} />
			}
		})}
	</Router.Route>
);

Router.create({
	routes: routes,
	location: Router.HashLocation,
}).run(function (Handler) {
	React.render(
		<div className="wrapper">
			<Handler />
		</div>,
		document.body
	);
});
