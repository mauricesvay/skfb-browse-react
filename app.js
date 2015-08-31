import React from 'react';
import Router from 'react-router';
import routes from './js/config/routes';

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.querySelector('.app'));
});
