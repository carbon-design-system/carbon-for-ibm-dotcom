/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import requireContext from 'require-context.macro';
import addons from '@storybook/addons';
import coreEvents from '@storybook/core-events';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { CURRENT_THEME } from '@carbon/storybook-addon-theme/es/shared';
import theme from './theme';
import Container from './Container';

const SORT_ORDER_GROUP = ['Overview', 'Components'];

const SORT_ORDER = [
  'overview-getting-started--page',
  'overview-building-for-ibm-dot-com--page',
  'overview-environment-variables--page',
  'overview-feature-flags--page',
  'overview-enable-right-to-left-rtl--page',
  'overview-contributing-to-the-react-package--page',
  'overview-breaking-changes--page',
];

addParameters({
  options: {
    name: `Carbon for IBM.com React`,
    url: 'https://github.com/carbon-design-system/carbon-for-ibm-dotcom',
    storySort(lhs, rhs) {
      const [lhsId, lhsMeta] = lhs;
      const [rhsId, rhsMeta] = rhs;
      const lhsSortOrder = SORT_ORDER.indexOf(lhsId);
      const rhsSortOrder = SORT_ORDER.indexOf(rhsId);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      const { kind: lhsKind } = lhsMeta;
      const { kind: rhsKind } = rhsMeta;
      const lhsGroup = lhsKind.split('|')[0];
      const rhsGroup = rhsKind.split('|')[0];
      const lhsGroupSortOrder = SORT_ORDER_GROUP.indexOf(lhsGroup);
      const rhsGroupSortOrder = SORT_ORDER_GROUP.indexOf(rhsGroup);
      if (lhsGroupSortOrder >= 0 && rhsGroupSortOrder >= 0) {
        return lhsGroupSortOrder - rhsGroupSortOrder;
      }
      return 0;
    },
    theme,
  },
});

addDecorator(withKnobs);

addDecorator((story, { parameters }) => {
  const { knobs, propsSet } = parameters;
  const { default: defaultProps } = propsSet ?? {};
  if (Object(defaultProps) === defaultProps) {
    if (!parameters.props) {
      parameters.props = {};
    }
    Object.keys(defaultProps).forEach(name => {
      Object.assign(
        (parameters.props[name] = parameters.props[name] || {}),
        defaultProps[name] ?? {}
      );
    });
  }
  if (Object(knobs) === knobs) {
    if (!parameters.props) {
      parameters.props = {};
    }
    Object.keys(knobs).forEach(name => {
      if (typeof knobs[name] === 'function') {
        parameters.props[name] = knobs[name]({ groupId: name });
      }
    });
  }
  return story();
});

let preservedTheme;

addDecorator((story, { parameters }) => {
  const root = document.documentElement;
  if (parameters['carbon-theme']?.disabled) {
    root.setAttribute('storybook-carbon-theme', '');
  } else {
    root.setAttribute('storybook-carbon-theme', preservedTheme || '');
  }
  return story();
});

addDecorator((story, { parameters }) => (
  <Container story={story} parameters={parameters} />
));

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute(
    'storybook-carbon-theme',
    (preservedTheme = theme)
  );
  addons.getChannel().emit(coreEvents.FORCE_RE_RENDER);
});

const reqDocs = requireContext('../docs', true, /\.stories\.mdx$/);
configure(reqDocs, module);

const reqComponents = requireContext('../src', true, /\.stories\.js$/);
configure(reqComponents, module);
