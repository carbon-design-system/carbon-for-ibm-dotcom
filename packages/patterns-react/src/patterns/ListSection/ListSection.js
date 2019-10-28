/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { LISTSECTION } from '../../internal/FeatureFlags';
import ListSectionGroup from './ListSectionGroup';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * List Section pattern
 *
 * @param {object} props props object
 * @param {string} props.title List section title
 * @param {string} props.copy List section  short copy to support the title
 * @param {object} props.listGroup variation of the List section standard, standard with jump link and standard with card link
 * @returns {object} JSX Object
 */
const ListSection = ({ title, copy, listGroup }) =>
  featureFlag(
    LISTSECTION,
    <section
      data-autoid={`${stablePrefix}--listsection`}
      className={classNames(`${prefix}--listsection`)}>
      <div className={`${prefix}--listsection__container`}>
        <div className={`${prefix}--listsection__row`}>
          <div className={`${prefix}--listsection__col`}>
            <h1 className={`${prefix}--listsection__title`}>{title}</h1>
            <div className={`${prefix}--listsection__content`}>{copy}</div>
          </div>
          <div className={`${prefix}--listsection__listgroup__col`}>
            {_renderListGroup(listGroup)}
          </div>
          <div className={`${prefix}--listsection__divider__col`}>
            <div className={`${prefix}--listsection__divider`}></div>
          </div>
        </div>
      </div>
    </section>
  );

/**
 * Render List Section Group Component
 *
 * @private
 * @param {object} listGroupItems listGroupItems Object
 * @returns {object} JSX Object
 */
const _renderListGroup = listGroupItems => {
  return listGroupItems.map(listGroupItem => {
    return (
      <ListSectionGroup key={listGroupItem.title} listGroup={listGroupItem} />
    );
  });
};

ListSection.propTypes = {
  title: PropTypes.string.isRequired,
  copy: PropTypes.string,
  listGroupItems: PropTypes.shape({
    title: PropTypes.string,
    lists: PropTypes.array,
  }),
};

export default ListSection;
