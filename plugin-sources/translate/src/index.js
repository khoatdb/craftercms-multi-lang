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
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App';
import { render } from 'react-dom';
import { createElement } from 'react';

var plugin /*: PluginDescriptor */ = {
  id: 'org.craftercms.translatePlugin',
  name: 'Translate Plugin',
  description: 'A plugin to copy selected items by copying them to an other locale location',
  author: 'CrafterCMS',
  logo: null,
  locales: {
      en: en,
      es: es
  },
  apps: [
      {
          route: '/yada-yada',
          widget: { id: 'org.craftercms.translatePlugin.components.reactComponent' }
      }
  ],
  widgets: {
      'org.craftercms.translatePlugin.components.reactComponent': App,
  },
  scripts: [
  ],
  stylesheets: [],
  themes: []
};

export default plugin;
export { App };
