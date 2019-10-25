import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { ArrowRight20 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Card Link Component
 *
 * @param {object} props props object
 * @param {string} props.href card link link
 * @param {string} props.text card link text
 * @param {string} props.target card link target
 * @returns {*} CardLink component
 */
const CardLink = ({ link: { href, text, target } }) => {
  const [height, setHeight] = useState(0);
  const targetRef = useRef();

  /**
   * Set Height of DOM refrence
   *
   * @param {*} target React DOM Reference object
   */
  const setEleHeight = target => {
    setHeight(target.current.clientWidth / 2);
  };

  useLayoutEffect(() => {
    /**
     * Update height of DOM refrence in window resize
     *
     * @returns {function()} function add & remove event listener and set height
     */
    const handleResize = () => {
      window.addEventListener('resize', setEleHeight(targetRef));
      return () => {
        window.removeEventListener('resize', setEleHeight(targetRef));
      };
    };
    handleResize();
  }, []);

  return (
    <a
      data-autoid={`${stablePrefix}--cardlink`}
      className={`${prefix}--cardlink`}
      href={href}
      target={target === 'blank' ? '_blank' : '_self'}>
      <div
        ref={targetRef}
        style={{ height: height }}
        className={`${prefix}--cardlink__card`}>
        <span className={`${prefix}--cardlink__card__text`}>{text}</span>
        <ArrowRight20
          aria-label={text}
          className={`${prefix}--cardlink__card__icon`}
        />
      </div>
    </a>
  );
};

CardLink.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    target: PropTypes.string,
  }),
};

export default CardLink;
