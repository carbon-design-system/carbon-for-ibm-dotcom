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
import UseCasesItem from '../UseCases/UseCasesItem';
import { ArrowRight20 } from '@carbon/icons-react';
import { CardLink } from '@carbon/ibmdotcom-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * UseCasesGroup Component
 *
 * @param {object} props props object
 * @param {string} props.title use case group title
 * @param {object} props.image use case limage object
 * @param {Array} props.lists use case lists array
 * @param {Array} props.link use case link object
 * @returns {object} JSX Object
 */
const UseCasesGroup = ({ usecaseGroup: { title, image, lists, link } }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--usecases-group`}
      className={`${prefix}--usecases-group`}>
      <h2 className={`${prefix}--usecases-group__title`}>{title}</h2>

      <div
        data-autoid={`${stablePrefix}--usecases-group__img`}
        className={`${prefix}--usecases-group__img`}>
        {_renderPicture(image)}
      </div>
      <div className={`${prefix}--usecases-group__list`}>
        {_renderList(lists)}
      </div>
      {link && (
        <div
          data-autoid={`${stablePrefix}--usecases-group__card`}
          className={`${prefix}--usecases-group__card`}>
          <CardLink
            title={link.title}
            href={link.href}
            target={link.target}
            icon={<ArrowRight20 />}
          />
        </div>
      )}
    </div>
  );
};

/**
 *  Render picture
 *
 * @param {*} img Image object
 * @returns {*} JSX Object
 */
const _renderPicture = img => {
  return (
    <picture>
      <source
        media="(min-width: 672px)"
        srcSet={`${img.uri.md}, ${img.uri.lg} 2x`}
      />
      <source
        media="(min-width: 320px)"
        srcSet={`${img.uri.sm}, ${img.uri.md} 2x`}
      />
      <img src={img.uri.md} srcSet={`${img.uri.sm}`} alt={img.alt}></img>
    </picture>
  );
};

/**
 * Render UsecaseItems Component
 *
 * @private
 * @param {object} items usecase items data
 * @returns {object} JSX Object
 */
const _renderList = items => {
  return items.map(item => {
    return <UseCasesItem key={item.title} lists={item} />;
  });
};

UseCasesGroup.propTypes = {
  usecaseGroup: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.object,
      alt: PropTypes.string,
    }),
    lists: PropTypes.array,
    link: PropTypes.object,
  }),
};

export default UseCasesGroup;
