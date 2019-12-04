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
 * @param {string} props.border List section border
 * @param {object} props.listGroup variation of the List section standard, standard with jump link and standard with card link
 * @returns {*} JSX Object
 */
const ListSection = ({ title, copy, border, listGroup }) =>
  featureFlag(
    LISTSECTION,
    <section
      data-autoid={`${stablePrefix}--listsection`}
      className={classNames(`${prefix}--listsection`, _setBorder(border))}>
      <div className={`${prefix}--listsection__container`}>
        <div className={`${prefix}--listsection__row`}>
          <div className={`${prefix}--listsection__col`}>
            <h1 className={`${prefix}--listsection__title`}>{title}</h1>
            <div className={`${prefix}--listsection__content`}>{copy}</div>
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

/**
 * sets the class name based on border type
 *
 * @private
 * @param {boolean} border includes border or not ( true | false )
 * @returns {string} border type css class names
 */
const _setBorder = border => {
  let withBorder;
  withBorder = border === true ? `${prefix}--listsection--with-border` : '';
  return withBorder;
};

ListSection.propTypes = {
  title: PropTypes.string.isRequired,
  copy: PropTypes.string,
  border: PropTypes.bool,
  listGroup: PropTypes.shape({
    title: PropTypes.string,
    lists: PropTypes.array,
  }),
};

export default ListSection;
