/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  settings as ddsSettings,
  markdownToHtml,
} from '@carbon/ibmdotcom-utilities';
import { CTA } from '../../../components/CTA';
import cx from 'classnames';
import { Layout } from '../Layout';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlock Sub-pattern
 *
 * @param {object} props props object
 * @param {boolean} props.inverse inverse class
 * @param {string} props.heading Heading text
 * @param {string} props.copy copy text
 * @param {*} props.children JSX Components
 * @param {string} props.customClassName allows user to pass in custom class name
 * @param {*} props.cta CTA props object
 * @param {object} props.aside components to be passed into the right panel
 * @returns {*} JSX ContentBlock component
 */
const ContentBlock = ({
  heading,
  copy,
  children,
  customClassName,
  cta,
  aside,
  inverse,
}) => {
  const classnames = cx(
    `${prefix}--content-block`,
    { [`${prefix}--content-block--inverse`]: inverse },
    customClassName
  );

  const content = (
    <>
      {copy && (
        <div
          className={`${prefix}--content-block__copy`}
          dangerouslySetInnerHTML={{
            __html: markdownToHtml(copy, { bold: false }),
          }}
        />
      )}
      <div
        data-autoid={`${stablePrefix}--content-block__children`}
        className={`${prefix}--content-block__children`}>
        {children}
      </div>
      {cta && _renderCTA(cta)}
    </>
  );

  const title = (
    <div>
      {heading && (
        <h2
          data-autoid={`${stablePrefix}--content-block__heading`}
          className={`${prefix}--content-block__heading`}>
          {heading}
        </h2>
      )}
    </div>
  );

  return (
    <div data-autoid={`${stablePrefix}--content-block`} className={classnames}>
      {aside && aside.items
        ? _layoutWrap(
            <>
              {title}
              <div></div>
            </>
          )
        : title}
      {aside && aside.items
        ? _layoutWrap(
            <>
              <div>{content}</div>
              <aside>{aside.items}</aside>
            </>,
            aside.border
          )
        : content}
    </div>
  );
};

/**
 * wraps content in layout component
 *
 * @private
 * @param {Element} content content elements
 * @param {boolean} border set border or not
 * @returns {*} jsx cta component
 */
const _layoutWrap = (content, border) => (
  <Layout type="2-1" nested={true} border={border}>
    {content.props.children}
  </Layout>
);

/**
 * sets the class name based on theme type
 *
 * @private
 * @param {object} cta a cta object
 * @returns {*} jsx cta component
 */
function _renderCTA(cta) {
  if (cta.style === 'feature') {
    return (
      <CTA customClassName={cx(`${prefix}--content-block__cta`)} {...cta} />
    );
  }

  return (
    <div
      data-autoid={`${stablePrefix}--content-block__cta`}
      className={`${prefix}--content-block__cta-row`}>
      <CTA
        customClassName={`${prefix}--content-block__cta ${prefix}--content-block__cta-col`}
        {...cta}
      />
    </div>
  );
}

ContentBlock.propTypes = {
  inverse: PropTypes.bool,
  heading: PropTypes.string,
  copy: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  cta: PropTypes.shape(CTA.propTypes),
  customClassName: PropTypes.string,
  aside: PropTypes.shape({
    items: PropTypes.element,
    border: PropTypes.bool,
  }),
};

export default ContentBlock;
