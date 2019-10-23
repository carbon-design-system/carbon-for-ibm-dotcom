import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { ArrowRight16 } from '@carbon/icons-react';
const { prefix } = settings;

/**
 * Simple Link Component
 *
 * @param {*} { link: { href, text, target } }
 * @returns {*} SimpleLink component
 */
/**
 * Simple Link Component
 *
 * @param {object} props props object
 * @param {string} props.href simple link link
 * @param {string} props.target simple link text
 * @returns {*} SimpleLink component
 */
const SimpleLink = ({ link: { href, target } }) => {
  return (
    <a
      data-autoid={`${prefix}--simplelink`}
      className={`${prefix}--simplelink`}
      href={href}
      target={target === 'blank' ? '_blank' : '_self'}>
      <span className={`${prefix}--simplelink__text`}>Learn more</span>
      <ArrowRight16
        aria-label="Learn more link"
        className={`${prefix}--simplelink__icon`}
      />
    </a>
  );
};

SimpleLink.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    target: PropTypes.string,
  }),
};

export default SimpleLink;
