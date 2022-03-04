var React = craftercms.libs.React && Object.prototype.hasOwnProperty.call(craftercms.libs.React, 'default') ? craftercms.libs.React['default'] : craftercms.libs.React;

/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function App() {
  return /*#__PURE__*/React.createElement("h1", null, "this is a test");
}

var plugin = {
  id: 'org.craftercms.plugin',
  name: 'Translate Plugin',
  description: 'A plugin to do translations',
  author: 'CrafterCMS',
  logo: null,
  locales: {},
  apps: [],
  widgets: {
    'org.craftercms.translatePlugin.components.reactComponent': App
  },
  scripts: [],
  stylesheets: [],
  themes: []
};

export { App, plugin as default };
