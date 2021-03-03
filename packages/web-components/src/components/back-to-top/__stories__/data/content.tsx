/* eslint-disable */
/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

// TODO: replace with proper React components once react-wrapper webpack.config.js loaders are correctly configured
const Content = () => (
  <main id="main-content">
    <section data-autoid="dds--tableofcontents" className="bx--tableofcontents bx--tableofcontents--white">
      <section data-autoid="dds--layout" className="bx--grid">
        <div className="bx--row">
          <div className="bx--tableofcontents__sidebar bx--col-lg-4">
            <div className="bx--tableofcontents__mobile-top"></div>
            <div style={{ position: 'sticky', top: `48px` }}>
              <div className="bx--tableofcontents__desktop" data-autoid="dds--tableofcontents__desktop">
                <ul>
                  <li
                    data-autoid="dds--tableofcontents__desktop__item-section-1"
                    className="bx--tableofcontents__desktop__item bx--tableofcontents__desktop__item--active">
                    <a href="#section-1" aria-current="location">
                      Lorem ipsum dolor sit amet
                    </a>
                  </li>
                  <li data-autoid="dds--tableofcontents__desktop__item-section-2" className="bx--tableofcontents__desktop__item">
                    <a href="#section-2">Pharetra pharetra massa massa ultricies mi quis.</a>
                  </li>
                  <li data-autoid="dds--tableofcontents__desktop__item-section-3" className="bx--tableofcontents__desktop__item">
                    <a href="#section-3">Elementum nibh tellus molestie nunc non</a>
                  </li>
                  <li data-autoid="dds--tableofcontents__desktop__item-section-4" className="bx--tableofcontents__desktop__item">
                    <a href="#section-4">Tincidunt ornare massa</a>
                  </li>
                  <li data-autoid="dds--tableofcontents__desktop__item-section-5" className="bx--tableofcontents__desktop__item">
                    <a href="#section-5">Lobortis elementum nibh tellus</a>
                  </li>
                  <li data-autoid="dds--tableofcontents__desktop__item-section-6" className="bx--tableofcontents__desktop__item">
                    <a href="#section-6">Aliquam condimentum interdum</a>
                  </li>
                  <li data-autoid="dds--tableofcontents__desktop__item-section-7" className="bx--tableofcontents__desktop__item">
                    <a href="#section-7">Duis aute irure dolor in reprehenderit</a>
                  </li>
                </ul>
              </div>
              <div className="bx--tableofcontents__mobile" data-autoid="dds--tableofcontents__mobile">
                <div className="bx--tableofcontents__mobile__select__wrapper">
                  <select className="bx--tableofcontents__mobile__select">
                    <option
                      className="bx--tableofcontents__mobile__select__option"
                      data-autoid="dds--tableofcontents__mobile__select__option-menuLabel"
                      value="menuLabel">
                      Jump to ...
                    </option>
                    <option
                      className="bx--tableofcontents__mobile__select__option"
                      data-autoid="dds--tableofcontents__mobile__select__option-section-1"
                      value="section-1">
                      Lorem ipsum dolor sit amet
                    </option>
                    <option
                      className="bx--tableofcontents__mobile__select__option"
                      data-autoid="dds--tableofcontents__mobile__select__option-section-2"
                      value="section-2">
                      Pharetra pharetra massa massa ultricies mi quis.
                    </option>
                    <option
                      className="bx--tableofcontents__mobile__select__option"
                      data-autoid="dds--tableofcontents__mobile__select__option-section-3"
                      value="section-3">
                      Elementum nibh tellus molestie nunc non
                    </option>
                    <option
                      className="bx--tableofcontents__mobile__select__option"
                      data-autoid="dds--tableofcontents__mobile__select__option-section-4"
                      value="section-4">
                      Tincidunt ornare massa
                    </option>
                    <option
                      className="bx--tableofcontents__mobile__select__option"
                      data-autoid="dds--tableofcontents__mobile__select__option-section-5"
                      value="section-5">
                      Lobortis elementum nibh tellus
                    </option>
                    <option
                      className="bx--tableofcontents__mobile__select__option"
                      data-autoid="dds--tableofcontents__mobile__select__option-section-6"
                      value="section-6">
                      Aliquam condimentum interdum
                    </option>
                    <option
                      className="bx--tableofcontents__mobile__select__option"
                      data-autoid="dds--tableofcontents__mobile__select__option-section-7"
                      value="section-7">
                      Duis aute irure dolor in reprehenderit
                    </option>
                  </select>
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    aria-label="menu icon"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    role="img"
                    className="bx--tableofcontents__mobile__select__icon">
                    <path d="M4 6H22V8H4zM4 12H22V14H4zM4 18H22V20H4zM4 24H22V26H4zM26 6H28V8H26zM26 12H28V14H26zM26 18H28V20H26zM26 24H28V26H26z"></path>
                    <title>menu icon</title>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="bx--tableofcontents__content bx--col-lg-12">
            <div className="bx--tableofcontents__content-wrapper">
              <section data-autoid="dds--layout" className="bx--grid">
                <div className="bx--row">
                  <div className="bx--layout-2-3">
                    <div data-autoid="dds--leadspace-block" className="bx--leadspace-block">
                      <div>
                        <h1 data-autoid="dds--leadspace-block__title" className="bx--leadspace-block__title">
                          Lorem ipsum dolor sit amet
                        </h1>
                      </div>
                      <div data-autoid="dds--content-block" className="bx--content-block">
                        <div>
                          <h2 data-autoid="dds--content-block__heading" className="bx--content-block__heading bx--fade-in">
                            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
                          </h2>
                        </div>
                        <div className="bx--content-block__copy bx--fade-in">
                          <p>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                          </p>
                        </div>
                        <div data-autoid="dds--content-block__children" className="bx--content-block__children">
                          <div data-autoid="dds--leadspace-block__media" className="bx--leadspace-block__media bx--fade-in">
                            <div aria-label="Test Video - 1:1 (0:18)" className="bx--video-player">
                              <div
                                className="bx--video-player__video-container "
                                data-autoid="dds--video-player__video-1_9h94wo6b">
                                <div className="bx--video-player__video" id="bx--video-player__video-1_9h94wo6b-21">
                                  <button
                                    className="bx--video-player__image-overlay"
                                    data-autoid="dds--video-player__image-overlay">
                                    <div className="bx--image bx--fade-in" data-autoid="dds--image__longdescription">
                                      <picture>
                                        <img
                                          className="bx--image__img"
                                          src="https://cdnsecakmi.kaltura.com/p/1773841/thumbnail/entry_id/1_9h94wo6b/width/655"
                                          alt="Test Video - 1:1"
                                        />
                                      </picture>
                                      <svg
                                        className="bx--image__icon"
                                        width="64"
                                        height="64"
                                        viewBox="0 0 64 64"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <title>Group 3</title>
                                        <g fill="none" fill-rule="evenodd">
                                          <circle fill-opacity=".9" fill="#525252" cx="32" cy="32" r="32"></circle>
                                          <path
                                            d="M26.556 43.111a1 1 0 0 1-1-1v-22a1 1 0 0 1 1.5-.87l19 11a1 1 0 0 1 0 1.74l-19 11a1 1 0 0 1-.5.13z"
                                            fill="#F3F3F3"
                                            fill-rule="nonzero"></path>
                                        </g>
                                      </svg>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bx--link-list bx--fade-in" data-autoid="dds--link-list">
                            <h4 className="bx--link-list__heading">Featured products</h4>
                            <ul className="bx--link-list__list bx--link-list__list--vertical-end">
                              <li className="bx--link-list__list__CTA bx--link-list__list--local">
                                <div>
                                  <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                                    <a href="https://ibm.com" className="bx--link bx--link-with-icon">
                                      <span>IBM Cloud Continuous Delivery</span>
                                      <svg
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true">
                                        <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="bx--link-list__list__CTA bx--link-list__list--local">
                                <div>
                                  <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                                    <a href="https://ibm.com" className="bx--link bx--link-with-icon">
                                      <span>UrbanCode</span>
                                      <svg
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true">
                                        <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="bx--link-list__list__CTA bx--link-list__list--local">
                                <div>
                                  <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                                    <a href="https://ibm.com" className="bx--link bx--link-with-icon">
                                      <span>View all products</span>
                                      <svg
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true">
                                        <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="bx--leadspace-block__cta bx--leadspace-block__cta-col bx--fade-in">
                            <ol className="bx--buttongroup" data-autoid="dds--button-group">
                              <li className="bx--buttongroup-item">
                                <a
                                  data-autoid="dds--button-group-0"
                                  className="bx--btn bx--btn--primary"
                                  href="https://example.com/">
                                  Excepteur sint occaecat
                                  <svg
                                    focusable="false"
                                    preserveAspectRatio="xMidYMid meet"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    aria-label="right arrow icon"
                                    aria-hidden="true"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    role="img"
                                    className="bx--btn__icon">
                                    <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                                  </svg>
                                </a>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <hr data-autoid="dds--hr" className="bx--hr" />
                    </div>
                  </div>
                </div>
              </section>
              <div data-autoid="dds--content-block-segmented" className="bx--content-block-segmented">
                <div data-autoid="dds--content-block" className="bx--content-block">
                  <div>
                    <h2 data-autoid="dds--content-block__heading" className="bx--content-block__heading bx--fade-in">
                      Pharetra pharetra massa massa ultricies mi quis.
                    </h2>
                  </div>
                  <div data-autoid="dds--content-block__children" className="bx--content-block__children">
                    <div className="bx--content-group bx--fade-in" data-autoid="dds--content-group">
                      <h3 data-autoid="dds--content-group__title" className="bx--content-group__title">
                        A scelerisque purus semper eget duis at tellus.
                      </h3>
                      <div
                        data-autoid="dds--content-group__children"
                        className="bx--content-group__col bx--content-group__children">
                        <div data-autoid="dds--content-block-segmented__content-group">
                          <div className="bx--content-item bx--fade-in" data-autoid="dds--content-item">
                            <div data-autoid="dds--content-item__copy" className="bx--content-item__copy">
                              <p>
                                Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada
                                fames.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div data-autoid="dds--content-group__cta" className="bx--content-group__cta-row">
                        <div className="bx--content-group__cta">
                          <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                            <a href="https://example.com" className="bx--link bx--link-with-icon">
                              <span>Lorem Ipsum dolor sit</span>
                              <svg
                                focusable="false"
                                preserveAspectRatio="xMidYMid meet"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                aria-hidden="true">
                                <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bx--content-group bx--fade-in" data-autoid="dds--content-group">
                      <h3 data-autoid="dds--content-group__title" className="bx--content-group__title">
                        A scelerisque purus semper eget duis at tellus.
                      </h3>
                      <div
                        data-autoid="dds--content-group__children"
                        className="bx--content-group__col bx--content-group__children">
                        <div data-autoid="dds--content-block-segmented__content-group">
                          <div className="bx--content-item bx--fade-in" data-autoid="dds--content-item">
                            <div data-autoid="dds--content-item__copy" className="bx--content-item__copy">
                              <p>
                                Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada
                                fames.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bx--content-group bx--fade-in" data-autoid="dds--content-group">
                      <h3 data-autoid="dds--content-group__title" className="bx--content-group__title">
                        A scelerisque purus semper eget duis at tellus.
                      </h3>
                      <div
                        data-autoid="dds--content-group__children"
                        className="bx--content-group__col bx--content-group__children">
                        <div data-autoid="dds--content-block-segmented__content-group">
                          <div className="bx--content-item bx--fade-in" data-autoid="dds--content-item">
                            <div data-autoid="dds--content-item__copy" className="bx--content-item__copy">
                              <p>
                                Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada
                                fames.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div data-autoid="dds--content-group__cta" className="bx--content-group__cta-row">
                        <div className="bx--content-group__cta">
                          <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                            <a href="https://example.com" className="bx--link bx--link-with-icon">
                              <span>Lorem Ipsum dolor sit</span>
                              <svg
                                focusable="false"
                                preserveAspectRatio="xMidYMid meet"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                aria-hidden="true">
                                <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bx--content-group bx--fade-in" data-autoid="dds--content-group">
                      <h3 data-autoid="dds--content-group__title" className="bx--content-group__title">
                        A scelerisque purus semper eget duis at tellus.
                      </h3>
                      <div
                        data-autoid="dds--content-group__children"
                        className="bx--content-group__col bx--content-group__children">
                        <div data-autoid="dds--content-block-segmented__content-group">
                          <div className="bx--content-item bx--fade-in" data-autoid="dds--content-item">
                            <div data-autoid="dds--content-item__copy" className="bx--content-item__copy">
                              <p>
                                Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada
                                fames.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div data-autoid="dds--callout-with-media" className="bx--callout-with-media bx--fade-in">
                <section className="bx--callout__container" data-autoid="dds--callout__container">
                  <div className="bx--callout__column" data-autoid="dds--callout__column">
                    <div className="bx--callout__content" data-autoid="dds--callout__content">
                      <div data-autoid="dds--content-block-simple" className="bx--content-block-simple">
                        <div data-autoid="dds--content-block" className="bx--content-block">
                          <div>
                            <h2 data-autoid="dds--content-block__heading" className="bx--content-block__heading bx--fade-in">
                              Mauris ultrices eros in cursus
                            </h2>
                          </div>
                          <div data-autoid="dds--content-block__children" className="bx--content-block__children">
                            <div className="bx--content-block-simple__content">
                              <div className="bx--content-item bx--fade-in" data-autoid="dds--content-item">
                                <div data-autoid="dds--content-item__copy" className="bx--content-item__copy">
                                  <p>
                                    Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada proin libero nunc
                                    consequat. In est ante in nibh mauris cursus mattis. Turpis tincidunt id aliquet risus feugiat
                                    in. Vel facilisis volutpat est velit egestas dui.
                                  </p>
                                </div>
                              </div>
                              <div
                                data-autoid="dds--content-block-simple__media"
                                className="bx--content-block-simple__media-video">
                                <div aria-label="Test Video - 1:1 (0:18)" className="bx--video-player">
                                  <div
                                    className="bx--video-player__video-container "
                                    data-autoid="dds--video-player__video-1_9h94wo6b">
                                    <div className="bx--video-player__video" id="bx--video-player__video-1_9h94wo6b-19">
                                      <button
                                        className="bx--video-player__image-overlay"
                                        data-autoid="dds--video-player__image-overlay">
                                        <div className="bx--image bx--fade-in" data-autoid="dds--image__longdescription">
                                          <picture>
                                            <img
                                              className="bx--image__img"
                                              src="https://cdnsecakmi.kaltura.com/p/1773841/thumbnail/entry_id/1_9h94wo6b/width/655"
                                              alt="Test Video - 1:1"
                                            />
                                          </picture>
                                          <svg
                                            className="bx--image__icon"
                                            width="64"
                                            height="64"
                                            viewBox="0 0 64 64"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <title>Group 3</title>
                                            <g fill="none" fill-rule="evenodd">
                                              <circle fill-opacity=".9" fill="#525252" cx="32" cy="32" r="32"></circle>
                                              <path
                                                d="M26.556 43.111a1 1 0 0 1-1-1v-22a1 1 0 0 1 1.5-.87l19 11a1 1 0 0 1 0 1.74l-19 11a1 1 0 0 1-.5.13z"
                                                fill="#F3F3F3"
                                                fill-rule="nonzero"></path>
                                            </g>
                                          </svg>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div data-autoid="dds--content-group-horizontal" className="bx--content-group-horizontal">
                <div data-autoid="dds--content-block" className="bx--content-block">
                  <div>
                    <h2 data-autoid="dds--content-block__heading" className="bx--content-block__heading bx--fade-in">
                      Tincidunt ornare massa
                    </h2>
                  </div>
                  <div data-autoid="dds--content-block__children" className="bx--content-block__children">
                    <div
                      className="bx--content-item-horizontal__item bx--fade-in"
                      data-autoid="dds--content-item-horizontal__item">
                      <div className="bx--content-item-horizontal__row">
                        <div className="bx--content-item-horizontal__col">
                          <p
                            className="bx--content-item-horizontal__item--eyebrow"
                            data-autoid="dds--content-item-horizontal__item--eyebrow">
                            Lorem ipsum
                          </p>
                          <h3
                            className="bx--content-item-horizontal__item--heading"
                            data-autoid="dds--content-item-horizontal__item--heading">
                            Aliquam condimentum
                          </h3>
                        </div>
                        <div className="bx--content-item-horizontal__col">
                          <div
                            className="bx--content-item-horizontal__item--copy"
                            data-autoid="dds--content-item-horizontal__item--copy">
                            <p>
                              Lorem ipsum dolor sit amet, <em>consectetur</em> adipiscing elit. Aenean et ultricies est. Mauris
                              iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.
                            </p>
                          </div>
                          <div
                            className="bx--content-item-horizontal__item--cta"
                            data-autoid="dds--content-item-horizontal__item--cta">
                            <div className="bx--link-list bx--fade-in" data-autoid="dds--link-list">
                              <h4 className="bx--link-list__heading">Aliquam condimentum</h4>
                              <ul className="bx--link-list__list bx--link-list__list--vertical">
                                <li className="bx--link-list__list__CTA bx--link-list__list--local">
                                  <div>
                                    <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                                      <a href="https://example.com" className="bx--link bx--link-with-icon">
                                        <span>Link text</span>
                                        <svg
                                          focusable="false"
                                          preserveAspectRatio="xMidYMid meet"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="currentColor"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          aria-hidden="true">
                                          <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </li>
                                <li className="bx--link-list__list__CTA bx--link-list__list--external">
                                  <div>
                                    <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                                      <a
                                        href="https://example.com"
                                        className="bx--link bx--link-with-icon"
                                        rel="noopener"
                                        target="_blank">
                                        <span>External link text</span>
                                        <svg
                                          focusable="false"
                                          preserveAspectRatio="xMidYMid meet"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="currentColor"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 32 32"
                                          aria-hidden="true">
                                          <path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"></path>
                                          <path d="M20 2L20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2z"></path>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bx--content-item-horizontal__item bx--fade-in"
                      data-autoid="dds--content-item-horizontal__item">
                      <div className="bx--content-item-horizontal__row">
                        <div className="bx--content-item-horizontal__col">
                          <p
                            className="bx--content-item-horizontal__item--eyebrow"
                            data-autoid="dds--content-item-horizontal__item--eyebrow">
                            Lorem ipsum
                          </p>
                          <h3
                            className="bx--content-item-horizontal__item--heading"
                            data-autoid="dds--content-item-horizontal__item--heading">
                            Aliquam condimentum
                          </h3>
                        </div>
                        <div className="bx--content-item-horizontal__col">
                          <div
                            className="bx--content-item-horizontal__item--copy"
                            data-autoid="dds--content-item-horizontal__item--copy">
                            <p>
                              Lorem ipsum dolor sit amet, <em>consectetur</em> adipiscing elit. Aenean et ultricies est. Mauris
                              iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.
                            </p>
                          </div>
                          <div
                            className="bx--content-item-horizontal__item--cta"
                            data-autoid="dds--content-item-horizontal__item--cta">
                            <div className="bx--link-list bx--fade-in" data-autoid="dds--link-list">
                              <h4 className="bx--link-list__heading">Aliquam condimentum</h4>
                              <ul className="bx--link-list__list bx--link-list__list--vertical">
                                <li className="bx--link-list__list__CTA bx--link-list__list--local">
                                  <div>
                                    <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                                      <a href="https://example.com" className="bx--link bx--link-with-icon">
                                        <span>Link text</span>
                                        <svg
                                          focusable="false"
                                          preserveAspectRatio="xMidYMid meet"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="currentColor"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          aria-hidden="true">
                                          <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </li>
                                <li className="bx--link-list__list__CTA bx--link-list__list--external">
                                  <div>
                                    <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                                      <a
                                        href="https://example.com"
                                        className="bx--link bx--link-with-icon"
                                        rel="noopener"
                                        target="_blank">
                                        <span>External link text</span>
                                        <svg
                                          focusable="false"
                                          preserveAspectRatio="xMidYMid meet"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="currentColor"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 32 32"
                                          aria-hidden="true">
                                          <path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"></path>
                                          <path d="M20 2L20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2z"></path>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr data-autoid="dds--hr" className="bx--hr" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <div className="bx--grid" style={{ backgroundColor: `rgb(244, 244, 244)` }}>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <section
            data-autoid="dds--cta-section"
            className="bx--cta-section bx--cta-section__has-items bx--cta-section--g10 bx--fade-out">
            <div data-autoid="dds--content-block" className="bx--content-block">
              <div>
                <h2 data-autoid="dds--content-block__heading" className="bx--content-block__heading bx--fade-out">
                  Take the next step
                </h2>
              </div>
              <div className="bx--content-block__copy bx--fade-out">
                <p>Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.</p>
              </div>
              <div data-autoid="dds--content-block__children" className="bx--content-block__children"></div>
            </div>
            <div className="bx--cta-section__cta bx--fade-out">
              <ol className="bx--buttongroup" data-autoid="dds--button-group">
                <li className="bx--buttongroup-item">
                  <a data-autoid="dds--button-group-0" className="bx--btn bx--btn--primary" href="https://example.com/">
                    Contact sales
                    <svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      aria-label="right arrow icon"
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      role="img"
                      className="bx--btn__icon">
                      <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                    </svg>
                  </a>
                </li>
              </ol>
            </div>
            <div className="bx--helper-wrapper">
              <div className="bx--content-item-wrapper">
                <div className="bx--content-item bx--fade-out" data-autoid="dds--content-item">
                  <h4 data-autoid="dds--content-item__heading" className="bx--content-item__heading">
                    Get connected
                  </h4>
                  <div data-autoid="dds--content-item__copy" className="bx--content-item__copy" style={{ height: `72px` }}>
                    <p>IBM DevOps partners have a wide range of expertise. Find one to build the right solution for you.</p>
                  </div>
                  <div className="bx--content-item__cta">
                    <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                      <a href="https://example.com/" className="bx--link bx--link-with-icon">
                        <span>Find a partner</span>
                        <svg
                          focusable="false"
                          preserveAspectRatio="xMidYMid meet"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          aria-hidden="true">
                          <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bx--content-item bx--fade-out" data-autoid="dds--content-item">
                  <h4 data-autoid="dds--content-item__heading" className="bx--content-item__heading">
                    Learn how
                  </h4>
                  <div data-autoid="dds--content-item__copy" className="bx--content-item__copy" style={{ height: `72px` }}>
                    <p>Dig into more self-directed learning about DevOps methodologies.</p>
                  </div>
                  <div className="bx--content-item__cta">
                    <div className="bx--link-with-icon__container" data-autoid="dds--link-with-icon">
                      <a href="https://example.com/" className="bx--link bx--link-with-icon">
                        <span>Browse tutorials</span>
                        <svg
                          focusable="false"
                          preserveAspectRatio="xMidYMid meet"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          aria-hidden="true">
                          <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
);

export default Content;
