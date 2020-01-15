/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentGroup } from '@carbon/ibmdotcom-react';
import { DDS_LISTSECTION } from '../../internal/FeatureFlags';
import ListSectonItem from './ListSectionItem';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * List Section pattern
 *
 * @param {object} props props object
 * @param {boolean} props.border List section border
 * @param {string} props.copy List section  short copy to support the title
 * @param {Array} props.listGroup variation of the List section standard, standard with jump link and standard with card link
 * @param {string} props.theme List section color theme
 * @param {string} props.title List section title
 * @returns {object} JSX Object
 */
const ListSection = ({ border, copy, listGroup, theme, title }) =>
  featureFlag(
    DDS_LISTSECTION,
    <section
      data-autoid={`${stablePrefix}--listsection`}
      className={classNames(
        `${prefix}--listsection`,
        _setBorder(border),
        _setTheme(theme)
      )}>
      <div className={`${prefix}--listsection__container`}>
        <div className={`${prefix}--listsection__row`}>
          <div className={`${prefix}--listsection__col`}>
            <h1 className={`${prefix}--listsection__title`}>{title}</h1>
            <div className={`${prefix}--listsection__content`}>{copy}</div>
            {_renderListGroup(listGroup)}
          </div>
          <div className={`${prefix}--listsection__divider__col`}>
            <div className={`${prefix}--listsection__divider`} />
          </div>
        </div>
      </div>
    </section>
  );

/**
 * Render List Section Group Component
 *
 * @private
 * @param {Array} listGroup listGroupItems Array
 * @returns {object} JSX Object
 */
const _renderListGroup = listGroup => {
  return listGroup.map(listGroupItem => {
    return (
      <ContentGroup
        className={`${prefix}--listsection-group`}
        data-autoid={`${stablePrefix}--listsection-group`}
        heading={listGroupItem.title}>
        {_renderList(listGroupItem.lists)}
      </ContentGroup>
    );
  });
};

/**
 * Render List Component
 *
 * @private
 * @param {object} listItems listItems Object
 * @returns {object} JSX Object
 */
const _renderList = listItems => {
  return listItems.map(listItem => {
    return <ListSectonItem key={listItem.title} lists={listItem} />;
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

/**
 * sets the class name based on theme type
 *
 * @private
 * @param {string} theme theme type ( g100 | white/default )
 * @returns {string} theme css class names
 */
const _setTheme = theme => {
  return theme && `${prefix}--listsection--${theme}`;
};

ListSection.propTypes = {
  border: PropTypes.bool,
  copy: PropTypes.string,
  listGroup: PropTypes.shape({
    title: PropTypes.string,
    lists: PropTypes.array,
  }),
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default ListSection;
