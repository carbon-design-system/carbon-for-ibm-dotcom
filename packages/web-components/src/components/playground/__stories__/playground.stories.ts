/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select, text } from '@storybook/addon-knobs';
import styles from './playground.stories.scss';

const savedOne = localStorage.getItem('savedComponent') ? localStorage.getItem('savedComponent') : 'Background media';

const specContext = require.context('../../', true, /\.stories\.ts$/);

const storyModules = specContext.keys().map(specContext);

const componentList = [] as any;
const componentStories = {};

storyModules.forEach(e => {
  const title = (e as any)?.default?.title || '';

  if (!title || title.includes('Dotcom shell')) return;
  componentList.push(title.split('/')[1]);
  componentStories[title.split('/')[1]] = e;
});

export const Default = ({ parameters }) => {
  const { component, enableToC, enableGridClasses, optionalClasses, horizontalToC } = parameters?.props?.Playground ?? {};
  const currentStory = componentStories[component];

  localStorage.setItem('savedComponent', component);

  const storyParameters = currentStory?.default?.parameters;

  // setting default props from propSet
  if (!storyParameters?.props) {
    storyParameters.props = storyParameters?.propsSet?.default || {};
  }

  const storyArray = [] as any;

  // setting up Story array to render all
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(currentStory)) {
    if (value instanceof Function) {
      const defaultObject = (value as any).story?.parameters?.propsSet?.default;
      const defaultPropsKey = defaultObject && Object.keys(defaultObject)[0];

      // ensure variant story props save to its own key
      if (defaultPropsKey && (value as any).story) {
        storyParameters.props[defaultPropsKey] = (value as any).story?.parameters?.propsSet.default[defaultPropsKey];
      }

      // set props from current variant propSet if default props aren't defined
      if (storyParameters?.props) {
        storyParameters.props[key] = (value as any).story?.parameters?.propsSet.default[key];
      }

      storyArray.push(value);
    }
  }

  const returnStory = storyArray.map(story => {
    const variationTitle = story?.story?.name || Object.keys(story?.story?.parameters?.knobs || {})[0];
    return html`
      ${variationTitle || 'Default'}
      ${story({
        parameters: {
          props: storyParameters.props,
        },
      })}
    `;
  });

  return html`
    ${enableToC
      ? html`
          <dds-table-of-contents toc-layout=${horizontalToC ? 'horizontal' : ''}>
            <a name="1" data-title="${component}"></a>

            <div class="${enableGridClasses ? `bx--grid` : ``}">
              <div class="${enableGridClasses ? `bx--row` : ``}">
                <div class="${enableGridClasses && optionalClasses ? optionalClasses : ``}">
                  ${returnStory}
                </div>
              </div>
            </div>
          </dds-table-of-contents>
        `
      : html`
          <div class="${enableGridClasses ? `bx--grid` : ``}">
            <div class="${enableGridClasses ? `bx--row` : ``}">
              <div class="${enableGridClasses && optionalClasses ? optionalClasses : ``}">
                ${returnStory}
              </div>
            </div>
          </div>
        `}
  `;
};

export default {
  title: 'Components/Playground',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <dds-dotcom-shell-container>
        ${story()}
      </dds-dotcom-shell-container>
    `,
  ],
  parameters: {
    hasStoryPadding: true,
    knobs: {
      Playground: ({ groupId }) => ({
        component: select('Component:', componentList, savedOne, groupId),
        enableToC: boolean('Enable ToC:', false, groupId),
        horizontalToC: boolean('ToC Horizontal:', false, groupId),
        enableGridClasses: boolean('Enable grid classes:', true, groupId),
        optionalClasses: text('Optional grid classes:', '', groupId),
      }),
    },
  },
};
