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
import ListSectonItem from './ListSectionItem';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * List Section Group Component
 *
 * @param {object} props props object
 * @param {string} props.title List Group title
 * @param {Array} props.lists link Group lists array
 * @returns {object} JSX Object
 */
const ListSectionGroup = ({ listGroup: { title, lists } }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--listsection-group`}
      className={`${prefix}--listsection-group`}>
      <div className={`${prefix}--listsection-group__title`}>{title}</div>
      <div className={`${prefix}--listsection-group__list`}>
        {_renderList(lists)}
      </div>
    </div>
  );
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

ListSectionGroup.propTypes = {
  listGroup: PropTypes.shape({
    title: PropTypes.string,
    lists: PropTypes.array,
  }),
};

export default ListSectionGroup;
