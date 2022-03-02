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

/**
 * A plugin to copy selected items by copying them to an other locale location
 * This plugin add a button next to active content actions bar of Crafter 3.1.x
 * This is possible by adding an `ul` element and append next to 'activeContentActions'
 */
CStudioAuthoring.Module.moduleLoaded('translate', {
  initialize(config) {
    if (config && config.params) {
      switch (config.params.widget) {
        case 'popup':
          const elm = document.createElement('ul');
          elm.setAttribute('id', 'translate-popup');
          elm.setAttribute('class', 'nav navbar-nav');

          const activeActNode = document.getElementById('activeContentActions');
          activeActNode.parentNode.insertBefore(elm, activeActNode.nextElementSibling);
          render(createElement(App), elm);
          break;
        default:
          console.error('No widget supplied on the config. Skipping initialize request.');
      }
    } else {
      console.error('No config supplied to the sidebar plugin. Skipping initialize request.');
    }
  }
});
