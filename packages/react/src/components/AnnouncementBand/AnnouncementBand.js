/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';

import AnnouncementBandAPI from '@carbon/ibmdotcom-services/es/services/AnnouncementBand/AnnouncementBand';
import { ArrowRight24 } from '@carbon/icons-react';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const AnnouncementBand = props => {
  let [bandData, setBandData] = useState({});
  let [locale, setLocale] = useState();
  useEffect(() => {
    let unmounted = false;
    if (props.customData) {
      setBandData(props.customData);
    } else {
      (async () => {
        try {
          const announcementBandData = await AnnouncementBandAPI.getTranslation();
          const localeData = await LocaleAPI.getLocale();
          if (!unmounted) {
            setBandData(announcementBandData.thinkBanner);
            setLocale(localeData.lc);
          }
        } catch (error) {
          console.error('Error populating announcement band data:', error);
        }
      })();
    }
    return () => {
      unmounted = true;
    };
  }, [props.customData]);

  if (bandData.active) {
    var videoString = null;
    if (bandData.content[locale ? locale : 'en'].videoUrl) {
      videoString = (
        <div className="video-background">
          <video autoPlay="autoplay" muted>
            <source
              type="video/webm"
              src={bandData.content[locale ? locale : 'en'].videoUrl}
            />
            {bandData.content[locale ? locale : 'en'].videoUrl2 && (
              <source
                type="video/mp4"
                src={bandData.content[locale ? locale : 'en'].videoUrl2}
              />
            )}
          </video>
        </div>
      );
    }
    return (
      <div
        data-autoid={`${stablePrefix}--announcement-banner`}
        id="think-banner-container">
        <a
          id="think-banner-link"
          className="ibm-blocklink ibm-alternate-background"
          href={bandData.content[locale ? locale : 'en'].ctaUrl}>
          <div id="think-banner-content">
            <div className={`ibm-columns ${prefix}--grid ibm-padding-bottom-0`}>
              <div id="think-banner-desktop">
                {videoString}
                <div className="flex align-center think-counter__container">
                  <div>
                    <span
                      className="ibm-bold ibm-h4-small counter-text"
                      dangerouslySetInnerHTML={{
                        __html: `${
                          bandData.content[locale ? locale : 'en']
                            .bannerTextLive1
                        } <br/>${
                          bandData.content[locale ? locale : 'en']
                            .bannerTextLive2
                        }`,
                      }}></span>
                  </div>
                </div>
                <Button renderIcon={ArrowRight24}>
                  {bandData.content[locale ? locale : 'en'].ctaLabel}
                </Button>
              </div>
              <div id="think-banner-mobile">
                <div className="flex align-center space-between">
                  <div className="flex align-center space-between">
                    <div className="flex align-center">
                      <div>
                        <span
                          className="ibm-bold ibm-h4-small counter-text"
                          dangerouslySetInnerHTML={{
                            __html: `${
                              bandData.content[locale ? locale : 'en']
                                .bannerTextLive1
                            } <br/>${
                              bandData.content[locale ? locale : 'en']
                                .bannerTextLive2
                            }`,
                          }}></span>
                      </div>
                    </div>
                    <ArrowRight24 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  } else {
    return null;
  }
};

export default AnnouncementBand;
