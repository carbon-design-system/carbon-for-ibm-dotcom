import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Renders the legal navigation item
 *
 * @param {object} props Property object
 * @param {string} props.url URL string
 * @param {string} props.label URL label
 * @returns {string} Legal Item HTML string
 */
const footerLegalItemTemplate = ({ url, label }) => {
  return `
  <li class="${prefix}--legal-nav__list-item">
    <a href="${url}" class="${prefix}--link ${prefix}--footer__link" data-autoid="${stablePrefix}--footer-legal-nav__link">${label}</a>
  </li>
  `;
};

export default footerLegalItemTemplate;
