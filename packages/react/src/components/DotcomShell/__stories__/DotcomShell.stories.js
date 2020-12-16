/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-styles/scss/internal/scroll-into-view/_scroll-into-view.scss';
import './dotcom-shell.stories.scss';
import { boolean, select, object } from '@storybook/addon-knobs';
import Content from './data/content';
import DotcomShell from '../DotcomShell';
import { Micro as footerMicroStory } from '../../Footer/__stories__/Footer.stories.js';
import { Default as footerStory } from '../../Footer/__stories__/Footer.stories.js';
import { WithL1 as l1Story } from '../../Masthead/__stories__/Masthead.stories.js';
import languageItems from '../../Footer/__data__/language-items.json';
import { Default as mastheadStory } from '../../Masthead/__stories__/Masthead.stories.js';
import React from 'react';
import readme from '../README.stories.mdx';
import scrollIntoView from '@carbon/ibmdotcom-utilities/es/utilities/scrollIntoView/scrollIntoView';

const footerTypeOptions = {
  tall: 'tall',
  short: 'short',
  micro: 'micro',
};

const delayOptions = {
  None: 'dds-devenv--scroll-into-view--delay-default',
  '250ms': 'dds-devenv--scroll-into-view--delay-quarter-second',
  '500ms': 'dds-devenv--scroll-into-view--delay-half-second',
  '1s': 'dds-devenv--scroll-into-view--delay-one-second',
};

let lastDelay = 'dds-devenv--scroll-into-view--delay-default';

export default {
  title: 'Components|Dotcom Shell',

  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
    knobs: {
      escapeHTML: false,
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
            type: select(
              'Footer (footerProps): sets the type of footer (type)',
              footerTypeOptions,
              footerTypeOptions.tall,
              'Footer'
            ),
          },
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { mastheadProps, footerProps } = parameters?.props?.DotcomShell ?? {};
  return (
    <DotcomShell mastheadProps={mastheadProps} footerProps={footerProps}>
      <main id="main-content">
        <div style={{ paddingTop: '6rem' }}>
          <Content />
        </div>
      </main>
    </DotcomShell>
  );
};

export const DefaultLanguageOnly = ({ parameters }) => (
  <Default parameters={parameters} />
);

DefaultLanguageOnly.story = {
  name: 'Default (footer language only)',
  parameters: {
    knobs: {
      escapeHTML: false,
      DotcomShell: ({ groupId }) => {
        const languageOnly = true;
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
            languageOnly,
            languageItems: !languageOnly
              ? undefined
              : object(
                  'language dropdown items (languageItems)',
                  languageItems,
                  groupId
                ),
            languageInitialItem: { id: 'en', text: 'English' },
          },
        };
      },
    },
  },
};

export const SearchOpenByDefault = ({ parameters }) => (
  <Default parameters={parameters} />
);

SearchOpenByDefault.story = {
  name: 'Search open',
  parameters: {
    knobs: {
      escapeHTML: false,
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: {
            ...mastheadKnobs({ groupId: 'Masthead' }),
            searchOpenOnload: true,
          },
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
          },
        };
      },
    },
  },
};

export const WithPlatform = ({ parameters }) => (
  <Default parameters={parameters} />
);

WithPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      escapeHTML: false,
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: {
            ...mastheadKnobs({ groupId: 'Masthead' }),
            platform: {
              name: 'IBM Cloud',
              url: 'https://www.ibm.com/cloud',
            },
          },
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
          },
        };
      },
    },
  },
};

export const ShortFooter = ({ parameters }) => (
  <Default parameters={parameters} />
);

ShortFooter.story = {
  name: 'With short footer',
  parameters: {
    knobs: {
      escapeHTML: false,
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
            type: 'short',
          },
        };
      },
    },
  },
};

export const ShortFooterLanguageOnly = ({ parameters }) => (
  <Default parameters={parameters} />
);

ShortFooterLanguageOnly.story = {
  name: 'With short footer (language only)',
  parameters: {
    knobs: {
      escapeHTML: false,
      DotcomShell: ({ groupId }) => {
        const languageOnly = true;
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
            type: 'short',
            languageOnly,
            languageItems: !languageOnly
              ? undefined
              : object(
                  'language dropdown items (languageItems)',
                  languageItems,
                  groupId
                ),
            languageInitialItem: { id: 'en', text: 'English' },
          },
        };
      },
    },
  },
};

export const MicroFooter = ({ parameters }) => (
  <Default parameters={parameters} />
);

MicroFooter.story = {
  name: 'With micro footer',
  parameters: {
    knobs: {
      escapeHTML: false,
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerMicroStory.story.parameters.knobs;
        return {
          mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
            type: 'micro',
          },
        };
      },
    },
  },
};

export const MicroFooterLanguageOnly = ({ parameters }) => (
  <Default parameters={parameters} />
);

MicroFooterLanguageOnly.story = {
  name: 'With micro footer (language only)',
  parameters: {
    knobs: {
      escapeHTML: false,
      DotcomShell: ({ groupId }) => {
        const languageOnly = true;
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerMicroStory.story.parameters.knobs;
        return {
          mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
            type: 'micro',
            languageOnly,
            languageItems: !languageOnly
              ? undefined
              : object(
                  'language dropdown items (languageItems)',
                  languageItems,
                  groupId
                ),
            languageInitialItem: { id: 'en', text: 'English' },
          },
        };
      },
    },
  },
};

export const WithL1 = ({ parameters }) => <Default parameters={parameters} />;

WithL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      escapeHTML: false,
      DotcomShell: () => {
        const { Masthead: mastheadKnobs } = l1Story.story.parameters.knobs;
        return {
          mastheadProps: {
            ...mastheadKnobs({ groupId: 'Masthead' }),
          },
        };
      },
    },
  },
};

export const WithFadeAnimations = ({ parameters }) => {
  let { delay, iterations } = parameters?.props?.DotcomShell ?? {};

  scrollIntoView('.bx--content-block', { iterations });
  document.querySelectorAll('.bx--content-block').forEach(e => {
    e.classList.remove(lastDelay);
    e.classList.add(delay);
  });
  lastDelay = delay;
  return <Default parameters={parameters} />;
};

WithFadeAnimations.story = {
  name: 'With Fade Animations',
  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
    knobs: {
      escapeHTML: false,
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          delay: select('Delay', delayOptions, delayOptions['None']),
          iterations: boolean('Iterations', true),
          mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
            type: select(
              'Footer (footerProps): sets the type of footer (type)',
              footerTypeOptions,
              footerTypeOptions.tall,
              'Footer'
            ),
          },
        };
      },
    },
  },
};
