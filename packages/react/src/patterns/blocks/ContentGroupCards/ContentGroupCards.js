/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { markdownToHtml, sameHeight } from '@carbon/ibmdotcom-utilities';
import React, { useEffect, useRef } from 'react';
import { ArrowRight20 } from '@carbon/icons-react';
import { CardLink } from '../../sub-patterns/CardLink';
import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;
const { stablePrefix } = ddsSettings;
/**
 * Card Array Component
 *
 * @param {object} props props object
 * @param {string} props.title CardArray section title
 * @param {Array} props.content CardArray section content object array
 * @returns {*} CardArray JSX component
 */
const ContentGroupCards = ({ heading, content }) => {
  const containerRef = useRef();

  useEffect(() => {
    setSameHeight();
    window.addEventListener('resize', () => {
      window.requestAnimationFrame(() => {
        setSameHeight();
      });
    });
  }, []);

  /**
   * Function that activates the sameHeight utility
   */
  const setSameHeight = () => {
    sameHeight(
      containerRef.current.getElementsByClassName(
        `${prefix}--card-link__title`
      ),
      'md'
    );
    sameHeight(
      containerRef.current.getElementsByClassName(
        `${prefix}--card-link__content`
      ),
      'md'
    );
  };

  return (
    <section
      data-autoid={`${stablePrefix}--contentgroupcards`}
      className={`${prefix}--contentgroupcards`}>
      <div className={`${prefix}--contentgroupcards__row`}>
        <ContentGroup heading={heading}>
          <div
            data-autoid={`${stablePrefix}--contentgroupcards-group`}
            ref={containerRef}
            className={`${prefix}--contentgroupcards-group ${prefix}--grid--condensed`}>
            <div className={`${prefix}--contentgroupcards__row`}>
              {_renderCardArrayItems(content)}
            </div>
          </div>
        </ContentGroup>
      </div>
    </section>
  );
};

/**
 * Renders the cards based on the ContentArray entries
 *
 * @param {Array} contentArray Content object array
 * @returns {*} CardArrayItem JSX objects
 */
const _renderCardArrayItems = contentArray =>
  contentArray.map((elem, index) => (
    <div className={`${prefix}--contentgroupcards-item__col`} key={index}>
      <CardLink
        data-autoid={`${stablePrefix}--contentgroupcards-item`}
        className={`${prefix}--contentgroupcards-item`}
        title={elem.title}
        content={
          <span
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(elem.copy),
            }}></span>
        }
        icon={<ArrowRight20 />}
        href={elem.href}
      />
    </div>
  ));

ContentGroupCards.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      copy: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

export default ContentGroupCards;
