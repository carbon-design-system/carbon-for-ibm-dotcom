/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';

// For generating coverage report for untested files
const { default: merge } = require('lodash-es/merge');

const specContext = require.context(
  '../../src/components',
  true,
  /\.stories\.ts$/
);

const storyModules = specContext.keys().map(specContext);

describe('Test a11y compliance', () => {
  const container = document.getElementById('html-fragment-container');

  storyModules
    .filter(
      (storyModule) =>
        !storyModule.default?.parameters?.['karma-accessibility-checker']
          ?.disabled
    )
    .forEach((storyModule) => {
      const { title: groupTitle } = storyModule.default ?? {};
      Object.keys(storyModule)
        .filter((name) => {
          const Story = storyModule[name];
          return (
            typeof Story === 'function' &&
            !Story.story?.parameters?.['karma-accessibility-checker']?.disabled
          );
        })
        .forEach((name) => {
          const Story = storyModule[name];
          const { parameters, title = name } = Story.story ?? {};
          const propsSet = merge(
            {},
            storyModule.default?.parameters?.propsSet,
            parameters?.propsSet
          );

          const keys = Object.keys(propsSet);

          if (keys.length > 0) {
            keys.forEach((itemTitle) => {
              const combinedTitle =
                itemTitle === 'default'
                  ? `${groupTitle}|${title}`
                  : `${groupTitle}|${title}|${itemTitle}`;
              it(`Should have a11y-compliant ${combinedTitle}`, async () => {
                render(Story(propsSet?.default), container);
                await expectAsync(container).toBeACheckerCompliant();
              }, 30000);
            });
          } else {
            it(`Should have a11y-compliant ${groupTitle}|${title}`, async () => {
              render(Story(), container);
            }, 30000);
          }
        });
    });

  afterEach(() => {
    render(undefined, container);
  });
});
