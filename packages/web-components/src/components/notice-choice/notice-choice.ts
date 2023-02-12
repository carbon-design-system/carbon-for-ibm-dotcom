/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { checkPreferencesv3, loadContent } from './services';
import { customElement, html, LitElement, property } from 'lit-element';
import {
  emailRegExp,
  getMappedValue,
  getNcContentFromWindow,
  pwsValueMap,
  resetToWorldWideContent,
} from './utils';

import countrySettings from './country-settings';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import settings from 'carbon-components/es/globals/js/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './notice-choice.scss';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { worldWideContent } from './world-wide-content';

const { stablePrefix: ddsPrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Notice Choice
 *
 * @element dds-notice-choice
 * @fires dds-notice-choice-change
 * The custom event fired when default choice loaded or user change some preferences.
 * The field and value should be taken from the detail object and send it to MRS.
 */
@customElement(`dds-notice-choice`)
class NoticeChoice extends StableSelectorMixin(LitElement) {
  /**
   * properties for passed attributes.
   */
  @property({ type: String, reflect: true, attribute: 'question-choices' })
  questionchoices = '1';

  @property({ type: String, attribute: 'country' })
  country = 'US';

  @property({ type: String, attribute: 'state' })
  state = '';

  @property({ type: String, attribute: 'locale' })
  locale = 'us-en';

  @property({ type: String, attribute: 'terms-condition-link' })
  termsConditionLink = html``;

  @property({ type: String, attribute: 'bpid-legal-text' })
  bpidLegalText = html``;

  @property({ type: Boolean, attribute: 'enable-all-opt-in' })
  enableAllOptIn;

  @property({ attribute: 'default-values' })
  defaultValues = {};

  @property({ type: String, attribute: 'email' })
  email = '';

  @property({ type: Object, attribute: false })
  checkboxes = {};

  @property({ type: Object, attribute: false })
  ncData: any;

  @property({ type: Boolean, attribute: false })
  changed = false;

  @property({ type: String, attribute: false })
  fetchedPref = '';

  @property({ type: Object, attribute: false })
  optInContent = {};

  /**
   * End properties for passed attributes.
   */

  /**
   * properties for local state state management.
   */
  @property({ type: html, attribute: false })
  preText = html``;

  @property({ type: html, attribute: false })
  defaultPreText = html``;

  @property({ type: Object, attribute: false })
  values = {
    EMAIL: false,
    PHONE: false,
    POSTAL: false,
    NC_HIDDEN_EMAIL: worldWideContent.cc_default_status,
    NC_HIDDEN_PHONE: worldWideContent.cc_default_status,
    NC_HIDDEN_POSTAL: worldWideContent.cc_default_status,
  };

  prepareCheckboxes() {
    if (this.ncData) {
      const OptInContent = this.ncData.OptInContent;
      this.preText = OptInContent.preText;
      this.defaultPreText = OptInContent.preText;
      const newCheckboxes = this._buildCheckboxes(OptInContent);
      this.checkboxes = newCheckboxes;
      this.performUpdate();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    const { cc, lc } = getMappedValue(this.locale);
    loadContent(
      cc,
      lc,
      (ncData) => {
        this.ncData = ncData;
        this.prepareCheckboxes();
      },
      (error) => {
        console.error('error loading content', error);
      }
    );
    if (this.country && this.country !== cc) {
      this.countryChanged(this.country);
    }
  }
  setDefaultSelections() {
    if (!this.enableAllOptIn && this.checkboxes) {
      const newValues = { ...this.values };
      Object.keys(this.checkboxes).forEach((key) => {
        const optInContent = this.optInContent || this.ncData.OptInContent;
        const option = this._getOptionByQuestion(key, optInContent);
        newValues[key] = !!(
          option.checked === 'true' || option.checked === true
        );
        if (
          this.defaultValues &&
          Object.prototype.hasOwnProperty.call(this.defaultValues, key)
        ) {
          newValues[key] = this.defaultValues[key];
        }
        const hiddenFieldName = `NC_HIDDEN_${key}`;
        this._onChange(hiddenFieldName, newValues[key] ? 'OPT_IN' : null);
      });
      if (JSON.stringify(this.values) !== JSON.stringify(newValues)) {
        this.values = newValues;
      }
    }
  }
  countryChangeAction() {
    const splitValue = this.locale.split('-', 2);
    const ncData = getNcContentFromWindow();
    if (splitValue[1] === 'en') {
      let preText = this.defaultPreText;
      if (ncData.OtherPreferences.englishNoticeText !== '') {
        preText = ncData.OtherPreferences.englishNoticeText;
      }
      this.preText = preText;
    }
    /**
     * @description if the user already interacted with the checkboxes,
     * skip country default selection.
     */
    if (!this.changed && !this.fetchedPref) {
      /**
       * @description
       * change checkbox checked option based on new country.
       */
      this.setDefaultSelections();
    }
  }
  countryChanged(newVal) {
    const cc = newVal.toLocaleLowerCase();
    const lc = countrySettings[newVal.toLocaleLowerCase()].lang;
    resetToWorldWideContent();
    loadContent(
      cc,
      lc,
      (ncData) => {
        /**
         * @description Do not change content language.
         * Change the checkbox according to the country rule.
         */
        this.optInContent = {
          ...ncData.OptInContent,
          cclc: `${worldWideContent.cc_name}-${worldWideContent.cc_lang}`,
        };
        this.countryChangeAction();
      },
      (error) => {
        console.error('error loading content', error);
      }
    );
  }
  /**
   *
   * @param name name of the attribute
   * @param oldVal old value of the attribute
   * @param newVal new value of the attrbute
   */
  attributeChangedCallback(name, oldVal, newVal) {
    const hasValue = newVal !== null && oldVal !== null;
    super.attributeChangedCallback(name, oldVal, newVal);
    switch (name) {
      case 'question-choices': {
        // Reload checkbox options when questionchoices changed
        if (oldVal !== newVal) {
          this.prepareCheckboxes();
          this.setDefaultSelections();
        }
        break;
      }
      case 'locale': {
        // load content when locale changed.
        if (hasValue && oldVal !== newVal) {
          const { cc, lc } = getMappedValue(newVal);
          loadContent(
            cc,
            lc,
            (ncData) => {
              this.ncData = ncData;
              this.prepareCheckboxes();
            },
            (error) => {
              console.error('error loading content', error);
            }
          );
        }
        break;
      }
      case 'country': {
        /**
         * load content when country value changed.
         */
        if (
          hasValue &&
          oldVal !== newVal &&
          countrySettings[newVal.toLocaleLowerCase()]
        ) {
          this.countryChanged(newVal);
        }
        break;
      }
      case 'enable-all-opt-in':
        this.setDefaultSelections();
        break;
      case 'email': {
        if (newVal) {
          if (newVal !== this.fetchedPref) {
            // Handle throttle using debounce approach.
            if (emailRegExp.test(newVal)) {
              setTimeout(() => {
                this.emailChanged(newVal);
              }, 1000);
            }
          }
        } else {
          if (this.fetchedPref) {
            this.fetchedPref = newVal;
          }
        }
        break;
      }
    }
  }

  private checkBoxChange($event: any) {
    const id = $event.target.id;
    const checked = $event.target.checked;
    const newValues = {
      ...this.values,
    };
    newValues[id] = !!checked;
    this.values = newValues;
    this.changed = true;
    const hiddenFieldName = `NC_HIDDEN_${id}`;
    this._onChange(hiddenFieldName, checked ? 'PERMISSION' : 'SUPPRESSION');
  }
  static get stableSelector() {
    return `${ddsPrefix}--notice-choice`;
  }
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
  checkBoxTemplate(checkbox, checked) {
    return html`<span>
      <div class="${prefix}--form-item bx--checkbox-wrapper">
        <input
          type="checkbox"
          class="${prefix}--checkbox"
          id="${checkbox.id}"
          name="${checkbox.id}"
          ?checked=${checked}
          @change="${this.checkBoxChange}" />
        <label
          for="${checkbox.id}"
          class="${prefix}--checkbox-label ${prefix}--nc__checkbox-${checkbox.id}"
          ><span class="${prefix}--checkbox-label-text" dir="auto"
            >${checkbox.labelText}
          </span>
        </label>
      </div>
    </span>`;
  }
  postTextTemplate() {
    const OptInContent = this.ncData.OptInContent;
    const OtherPreferences = this.ncData.OtherPreferences;
    let postText = OptInContent.postText;
    let tcHtml = '';
    if (this.termsConditionLink) {
      let originalValue = OtherPreferences.trailPrivacyText;
      const matchedValue = originalValue.match(/<tc>.*<\/tc>/g);
      if (matchedValue) {
        const anrTagHtml = matchedValue[0].replace(/<tc>|<\/tc>/g, '');
        const link = `<a href='${this.termsConditionLink}' target='_blank' class='ibm-tooltip' >${anrTagHtml}</a>`;
        const reg = new RegExp('<tc>' + anrTagHtml + '</tc>', 'g');
        tcHtml = `<p>I accept the product  <a href='${this.termsConditionLink}' target='_blank' class='ibm-tooltip' >${anrTagHtml}</a> of this registration form.</p>`;
        postText = originalValue.replace(reg, link);
      }
    }
    // replace default privacy link
    try {
      const { cc, lc } = getMappedValue(this.locale);
      postText = postText.replaceAll(
        'www.ibm.com/privacy/zz/en/',
        `www.ibm.com/${cc}-${lc}/privacy`
      );
    } catch (e) {
      console.log('unable to replace privacy link locale code.');
    }
    const ccLcObject = getMappedValue(this.locale);
    const cc = ccLcObject.cc;
    const lc = ccLcObject.lc;
    const ccpa =
      this.country === 'US' && (this.state === 'CA' || this.state === '');
    if (this.country === 'CN' && lc === 'en') {
      return html`<p class="nc-gdpr-info">
          I agree and acknowledge that IBM may share my personal information
          with IBM affiliates and third parties globally. I understand that I
          can withdraw my marketing consent at any time by submitting an
          <a
            href="https://www.ibm.com/account/reg/${cc}-${lc}/signup?formid=urx-42537"
            target="_blank"
            >opt-out request</a
          >, and also may unsubscribe from receiving marketing emails by
          clicking the unsubscribe link in each email. More information in IBM’s
          use and processing of personal information can be found in the
          <a href="https://www.ibm.com/privacy" target="_blank"
            >IBM Privacy Statement</a
          >.
        </p>

        <p class="nc-gdpr-ack">
          By ticking the above boxes and submitting this form, I have read and
          understand the above notice and IBM Privacy Statement.
        </p>
        ${unsafeHTML(tcHtml)}`;
    } else if (lc === 'en' && ccpa) {
      return html`<p class="nc-gdpr-info">
          You can withdraw your marketing consent at any time by submitting an
          <a
            href="https://www.ibm.com/account/reg/us-en/signup?formid=urx-42537"
            target="_blank"
            >opt-out request</a
          >. Also you may unsubscribe from receiving marketing emails by
          clicking the unsubscribe link in each email.
        </p>
        <p class="nc-gdpr-ack">
          More information on our processing can be found in the
          <a href="https://www.ibm.com/privacy" target="_blank"
            >IBM Privacy Statement.</a
          >
          California residents, review
          <a href="https://www.ibm.com/privacy/ccpa" target="_blank"
            >our notice and your privacy choices</a
          >. <br />
          By submitting this form, I acknowledge that I have read and understand
          the IBM Privacy Statement.
        </p>
        ${unsafeHTML(tcHtml)}`;
    }
    return html`${unsafeHTML(postText)}`;
  }
  getBpidLegalText() {
    if (this.bpidLegalText) {
      return html`<p>${this.bpidLegalText}</p>`;
    } else {
      return ``;
    }
  }
  render() {
    return html`<section class="${prefix}--nc">
      <p id="ncHeading" class="${ddsPrefix}--nc__pre-text">${unsafeHTML(
      this.preText
    )}</p>
      <div class="${prefix}--checkbox-group">
            ${
              this.checkboxes &&
              Object.keys(this.checkboxes).length > 0 &&
              Object.keys(this.checkboxes).map((key) => {
                const checked = this.values[key];
                const checkbox = this.checkboxes[key];
                return this.checkBoxTemplate(checkbox, checked);
              })
            }
          </div>
          <div class="${prefix}--nc__post-text"
          >${this.postTextTemplate()}</div>
        </div>
        ${this.getBpidLegalText()}
    </section>`;
  }
  protected emailChanged(email) {
    if (this.changed === false) {
      checkPreferencesv3(email).then((response) => {
        if (
          response === 'S' &&
          JSON.stringify(this.values) !==
            JSON.stringify({
              ...this.values,
              EMAIL: false,
            })
        ) {
          this.fetchedPref = email;
          this.values = {
            ...this.values,
            EMAIL: false,
          };
          this._onChange('NC_HIDDEN_EMAIL', null);
        }
      });
    }
  }
  protected _getOptionByQuestion = (question, OptInContentValue) => {
    let OptInContent = OptInContentValue;
    if (!OptInContent) {
      OptInContent = this.ncData.OptInContent;
    }
    let option;
    switch (question) {
      case 'EMAIL': {
        option = OptInContent.fourQuestionApp[0];
        break;
      }
      case 'PHONE': {
        option = OptInContent.fourQuestionApp[1];
        break;
      }
      case 'POSTAL': {
        option = OptInContent.fourQuestionApp[2];
        break;
      }
      default: {
        option = OptInContent.fourQuestionApp[0];
        break;
      }
    }
    return option;
  };
  protected _buildCheckboxes(OptInContent: any) {
    const fieldElements: any = {};
    const fieldCollections = {
      EMAIL: {
        id: 'EMAIL',
        labelText: this._getOptionByQuestion('EMAIL', OptInContent)
          .optionTextPost,
      },
      PHONE: {
        id: 'PHONE',
        labelText: this._getOptionByQuestion('PHONE', OptInContent)
          .optionTextPost,
      },
      POSTAL: {
        id: 'POSTAL',
        labelText: this._getOptionByQuestion('POSTAL', OptInContent)
          .optionTextPost,
      },
    };
    if (this.questionchoices) {
      // by email
      if (this.questionchoices.indexOf('1') > -1) {
        fieldElements.EMAIL = fieldCollections.EMAIL;
      }
      // by Phone
      if (this.questionchoices.indexOf('2') > -1) {
        fieldElements.PHONE = fieldCollections.PHONE;
      }
      // by Postal mail
      if (this.questionchoices.indexOf('3') > -1) {
        fieldElements.POSTAL = fieldCollections.POSTAL;
      }
    }
    return fieldElements;
  }

  _onChange(field: string, value: string | null) {
    const pwsFieldsMap = {
      NC_HIDDEN_EMAIL: 'permission_email',
      NC_HIDDEN_PHONE: 'permission_phone',
      NC_HIDDEN_POSTAL: 'permission_postal',
    };
    if (Object.prototype.hasOwnProperty.call(pwsFieldsMap, field)) {
      field = pwsFieldsMap[field];
    }
    const init = {
      bubbles: true,
      detail: {
        field,
        value: pwsValueMap(value),
      },
    };
    this.dispatchEvent(
      new CustomEvent(`${ddsPrefix}-notice-choice-change`, init)
    );
  }
}
/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default NoticeChoice;
