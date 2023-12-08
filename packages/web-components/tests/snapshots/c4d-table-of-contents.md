# `c4d-table-of-contents`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="c4d-ce--table-of-contents__container">
  <div
    class="cds--tableofcontents__sidebar"
    part="table"
    style="transition: none 0s ease 0s; top: 0px;"
  >
    <div
      class="cds--tableofcontents__desktop__children"
      hidden=""
    >
      <slot name="heading">
      </slot>
      <slot name="menu-rule">
      </slot>
    </div>
    <div class="cds--tableofcontents__mobile-top">
    </div>
    <div
      class="c4d-ce--table-of-contents__items-container"
      style="position: sticky; top: 0"
    >
      <div class="cds--tableofcontents__desktop-container">
        <div
          class="cds--tableofcontents__desktop"
          style="left: -0px"
        >
          <div class="cds--sub-content-left">
          </div>
          <ul>
          </ul>
          <div class="cds--sub-content-right">
          </div>
        </div>
      </div>
      <div class="cds--tableofcontents__mobile">
        <div class="cds--tableofcontents__mobile__select__wrapper">
          <select
            aria-label="Table of contents"
            class="cds--tableofcontents__mobile__select"
          >
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="cds--tableofcontents__content">
    <div class="cds--tableofcontents__content-wrapper">
      <slot>
      </slot>
    </div>
  </div>
</div>

```

####   `should render the heading and the rule for desktop`

```
<div class="c4d-ce--table-of-contents__container">
  <div
    class="cds--tableofcontents__sidebar"
    part="table"
    style="transition: none 0s ease 0s; top: 0px;"
  >
    <div class="cds--tableofcontents__desktop__children">
      <slot name="heading">
      </slot>
      <slot name="menu-rule">
      </slot>
    </div>
    <div class="cds--tableofcontents__mobile-top">
    </div>
    <div
      class="c4d-ce--table-of-contents__items-container"
      style="position: sticky; top: 0"
    >
      <div class="cds--tableofcontents__desktop-container">
        <div
          class="cds--tableofcontents__desktop"
          style="left: -0px"
        >
          <div class="cds--sub-content-left">
          </div>
          <ul>
          </ul>
          <div class="cds--sub-content-right">
          </div>
        </div>
      </div>
      <div class="cds--tableofcontents__mobile">
        <div class="cds--tableofcontents__mobile__select__wrapper">
          <select
            aria-label="Table of contents"
            class="cds--tableofcontents__mobile__select"
          >
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="cds--tableofcontents__content">
    <div class="cds--tableofcontents__content-wrapper">
      <slot>
      </slot>
    </div>
  </div>
</div>

```

####   `should render the heading for mobile`

```
<div class="c4d-ce--table-of-contents__container">
  <div
    class="cds--tableofcontents__sidebar"
    part="table"
    style="transition: none 0s ease 0s; top: 0px;"
  >
    <div class="cds--tableofcontents__mobile-top">
    </div>
    <div
      class="c4d-ce--table-of-contents__items-container"
      style="position: sticky; top: 0"
    >
      <div class="cds--tableofcontents__desktop-container">
        <div
          class="cds--tableofcontents__desktop"
          style="left: -0px"
        >
          <div class="cds--sub-content-left">
          </div>
          <ul>
          </ul>
          <div class="cds--sub-content-right">
          </div>
        </div>
      </div>
      <div class="cds--tableofcontents__mobile">
        <div class="cds--tableofcontents__mobile__select__wrapper">
          <select
            aria-label="Table of contents"
            class="cds--tableofcontents__mobile__select"
          >
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="cds--tableofcontents__content">
    <div class="cds--tableofcontents__content-wrapper">
      <div class="cds--tableofcontents__children__mobile">
        <slot name="heading">
        </slot>
      </div>
      <slot>
      </slot>
    </div>
  </div>
</div>

```

