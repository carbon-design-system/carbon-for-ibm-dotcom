/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from '../../patterns/sub-patterns/Card';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * Card subcomponent for CTA
 *
 * @param {object} params param object
 * @param {object} params.otherProps other props
 * @param {string} params.target target type
 * @param {Element} params.icon icon element
 *
 * @returns {object} JSX object
 */
const CardCTA = ({
  iconSelector,
  external,
  jump,
  type,
  openLightBox,
  setLightBox,
  renderLightBox,
  launchLightBox,
  videoTitle,
  ...otherProps
}) => {
  return type === 'video' ? (
    <div>
      {launchLightBox(renderLightBox, openLightBox, otherProps.media)}
      {!renderLightBox && (
        <Card
          customClassName={`${prefix}--card__CTA`}
          cta={{
            href: '#',
            icon: {
              src: iconSelector(type),
            },
          }}
          copy={videoTitle[0].title}
          type="link"
          handleClick={e => setLightBox(e, openLightBox)}
        />
      )}
    </div>
  ) : (
    <Card
      customClassName={`${prefix}--card__CTA`}
      cta={{
        href: otherProps.cta.href,
        icon: {
          src: iconSelector(type),
        },
      }}
      copy={otherProps.copy}
      type="link"
      target={external(type)}
      handleClick={e => jump(e, type)}
      role="region"
    />
  );
};

CardCTA.propTypes = {
  iconSelector: PropTypes.func,
  external: PropTypes.func,
  jump: PropTypes.func,
  type: PropTypes.string,
  openLightBox: PropTypes.func,
  setLightBox: PropTypes.func,
  renderLightBox: PropTypes.bool,
  launchLightBox: PropTypes.func,
  videoTitle: PropTypes.array,
};

export default CardCTA;
