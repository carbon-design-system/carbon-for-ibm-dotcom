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
import Layout from '../Layout/Layout';
import LinkList from '../LinkList/LinkList';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlock Sub-pattern
 *
 * @param {object} props props object
 * @param {string} props.heading Heading text
 * @param {string} props.copy copy text
 * @param {*} props.children JSX Components
 * @param {string} props.customClassName allows user to pass in custom class name
 * @param {*} props.cta CTA props object
 * @param {object} props.linkList LinkList props object
 * @returns {*} JSX ContentBlock component
 */
const ContentBlock = ({
  heading,
  copy,
  children,
  customClassName,
  cta,
  linkList,
}) => {
  return linkList ? (
    <div
      data-autoid={`${stablePrefix}--content-block`}
      className={cx(`${prefix}--content-block`, customClassName)}>
      {heading && (
        <Layout type="2-1">
          <h2
            data-autoid={`${stablePrefix}--content-block__heading`}
            className={`${prefix}--content-block__heading`}>
            {heading}
          </h2>
          <div></div>
        </Layout>
      )}
      <Layout type="2-1">
        <div>
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
        </div>
        <div>
          <LinkList {...linkList} />
        </div>
      </Layout>
    </div>
  ) : (
    <div
      data-autoid={`${stablePrefix}--content-block`}
      className={cx(`${prefix}--content-block`, customClassName)}>
      {heading && (
        <h2
          data-autoid={`${stablePrefix}--content-block__heading`}
          className={`${prefix}--content-block__heading`}>
          {heading}
        </h2>
      )}
      <div>
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
      </div>
    </div>
  );
};

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
  heading: PropTypes.string,
  copy: PropTypes.string,
  children: PropTypes.element,
  cta: PropTypes.object,
  customClassName: PropTypes.string,
  linkList: PropTypes.instanceOf(LinkList),
};

export default ContentBlock;
