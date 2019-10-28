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
 * List Group Component
 *
 * @param {object} props props object
 * @param {string} props.title List Group title
 * @param {string} props.lists link Group lists object
 * @returns {object} JSX Object
 */
const ListGroup = ({ listGroup: { title, lists } }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--listgroup`}
      className={`${prefix}--listgroup ${prefix}--listgroup__col`}>
      <div className={`${prefix}--listgroup__title`}>{title}</div>
      <div className={`${prefix}--listgroup__list`}>{renderList(lists)}</div>
    </div>
  );
};

/**
 * Render List Component
 *
 * @param {object} listItems listItems Object
 * @returns {object} JSX Object
 */
const renderList = listItems => {
  return listItems.map(listItem => {
    return <ListSectonItem key={listItem.title} lists={listItem} />;
  });
};

ListGroup.propTypes = {
  listGroup: PropTypes.shape({
    title: PropTypes.string,
    lists: PropTypes.object,
  }),
};

export default ListGroup;
