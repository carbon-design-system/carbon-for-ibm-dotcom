import { ContentBlock } from '../../sub-patterns/ContentBlock';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * CTASection pattern
 *
 * @param {object} props props object
 * @param {string} props.heading heading string
 * @param {string} props.copy pattern copy
 * @param {object} props.cta CTA component
 * @returns {object} JSX Object
 */
const CTASection = ({ heading, copy, cta }) => (
  <section>
    <ContentBlock heading={heading} copy={copy} cta={cta} />
  </section>
);

CTASection.propTypes = {
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  cta: PropTypes.object,
};

export default CTASection;
