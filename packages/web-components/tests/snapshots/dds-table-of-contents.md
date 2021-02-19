# `dds-table-of-contents`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="dds-ce--table-of-contents__container">
  <div
    class="bx--tableofcontents__sidebar"
    part="table"
  >
    <div
      class="bx--tableofcontents__desktop__children"
      hidden=""
    >
      <slot name="heading">
      </slot>
      <slot name="menu-rule">
      </slot>
    </div>
    <div class="bx--tableofcontents__mobile-top">
    </div>
    <div
      class="dds-ce--table-of-contents__items-container"
      style="position: sticky; top: 0"
    >
      <div class="bx--tableofcontents__desktop">
        <ul>
        </ul>
      </div>
      <div class="bx--tableofcontents__mobile">
        <div class="bx--tableofcontents__mobile__select__wrapper">
          <select class="bx--tableofcontents__mobile__select">
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="bx--tableofcontents__content">
    <div class="bx--tableofcontents__content-wrapper">
      <slot>
      </slot>
    </div>
  </div>
</div>

```

####   `should render the heading and the rule for desktop`

```
<div class="dds-ce--table-of-contents__container">
  <div
    class="bx--tableofcontents__sidebar"
    part="table"
  >
    <div class="bx--tableofcontents__desktop__children">
      <slot name="heading">
      </slot>
      <slot name="menu-rule">
      </slot>
    </div>
    <div class="bx--tableofcontents__mobile-top">
    </div>
    <div
      class="dds-ce--table-of-contents__items-container"
      style="position: sticky; top: 0"
    >
      <div class="bx--tableofcontents__desktop">
        <ul>
        </ul>
      </div>
      <div class="bx--tableofcontents__mobile">
        <div class="bx--tableofcontents__mobile__select__wrapper">
          <select class="bx--tableofcontents__mobile__select">
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="bx--tableofcontents__content">
    <div class="bx--tableofcontents__content-wrapper">
      <slot>
      </slot>
    </div>
  </div>
</div>

```

####   `should render the heading for mobile`

```
<div class="dds-ce--table-of-contents__container">
  <div
    class="bx--tableofcontents__sidebar"
    part="table"
  >
    <div class="bx--tableofcontents__mobile-top">
    </div>
    <div
      class="dds-ce--table-of-contents__items-container"
      style="position: sticky; top: 0"
    >
      <div class="bx--tableofcontents__desktop">
        <ul>
        </ul>
      </div>
      <div class="bx--tableofcontents__mobile">
        <div class="bx--tableofcontents__mobile__select__wrapper">
          <select class="bx--tableofcontents__mobile__select">
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="bx--tableofcontents__content">
    <div class="bx--tableofcontents__content-wrapper">
      <div class="bx--tableofcontents__children__mobile">
        <slot name="heading">
        </slot>
      </div>
      <slot>
      </slot>
    </div>
  </div>
</div>

```

