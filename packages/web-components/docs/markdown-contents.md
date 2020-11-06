# Markdown contents

`<dds-content-*-copy>` components, used as the copy text of our content pattern, takes markup as its content. It takes either `content` property (_not_ attribute) or child text node as the markdown content. The markdown content will be converted to HTML with sanitization.

Given the nature of child text node, some extra caution is required to use child text node as the markdown content:

* After-initialization change of markdown content via child text node is not supported.
* Don't put any extra whitespace, e.g. line feeds, between the start/end tag and the markdown content.
* HTML-escape the content as needed.
