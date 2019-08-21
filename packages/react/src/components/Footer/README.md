# Footer

> The footer component is a required navigational pattern for IBM.com that
> displays consistently at the bottom of each page.

## Getting started

Here's a quick example to get you started.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Footer } from '@ibmdotcom/react';

import '@ibmdotcom/styles/scss/components/footer/index.scss';

function App() {
  return <Footer />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

> 💡 Don't forget to import the footer styles from
> [@ibmdotcom/styles](/packages/styles).

## Types (optional)

| Name             | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| `tall`/`default` | Default footer variant includes additional navigation taking up more space. |
| `short`          | Short footer variant reduces space by removing any additional navigation.   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
