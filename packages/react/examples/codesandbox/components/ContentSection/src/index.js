/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import { ContentSection } from '@carbon/ibmdotcom-react/es/components/ContentSection';
import ReactDom from 'react-dom';

const App = () => (
  <ContentSection
    heading="Content section heading"
    copy="copy text"
    cta={{
      href: 'https://www.example.com',
      type: 'local',
      copy: 'Link action'
    }}
  />
);

ReactDom.render(<App />, document.getElementById('app'));
