import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentItem } from '../../sub-patterns/ContentItem';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * CTASection pattern
 *
 * @param {object} props props object
 * @param {string} props.heading heading string
 * @param {string} props.copy pattern copy
 * @param {object} props.cta CTA component
 * @param {Array} props.items CTA items to the ContentItem
 * @returns {object} JSX Object
 */
const CTASection = ({ heading, copy, cta, items }) => (
  <section>
    <ContentBlock heading={heading} copy={copy} cta={cta} />
    {items.map(item => (
      <ContentItem heading={item.heading} copy={item.copy} cta={item.cta} />
    ))}
  </section>
);

CTASection.propTypes = {
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  cta: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.shape({
        heading: PropTypes.string,
        copy: PropTypes.string,
        cta: PropTypes.object,
      }),
    })
  ),
};

export default CTASection;
