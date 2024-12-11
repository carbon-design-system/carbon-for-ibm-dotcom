/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import React from 'react';

// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButton from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
import readme from './README.stories.react.mdx';
import { CTA_TYPE } from '../../cta/defs';

import {
  hrefsForType,
  knobNamesForType,
  typeOptions,
  types,
} from '../../cta/__stories__/ctaTypeConfig';

export const Default = (args) => {
  const { copy, customVideoTitle, ctaType, disabled, download, href } =
    args?.Button ?? {};

  let videoCopy;

  if (ctaType === CTA_TYPE.VIDEO) {
    const button = document.querySelector('cds-button') as any;
    const duration = button?.videoTitle?.match(/\((.*)\)/)?.pop();

    if (!customVideoTitle) {
      videoCopy = button?.videoTitle;
    } else {
      videoCopy = duration
        ? `${customVideoTitle} (${duration})`
        : customVideoTitle;
    }
  }

  return (
    <DDSVideoCTAContainer>
      <DDSButton
        disabled={disabled || undefined}
        href={href}
        download={download}
        cta-type={ctaType}>
        {videoCopy ?? copy}
      </DDSButton>
    </DDSVideoCTAContainer>
  );
};

Default.story = {
  parameters: {
    knobs: {
      Button: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );
        const copy =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Link text (unnamed slot)', 'Button text');
        const download = ![CTA_TYPE.DOWNLOAD, CTA_TYPE.PDF].includes(ctaType)
          ? undefined
          : textNullable(
              'Download target (download)',
              'IBM_Annual_Report_2019.pdf'
            );
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video title', 'Custom video title')
            : null;
        return {
          ctaType,
          copy,
          customVideoTitle,
          disabled: boolean('Disabled (disabled)', false),
          download,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
    },
  },
};

export default {
  title: 'Components/Button',
  decorators: [
    (story) => {
      return (
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-16 cds--col-md-6 cds--col-lg-16">
              {story()}
            </div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
