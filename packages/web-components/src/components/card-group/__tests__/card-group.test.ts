/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../card-group';
import { Default, withCTA, withImages, withImagesAndCTA } from '../__stories__/card-group.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        'dds-card-group': props,
      },
    },
  });

const templateWithCTA = (props?) =>
  withCTA({
    parameters: {
      props: {
        'dds-card-group': props,
      },
    },
  });

const templateWithImages = (props?) =>
  withImages({
    parameters: {
      props: {
        'dds-card-group': props,
      },
    },
  });

const templateWithImagesAndCTA = (props?) =>
  withImagesAndCTA({
    parameters: {
      props: {
        'dds-card-group': props,
      },
    },
  });

describe('dds-card-group', function() {
  it('Renders Default', async function() {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-card-group')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('Renders with CTA', async function() {
    render(templateWithCTA(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-card-group')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('Renders with Images', async function() {
    render(templateWithImages(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-card-group')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('Renders with Images and CTA', async function() {
    render(templateWithImagesAndCTA(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-card-group')).toMatchSnapshot({ mode: 'shadow' });
  });

  // it('Tests the get methods', function() {
  //   expect((DDS as typeof DDSLinkList).stableSelector).toBe('dds--link-list');
  //   expect((DDSLinkList as typeof DDSLinkList).splitLayoutClass).toBe('bx--link-list__split');
  //   expect((DDSLinkList as typeof DDSLinkList).linkListItemSelector).toBe('dds-link-list-item');
  // });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
