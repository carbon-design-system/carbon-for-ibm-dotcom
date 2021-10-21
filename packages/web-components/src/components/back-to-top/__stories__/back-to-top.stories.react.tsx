/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import DDSBackToTop from '@carbon/ibmdotcom-web-components/es/components-react/back-to-top/back-to-top';
import DDSLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
import DDSLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import DDSCTASection from '@carbon/ibmdotcom-web-components/es/components-react/cta-section/cta-section';
import DDSCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
/* eslint-disable max-len */
import DDSContentBlockSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-block-simple/content-block-simple';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import React from 'react';
import readme from './README.stories.react.mdx';
import styles from './back-to-top.stories.scss';

const copy = `The popularity of responsive web design has led to a proliferation of single-column,
long-page designs both on mobile and desktop. A consequence of these designs has been the
“Back to Top” button, which is a shortcut that allows users to quickly navigate to the top of the page.

Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Ambitioni dedisse scripsisse iudicaretur.
Etiam habebis sem dicantur magna mollis euismod.

Praeterea iter est quasdam res quas ex communi. A communi observantia non est recedendum. Nihilne te
nocturnum praesidium Palati, nihil urbis vigiliae. Quo usque tandem abutere, Catilina, patientia nostra?
Donec sed odio operae, eu vulputate felis rhoncus. Cras mattis iudicium purus sit amet fermentum. Quis
aute iure reprehenderit in voluptate velit esse. Fictum, deserunt mollit anim laborum astutumque!
Curabitur est gravida et libero vitae dictum. Excepteur sint obcaecat cupiditat non proident culpa.

Qui ipsorum lingua Celtae, nostra Galli appellantur. Pellentesque habitant morbi tristique senectus
et netus. Inmensae subtilitatis, obscuris et malesuada fames. Quis aute iure reprehenderit in voluptate
velit esse. Hi omnes lingua, institutis, legibus inter se differunt. Excepteur sint obcaecat cupiditat
non proident culpa. Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh. Curabitur est gravida
et libero vitae dictum. Curabitur blandit tempus ardua ridiculus sed magna. Vivamus sagittis lacus vel
augue laoreet rutrum faucibus. Praeterea iter est quasdam res quas ex communi. Fabio vel iudice vincam,
sunt in culpa qui officia. Cum sociis natoque penatibus et magnis dis parturient. Donec sed odio operae,
eu vulputate felis rhoncus. Mercedem aut nummos unde unde extricat, amaras.

Praeterea iter est quasdam res quas ex communi. A communi observantia non est recedendum. Nihilne te
nocturnum praesidium Palati, nihil urbis vigiliae. Quo usque tandem abutere, Catilina, patientia nostra?
Donec sed odio operae, eu vulputate felis rhoncus. Cras mattis iudicium purus sit amet fermentum. Quis
aute iure reprehenderit in voluptate velit esse. Fictum, deserunt mollit anim laborum astutumque!
Curabitur est gravida et libero vitae dictum. Excepteur sint obcaecat cupiditat non proident culpa.

Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh. Magna pars studiorum, prodita quaerimus.
Quisque placerat facilisis egestas cillum dolore. At nos hinc posthac, sitientis piros Afros. Cum sociis
natoque penatibus et magnis dis parturient. Nec dubitamus multa iter quae et nos invenerat. Plura mihi
bona sunt, inclinet, amari petere vellent. Phasellus laoreet lorem vel dolor tempus vehicula.

Praeterea iter est quasdam res quas ex communi. A communi observantia non est recedendum. Nihilne te
nocturnum praesidium Palati, nihil urbis vigiliae. Quo usque tandem abutere, Catilina, patientia nostra?
Donec sed odio operae, eu vulputate felis rhoncus. Cras mattis iudicium purus sit amet fermentum. Quis
aute iure reprehenderit in voluptate velit esse. Fictum, deserunt mollit anim laborum astutumque!
Curabitur est gravida et libero vitae dictum. Excepteur sint obcaecat cupiditat non proident culpa.

Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh. Magna pars studiorum, prodita quaerimus.
Quisque placerat facilisis egestas cillum dolore. At nos hinc posthac, sitientis piros Afros. Cum sociis
natoque penatibus et magnis dis parturient. Nec dubitamus multa iter quae et nos invenerat. Plura mihi
bona sunt, inclinet, amari petere vellent. Phasellus laoreet lorem vel dolor tempus vehicula.

Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Ambitioni dedisse scripsisse iudicaretur.
Etiam habebis sem dicantur magna mollis euismod.

Praeterea iter est quasdam res quas ex communi. A communi observantia non est recedendum. Nihilne te
nocturnum praesidium Palati, nihil urbis vigiliae. Quo usque tandem abutere, Catilina, patientia nostra?
Donec sed odio operae, eu vulputate felis rhoncus. Cras mattis iudicium purus sit amet fermentum. Quis
aute iure reprehenderit in voluptate velit esse. Fictum, deserunt mollit anim laborum astutumque!
Curabitur est gravida et libero vitae dictum. Excepteur sint obcaecat cupiditat non proident culpa.

Qui ipsorum lingua Celtae, nostra Galli appellantur. Pellentesque habitant morbi tristique senectus
et netus. Inmensae subtilitatis, obscuris et malesuada fames. Quis aute iure reprehenderit in voluptate
velit esse. Hi omnes lingua, institutis, legibus inter se differunt. Excepteur sint obcaecat cupiditat
non proident culpa. Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh. Curabitur est gravida
et libero vitae dictum. Curabitur blandit tempus ardua ridiculus sed magna. Vivamus sagittis lacus vel
augue laoreet rutrum faucibus. Praeterea iter est quasdam res quas ex communi. Fabio vel iudice vincam,
sunt in culpa qui officia. Cum sociis natoque penatibus et magnis dis parturient. Donec sed odio operae,
eu vulputate felis rhoncus. Mercedem aut nummos unde unde extricat, amaras.

Praeterea iter est quasdam res quas ex communi. A communi observantia non est recedendum. Nihilne te
nocturnum praesidium Palati, nihil urbis vigiliae. Quo usque tandem abutere, Catilina, patientia nostra?
Donec sed odio operae, eu vulputate felis rhoncus. Cras mattis iudicium purus sit amet fermentum. Quis
aute iure reprehenderit in voluptate velit esse. Fictum, deserunt mollit anim laborum astutumque!
Curabitur est gravida et libero vitae dictum. Excepteur sint obcaecat cupiditat non proident culpa.

Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh. Magna pars studiorum, prodita quaerimus.
Quisque placerat facilisis egestas cillum dolore. At nos hinc posthac, sitientis piros Afros. Cum sociis
natoque penatibus et magnis dis parturient. Nec dubitamus multa iter quae et nos invenerat. Plura mihi
bona sunt, inclinet, amari petere vellent. Phasellus laoreet lorem vel dolor tempus vehicula.

Praeterea iter est quasdam res quas ex communi. A communi observantia non est recedendum. Nihilne te
nocturnum praesidium Palati, nihil urbis vigiliae. Quo usque tandem abutere, Catilina, patientia nostra?
Donec sed odio operae, eu vulputate felis rhoncus. Cras mattis iudicium purus sit amet fermentum. Quis
aute iure reprehenderit in voluptate velit esse. Fictum, deserunt mollit anim laborum astutumque!
Curabitur est gravida et libero vitae dictum. Excepteur sint obcaecat cupiditat non proident culpa.

Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh. Magna pars studiorum, prodita quaerimus.
Quisque placerat facilisis egestas cillum dolore. At nos hinc posthac, sitientis piros Afros. Cum sociis
natoque penatibus et magnis dis parturient. Nec dubitamus multa iter quae et nos invenerat. Plura mihi
bona sunt, inclinet, amari petere vellent. Phasellus laoreet lorem vel dolor tempus vehicula.
`;

export const Default = () => {
  return (
    <>
      <DDSLeadspace type="centered">
        <DDSLeadspaceHeading>Back to Top component demo</DDSLeadspaceHeading>
        The Back to Top component is designed to appear after the user scrolls the distance equals to current screen height.
        <DDSButtonGroup slot="action">
          <DDSButtonGroupItem aria-label="Scroll down" data-target="#section-1" href="#section-1">
            Scroll down
            <ArrowDown20 slot="icon" />
          </DDSButtonGroupItem>
        </DDSButtonGroup>
      </DDSLeadspace>
      <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content  */}
        <a name="section-1"></a>
        <DDSContentBlockSimple>
          <DDSContentBlockHeading>Best for long pages with important navigational items on top</DDSContentBlockHeading>
          <DDSContentBlockCopy size="sm">{copy}</DDSContentBlockCopy>
          <DDSTextCTA cta-type="local" slot="footer" href="#" icon-placement="right">
            Explore supply chain consulting services
          </DDSTextCTA>
        </DDSContentBlockSimple>
      </div>
      <DDSCTASection>
        <DDSCTABlock _noBorder={true}>
          <DDSContentBlockHeading>Welcome to the end of page</DDSContentBlockHeading>
          <DDSContentBlockCopy>
            To go back to the top of the page with one click, find the Back to top button at the lower right of this page.
          </DDSContentBlockCopy>
          <DDSButtonGroup slot="action">
            <DDSButtonGroupItem href="#">
              Try it on premises
              <ArrowRight20 slot="icon" />
            </DDSButtonGroupItem>
            <DDSButtonGroupItem href="#">
              Try it on cloud
              <ArrowRight20 slot="icon" />
            </DDSButtonGroupItem>
          </DDSButtonGroup>
          <DDSLinkList slot="link-list" type="end">
            <DDSLinkListHeading>More ways to explore Linux servers</DDSLinkListHeading>
            <DDSLinkListItem href="https://example.com">
              Products <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Key concepts <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Analyst insights <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Blogs <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Client stories <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Events <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Latest Research <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Training <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Partners <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
          </DDSLinkList>
        </DDSCTABlock>
      </DDSCTASection>
      <DDSBackToTop />
    </>
  );
};

Default.story = {};

export default {
  title: 'Components/Back to top',
  decorators: [
    story => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="bx--grid bx--grid--condensed">
            <div className="bx--row">
              <div>{story()}</div>
            </div>
          </div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
  },
};
