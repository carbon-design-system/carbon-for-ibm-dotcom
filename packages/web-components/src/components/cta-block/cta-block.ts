import { internalProperty, customElement, html, LitElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './cta-block.scss';
import DDSContentItem from '../content-item/content-item';
import DDSPromoGroup from '../promo-group/promo-group';
import DDSPromoItem from '../promo-item/promo-item';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-cta-block`)
class DDSCtaBlock extends StableSelectorMixin(DDSPromoItem) {}

export default DDSCtaBlock;
