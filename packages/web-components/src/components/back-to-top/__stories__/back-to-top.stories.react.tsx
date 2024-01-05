/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import { ArrowDown, ArrowRight } from '@carbon/icons-react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import C4DBackToTop from '@carbon/ibmdotcom-web-components/es/components-react/back-to-top/back-to-top';
import C4DLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
import C4DLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
import C4DButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import C4DCTASection from '@carbon/ibmdotcom-web-components/es/components-react/cta-section/cta-section';
import C4DCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
/* eslint-disable max-len */
import C4DContentBlockSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-block-simple/content-block-simple';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
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

const iconProps = {
  size: 20,
  slot: 'icon',
};

export const Default = () => {
  return (
    <>
      <C4DLeadspace type="centered">
        <C4DLeadspaceHeading>Back to Top component demo</C4DLeadspaceHeading>
        The Back to Top component is designed to appear after the user scrolls
        the distance equals to current screen height.
        <C4DButtonGroup slot="action">
          <C4DButtonGroupItem
            aria-label="Scroll down"
            data-target="#section-1"
            href="#section-1">
            Scroll down
            <ArrowDown {...iconProps} />
          </C4DButtonGroupItem>
        </C4DButtonGroup>
      </C4DLeadspace>
      <div className="cds--col-sm-4 cds--col-lg-12 cds--offset-lg-4">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content  */}
        <a name="section-1"></a>
        <C4DContentBlockSimple>
          <C4DContentBlockHeading>
            Best for long pages with important navigational items on top
          </C4DContentBlockHeading>
          <C4DContentBlockCopy size="sm">{copy}</C4DContentBlockCopy>
          <C4DTextCTA
            cta-type="local"
            slot="footer"
            href="#"
            icon-placement="right">
            Explore supply chain consulting services
          </C4DTextCTA>
        </C4DContentBlockSimple>
      </div>
      <C4DCTASection>
        <C4DCTABlock _noBorder={true}>
          <C4DContentBlockHeading>
            Welcome to the end of page
          </C4DContentBlockHeading>
          <C4DContentBlockCopy>
            To go back to the top of the page with one click, find the Back to
            top button at the lower right of this page.
          </C4DContentBlockCopy>
          <C4DButtonGroup slot="action">
            <C4DButtonGroupItem href="#">
              Try it on premises
              <ArrowRight {...iconProps} />
            </C4DButtonGroupItem>
            <C4DButtonGroupItem href="#">
              Try it on cloud
              <ArrowRight {...iconProps} />
            </C4DButtonGroupItem>
          </C4DButtonGroup>
          <C4DLinkList slot="link-list" type="end">
            <C4DLinkListHeading>
              More ways to explore Linux servers
            </C4DLinkListHeading>
            <C4DLinkListItem href="https://example.com">
              Products <ArrowRight {...iconProps} />
            </C4DLinkListItem>
            <C4DLinkListItem href="https://example.com">
              Key concepts <ArrowRight {...iconProps} />
            </C4DLinkListItem>
            <C4DLinkListItem href="https://example.com">
              Analyst insights <ArrowRight {...iconProps} />
            </C4DLinkListItem>
            <C4DLinkListItem href="https://example.com">
              Blogs <ArrowRight {...iconProps} />
            </C4DLinkListItem>
            <C4DLinkListItem href="https://example.com">
              Client stories <ArrowRight {...iconProps} />
            </C4DLinkListItem>
            <C4DLinkListItem href="https://example.com">
              Events <ArrowRight {...iconProps} />
            </C4DLinkListItem>
            <C4DLinkListItem href="https://example.com">
              Latest Research <ArrowRight {...iconProps} />
            </C4DLinkListItem>
            <C4DLinkListItem href="https://example.com">
              Training <ArrowRight {...iconProps} />
            </C4DLinkListItem>
            <C4DLinkListItem href="https://example.com">
              Partners <ArrowRight {...iconProps} />
            </C4DLinkListItem>
          </C4DLinkList>
        </C4DCTABlock>
      </C4DCTASection>
      <C4DBackToTop />
    </>
  );
};

Default.story = {};

export default {
  title: 'Components/Back to top',
  decorators: [
    (story) => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="cds--grid cds--grid--condensed">
            <div className="cds--row">
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
