/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// For generating coverage report for untested files
import ReactDOM from "react-dom";

const { default: merge } = require('lodash-es/merge');
// const ReactDOM = require('react-dom');
// const React = require('react');
import { html, render } from 'lit-html';

// const srcContext = require.context('../src/components', true, /^(?!.*story(-(angular|react|vue))?).*\.ts$/);
// srcContext.keys().forEach(srcContext);
//
// const specContext = require.context('../src/components', true, /\.test\.ts$/);
// specContext.keys().forEach(specContext);

const srcContext2 = require.context('../src/components', true, /\.stories\.ts$/);

const storyModules = srcContext2.keys().map(srcContext2);


describe('Test a11y compliance', function() {
  const container = document.getElementById('html-fragment-container');

  storyModules
    .filter(
      storyModule =>
        !storyModule.default?.parameters?.['karma-accessibility-checker']
          ?.disabled
    )
    .forEach(storyModule => {
      console.log("parameters",storyModule.default?.parameters,storyModule.default?.parameters.knobs)
      console.log("stories", storyModule.Default(storyModule.default?.parameters), storyModule.default)
      const {title: groupTitle} = storyModule.default ?? {};
      console.log(groupTitle)


    });
});
