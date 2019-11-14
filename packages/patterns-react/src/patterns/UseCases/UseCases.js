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
import { USECASES } from '../../internal/FeatureFlags';
import UseCasesGroup from '../UseCases/UseCasesGroup';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Use cases pattern
 *
 * @param {object} props props object
 * @param {string} props.title Use cases title
 * @param {string} props.copy Use cases  short copy to support the title
 * @param {string} props.border Use cases border
 * @param {Array} props.usecaseGroup usecaseGroup array with title, image and lists
 * @returns {object} JSX Object
 */
const UseCases = ({ title, copy, border, usecaseGroup }) =>
  featureFlag(
    USECASES,
    <section
      data-autoid={`${stablePrefix}--usecases`}
      className={classNames(`${prefix}--usecases`, _setBorder(border))}>
      <div className={`${prefix}--usecases__container`}>
        <div className={`${prefix}--usecases__row`}>
          <div className={`${prefix}--usecases__col`}>
            <h1 className={`${prefix}--usecases__title`}> {title}</h1>
            <div className={`${prefix}--usecases__content`}>{copy}</div>
            {_renderUsecaseGroup(usecaseGroup)}
          </div>
          <div className={`${prefix}--usecases__divider__col`}>
            <div className={`${prefix}--usecases__divider`}></div>
          </div>
        </div>
      </div>
    </section>
  );

/**
 * Render Use case Group Component
 *
 * @private
 * @param {object} items use case group items Object
 * @returns {object} JSX Object
 */
const _renderUsecaseGroup = items => {
  return items.map(item => {
    return <UseCasesGroup key={item.title} usecaseGroup={item} />;
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
  withBorder = border === true ? `${prefix}--usecases--with-border` : '';
  return withBorder;
};

UseCases.propTypes = {
  title: PropTypes.string.isRequired,
  copy: PropTypes.string,
  border: PropTypes.bool,
  listGroup: PropTypes.array,
};

export default UseCases;
