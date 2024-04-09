/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../../../leadspace/index';
import '../../../content-block-simple/index';
import '../../../content-group-simple/index';
import '../../../feature-card/index';
import '../../../card-section-simple/index';
import '../../../cta-section/index';
import '../../../link-list/index';
import '../../../cta/index';
import '../../../cta/link-list-item-cta';
import '../../../button/index';

import ArrowRight20 from '../../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import imgLg1x1 from '../../../../../.storybook/storybook-images/assets/960/fpo--1x1--960x960--006.jpg';
import leadspaceImg from '../../../../../.storybook/storybook-images/assets/leadspace/leadspaceMax2.jpg';

const copy = `Many organizations are engaging in open source technology to optimize their Linux environment.
The ability to integrate open systems with traditional or hybrid cloud IT infrastructure has a profound effect
on driving innovation and a growing number of IT professionals are actively participating in open source
communities as a way to stay at the forefront of development.`;

// This is just for the purposes of faking a move from one page to another, for
// the purposes of checking the behavior of the back to top button.
const FauxNextPage = html`
  <main>
    <div class="cds--grid cds--grid--narrow">
      <div class="cds--row">
        <div
          class="cds--col-sm-4 cds--col-md-8 cds--col-lg-12 cds--offset-lg-4">
          <c4d-content-block-simple complementary-style-scheme="with-border">
            <c4d-content-block-heading
              >Flexibility and control are the key to open source Linux
              development</c4d-content-block-heading
            >
            <c4d-content-block-copy allowHTML="false" size="sm"
              >${copy}</c4d-content-block-copy
            >
            <c4d-text-cta
              slot="footer"
              cta-type="local"
              href="https://example.com">
              Explore supply chain consulting services
            </c4d-text-cta>
          </c4d-content-block-simple>
        </div>
      </div>
    </div>
  </main>
`;

export const StoryContent = () =>
  html`
    <c4d-leadspace
      size="medium"
      gradient-style-scheme=""
      alt="Image alt text"
      default-src="${leadspaceImg}"
      data-autoid="c4d--leadspace">
      <c4d-leadspace-heading role="heading" aria-level="1" slot="heading"
        >Linux servers and operating systems</c4d-leadspace-heading
      >
      Optimize your IT infrastructure — on-premises and in the cloud — with the
      flexibility and control that comes with open source development
      <c4d-button-group
        slot="action"
        role="list"
        style="--c4d--button-group--item-count:2;">
        <c4d-button-group-item
          aria-label=""
          href="https://example.com"
          role="listitem"
          icon-layout=""
          kind="tertiary"
          size=""
          >Try it on premises<svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            slot="icon">
            <path
              d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path></svg
        ></c4d-button-group-item>
        <c4d-button-group-item
          aria-label=""
          href="https://example.com"
          role="listitem"
          icon-layout=""
          kind="primary"
          size=""
          >Try it on cloud<svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            slot="icon">
            <path
              d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path></svg
        ></c4d-button-group-item>
      </c4d-button-group>
      <c4d-leadspace-image
        slot="image"
        alt="Image alt text"
        default-src="${leadspaceImg}"
        data-autoid="c4d--image">
        <c4d-image-item
          media="(min-width: 672px)"
          srcset="${leadspaceImg}"></c4d-image-item>
        <c4d-image-item
          media="(min-width: 0)"
          srcset="${leadspaceImg}"></c4d-image-item>
      </c4d-leadspace-image>
    </c4d-leadspace>
    <main>
      <div class="cds--grid cds--grid--narrow">
        <div class="cds--row">
          <div
            class="cds--col-sm-4 cds--col-md-8 cds--col-lg-12 cds--offset-lg-4">
            <c4d-content-block-simple complementary-style-scheme="with-border">
              <c4d-content-block-heading
                >Flexibility and control are the key to open source Linux
                development</c4d-content-block-heading
              >
              <c4d-content-block-copy allowHTML="false" size="sm"
                >${copy}</c4d-content-block-copy
              >
              <c4d-text-cta
                slot="footer"
                cta-type="local"
                href="https://example.com">
                Explore supply chain consulting services
              </c4d-text-cta>
            </c4d-content-block-simple>
          </div>
        </div>
        <div class="cds--row">
          <div
            class="cds--col-sm-4 cds--col-md-8 cds--col-lg-12 cds--offset-lg-4">
            <c4d-content-block-simple>
              <c4d-content-block-heading
                >What sets IBM Linux servers apart?</c4d-content-block-heading
              >
              <c4d-link-list type="default" slot="complementary">
                <c4d-link-list-heading>Resources</c4d-link-list-heading>
                <c4d-link-list-item-cta
                  href="https://example.com"
                  cta-type="local"
                  type="default">
                  <p>Read the solution brief</p>
                </c4d-link-list-item-cta>
                <c4d-link-list-item-cta
                  href="https://example.com"
                  cta-type="external"
                  type="default">
                  <p>What is LinuxOne?</p>
                </c4d-link-list-item-cta>
              </c4d-link-list>
              <c4d-content-block-copy>
                <c4d-content-item>
                  <c4d-content-item-heading
                    >Industry-leading performance</c4d-content-item-heading
                  >
                  <c4d-content-item-copy
                    >Potential for 30% improvement in transactional response
                    time with fast data retrieval and queries, plus disk space
                    compression.</c4d-content-item-copy
                  >
                </c4d-content-item>
                <c4d-content-item>
                  <c4d-content-item-heading
                    >Advanced protection</c4d-content-item-heading
                  >
                  <c4d-content-item-copy
                    >Sophisticated authorization, encryption at rest and in
                    transit, and comprehensive security controls for managing
                    GDPR compliance.</c4d-content-item-copy
                  >
                </c4d-content-item>
                <c4d-content-item>
                  <c4d-content-item-heading
                    >Continuous availability</c4d-content-item-heading
                  >
                  <c4d-content-item-copy
                    >Auto resynchronization and recovery plus clustering with
                    IBM pureScale® to keep your business running
                    24x7.</c4d-content-item-copy
                  >
                </c4d-content-item>
                <c4d-content-item>
                  <c4d-content-item-heading
                    >Automated administration and
                    tooling</c4d-content-item-heading
                  >
                  <c4d-content-item-copy
                    >Automatic setup, optimization, diagnostics and management
                    of the database environment to save administration time and
                    cut maintenance costs.</c4d-content-item-copy
                  >
                </c4d-content-item>
                <c4d-content-item>
                  <c4d-content-item-heading
                    >Multiple data types and languages</c4d-content-item-heading
                  >
                  <c4d-content-item-copy
                    >Integration with multiple platforms to build robust apps.
                    Supports NoSQL, pureXML, Graph and JSON, Java, .Net, Ruby,
                    Python, Perl and more.</c4d-content-item-copy
                  >
                </c4d-content-item>
                <c4d-content-item>
                  <c4d-content-item-heading>Scaling</c4d-content-item-heading>
                  <c4d-content-item-copy
                    >Elastic scaling of up to 128 machines in multicloud and
                    hybrid environments to reduce storage costs, plus data
                    federation to eliminate data silos.</c4d-content-item-copy
                  >
                </c4d-content-item>
              </c4d-content-block-copy>
            </c4d-content-block-simple>
          </div>
        </div>
      </div>
      <div class="cds--grid cds--no-gutter">
        <div class="cds--row">
          <div
            class="cds--col-sm-4 cds--col-md-8 cds--col-lg-8 cds--offset-lg-4">
            <c4d-content-group-simple>
              <c4d-content-group-heading
                >See how it works</c4d-content-group-heading
              >
              <c4d-feature-card href="https://example.com">
                <c4d-image
                  slot="image"
                  alt="Feature card image"
                  default-src="${imgLg1x1}"></c4d-image>
                <c4d-card-heading
                  >Discover how innovative companies are using open source
                  technology to ignite collaboration</c4d-card-heading
                >
                <c4d-feature-card-footer>
                  ${ArrowRight20({ slot: 'icon' })}
                </c4d-feature-card-footer>
              </c4d-feature-card>
            </c4d-content-group-simple>
          </div>
        </div>
      </div>
      <div class="cds--grid cds--no-gutter">
        <div class="cds--row">
          <div class="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <c4d-card-section-simple>
              <c4d-content-section-heading
                >Linux operating systems</c4d-content-section-heading
              >
              <c4d-card-group>
                <c4d-card-group-item href="https://example.com">
                  <c4d-card-heading>Linux OS on mainframes</c4d-card-heading>
                  Linux on IBM mainframes lets you transform your application
                  and data portfolio with data privacy, security, and cyber
                  resiliency.
                  <c4d-card-footer>
                    ${ArrowRight20({ slot: 'icon' })}
                  </c4d-card-footer>
                </c4d-card-group-item>
                <c4d-card-group-item href="https://example.com">
                  <c4d-card-heading>Linux OS on LinuxONE</c4d-card-heading>
                  <p>
                    Transform your application and data portfolio with
                    innovative data privacy, security and cyber resiliency
                    capabilities, plus minimal downtime.
                  </p>
                  <c4d-card-footer>
                    ${ArrowRight20({ slot: 'icon' })}
                  </c4d-card-footer>
                </c4d-card-group-item>
                <c4d-card-group-item href="https://example.com">
                  <c4d-card-heading>Linux OS on Power Systems</c4d-card-heading>
                  <p>
                    Process massive amounts of data quickly, efficiently and
                    cost-effectively on an open, scalable infrastructure with
                    built-in acceleration.
                  </p>
                  <c4d-card-footer>
                    ${ArrowRight20({ slot: 'icon' })}
                  </c4d-card-footer>
                </c4d-card-group-item>
              </c4d-card-group>
            </c4d-card-section-simple>
          </div>
        </div>
      </div>

      <div class="cds--grid cds--no-gutter">
        <div class="cds--row">
          <div class="cds--col-sm-4 cds--col-md-8 cds--col-lg-16">
            <c4d-cta-section>
              <c4d-cta-block no-border>
                <c4d-content-block-heading
                  >Take the next step</c4d-content-block-heading
                >
                <c4d-content-block-copy
                  >Get started with Linux servers and operating systems at the
                  foundation of your IT infrastructure.</c4d-content-block-copy
                >
                <c4d-button-group
                  slot="action"
                  role="list"
                  style="--c4d--button-group--item-count:2;">
                  <c4d-button-group-item
                    aria-label=""
                    href="https://example.com"
                    role="listitem"
                    icon-layout=""
                    kind="tertiary"
                    size=""
                    >Try it on premises<svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      slot="icon">
                      <path
                        d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path></svg
                  ></c4d-button-group-item>
                  <c4d-button-group-item
                    aria-label=""
                    href="https://example.com"
                    role="listitem"
                    icon-layout=""
                    kind="primary"
                    size=""
                    >Try it on cloud<svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      slot="icon">
                      <path
                        d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path></svg
                  ></c4d-button-group-item>
                </c4d-button-group>
                <c4d-link-list slot="link-list" type="end">
                  <c4d-link-list-heading
                    >More ways to explore Linux servers</c4d-link-list-heading
                  >
                  <c4d-link-list-item href="https://example.com">
                    Products ${ArrowRight20({ slot: 'icon' })}
                  </c4d-link-list-item>
                  <c4d-link-list-item href="https://example.com">
                    Blogs ${ArrowRight20({ slot: 'icon' })}
                  </c4d-link-list-item>
                  <c4d-link-list-item href="https://example.com">
                    Latest research ${ArrowRight20({ slot: 'icon' })}
                  </c4d-link-list-item>
                  <c4d-link-list-item href="https://example.com">
                    Key concepts ${ArrowRight20({ slot: 'icon' })}
                  </c4d-link-list-item>
                  <c4d-link-list-item href="https://example.com">
                    Client stories ${ArrowRight20({ slot: 'icon' })}
                  </c4d-link-list-item>
                  <c4d-link-list-item href="https://example.com">
                    Training ${ArrowRight20({ slot: 'icon' })}
                  </c4d-link-list-item>
                  <c4d-link-list-item href="https://example.com">
                    Analyst insights ${ArrowRight20({ slot: 'icon' })}
                  </c4d-link-list-item>
                  <c4d-link-list-item href="https://example.com">
                    Events ${ArrowRight20({ slot: 'icon' })}
                  </c4d-link-list-item>
                  <c4d-link-list-item href="https://example.com">
                    Partners ${ArrowRight20({ slot: 'icon' })}
                  </c4d-link-list-item>
                </c4d-link-list>
              </c4d-cta-block>
            </c4d-cta-section>
          </div>
        </div>
      </div>
      <div class="cds--grid cds--grid--narrow">
        <div class="cds--row">
          <div
            class="cds--col-sm-4 cds--col-md-8 cds--col-lg-12 cds--offset-lg-4">
            <c4d-content-block-simple>
              <c4d-content-block-heading
                >Learn more by going to the next
                page?</c4d-content-block-heading
              >
              <c4d-content-block-copy>
                <c4d-button-expressive
                  kind="primary"
                  @click=${() => {
                    // @ts-ignore
                    const main: Element = document
                      .querySelector('c4d-dotcom-shell-container')
                      .querySelector('main');
                    render(FauxNextPage, main as HTMLElement);
                  }}>
                  Next page
                  <svg
                    slot="icon"
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20">
                    <path
                      d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
                  </svg>
                </c4d-button-expressive>
              </c4d-content-block-copy>
            </c4d-content-block-simple>
          </div>
        </div>
      </div>
    </main>
  `;

export default StoryContent;
