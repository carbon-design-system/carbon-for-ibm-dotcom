/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import { number } from '@storybook/addon-knobs';
import DDSCardGroup from '../card-group';
import { Default, withCTA, withImages, withImagesAndCTA, defaultCardGroupItem } from '../__stories__/card-group.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        CardGroup: props,
      },
    },
  });

const templateWithCTA = (props?) =>
  withCTA({
    parameters: {
      props: {
        CardGroup: props,
      },
    },
  });

const templateWithImages = (props?) =>
  withImages({
    parameters: {
      props: {
        CardGroup: props,
      },
    },
  });

const templateWithImagesAndCTA = (props?) =>
  withImagesAndCTA({
    parameters: {
      props: {
        CardGroup: props,
      },
    },
  });

describe('dds-card-group', function() {
  it('Renders Default', async function() {
    render(
      template({
        cards: Array.from({
          length: number('Number of cards', 5),
        }).map(() => defaultCardGroupItem()),
      }),
      document.body
    );
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

  it('Tests the get methods', function() {
    expect((DDSCardGroup as typeof DDSCardGroup).cardGroupItemSelector).toBe('dds-card-group-item');
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
