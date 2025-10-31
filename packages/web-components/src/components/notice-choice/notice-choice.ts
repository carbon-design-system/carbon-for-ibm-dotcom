/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { loadContent, loadSettings, checkEmailStatus } from './services';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { pwsValueMap, resetToWorldWideContent } from './utils';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './notice-choice.scss';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/skeleton-text/index.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

interface MandatoryCheckbox {
  text: string;
  mrs_field: string;
  error: string;
}
/**
 * Notice Choice
 *
 * @element c4d-notice-choice
 * @fires c4d-notice-choice-change
 * @fires c4d-notice-choice-email-status-changed
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

  @property({ type: String, attribute: 'terms-condition-link' })
  termsConditionLink = html``;

  @property({ type: String, attribute: 'enable-all-opt-in' })
  enableAllOptIn = 'false';

  @property({ type: String, attribute: 'hide-error-message' })
  hideErrorMessage = 'false';

  @property({ type: String, attribute: 'environment' })
  environment = 'prod';

  @property({ type: String, attribute: 'form-type' })
  formType = 'marketing';

  /**
   * End properties for passed attributes.
   */

  /**
   * properties for local state state management.
   */
  @property({ attribute: 'default-values' })
  defaultValues = {};

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
  emailValid = false;

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

  @property({ type: html, attribute: false })
  preText = html``;

  @property({ type: html, attribute: false })
  defaultPreText = html``;

  @property({ type: Array, attribute: false })
  doubleOptInCountries: string[] = [];

  @property({ type: Object, attribute: false })
  values = {
    EMAIL: false,
    PHONE: false,
    NC_HIDDEN_EMAIL: 'SUPPRESSION',
    NC_HIDDEN_PHONE: 'SUPPRESSION',
  };

  @property({ type: Object, attribute: false })
  valuesForEmailPhone = {
    EMAIL: {
      checkBoxStatus: 'PERMISSION',
      punsStatus: '',
    },
  };

  @property({ reflect: true })
  hiddenEmail = '';

  @property({ reflect: true })
  hiddenPhone = '';

  @property({ type: Object, attribute: false })
  supportedLanguages = {};

  connectedCallback() {
    super.connectedCallback();
    this._initSettingsAndContent(this.language);
  }

  static get stableSelector() {
    return `${c4dPrefix}--notice-choice`;
  }
  static styles = styles;

  updated(changedProps: Map<string, unknown>) {
    changedProps.forEach((oldValue, propName) => {
      const newValue = (this as any)[propName];
      const hasValue = newValue !== undefined && newValue !== null;
      this._dispatchChange(propName, newValue, hasValue, oldValue);
    });
  }

  private handleEmailChange(
    value: unknown,
    oldValue: unknown,
    hasValue: boolean
  ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValid = false;

    if (
      hasValue &&
      typeof value === 'string' &&
      value.trim() &&
      oldValue !== value &&
      emailRegex.test(value.trim())
    ) {
      this.email = value.trim();
      this.onEmailChange();
    } else {
      this.showCheckBox = false;
    }
  }

  private loadContentWithFallback(lang: string) {
    loadContent(
      lang,
      this.environment,
      (ncData) => {
        this.isLoading = false;
        this.ncData = ncData;
        this.prepareCheckboxes();
      },
      () => this.defaultLoadContent()
    );
  }

  private handleLanguageOrEnvironmentChange(value: string) {
    if (['stage', 'prod'].includes(value)) {
      this.environment = value;
    } else {
      this.language = value;
    }

    const langPart = this.language?.split(/[-_]/)[0];
    this.isLoading = true;

    loadSettings(
      this.environment,
      (settings) => {
        this.countrySettings = settings.preferences;
        this.noticeOnly = settings.noticeOnly || ['us'];
        this.supportedLanguages = settings.supportedLanguages || {};

        const supportedLang =
          this.supportedLanguages[this.language?.toLowerCase() || ''] ||
          (langPart && this.supportedLanguages[langPart.toLowerCase()]) ||
          'en';

        this.loadContentWithFallback(supportedLang);
      },
      (err) => {
        console.error('Error loading settings', err);
        this.loadContentWithFallback('en');
      }
    );
  }

  private _dispatchChange(
    field: string,
    value: unknown,
    hasValue: boolean,
    oldValue?: unknown
  ) {
    const stringValue = typeof value === 'string' ? value : '';

    switch (field) {
      case 'questionchoices':
        this.prepareCheckboxes();
        this.setDefaultSelections();
        return;

      case 'language':
      case 'environment':
        this.handleLanguageOrEnvironmentChange(stringValue);
        return;

      case 'country':
        if (
          hasValue &&
          stringValue &&
          oldValue !== value &&
          this.countrySettings?.[stringValue.toLowerCase()]
        ) {
          this.countryChanged();
        }
        return;

      case 'enableAllOptIn':
        if (oldValue !== value && typeof value === 'string') {
          this.enableAllOptIn = JSON.parse(value);
          this.setDefaultSelections();
        }
        return;

      case 'hideErrorMessage':
        if (oldValue !== value && typeof value === 'string') {
          this.hideErrorMessage = JSON.parse(value);
          this.countryBasedLegalNotice();
        }
        return;

      case 'email':
        this.handleEmailChange(value, oldValue, hasValue);
        return;

      default:
        return;
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
        this.isLoading = false;
        this.emailValid = true;
        const { email: emailStatus, lastUpdated } = data;
        const annualPeriodDate = new Date(lastUpdated);

        const isValidDate = !isNaN(annualPeriodDate.getTime());
        const isExpired =
          isValidDate && emailStatus === 'P' && annualPeriodDate < oneYearAgo;

        // If bad date, treat as expired
        if (!isValidDate) {
          console.warn('Invalid annualPeriod:', lastUpdated);
          this.isAnnualPeriodExpired = true;
          this._handleEmailCheckFailure(data, true);
          return;
        }

        this.isAnnualPeriodExpired = emailStatus !== 'P' || isExpired;
        this.showCheckBox = isExpired || emailStatus !== 'P';

        this._onEmailStatusChanged('emailStats', {
          ...data,
          isAnnualPeriodExpired: isExpired,
        });
      },
      (error) => {
        this.emailValid = true;
        this.isLoading = false;
        console.error('checkEmailStatus error:', error);
        this._handleEmailCheckFailure(error, true);
      }
    );
  }

  /**
   * Centralized handler for failed or invalid responses.
   */
  private _handleEmailCheckFailure(responseData: any, expired: boolean) {
    this.isAnnualPeriodExpired = expired;
    this.showCheckBox = true;
    this.renderCombinedEmailPhoneSection();
    this._onEmailStatusChanged('emailStats', {
      ...responseData,
      isAnnualPeriodExpired: expired,
    });
  }

  private _initSettingsAndContent(language: string) {
    const [lang] = language.split(/[-_]/);
    const defaultLang =
      this.supportedLanguages[language?.toLocaleLowerCase()] ||
      this.supportedLanguages[lang?.toLocaleLowerCase()] ||
      'en';

    loadSettings(
      this.environment,
      (settings) => {
        this.countrySettings = settings.preferences;
        this.noticeOnly = settings.noticeOnly || ['us'];
        this.supportedLanguages = settings.supportedLanguages || {};
        this.doubleOptInCountries = settings.doubleOptInCountries || [];
      },
      () => this.defaultLoadSettings()
    );

    loadContent(
      defaultLang,
      this.environment,
      (ncData) => {
        this.ncData = ncData;
        this.prepareCheckboxes();
        this.countryChanged();
      },
      () => this.defaultLoadContent()
    );
  }

  countryChangeAction() {
    const countryCode = this.country?.toLowerCase();
    this.preventFormSubmission = false;

    const mandatory = this.ncData?.mandatoryCheckbox?.[countryCode];
    this.setDefaultSelections();
    if (mandatory) {
      // determine which field to update
      const mrsField =
        mandatory.countryTransferText?.mrs_field ||
        mandatory.chinaPIPLtext?.mrs_field;

      if (mrsField) {
        this._onChange(mrsField, 'countyBasedCheckedNo');
      }

      this.isMandatoryCheckboxDisplayed = {
        countryCode,
        isDisplayed: true,
      };

      this.preventFormSubmission = true;

      this._onChange('preventFormSubmission', 'formSubmissionNo');
    } else {
      this._onChange('preventFormSubmission', 'formSubmissionYes');
    }
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

  countryChanged() {
    resetToWorldWideContent();
    this.countryChangeAction();
  }

  setDefaultSelections() {
    if (this.enableAllOptIn || !this.checkboxes) {
      return;
    }

    const countryCode = this.country?.toLowerCase();
    const countryStatus = this.countrySettings?.[countryCode] ?? {
      email: 'opt-in',
      phone: 'opt-in',
    };

    const newValues = { ...this.values };
    for (const key of Object.keys(this.checkboxes)) {
      const isOptOut = countryStatus[key.toLowerCase()] === 'opt-out';
      newValues[key] = isOptOut;

      const hiddenFieldName = `NC_HIDDEN_${key}`;
      newValues[hiddenFieldName] = isOptOut ? 'OPT_OUT' : 'OPT_IN';

      if (Object.prototype.hasOwnProperty.call(this.defaultValues, key)) {
        newValues[key] = this.defaultValues[key];
      }

      this._onChange(hiddenFieldName, newValues[key] ? 'OPT_IN' : 'OPT_OUT');
    }

    const changed = Object.keys(newValues).some(
      (field) => newValues[field] !== this.values[field]
    );
    if (changed) {
      this.values = newValues;
    }
  }

  protected _buildCheckboxes() {
    const fieldElements: any = {};
    const fieldCollections = {
      EMAIL: {
        id: 'EMAIL',
        labelText: this.ncData?.email,
      },
      PHONE: {
        id: 'PHONE',
        labelText: this.ncData?.telephone,
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

  prepareCheckboxes() {
    if (this.ncData) {
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
        this.isLoading = false;
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
        this.supportedLanguages = settings.supportedLanguages || {};
      },
      (error) => {
        console.error('error loading content', error);
      }
    );
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

      this.valuesForEmailPhone[id]['checkBoxStatus'] = hiddenFieldStatus;
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
      this.valuesForEmailPhone[id]['punsStatus'] = statusPrechecked;

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

  combinedPreTextTemplate() {
    if (!this.ncData) {
      return html``;
    }

    const content = this.ncData;
    const country = this.country?.toLowerCase() || '';
    const state = this.state?.toLowerCase() || '';
    let preText = '';

    // 1. Base text depending on email
    if (!this.emailValid) {
      preText = content.annualDefaultText;
    } else {
      preText = this.showCheckBox
        ? content.combinedConsent
        : content.annualText;
    }

    // 2. country+state specific override
    const stateConfig = content.state?.[country];
    if (stateConfig) {
      if ((this.noticeOnly || []).includes(country)) {
        preText =
          state === 'ca' || state === ''
            ? stateConfig['ca']?.noticeOnly || content.noticeOnly
            : content.noticeOnly;
      } else {
        preText =
          stateConfig[state]?.combinedConsent || content.combinedConsent;
      }
    } else if ((this.noticeOnly || []).includes(country)) {
      preText =
        state === 'ca' || state === '' || typeof state === 'undefined'
          ? content.state?.[country]?.['ca']?.noticeOnly || content.noticeOnly
          : content.noticeOnly;
    }

    // 3. country content override if exists

    const countryContent = content.country?.[country];

    if (countryContent) {
      preText = !this.emailValid
        ? content.annualDefaultText
        : this.isAnnualPeriodExpired
        ? countryContent.combinedConsent
        : countryContent.annualText;
    }

    if (this.doubleOptInCountries.includes(country)) {
      const text =
        this.formType === 'marketing'
          ? content.mkDoubleOptInText
          : this.formType === 'newsletter'
          ? content.nlDoubleOptInText
          : '';
      if (text) {
        preText += ` <span part="double-opt-in-text">${text}</span>`;
      }
    }

    // 4. permission/suppression logic
    if (!(this.noticeOnly || []).includes(country)) {
      let isPermission = false;

      isPermission = this.values.EMAIL;

      const checked = isPermission;

      if (this.showCheckBox) {
        return this.renderCheckbox(preText, checked);
      }
    }

    return html`${unsafeHTML(preText)}`;
  }

  checkBoxLegalChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target) {
      return;
    }

    const isChecked = target.checked;

    // handle potential missing error element safely
    const errorEl =
      target.parentElement?.querySelector<HTMLSpanElement>('.nc-error');
    if (errorEl) {
      errorEl.style.display = isChecked ? 'none' : '';
    }

    const countryCode = this.country?.toLowerCase();
    const mandatoryCheckbox = this.ncData?.mandatoryCheckbox?.[countryCode];

    if (!mandatoryCheckbox) {
      console.warn('No mandatoryCheckbox for country:', countryCode);
      return;
    }

    const mrsField =
      mandatoryCheckbox.countryTransferText?.mrs_field ||
      mandatoryCheckbox.chinaPIPLtext?.mrs_field;

    if (!mrsField) {
      console.warn('No mrs_field found for country mandatory checkbox');
      return;
    }

    target.value = isChecked ? '1' : '0';
    this.preventFormSubmission = !isChecked;

    this._onChange(
      'preventFormSubmission',
      isChecked ? 'formSubmissionYes' : 'formSubmissionNo'
    );
    this._onChange(
      mrsField,
      isChecked ? 'countyBasedCheckedYes' : 'countyBasedCheckedNo'
    );
  }

  countryBasedLegalNotice() {
    const countryCode = this.country.toLowerCase();
    const mandatoryCheckboxes = this.ncData?.mandatoryCheckbox?.[
      countryCode
    ] as Record<string, MandatoryCheckbox> | undefined;

    if (!mandatoryCheckboxes) {
      return [];
    }

    return Object.entries(mandatoryCheckboxes).map(([key, checkbox]) => {
      const legalTextName = key.replace(/([A-Z]+)/g, '-$1').toLowerCase();

      const errorTemplate =
        !this.hideErrorMessage && this.preventFormSubmission
          ? html`<span
              class="nc-error"
              part="error"
              style="color:#da1e28;font-size:.75rem">
              ${checkbox.error}
            </span>`
          : null;

      return html`
        <span>
          <div
            class="${prefix}--form-item bx--checkbox-wrapper"
            part="checkbox-wrapper checkbox-wrapper--mandatory">
            <p part=${legalTextName} class=${legalTextName}>
              <input
                type="checkbox"
                class="${prefix}--checkbox"
                part="checkbox checkbox--mandatory"
                id="${checkbox.mrs_field}"
                name="${checkbox.mrs_field}"
                @change="${this.checkBoxLegalChange}" />
              <label
                for="${checkbox.mrs_field}"
                class="${prefix}--checkbox-label ${prefix}--nc__checkbox-${checkbox.mrs_field}"
                part="checkbox-label checkbox-label--mandatory">
                <span
                  class="${prefix}--checkbox-label-text"
                  part="checkbox-label-text checkbox-label-text--mandatory"
                  dir="auto">
                  ${checkbox.text}
                </span>
              </label>
              ${errorTemplate}
            </p>
          </div>
        </span>
      `;
    });
  }

  renderCombinedEmailPhoneSection() {
    const countryLower = this.country?.toLocaleLowerCase();
    const isNoticeOnly = (this.noticeOnly || []).includes(countryLower);

    const defaultCountryStatus = { email: 'opt-in', phone: 'opt-in' };
    const countryStatus =
      this.countrySettings?.[countryLower] || defaultCountryStatus;

    const getPunsStatus = (key: string, checked: boolean) => {
      if (isNoticeOnly) {
        return 'NOTICE_ONLY';
      }

      const checkboxStatus = this.valuesForEmailPhone[key]?.checkBoxStatus;

      if (checkboxStatus === 'SUPPRESSION') {
        return countryStatus.email === 'opt-out' ? 'CU' : 'UU';
      }
      return (
        this.valuesForEmailPhone[key]?.punsStatus || (checked ? 'CC' : 'UU')
      );
    };

    const createHiddenInput = (id: string, value: string) => html`
      <input type="hidden" id=${id} name=${id} value=${value} />
    `;

    const hiddenInputs = Object.keys(this.checkboxes).map((key) => {
      const checked = this.values.EMAIL;
      const punsStatus = getPunsStatus(key, checked);

      let hiddenValue =
        this.values[key]?.checkBoxStatus ??
        (this.values.EMAIL ? 'PERMISSION' : 'SUPPRESSION');

      if (typeof checked !== 'object') {
        this.combinedEmailPhonePrechecked = !!checked;
      }

      if (isNoticeOnly) {
        hiddenValue =
          countryStatus.email === 'opt-out' ? 'PERMISSION' : 'SUPPRESSION';
      }

      const hiddenBoxId = `NC_HIDDEN_${key}`;

      this._onChange(
        `NC_${key === 'PHONE' ? 'TELE' : key}_DETAIL`,
        `${key}_${punsStatus}`
      );
      this._onChange(`${hiddenBoxId}_VALUE`, `NC_HIDDEN_${hiddenValue}`);

      if (Object.keys(this.checkboxes).length === 1) {
        this._onChange(`NC_HIDDEN_PHONE_VALUE`, `NC_HIDDEN_PHONE_NONE`);
      }

      return createHiddenInput(hiddenBoxId, hiddenValue);
    });

    return html`
      <section class="${prefix}--nc" part="section">
        <p part="ncHeading" id="ncHeading" class="${c4dPrefix}--nc__pre-text">
          ${this.countryBasedLegalNotice()} ${this.combinedPreTextTemplate()}
        </p>
        ${hiddenInputs}
        <div part="${prefix}--nc__post-text" class="${prefix}--nc__post-text">
          ${this.postTextTemplate()}
        </div>
        ${createHiddenInput(
          'preventFormSubmission',
          String(this.preventFormSubmission)
        )}
      </section>
    `;
  }

  pwsFieldsMap = new Map<string, string>([
    ['NC_HIDDEN_EMAIL', 'permission_email'],
    ['NC_HIDDEN_PHONE', 'permission_phone'],
    ['preventFormSubmission', 'preventFormSubmission'],
    ['Q_CHINA_PIPL', 'Q_CHINA_PIPL'],
    ['Q_COUNTRY_TRANSFER', 'Q_COUNTRY_TRANSFER'],
    ['NC_HIDDEN_EMAIL_VALUE', 'NC_HIDDEN_EMAIL'],
    ['NC_HIDDEN_PHONE_VALUE', 'NC_HIDDEN_PHONE'],
    ['EMAIL_CU', 'EMAIL_CU'],
    ['EMAIL_CC', 'EMAIL_CC'],
    ['EMAIL_UC', 'EMAIL_UC'],
    ['EMAIL_UU', 'EMAIL_UU'],
    ['PHONE_CU', 'PHONE_CU'],
    ['PHONE_CC', 'PHONE_CC'],
    ['PHONE_UC', 'PHONE_UC'],
    ['PHONE_UU', 'PHONE_UU'],
    ['EMAIL_NOTICE_ONLY', 'EMAIL_NOTICE_ONLY'],
    ['PHONE_NOTICE_ONLY', 'PHONE_NOTICE_ONLY'],
    ['NC_HIDDEN_PHONE_NONE', 'NC_HIDDEN_PHONE_NONE'],
  ]);

  /**
   * Dispatch field change event to parent form
   */
  private dispatchCustomEvent(
    eventName: string,
    field: string,
    value: string | null
  ): void {
    try {
      const eventDetail = {
        bubbles: true,
        detail: {
          field,
          value,
        },
      };

      this.dispatchEvent(new CustomEvent(eventName, eventDetail));
    } catch (error) {
      console.error(`[${eventName}] dispatch failed:`, error);
    }
  }

  _onChange(field: string, value: string | null): void {
    const mappedField = this.pwsFieldsMap?.get(field) ?? field;
    const mappedValue = pwsValueMap?.(value) ?? value;

    this.dispatchCustomEvent(
      `${c4dPrefix}-notice-choice-change`,
      mappedField,
      mappedValue
    );
  }

  _onEmailStatusChanged(field: string, value: string | null): void {
    this.dispatchCustomEvent(
      `${c4dPrefix}-notice-choice-email-status-changed`,
      field,
      value
    );
  }

  render() {
    if (this.isLoading) {
      return html`<div part="skeleton-notice-choice">
        <cds-skeleton-text
          linecount="3"
          width="100%"
          paragraph="true"></cds-skeleton-text>
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
}
export default NoticeChoice;
