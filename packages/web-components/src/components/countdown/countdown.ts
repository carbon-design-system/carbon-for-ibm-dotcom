/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale.js';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';

const { stablePrefix: c4dPrefix } = settings;

const ms_per = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
};

const units = Object.keys(ms_per);

const getFormatters = (locale: Locale, labelType: UnitDisplay) => {
  const lc_cc = `${locale.lc}-${locale.cc}`;

  // The Typescript compiler sees unitDisplay as type
  // "short" | "long" | "narrow" | undefined. Convert 'none' to undefined to
  // avoid passing an unknown value to the unitDisplay option.
  if (labelType === 'none') {
    labelType = undefined;
  }

  return Object.fromEntries(
    units.map((unit) => [
      `to_${unit}s`,
      new Intl.NumberFormat(lc_cc, {
        style: 'unit',
        unit,
        unitDisplay: labelType,
        minimumIntegerDigits: unit === 'day' ? 1 : 2,
        // Force latin numerals. This fits for all current locales
        // supported on ibm.com with the added benefit of forcing preferred
        // latin numerals on sa-ar. In the future, if necessary, we could
        // expose this options object as a property which we would merge with
        // our defaults here, allowing clients to override our options.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        numberingSystem: 'latn',
      }),
    ])
  ) as FormattersList;
};

type TimeDiff = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type FormattersList = {
  to_days: Intl.NumberFormat;
  to_hours: Intl.NumberFormat;
  to_minutes: Intl.NumberFormat;
  to_seconds: Intl.NumberFormat;
};

type Locale = {
  lc: string;
  cc: string;
};

type UnitDisplay = 'short' | 'narrow' | 'long' | 'none' | undefined;

/**
 * The Countdown component.
 * @element c4d-countdown
 */
@customElement(`${c4dPrefix}-countdown`)
class C4DCountdown extends MediaQueryMixin(LitElement, {
  [MQBreakpoints.MD]: MQDirs.MIN,
}) {
  @state()
  isMdOrLarger = this.carbonBreakpoints.md.matches;

  @state()
  timeDiff?: TimeDiff;

  @state()
  targetDateTime?: number;

  @state()
  locale: Locale = {
    lc: 'en',
    cc: 'us',
  };

  /**
   * The target date, either in date time string format (ISO 8601), or UNIX timestamp.
   */
  @property({ attribute: 'target' })
  targetInput?: string;

  /**
   * Optional date parts separator.
   */
  @property({ attribute: 'separator' })
  separator?: string;

  /**
   * Optional date parts label type. One of 'short', 'narrow', 'long', or 'none'.
   */
  @property({ attribute: 'label-type' })
  labelType: UnitDisplay = 'long';

  _clock?;

  _formatters: FormattersList = getFormatters(this.locale, this.labelType);

  calculateDiff() {
    const { targetDateTime } = this;
    const now = Date.now();
    let diff = (targetDateTime ?? 0) - now;

    if (diff < 0) {
      clearInterval(this._clock);

      this.timeDiff = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      return;
    }

    const days = Math.floor(diff / ms_per.day);
    diff = diff - days * ms_per.day;

    const hours = Math.floor(diff / ms_per.hour);
    diff = diff - hours * ms_per.hour;

    const minutes = Math.floor(diff / ms_per.minute);
    diff = diff - minutes * ms_per.minute;

    const seconds = Math.floor(diff / ms_per.second);

    this.timeDiff = { days, hours, minutes, seconds };
  }

  _padInt(int: number, padLength: number) {
    return int.toString().padStart(padLength, '0');
  }

  formatOutput(): string {
    const {
      _formatters: formatters,
      timeDiff,
      separator,
      labelType,
      isMdOrLarger,
      _padInt: padInt,
    } = this;

    if (timeDiff === undefined) {
      return '';
    }

    const { days, hours, minutes, seconds } = timeDiff;

    let values;

    if (labelType === 'none') {
      values = [days, hours, minutes, seconds].join(separator ?? '');
    } else {
      const { to_days, to_hours, to_minutes, to_seconds } = formatters;

      values = isMdOrLarger
        ? [
            to_days.format(days),
            to_hours.format(hours),
            to_minutes.format(minutes),
            to_seconds.format(seconds),
          ].join(separator ?? '')
        : `${to_days.format(days)} ${padInt(hours, 2)}:${padInt(
            minutes,
            2
          )}:${padInt(seconds, 2)}`;
    }

    return values;
  }

  protected mediaQueryCallbackMD() {
    this.isMdOrLarger = this.carbonBreakpoints.md.matches;
  }

  async firstUpdated() {
    super.firstUpdated();
    this.style.display = 'contents';
    this.locale = await LocaleAPI.getLocale();
  }

  updated(changedProperties) {
    if (changedProperties.has('targetInput')) {
      let target = new Date(this.targetInput as string);
      const epochTime = parseInt(this.targetInput as string);

      // If date is invalid and epochTime is a valid number, assume a valid
      // epochTime and create a new Date from it.
      if (isNaN(target.valueOf()) && !isNaN(epochTime)) {
        target = new Date(epochTime);
      }

      if (!isNaN(target.valueOf())) {
        this.targetDateTime = target.getTime();
      }
    }

    if (changedProperties.has('targetDateTime')) {
      clearInterval(this._clock);
      this._clock = setInterval(this.calculateDiff.bind(this), 1000);
    }

    if (changedProperties.has('locale') || changedProperties.has('labelType')) {
      this._formatters = getFormatters(this.locale, this.labelType);
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html` ${this.formatOutput()} `;
  }
}

export default C4DCountdown;
