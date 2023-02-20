/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { boolean, text } from '@storybook/addon-knobs';
import inPercy from '@percy-io/in-percy';
import DDSLeavingIbmComposite from '../../../components-react/leaving-ibm/leaving-ibm-composite';
import DDSLeavingIbmContainer, { store } from '../../../components-react/leaving-ibm/leaving-ibm-container';
import readme from './README.stories.react.mdx';

export const Default = ({ parameters }) => {
  const { href, leavingIbmButtonLabel, leavingIbmCopy, open } = parameters?.props?.LeavingIbmComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return useMock ? (
    <DDSLeavingIbmComposite
      href={href}
      leavingIbmButtonLabel={leavingIbmButtonLabel}
      leavingIbmCopy={leavingIbmCopy}
      open={open}
    />
  ) : (
    <DDSLeavingIbmContainer href={href} open={open} />
  );
};

export default {
  title: 'Components/Leaving IBM',
  parameters: {
    ...readme.parameters,
    decorators: [story => <Provider store={store}>{story()}</Provider>],
    knobs: {
      LeavingIbmComposite: ({ groupId }) => ({
        open: boolean('open (open)', true, groupId),
        href: text('href (href)', 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/', groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        LeavingIbmComposite: {
          leavingIbmButtonLabel: 'Continue',
          leavingIbmCopy: {
            LEAVING001: 'Leaving the IBM Web site',
            LEAVING002: `
              You are now leaving IBM.com and going to an external 3rd party site.
              Unless otherwise stated, the 3rd party's site Terms and Privacy Policy will apply, and may differ from IBM's.
            `,
            LEAVING003: 'The link you requested or were directed to is',
          },
        },
        Other: {
          useMock,
        },
      };
    })(),
  },
};
