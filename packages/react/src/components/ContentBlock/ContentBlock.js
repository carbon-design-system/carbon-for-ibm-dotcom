/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CTA } from '../CTA';
import cx from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { HorizontalRule } from '../HorizontalRule';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlock internal component
 */
const ContentBlock = ({
  heading,
  copy,
  children,
  customClassName,
  cta,
  aside,
  border,
}) => {
  const classnames = cx(`${prefix}--content-block`, customClassName);
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
        className={`${prefix}--content-block__children`}
      >
        {children}
      </div>
      {cta && _renderCTA(cta, border)}
    </>
  );

  const title = (
    <>
      {heading && (
        <h2
          data-autoid={`${stablePrefix}--content-block__heading`}
          className={`${prefix}--content-block__heading`}
        >
          {heading}
        </h2>
      )}
    </>
  );

  return (
    <div data-autoid={`${stablePrefix}--content-block`} className={classnames}>
      {title}
      {aside && aside.items ? _layoutWrap(content, aside) : content}
      {border ? <HorizontalRule /> : ''}
    </div>
  );
};

/**
 * lays out the content with aside items in 2-1 format
 *
 * @private
 * @param {Element} content content elements
 * @param {Element} aside  aside elements
 * @returns {*} jsx cta component
 */
const _layoutWrap = (content, aside) => (
  <div
    className={`${prefix}--content-layout ${prefix}--content-layout--with-complementary`}
  >
    <div className={`${prefix}--content-layout__body`}>{content}</div>
    <aside className={`${prefix}--content-layout__aside`}>{aside.items}</aside>
  </div>
);

/**
 * sets the class name based on theme type
 *
 * @private
 * @param {object} cta a cta object
 * @returns {*} jsx cta component
 */
function _renderCTA(cta, border) {
  if (cta.style === 'feature') {
    return (
      <CTA customClassName={cx(`${prefix}--content-block__cta`)} {...cta} />
    );
  }

  return (
    <div
      data-autoid={`${stablePrefix}--content-block__cta`}
      className={cx(`${prefix}--content-block__cta-row`, {
        [`${prefix}--content-block__cta-row-border`]: border,
      })}
    >
      <CTA
        customClassName={`${prefix}--content-block__cta ${prefix}--content-block__cta-col`}
        {...cta}
      />
    </div>
  );
}

ContentBlock.propTypes = {
  /**
   * Heading text.
   */
  heading: PropTypes.string,

  /**
   * Copy text.
   */
  copy: PropTypes.string,

  /**
   * Children elements passed into `ContentBlock` to be rendered.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),

  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
    type: PropTypes.oneOfType([
      PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
      ),
    ]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string,
  }),

  /**
   * Custom className to wrap the `<ContentBlock>` component.
   */
  customClassName: PropTypes.string,

  /**
   * Object containing elements to be rendered within `<aside>` html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   */
  aside: PropTypes.shape({
    items: PropTypes.element,
  }),
  /**
   * border for content block.
   */
  border: PropTypes.bool,
};

ContentBlock.defaultProps = {
  border: false,
};
export default ContentBlock;
