import React from 'react';
import { DotcomShell } from '@carbon/ibmdotcom-react';
import content from './content';
import '@carbon/ibmdotcom-styles';

function App() {
  return <DotcomShell navigation="default">{content}</DotcomShell>;
}

export default App;
