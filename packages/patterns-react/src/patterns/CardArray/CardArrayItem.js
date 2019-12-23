/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowRight20 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
<<<<<<< HEAD
=======
import { ArrowRight20 } from '@carbon/icons-react';
import { CardLink } from '@carbon/ibmdotcom-react';
import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
>>>>>>> feat(pattern): cardlink and sameheight utility usage added

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Card Array Item Object
 *
 * @param {object} props props object
 * @param {string} props.title Card Title
 * @param {string} props.copy Card copy
 * @param {object} props.link Card link object
 * @returns {*} JSX Card Array Item Object
 */
const CardArrayItem = ({ title, copy, href }) => {
  return (
    <CardLink
      data-autoid={`${stablePrefix}--cardarray-item`}
      className={`${prefix}--cardarray-item`}
      title={title}
      content={
        <span dangerouslySetInnerHTML={{ __html: markdownToHtml(copy) }}></span>
      }
      icon={<ArrowRight20 />}
      href={href}
    />
  );
};

CardArrayItem.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  href: PropTypes.string,
};

export default CardArrayItem;
