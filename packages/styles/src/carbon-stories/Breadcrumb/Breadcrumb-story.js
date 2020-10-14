/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton } from 'carbon-components-react';

const props = () => ({
  className: 'some-class',
  noTrailingSlash: boolean('No trailing slash (noTrailingSlash)', false),
  onClick: action('onClick'),
});

export default {
  title: 'Breadcrumb',
  decorators: [withKnobs],
};

export const Default = () => (
  <Breadcrumb {...props()}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
  </Breadcrumb>
);

Default.story = {
  name: 'default',

  parameters: {
    info: {
      text: `
        Breadcrumb enables users to quickly see their location within a path of navigation and move up to a parent level if desired.
      `,
    },
  },
};

export const CurrentPage = () => (
  <Breadcrumb {...props()} noTrailingSlash>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#" isCurrentPage>
      Breadcrumb 3
    </BreadcrumbItem>
  </Breadcrumb>
);

CurrentPage.story = {
  name: 'current page',

  parameters: {
    info: {
      text:
        'You can specify a BreadcrumbItem component as the current page with the `isCurrentPage` prop',
    },
  },
};

export const CurrentPageWithAriaCurrent = () => (
  <Breadcrumb {...props()} noTrailingSlash>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#" aria-current="page">
      Breadcrumb 3
    </BreadcrumbItem>
  </Breadcrumb>
);

CurrentPageWithAriaCurrent.story = {
  name: 'current page with aria-current',

  parameters: {
    info: {
      text:
        'You can specify a BreadcrumbItem component as the current page with the `aria-current` prop by specifying `aria-current="page"`',
    },
  },
};
