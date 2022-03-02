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

import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commit from 'rollup-plugin-commit';
import copy from 'rollup-plugin-copy';
import {terser} from 'rollup-plugin-terser';

const plugins = [
  replace({ 'process.env.NODE_ENV': '"production"' }),
  babel({
    exclude: 'node_modules/**',
    presets: [
      '@babel/preset-env',
      [ '@babel/preset-react', {
        'runtime': 'automatic'
      }]
    ],
    plugins: [
      'babel-plugin-transform-react-remove-prop-types',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining'
    ]
  }),
  resolve(),
  commonjs({
    include: /node_modules/,
    namedExports: {
      'react-is': ['isValidElementType', 'ForwardRef', 'Memo', 'isFragment'],
      'prop-types': ['elementType'],
      'react/jsx-runtime': ['jsx', 'jsxs', 'Fragment'],
      'react/jsx-dev-runtime': ['jsx', 'jsxs', 'jsxDEV']
    }
  }),
  terser({
    ecma: 2020,
    module: true,
    warnings: true,
  }),
  copy({
    targets: [{ src: 'build/*', dest: '../../config/studio/plugins/context-nav/translate' }],
    hook: 'writeBundle'
  }),
  // commit({
  //   targets: [
  //     '../../config/studio/plugins/context-nav/translate/index.js'
  //   ]
  // })
];

const external = [
  'rxjs',
  'rxjs/operators',
  'react',
  'react-dom',
  'CrafterCMSNext',
  '@craftercms/studio'
];

const globals = {
  'rxjs': 'window.CrafterCMSNext.rxjs',
  'rxjs/operators': 'window.CrafterCMSNext.rxjs.operators',
  'react': 'window.CrafterCMSNext.React',
  'react-dom': 'window.CrafterCMSNext.ReactDOM',
  'CrafterCMSNext': 'window.CrafterCMSNext',
  '@craftercms/studio': 'window.CrafterCMSNext'
};

export default [
  {
    input: 'src/index.js',
    external,
    output: {
      sourcemap: 'inline',
      name: 'studioPluginTranslateItem',
      file: 'build/index.js',
      format: 'iife',
      globals
    },
    plugins
  }
];
