/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable max-len */
// @ts-ignore
import DDSSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
/* eslint-enable max-len */
import readme from './README.stories.react.mdx';
import styles from '../../carousel/__stories__/carousel.stories.scss';

export const Default = () => {
  return <DDSSearchWithTypeahead></DDSSearchWithTypeahead>;
};

export const Alternate = () => {
  return <DDSSearchWithTypeahead leadspace-search></DDSSearchWithTypeahead>;
};

Default.story = {};

export default {
  title: 'Components/Search with typeahead',
  decorators: [
    story => {
      return (
        <>
          <style>{styles.cssText}</style>
          <div className="bx--grid">
            <div className="bx--row">{story()}</div>
          </div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
  },
};
