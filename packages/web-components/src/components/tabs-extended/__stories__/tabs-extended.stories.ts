/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import '../../card-group/index';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { ORIENTATION } from '../defs';
import readme from './README.stories.mdx';

const orientationType = {
  [`horizontal`]: ORIENTATION.HORIZONTAL,
  [`vertical`]: ORIENTATION.VERTICAL,
};

const copy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

export const Default = ({ parameters }) => {
  const { orientation } = parameters?.props?.TabsExtended ?? {};
  return html`
    <dds-tabs-extended orientation="${ifNonNull(orientation)}">
      <dds-tab
        label="First tab with long text that wraps multiple lines. Lorem ipsum dolor sit amet consectetur adipiscing elit"
        selected
      >
        <dds-content-block-media-content>
          <dds-content-item>
            <dds-content-item-heading>Content for first tab goes here.</dds-content-item-heading>
            <dds-content-item-copy>${copy}</dds-content-item-copy>
          </dds-content-item>

          <dds-card-link-cta slot="footer" href="https://example.com">
            <dds-card-link-heading>Lorem ipsum dolor sit amet</dds-card-link-heading>
            <dds-card-footer>
              ${ArrowRight20({ slot: 'icon' })}
            </dds-card-footer>
          </dds-card-link-cta>
        </dds-content-block-media-content>
      </dds-tab>
      <dds-tab label="Second tab - min amount for tooltip ">
        <dds-content-block-media-content>
          <dds-content-item>
            <dds-content-item-heading>Content for second tab goes here.</dds-content-item-heading>
            <dds-content-item-copy>${copy}</dds-content-item-copy>
          </dds-content-item>
        </dds-content-block-media-content>
      </dds-tab>
      <dds-tab label="Third tab">
        <p>Content for third tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fourth tab">
        <p>Content for fourth tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fifth tab" disabled>
        <p>Content for fifth tab goes here.</p>
      </dds-tab>
    </dds-tabs-extended>
  `;
};

export const WithCTABlockItemRows = ({ parameters }) => {
  const { orientation } = parameters?.props?.TabsExtended ?? {};
  return html`
    <dds-tabs-extended orientation="${orientation}">
      <dds-tab label="Relational">
        <dds-cta-block>
          <dds-content-block-copy size="md">
            <dds-content-block-paragraph>
              Use the relational database type for traditional applications such as enterprise resource planning, customer
              relationship management and e-commerce, along with ledger and audit forensics.
            </dds-content-block-paragraph>
          </dds-content-block-copy>
          <dds-cta-block-item-row>
            <dds-cta-block-item>
              <dds-content-item-heading>
                Db2
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Cloud
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/cloud/db2-on-cloud">
                  <span class="bx--link-text">IBM Db2 on Cloud</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
            <dds-cta-block-item>
              <dds-content-item-heading> </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Software
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/products/db2-database">
                  <span class="bx--link-text">IBM Db2 Database</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
            <dds-cta-block-item>
              <dds-content-item-heading>
                PostgreSQL
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Cloud
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/cloud/databases-for-postgresql">
                  <span class="bx--link-text">IBM Cloud Databases for PostgreSQL</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
          </dds-cta-block-item-row>
          <dds-cta-block-item-row>
            <dds-cta-block-item>
              <dds-content-item-heading>
                Enterprise DB
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Cloud
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/cloud/databases-for-enterprisedb">
                  <span class="bx--link-text">IBM Cloud Databases for EnterpriseDB</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
            <dds-cta-block-item>
              <dds-content-item-heading> </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Software
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/products/postgres-enterprise">
                  <span class="bx--link-text">EDB Postgres Enterprise and Standard with IBM</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
            <dds-cta-block-item>
              <dds-content-item-heading>
                MySQL
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Cloud
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/cloud/databases-for-mysql">
                  <span class="bx--link-text">IBM Cloud Databases for MySQL</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
          </dds-cta-block-item-row>
          <dds-cta-block-item-row>
            <dds-cta-block-item>
              <dds-content-item-heading>
                SingleStore
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Software
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/products/singlestore">
                  <span class="bx--link-text">SingleStore DB with IBM</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
          </dds-cta-block-item-row>
        </dds-cta-block>
      </dds-tab>
      <dds-tab label="Data warehouse">
        <dds-cta-block>
          <dds-content-block-copy size="md">
            <dds-content-block-paragraph>
              Use the data warehouse database type for analytical use cases such as data warehouses, data lakes and business
              intelligence.
            </dds-content-block-paragraph>
          </dds-content-block-copy>
          <dds-cta-block-item-row>
            <dds-cta-block-item>
              <dds-content-item-heading>
                Db2 Warehouse
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Cloud
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/cloud/db2-warehouse-on-cloud">
                  <span class="bx--link-text">IBM Db2 Data Warehouse on Cloud</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
            <dds-cta-block-item>
              <dds-content-item-heading> </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Software
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/products/db2-warehouse">
                  <span class="bx--link-text">IBM Db2 Data Warehouse</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
            <dds-cta-block-item>
              <dds-content-item-heading>
                Netezza
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Software
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/products/netezza">
                  <span class="bx--link-text">IBM Netezza Performance Server</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
          </dds-cta-block-item-row>
        </dds-cta-block>
      </dds-tab>
      <dds-tab label="Document">
        <dds-cta-block>
          <dds-content-block-copy size="md">
            <dds-content-block-paragraph>
              Use the document database type for content management, catalogs and user profiles, in addition to web and mobile
              apps.
            </dds-content-block-paragraph>
          </dds-content-block-copy>
          <dds-cta-block-item-row>
            <dds-cta-block-item>
              <dds-content-item-heading>
                MongoDB
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Cloud
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/cloud/databases-for-mongodb">
                  <span class="bx--link-text">IBM Cloud Databases for MongoDB</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
            <dds-cta-block-item>
              <dds-content-item-heading> </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Software
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/products/mongodb-enterprise-advanced">
                  <span class="bx--link-text">MongoDB Enterprise Advanced with IBM</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
            <dds-cta-block-item>
              <dds-content-item-heading>
                IBM Cloudant
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Cloud
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/cloud/cloudant">
                  <span class="bx--link-text">IBM Cloudant</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
          </dds-cta-block-item-row>
        </dds-cta-block>
      </dds-tab>
      <dds-tab label="Key value">
        <dds-cta-block>
          <dds-content-block-copy size="md">
            <dds-content-block-paragraph>
              Use the key value database type for distributed systems consensus.
            </dds-content-block-paragraph>
          </dds-content-block-copy>
          <dds-cta-block-item-row>
            <dds-cta-block-item>
              <dds-content-item-heading>
                etcd
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Cloud
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/cloud/databases-for-etcd">
                  <span class="bx--link-text">IBM Databases for etcd</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
          </dds-cta-block-item-row>
        </dds-cta-block>
      </dds-tab>
      <dds-tab label="Wide columnar">
        <dds-cta-block>
          <dds-content-block-copy size="md">
            <dds-content-block-paragraph>
              Use the wide columnar database type for high-scale industrial purposes, including logistics, transaction logging,
              equipment maintenance, fleet management and route optimization.
            </dds-content-block-paragraph>
          </dds-content-block-copy>
          <dds-cta-block-item-row>
            <dds-cta-block-item>
              <dds-content-item-heading>
                DataStax
              </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Cloud
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/cloud/databases-for-datastax?mhsrc=ibmsearch_a&amp;mhq=datastax">
                  <span class="bx--link-text">IBM Cloud Databases for DataStax</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
            <dds-cta-block-item>
              <dds-content-item-heading> </dds-content-item-heading>
              <dds-content-item-copy>
                <dds-content-item-paragraph>
                  Software
                </dds-content-item-paragraph>
              </dds-content-item-copy>
              <dds-video-cta-container>
                <a href="https://www.ibm.com/products/datastax-enterprise">
                  <span class="bx--link-text">DataStax Enterprise with IBM</span>
                  <span class="ibm_icon_arrowright_local"></span>
                </a>
              </dds-video-cta-container>
            </dds-cta-block-item>
          </dds-cta-block-item-row>
        </dds-cta-block>
      </dds-tab>
    </dds-tabs-extended>
  `;
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      TabsExtended: ({ groupId }) => ({
        orientation: select('Orientation (orientation):', orientationType, ORIENTATION.HORIZONTAL, groupId),
      }),
    },
    propsSet: {
      default: {
        TabsExtended: {
          orientation: 'horizontal',
        },
      },
    },
  },
};
