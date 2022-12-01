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
// @ts-ignore
import DDSLocaleModalContainer from '@carbon/ibmdotcom-web-components/es/components-react/locale-modal/locale-modal-container.js';
import ifNonNull from '@carbon/carbon-web-components/es/globals/directives/if-non-null.js';
import localeData from './locale-data.json';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import styles from './locale-modal.stories.scss';

export const Default = (args) => {
  const { langDisplay } = args?.LocaleModalComposite;
  return (
    <DDSLocaleModalContainer
      lang-display={ifNonNull(langDisplay)}
      open
      localeList={localeData}
    ></DDSLocaleModalContainer>
  );
};

export default {
  title: 'Components/Locale modal',
  decorators: [
    (story) => {
      return (
        <>
          <style>{styles.cssText}</style>
          {story()}
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LocaleModalComposite: () => ({
        langDisplay: textNullable(
          'Display language (lang-display)',
          'United States — English'
        ),
      }),
    },
    propsSet: {
      default: {
        LocaleModalComposite: {
          langDisplay: 'United States — English',
          localList: localeData,
        },
      },
    },
  },
};
