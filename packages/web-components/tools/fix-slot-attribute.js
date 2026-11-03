#!/usr/bin/env node
/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Lit 3 slot-fix codemod
 *
 * Finds every component that has `@property({ reflect: true }) slot = 'NAME'`
 * and ensures the `slot` attribute is written synchronously in connectedCallback()
 * so the browser sees it before initial slot distribution.
 */

const fs = require('fs');
const path = require('path');

// All files confirmed to need the fix (slot value from grep output)
const FILES = [
  // slot value : file path (relative to repo root)
  [
    'copy',
    'packages/web-components/src/components/content-block/content-block-copy.ts',
  ],
  [
    'complementary',
    'packages/web-components/src/components/content-block/content-block-complementary.ts',
  ],
  [
    'heading',
    'packages/web-components/src/components/content-block/content-block-heading.ts',
  ],
  [
    'media',
    'packages/web-components/src/components/callout-with-media/callout-with-media-video.ts',
  ],
  [
    'media',
    'packages/web-components/src/components/callout-with-media/callout-with-media-image.ts',
  ],
  [
    'copy',
    'packages/web-components/src/components/content-section/content-section-copy.ts',
  ],
  [
    'heading',
    'packages/web-components/src/components/content-section/content-section-heading.ts',
  ],
  ['legal-nav', 'packages/web-components/src/components/footer/legal-nav.ts'],
  [
    'language-selector',
    'packages/web-components/src/components/footer/language-selector-mobile.ts',
  ],
  ['brand', 'packages/web-components/src/components/footer/footer-logo.ts'],
  [
    'locale-button',
    'packages/web-components/src/components/footer/locale-button.ts',
  ],
  [
    'language-selector',
    'packages/web-components/src/components/footer/language-selector-desktop.ts',
  ],
  [
    'heading',
    'packages/web-components/src/components/content-item/content-item-heading.ts',
  ],
  ['heading', 'packages/web-components/src/components/card/card-heading.ts'],
  ['eyebrow', 'packages/web-components/src/components/card/card-eyebrow.ts'],
  ['footer', 'packages/web-components/src/components/card/card-footer.ts'],
  [
    'media',
    'packages/web-components/src/components/content-item-row/content-item-row-media-video.ts',
  ],
  [
    'eyebrow',
    'packages/web-components/src/components/content-item-row/content-item-row-eyebrow.ts',
  ],
  [
    'source-copy',
    'packages/web-components/src/components/quote/quote-source-copy.ts',
  ],
  [
    'source-heading',
    'packages/web-components/src/components/quote/quote-source-heading.ts',
  ],
  [
    'source-bottom-copy',
    'packages/web-components/src/components/quote/quote-source-bottom-copy.ts',
  ],
  [
    'heading',
    'packages/web-components/src/components/global-banner/global-banner-heading.ts',
  ],
  [
    'image',
    'packages/web-components/src/components/global-banner/global-banner-image.ts',
  ],
  [
    'copy',
    'packages/web-components/src/components/global-banner/global-banner-copy.ts',
  ],
  [
    'highlight-label',
    'packages/web-components/src/components/pricing-table/pricing-table-highlight-label.ts',
  ],
  [
    'cta',
    'packages/web-components/src/components/pricing-table/pricing-table-header-cell-cta.ts',
  ],
  [
    'tag',
    'packages/web-components/src/components/pricing-table/pricing-table-header-cell-tag.ts',
  ],
  [
    'toggle',
    'packages/web-components/src/components/pricing-table/pricing-table-annotation-toggle.ts',
  ],
  [
    'headline',
    'packages/web-components/src/components/pricing-table/pricing-table-header-cell-headline.ts',
  ],
  [
    'caption',
    'packages/web-components/src/components/pricing-table/pricing-table-header-cell-caption.ts',
  ],
  [
    'annotation',
    'packages/web-components/src/components/pricing-table/pricing-table-cell-annotation.ts',
  ],
  [
    'heading',
    'packages/web-components/src/components/content-block-headlines/content-block-headlines-heading.ts',
  ],
  [
    'heading',
    'packages/web-components/src/components/leadspace/leadspace-heading.ts',
  ],
  [
    'header',
    'packages/web-components/src/components/expressive-modal/expressive-modal-header.ts',
  ],
  [
    'footer',
    'packages/web-components/src/components/expressive-modal/expressive-modal-footer.ts',
  ],
  [
    'regions-selector',
    'packages/web-components/src/components/locale-modal/regions.ts',
  ],
  [
    'locales-selector',
    'packages/web-components/src/components/locale-modal/locale-search.ts',
  ],
  [
    'supplemental',
    'packages/web-components/src/components/leaving-ibm/leaving-ibm-modal-supplemental.ts',
  ],
  [
    'media',
    'packages/web-components/src/components/leadspace-block/leadspace-block-media.ts',
  ],
  [
    'copy',
    'packages/web-components/src/components/content-group/content-group-copy.ts',
  ],
  [
    'heading',
    'packages/web-components/src/components/content-group/content-group-heading.ts',
  ],
  [
    'heading',
    'packages/web-components/src/components/filter-panel/filter-panel-heading.ts',
  ],
  [
    'copy',
    'packages/web-components/src/components/leadspace-with-search/leadspace-with-search-copy.ts',
  ],
  [
    'footer',
    'packages/web-components/src/components/logo-grid/logo-grid-link.ts',
  ],
  [
    'heading',
    'packages/web-components/src/components/link-list/link-list-heading.ts',
  ],
  ['brand', 'packages/web-components/src/components/masthead/masthead-logo.ts'],
  [
    'name',
    'packages/web-components/src/components/masthead/masthead-l1-name.ts',
  ],
];

const ROOT = path.resolve(__dirname, '../../..');

let changed = 0;
let skipped = 0;

for (const [slotName, relPath] of FILES) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${relPath}`);
    skipped++;
    continue;
  }

  let src = fs.readFileSync(fullPath, 'utf8');

  // Skip if already has the setAttribute('slot', ...) pattern
  if (src.includes(`setAttribute('slot'`)) {
    console.log(`SKIP (already fixed): ${relPath}`);
    skipped++;
    continue;
  }

  const setAttrLine = `    this.setAttribute('slot', '${slotName}');`;

  if (src.includes('connectedCallback()')) {
    // Inject setAttribute BEFORE the first super.connectedCallback() call,
    // or right at the start of the method body if no super call exists.
    const superCallRe = /(\s+)(super\.connectedCallback\(\);)/;
    if (superCallRe.test(src)) {
      src = src.replace(superCallRe, `$1${setAttrLine}\n$1$2`);
    } else {
      // Insert after the opening brace of connectedCallback
      src = src.replace(/(connectedCallback\(\)\s*\{)/, `$1\n${setAttrLine}`);
    }
  } else {
    // No connectedCallback — inject one just before render() or just before
    // the first static member or the end of the class body.
    const insertPoint = /(\n\s+render\(\))/.test(src)
      ? /(\n\s+render\(\))/
      : /(\n\s+static\s+)/.test(src)
      ? /(\n\s+static\s+)/
      : /(\n\}\s*\n?\/\* @__GENERATE)/.test(src)
      ? /(\n\}\s*\n?\/\* @__GENERATE)/
      : null;
    if (insertPoint) {
      src = src.replace(
        insertPoint,
        `\n\n  connectedCallback() {\n${setAttrLine}\n    super.connectedCallback();\n  }$1`
      );
    } else {
      console.log(`WARN (no insert point): ${relPath}`);
      skipped++;
      continue;
    }
  }

  fs.writeFileSync(fullPath, src);
  console.log(`FIXED: ${relPath}`);
  changed++;
}

console.log(`\nDone: ${changed} files changed, ${skipped} skipped.`);
