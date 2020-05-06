# Content Block - Cards

> The Content Block - Simple pattern is a decorator of `ContentBlock`, and
> includes a single `CardGroup`.

## Getting started

Here's a quick example to get you started.

```scss
// yourapplication.scss
@import '@carbon/type/scss/font-face/mono';
@import '@carbon/type/scss/font-face/sans';
@include carbon--font-face-mono();
@include carbon--font-face-sans();
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CardSectionImages } from '@carbon/ibmdotcom-react';
import 'yourapplication.scss';

function App() {
  return (
    <CardSectionImages
      cards={cards}
      heading="Aliquam condimentum interdum"
      theme={theme}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```
