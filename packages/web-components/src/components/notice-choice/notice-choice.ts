/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { loadContent, loadSettings, checkEmailStatus } from './services';
import { TemplateResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import {
  pwsValueMap,
  resetToWorldWideContent,
  supportedLanguages,
} from './utils';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './notice-choice.scss';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

import '@carbon/web-components/es/components/loading/index.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Notice Choice
 *
 * @element c4d-notice-choice
 * @fires c4d-notice-choice-change
 * The custom event fired when default choice loaded or user change some preferences.
 * The field and value should be taken from the detail object and send it to MRS.
 * @csspart checkbox-wrapper - The checkbox wrapper. Usage `c4d-notice-choice::part(checkbox-wrapper)`
 * @csspart checkbox - An input checkbox. Usage `c4d-notice-choice::part(checkbox)`
 * @csspart checkbox-label - The checkbox label. Usage `c4d-notice-choice::part(checkbox-label)`
 * @csspart checkbox-label-text - The checkbox label text. Usage `c4d-notice-choice::part(checkbox-label-text)`
 * @csspart error - The error message. Usage `c4d-notice-choice::part(error)`
 * @csspart section - A section. Usage `c4d-notice-choice::part(section)`
 * @csspart container - The container. Usage `c4d-notice-choice::part(container)`
 * @csspart tooltip-link - The tooltip link. Usage `c4d-notice-choice::part(tooltip-link)`
 */
@customElement(`c4d-notice-choice`)
class NoticeChoice extends StableSelectorMixin(LitElement) {
  /**
   * properties for passed attributes.
   */
  @property({ type: String, reflect: true, attribute: 'question-choices' })
  questionchoices = '1';

  @property({ type: String, attribute: 'email' })
  email = '';

  @property({ type: String, attribute: 'country' })
  country = 'US';

  @property({ type: String, attribute: 'state' })
  state = '';

  @property({ type: String, attribute: 'language' })
  language = 'en';

  @property({ type: String, attribute: 'current-language' })
  currentLanguage = 'en';

  @property({ type: String, attribute: 'terms-condition-link' })
  termsConditionLink = html``;

  @property({ type: Boolean, attribute: 'enable-all-opt-in' })
  enableAllOptIn = false;

  @property({ attribute: 'default-values' })
  defaultValues = {};

  @property({ type: Boolean, attribute: 'hide-error-message' })
  hideErrorMessage = false;

  @property({ type: Boolean, attribute: 'combine-email-phone' })
  combineEmailPhone = false;

  @property({ type: String, attribute: 'environment' })
  environment = 'prod';

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

  @property({ type: Boolean, attribute: false })
  preventFormSubmission = false;

  @property({ type: Object, attribute: false })
  isMandatoryCheckboxDisplayed = { countryCode: '', isDisplayed: false };

  @property({ type: Object, attribute: false })
  countrySettings: any;

  @property({ type: Object, attribute: false })
  noticeOnly: any;

  @property({ type: Boolean, attribute: false })
  emailPrechecked = false;

  @property({ type: Boolean, attribute: false })
  telephonePrechecked = false;

  @property({ type: Boolean, attribute: false })
  combinedEmailPhonePrechecked = false;

  @property({ type: Boolean, attribute: false })
  isAnnualPeriodExpired = true;

  @property({ type: Boolean, attribute: false })
  showCheckBox = false;

  @property({ type: Boolean, attribute: false })
  isLoading = false;

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
    NC_HIDDEN_EMAIL: 'SUPPRESSION',
    NC_HIDDEN_PHONE: 'SUPPRESSION',
  };

  @property({ reflect: true })
  hiddenEmail = '';

  @property({ reflect: true })
  hiddenPhone = '';

  @property({ reflect: true, attribute: 'nc-tele-detail' })
  ncTeleDetail = '';

  @property({ reflect: true, attribute: 'nc-email-detail' })
  ncEmailDetail = '';

  prepareCheckboxes() {
    if (this.ncData) {
      const OptInContent = this.ncData;
      this.preText = OptInContent.preText;
      this.defaultPreText = OptInContent.preText;
      const newCheckboxes = this._buildCheckboxes();
      this.checkboxes = newCheckboxes;
      this.performUpdate();
    }
  }
  defaultLoadContent() {
    loadContent(
      'en',
      this.environment,
      (ncData) => {
        this.ncData = ncData;
        this.prepareCheckboxes();
        this.countryChanged();
      },
      (error) => {
        console.error('error loading content', error);
      }
    );
  }
  defaultLoadSettings() {
    loadSettings(
      this.environment,
      (countryPreferencesSettings) => {
        this.countrySettings = countryPreferencesSettings.preferences;
        this.noticeOnly = countryPreferencesSettings.noticeOnly || ['us'];
      },
      (error) => {
        console.error('error loading content', error);
      }
    );
  }
  connectedCallback() {
    super.connectedCallback();
    const [language] = this.language.split(/[-_]/);

    let defaultLanguage = 'en';
    if (supportedLanguages(this.language)) {
      defaultLanguage = supportedLanguages(this.language);
    } else if (supportedLanguages(language)) {
      defaultLanguage = supportedLanguages(language);
    }

    loadSettings(
      this.environment,
      (countryPreferencesSettings) => {
        this.countrySettings = countryPreferencesSettings.preferences;
        this.noticeOnly = countryPreferencesSettings.noticeOnly || ['us'];
      },
      () => {
        this.countrySettings = this.defaultLoadSettings();
      }
    );
    loadContent(
      defaultLanguage,
      this.environment,
      (ncData) => {
        this.ncData = ncData;
        this.prepareCheckboxes();
        this.countryChanged();
      },
      () => {
        this.defaultLoadContent();
      }
    );
  }
  setDefaultSelections() {
    if (!this.enableAllOptIn && this.checkboxes) {
      const newValues = { ...this.values };
      Object.keys(this.checkboxes).forEach((key) => {
        const option = this._getOptionByQuestion(key);
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
        newValues[hiddenFieldName] = option[hiddenFieldName];

        this._onChange(hiddenFieldName, newValues.EMAIL ? 'OPT_IN' : 'OPT_OUT');
      });
      if (JSON.stringify(this.values) !== JSON.stringify(newValues)) {
        this.values = newValues;
      }
    }
  }
  countryChangeAction() {
    this.preventFormSubmission = false;
    if (this.ncData?.mandatoryCheckbox[this.country?.toLocaleLowerCase()]) {
      const countyCode = this.country?.toLocaleLowerCase();
      const mrsField = this.ncData?.mandatoryCheckbox[countyCode]
        .countryTransferText
        ? this.ncData?.mandatoryCheckbox[countyCode].countryTransferText
            .mrs_field
        : this.ncData?.mandatoryCheckbox[countyCode].chinaPIPLtext.mrs_field;
      this._onChange(mrsField, 'countyBasedCheckedNo');

      this.isMandatoryCheckboxDisplayed.countryCode = countyCode;
      this.isMandatoryCheckboxDisplayed.isDisplayed = true;

      this.preventFormSubmission = true;
      this._onChange('preventFormSubmission', 'formSubmissionNo');
    } else {
      this._onChange('preventFormSubmission', 'formSubmissionYes');
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
  countryChanged() {
    resetToWorldWideContent();
    this.countryChangeAction();
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
      case 'language':
      case 'environment': {
        // load content when locale changed.
        const [language] = newVal.split(/[-_]/);

        let defaultLanguage = 'en';
        if (supportedLanguages(newVal)) {
          defaultLanguage = supportedLanguages(newVal);
        } else if (supportedLanguages(language)) {
          defaultLanguage = supportedLanguages(language);
        }
        this.currentLanguage = defaultLanguage;
        if (hasValue && oldVal !== newVal) {
          loadSettings(
            this.environment,
            (countryPreferencesSettings) => {
              this.countrySettings = countryPreferencesSettings.preferences;
            },
            (error) => {
              console.error('error loading content', error);
            }
          );
          loadContent(
            defaultLanguage,
            this.environment,
            (ncData) => {
              this.ncData = ncData;
              this.prepareCheckboxes();
            },
            () => {
              this.defaultLoadContent();
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
          this.countrySettings[newVal.toLocaleLowerCase()]
        ) {
          this.countryChanged();
        }
        break;
      }
      case 'enable-all-opt-in':
        if (oldVal !== newVal) {
          this.enableAllOptIn = JSON.parse(newVal);
          this.setDefaultSelections();
        }
        break;
      case 'hide-error-message': {
        if (oldVal !== newVal) {
          this.hideErrorMessage = JSON.parse(newVal);
          this.countryBasedLegalNotice();
        }

        break;
      }
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (hasValue && oldVal !== newVal && emailRegex.test(newVal)) {
          this.email = newVal;
          this.onEmailChange();
        }
        break;
      }
    }
  }

  onEmailChange() {
    const email = this.email;
    const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

    this.isAnnualPeriodExpired = true;
    this.isLoading = true;
    checkEmailStatus(
      email,
      this.environment,
      (data) => {
        const { email: emailStatus, lastUpdated } = data;
        this.isLoading = false;

        const annualPeriodDate = new Date(lastUpdated);
        const isValidDate = !isNaN(annualPeriodDate.getTime());

        if (!isValidDate) {
          console.warn('Invalid annualPeriod:', lastUpdated);
          this.isAnnualPeriodExpired = false;
          this.showCheckBox = true;
          this.renderCombinedEmailPhoneSection();
          return;
        }

        const isExpired = emailStatus === 'P' && annualPeriodDate < oneYearAgo;
        this.isAnnualPeriodExpired = isExpired;
        this.showCheckBox = isExpired || emailStatus !== 'P';
      },
      (error) => {
        this.isLoading = false;
        this.isAnnualPeriodExpired = false;
        this.showCheckBox = true;
        this.renderCombinedEmailPhoneSection();
        console.error('if error then return N:', error);
      }
    );
  }

  static get stableSelector() {
    return `${c4dPrefix}--notice-choice`;
  }
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
  checkBoxLegalChange($event: any) {
    const legalCheckbox = $event.target;
    const isChecked = legalCheckbox.checked;
    const legalTextError = legalCheckbox.parentNode.querySelector('.nc-error');
    const countyBasedText = isChecked
      ? 'countyBasedCheckedYes'
      : 'countyBasedCheckedNo';

    if (legalTextError) {
      legalTextError.style.display = isChecked ? 'none' : '';
    }

    const countyCode = this.country?.toLocaleLowerCase();

    const mrsField = this.ncData?.mandatoryCheckbox[countyCode]
      .countryTransferText
      ? this.ncData?.mandatoryCheckbox[
          this.isMandatoryCheckboxDisplayed.countryCode
        ].countryTransferText.mrs_field
      : this.ncData?.mandatoryCheckbox[countyCode].chinaPIPLtext.mrs_field;
    legalCheckbox.value = isChecked ? 1 : 0;
    this.preventFormSubmission = !isChecked;
    const preventFormSubmissionValue = isChecked
      ? 'formSubmissionYes'
      : 'formSubmissionNo';
    this._onChange('preventFormSubmission', preventFormSubmissionValue);
    this._onChange(mrsField, countyBasedText);
  }

  countryBasedLegalNotice() {
    const country = this.country.toLocaleLowerCase();
    const itemTemplates: Array<TemplateResult> = [];

    if (
      this.ncData?.mandatoryCheckbox &&
      this.ncData.mandatoryCheckbox[country]
    ) {
      const mandatoryCheckboxes: { [key: string]: any } =
        this.ncData.mandatoryCheckbox[country];

      for (const [key, mandatoryCheckbox] of Object.entries(
        mandatoryCheckboxes
      )) {
        const legalTextName = key.replace(/([A-Z]+)/g, '-$1').toLowerCase();
        const mandatoryCheckboxTemplate = html`
          <span>
            <div
              class="${prefix}--form-item bx--checkbox-wrapper"
              part="checkbox-wrapper checkbox-wrapper--mandatory">
              <p part=${legalTextName} class=${legalTextName}>
                <input
                  type="checkbox"
                  class="${prefix}--checkbox"
                  part="checkbox checkbox--mandatory"
                  id="${mandatoryCheckbox.mrs_field}"
                  name="${mandatoryCheckbox.mrs_field}"
                  @change="${this.checkBoxLegalChange}" />
                <label
                  for="${mandatoryCheckbox.mrs_field}"
                  class="${prefix}--checkbox-label ${prefix}--nc__checkbox-${mandatoryCheckbox.mrs_field}"
                  part="checkbox-label checkbox-label--mandatory"
                  ><span
                    class="${prefix}--checkbox-label-text"
                    part="checkbox-label-text checkbox-label-text--mandatory"
                    dir="auto"
                    >${mandatoryCheckbox.text}
                  </span>
                </label>
                ${!this.hideErrorMessage && this.preventFormSubmission
                  ? html`<span
                      class="nc-error"
                      part="error"
                      style="color:#da1e28;font-size:.75rem"
                      >${mandatoryCheckbox.error}</span
                    >`
                  : ''}
              </p>
            </div>
          </span>
        `;
        itemTemplates.push(mandatoryCheckboxTemplate);
      }
    }

    return itemTemplates;
  }

  postTextTemplate() {
    if (this.ncData) {
      const OtherPreferences = this.ncData.trialPrivacyText;
      let postText = this.ncData.postText;

      if (postText) {
        postText = '<p part="ncPostText">' + postText + '</p>';
      }

      if (!this.termsConditionLink.strings && this.termsConditionLink) {
        const originalValue = OtherPreferences;
        const matchedValue = originalValue.match(/<tc>.*<\/tc>/g);
        if (matchedValue) {
          const anrTagHtml = matchedValue[0].replace(/<tc>|<\/tc>/g, '');
          const link = `<a href='${this.termsConditionLink}' target='_blank' class='ibm-tooltip' part="tooltip-link">${anrTagHtml}</a>`;
          const reg = new RegExp('<tc>' + anrTagHtml + '</tc>', 'g');

          postText =
            postText +
            originalValue
              .replace(reg, link)
              .replace(/<p>/g, '<p part="nc-trial-text" id="nc-trial-text">');
        }
      }
      if (postText !== '') {
        postText =
          "<div part='ncPostTextContainer' id='ncPostTextContainer'>" +
          postText +
          '</div>';
      }
      return html`${unsafeHTML(postText)}`;
    } else {
      return html``;
    }
  }

  combinedPreTextTemplate() {
    if (!this.ncData) {
      return html``;
    }

    const ecmTranslateContent = this.ncData;
    const country = this.country?.toLocaleLowerCase() || '';
    const state = this.state?.toLocaleLowerCase() || '';

    let preText = '';

    if (!this.email) {
      preText = ecmTranslateContent.annualDefaultText;
    } else {
      preText = this.showCheckBox
        ? ecmTranslateContent.combinedConsent
        : ecmTranslateContent.annualText;
    }

    if (ecmTranslateContent.state[country]) {
      if ((this.noticeOnly || []).includes(country)) {
        preText =
          state === 'ca' || state === ''
            ? ecmTranslateContent.state[country]['ca'].noticeOnly
            : ecmTranslateContent.noticeOnly;
      } else {
        preText =
          ecmTranslateContent.state[country][state]?.combinedConsent ||
          ecmTranslateContent.combinedConsent;
      }
    } else if ((this.noticeOnly || []).includes(country)) {
      preText =
        state === 'ca' || state === '' || typeof state === 'undefined'
          ? ecmTranslateContent.state?.[country]?.['ca']?.noticeOnly
            ? ecmTranslateContent.state?.[country]?.['ca']?.noticeOnly
            : ecmTranslateContent.noticeOnly
          : ecmTranslateContent.noticeOnly;
    }

    const countryContent = ecmTranslateContent.country?.[country];

    if (countryContent) {
      if (!this.email) {
        preText = ecmTranslateContent.annualDefaultText;
      } else {
        preText = this.isAnnualPeriodExpired
          ? countryContent.combinedConsent
          : countryContent.annualText;
      }
    }

    if (!(this.noticeOnly || []).includes(country)) {
      let isPermissionOrSuppression = false;
      if (typeof this.values.EMAIL === 'object') {
        const checkStatus: any = this.values.EMAIL;
        isPermissionOrSuppression = checkStatus.checkBoxStatus === 'PERMISSION';
      }
      const checked =
        typeof this.values.EMAIL === 'object'
          ? isPermissionOrSuppression
          : this.values.EMAIL;

      if (this.showCheckBox) {
        return this.renderCheckbox(preText, checked);
      }
      return html`${unsafeHTML(preText)}`;
    }

    return html`${unsafeHTML(preText)}`;
  }

  checkCombineEmailPhoneBoxChange($event: any) {
    const checked = $event.target.checked;
    const newValues = {
      ...this.values,
    };
    this.changed = true;

    Object.keys(this.checkboxes).map((id) => {
      newValues[id] = !!checked;
      this.values = newValues;

      const hiddenFieldName = `NC_HIDDEN_${id}`;
      const hiddenFieldStatus = checked ? 'PERMISSION' : 'SUPPRESSION';
      this.values[id] = {};
      this.values[id]['checkBoxStatus'] = hiddenFieldStatus;
      let statusPrechecked = '';
      switch (id) {
        case 'EMAIL':
        case 'PHONE':
          statusPrechecked =
            this.combinedEmailPhonePrechecked && !checked
              ? 'CU'
              : !this.combinedEmailPhonePrechecked && checked
              ? 'UC'
              : this.combinedEmailPhonePrechecked && checked
              ? 'CC'
              : 'UU';

          break;
      }
      this.values[id]['punsStatus'] = statusPrechecked;

      this._onChange(hiddenFieldName, hiddenFieldStatus);
      this._onChange(
        `${hiddenFieldName}_VALUE`,
        `NC_HIDDEN_${hiddenFieldStatus}`
      );
    });
  }

  renderCheckbox(preText, checked) {
    const checkboxId = 'EMAIL_PHONE_CHECKBOX';
    return html`
      <span part="container">
        <div
          class="${prefix}--form-item cds--checkbox-wrapper"
          part="checkbox-wrapper">
          <input
            type="checkbox"
            class="${prefix}--checkbox"
            part="checkbox"
            id="${checkboxId}"
            name="${checkboxId}"
            ?checked="${checked}"
            @change="${this.checkCombineEmailPhoneBoxChange}" />
          <label
            for="${checkboxId}"
            class="${prefix}--checkbox-label ${prefix}--nc__checkbox-${checkboxId}"
            part="checkbox-label">
            <span
              class="${prefix}--checkbox-label-text"
              part="checkbox-label-text"
              dir="auto">
              ${unsafeHTML(preText)}
            </span>
          </label>
        </div>
      </span>
    `;
  }

  renderCombinedEmailPhoneSection() {
    const getPunsStatus = (key, checked) => {
      const countryLowerCase = this.country?.toLocaleLowerCase();
      const isNoticeOnly = (this.noticeOnly || []).includes(countryLowerCase);

      if (isNoticeOnly) {
        return 'NOTICE_ONLY';
      }

      const defaultCountryStatus = { email: 'opt-in', phone: 'opt-in' };
      const countryStatus = countryLowerCase
        ? this.countrySettings[countryLowerCase] || defaultCountryStatus
        : defaultCountryStatus;

      const checkboxStatus = this.values[key]?.checkBoxStatus;

      if (checkboxStatus === 'SUPPRESSION') {
        if (countryStatus.email === 'opt-in') {
          return 'UU';
        }
        if (countryStatus.email === 'opt-out') {
          return 'CU';
        }
      }

      return this.values[key]?.punsStatus || (checked ? 'CC' : 'UU');
    };

    const createHiddenInput = (id, value) =>
      html`<input type="hidden" id=${id} name=${id} value=${value} />`;

    return html`
      <section class="${prefix}--nc" part="section">
        <p part="ncHeading" id="ncHeading" class="${c4dPrefix}--nc__pre-text ">
          ${this.countryBasedLegalNotice()} ${this.combinedPreTextTemplate()}
        </p>
        ${Object.keys(this.checkboxes).map((key) => {
          const checked = this.values.EMAIL;
          const punsStatus = getPunsStatus(key, checked);
          const hiddenBox = {
            id: `NC_HIDDEN_${key}`,
            value: this.values[key]['checkBoxStatus']
              ? this.values[key]['checkBoxStatus']
              : this.values.EMAIL
              ? 'PERMISSION'
              : 'SUPPRESSION',
          };

          if (typeof checked !== 'object') {
            this.combinedEmailPhonePrechecked = checked ? true : false;
          }

          if (
            (this.noticeOnly || []).includes(this.country.toLocaleLowerCase())
          ) {
            const countryStatus = this.country
              ? this.countrySettings[this.country.toLocaleLowerCase()]
              : { email: 'opt-in', phone: 'opt-in' };
            hiddenBox.value =
              countryStatus.email === 'opt-out' ? 'PERMISSION' : 'SUPPRESSION';
          }

          this._onChange(
            `NC_${key === 'PHONE' ? 'TELE' : key}_DETAIL`,
            `${key}_${punsStatus}`
          );
          console.log(`${hiddenBox.id}_VALUE`, `NC_HIDDEN_${hiddenBox.value}`);
          this._onChange(
            `${hiddenBox.id}_VALUE`,
            `NC_HIDDEN_${hiddenBox.value}`
          );

          if (Object.keys(this.checkboxes).length === 1) {
            this._onChange(`NC_HIDDEN_PHONE_VALUE`, `NC_HIDDEN_PHONE_NONE`);
          }

          return createHiddenInput(hiddenBox.id, hiddenBox.value);
        })}
        <div part="${prefix}--nc__post-text" class="${prefix}--nc__post-text">
          ${this.postTextTemplate()}
        </div>
        ${createHiddenInput(
          'preventFormSubmission',
          this.preventFormSubmission
        )}
        <input
          type="hidden"
          id="preventFormSubmission"
          name="preventFormSubmission"
          value=${this.preventFormSubmission} />
      </section>
    `;
  }

  render() {
    if (this.isLoading) {
      return html`<div
        style="position: relative; padding: 3rem; display: flex;">
        <cds-loading type="small"></cds-loading>
      </div>`;
    }

    if (
      this.isMandatoryCheckboxDisplayed.isDisplayed &&
      this.country.toLocaleLowerCase() !==
        this.isMandatoryCheckboxDisplayed.countryCode
    ) {
      const mrsField = this.ncData?.mandatoryCheckbox[
        this.isMandatoryCheckboxDisplayed.countryCode
      ].countryTransferText
        ? this.ncData?.mandatoryCheckbox[
            this.isMandatoryCheckboxDisplayed.countryCode
          ].countryTransferText.mrs_field
        : this.ncData?.mandatoryCheckbox[
            this.isMandatoryCheckboxDisplayed.countryCode
          ].chinaPIPLtext.mrs_field;
      this._onChange(mrsField, 'countyBasedCheckedNo');
    }

    return this.renderCombinedEmailPhoneSection();
  }

  protected _getOptionByQuestion = (question) => {
    const questionChoiceStatus = this.country
      ? this.countrySettings[this.country.toLocaleLowerCase()]
      : { email: 'opt-in', phone: 'opt-in' };

    let option;
    switch (question) {
      case 'EMAIL': {
        option = {
          id: '0',
          checked: questionChoiceStatus.email === 'opt-out' ? true : false,
          optionTextPost: this.ncData.email,
          NC_HIDDEN_EMAIL:
            questionChoiceStatus.email === 'opt-out' ? 'OPT_OUT' : 'OPT_IN',
        };
        break;
      }
      case 'PHONE': {
        option = {
          id: '1',
          checked: questionChoiceStatus.phone === 'opt-out' ? true : false,
          optionTextPost: this.ncData.telephone,
          NC_HIDDEN_PHONE:
            questionChoiceStatus.phone === 'opt-out' ? 'OPT_OUT' : 'OPT_IN',
        };
        break;
      }

      default: {
        option = {
          id: '0',
          checked: questionChoiceStatus.email === 'opt-out' ? true : false,
          optionTextPost: this.ncData.email,
          NC_HIDDEN_EMAIL:
            questionChoiceStatus.email === 'opt-out' ? 'OPT_OUT' : 'OPT_IN',
        };
        break;
      }
    }

    return option;
  };
  protected _buildCheckboxes() {
    const fieldElements: any = {};
    const fieldCollections = {
      EMAIL: {
        id: 'EMAIL',
        labelText: this._getOptionByQuestion('EMAIL').optionTextPost,
      },
      PHONE: {
        id: 'PHONE',
        labelText: this._getOptionByQuestion('PHONE').optionTextPost,
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
    }
    return fieldElements;
  }

  _onChange(field: string, value: string | null) {
    const pwsFieldsMap = {
      NC_HIDDEN_EMAIL: 'permission_email',
      NC_HIDDEN_PHONE: 'permission_phone',
      preventFormSubmission: 'preventFormSubmission',
      Q_CHINA_PIPL: 'Q_CHINA_PIPL',
      Q_COUNTRY_TRANSFER: 'Q_COUNTRY_TRANSFER',
      NC_HIDDEN_EMAIL_VALUE: 'NC_HIDDEN_EMAIL',
      NC_HIDDEN_PHONE_VALUE: 'NC_HIDDEN_PHONE',
      EMAIL_CU: 'EMAIL_CU',
      EMAIL_CC: 'EMAIL_CC',
      EMAIL_UC: 'EMAIL_UC',
      EMAIL_UU: 'EMAIL_UU',
      PHONE_CU: 'PHONE_CU',
      PHONE_CC: 'PHONE_CC',
      PHONE_UC: 'PHONE_UC',
      PHONE_UU: 'PHONE_UU',
      EMAIL_NOTICE_ONLY: 'EMAIL_NOTICE_ONLY',
      PHONE_NOTICE_ONLY: 'PHONE_NOTICE_ONLY',
      NC_HIDDEN_PHONE_NONE: 'NC_HIDDEN_PHONE_NONE',
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
      new CustomEvent(`${c4dPrefix}-notice-choice-change`, init)
    );
  }
}

export default NoticeChoice;
