/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ButtonCTA from '../ButtonCTA';
import CardCTA from '../CardCTA';
import CTALogic from '../CTALogic';
import FeatureCTA from '../FeatureCTA';
import { mount } from 'enzyme';
import React from 'react';
import TextCTA from '../TextCTA';

describe('CTA', () => {
  beforeAll(() => {
    const div = document.createElement('div');
    div.innerHTML = `<div id="test"></test>`;
    window.domNode = div;
    document.body.appendChild(div);
  });

  it('Renders TextCTA | type jump', () => {
    jest.spyOn(CTALogic, 'jump');
    const cta = mount(<TextCTA type="jump" href="#test" copy="Lorem Ipsum" />);
    cta.find('a').simulate('click');
    expect(CTALogic.jump).toHaveBeenCalled();
  });

  it('Renders TextCTA | type video', () => {
    jest.spyOn(CTALogic, 'setLightBox');
    const cta = mount(
      <TextCTA type="video" href="#" videoTitle={[{ title: 'Lorem Ipsum' }]} />
    );
    cta.find('a').simulate('click');
    expect(CTALogic.setLightBox).toHaveBeenCalled();
  });

  it('Renders FeatureCTA | type video', () => {
    jest.spyOn(CTALogic, 'setLightBox');
    jest.spyOn(CTALogic, 'launchLightBox');
    const cta = mount(
      <FeatureCTA
        card={{
          cta: {
            icon: {
              src: '',
            },
            media: {
              src: '0_uka1msg4',
              type: 'video',
            },
          },
        }}
        type="video"
        renderLightBox={false}
        heading="lorem ipsum"
        videoTitle={[{ title: 'Lorem Ipsum' }]}
      />
    );
    cta.find('a').simulate('click');
    expect(CTALogic.launchLightBox).toHaveBeenCalled();
  });

  it('Renders CardCTA | type video', () => {
    jest.spyOn(CTALogic, 'setLightBox');
    jest.spyOn(CTALogic, 'launchLightBox');
    const cta = mount(
      <CardCTA type="video" videoTitle={[{ title: 'Lorem Ipsum' }]} />
    );
    expect(CTALogic.launchLightBox).toHaveBeenCalled();
    cta.find('a').simulate('click');
    expect(CTALogic.setLightBox).toHaveBeenCalled();
  });

  it('Renders CardCTA | type jump', () => {
    jest.spyOn(CTALogic, 'jump');
    const cta = mount(
      <CardCTA
        type="jump"
        cta={{
          href: '#test',
        }}
      />
    );
    cta.find('a').simulate('click');
    expect(CTALogic.jump).toHaveBeenCalled();
  });

  it('Renders ButtonCTA | type video', () => {
    jest.spyOn(CTALogic, 'setLightBox');
    const cta = mount(
      <ButtonCTA
        buttons={[
          {
            type: 'video',
            href: 'https://www.example.com',
            copy: 'Lorem Ipsum',
            media: {
              src: '0_uka1msg4',
              type: 'video',
            },
          },
        ]}
        type="video"
        videoTitle={[{ title: 'Lorem Ipsum' }]}
      />
    );
    cta.find('a').simulate('click');
    expect(CTALogic.setLightBox).toHaveBeenCalled();
  });

  it('Renders ButtonCTA | type jump', () => {
    jest.spyOn(CTALogic, 'jump');
    const cta = mount(
      <ButtonCTA
        buttons={[
          {
            type: 'jump',
            href: '#test',
            copy: 'Lorem Ipsum',
          },
        ]}
        type="jump"
      />
    );
    cta.find('a').simulate('click');
    expect(CTALogic.jump).toHaveBeenCalled();
  });

  it('Renders ButtonCTA | type external', () => {
    const cta = mount(
      <ButtonCTA
        buttons={[
          {
            type: 'external',
            href: 'https://www.example.com',
            copy: 'Lorem Ipsum',
          },
        ]}
        type="external"
      />
    );
    expect(cta.find('svg[aria-label="external launch icon"]')).toHaveLength(1);
  });

  it('Tests CTALogic', () => {
    expect(
      CTALogic.getVideoId('feature', {
        card: {
          cta: {
            media: {
              src: 'https://example.com',
            },
          },
        },
      })
    ).toEqual([{ src: 'https://example.com' }]);

    expect(
      CTALogic.getVideoId('button', {
        buttons: [
          {
            type: 'video',
            media: {
              src: 'test',
            },
          },
        ],
      })
    ).toEqual([{ src: 'test', key: 0 }]);

    expect(CTALogic.getVideoId('invalid', {})).toEqual([]);
  });
});
