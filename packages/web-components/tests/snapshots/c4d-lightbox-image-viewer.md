# `c4d-lightbox-image-viewer`

#### `should render with minimum attributes`

```
<<<<<<< HEAD
<div class="cds--lightbox-media-viewer__container">
  <div class="cds--lightbox-media-viewer__row">
    <div class="cds--lightbox-media-viewer__media cds--no-gutter">
      <img
        alt=""
        class="cds--image__img"
=======
<div class="c4d--lightbox-media-viewer__container">
  <div class="c4d--lightbox-media-viewer__row">
    <div class="c4d--lightbox-media-viewer__media">
      <img
        alt=""
        class="c4d--image__img"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
        loading="lazy"
        src=""
      >
    </div>
<<<<<<< HEAD
    <div class="cds--lightbox-media-viewer__media-description cds--no-gutter">
      <div class="cds--lightbox-media-viewer__content">
        <div
          class="cds--lightbox-media-viewer__content__title"
=======
    <div class="c4d--lightbox-media-viewer__media-description">
      <div class="c4d--lightbox-media-viewer__content">
        <div
          class="c4d--lightbox-media-viewer__content__title"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
          data-autoid="c4d--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
          </slot>
        </div>
        <div
<<<<<<< HEAD
          class="cds--lightbox-media-viewer__content__desc"
=======
          class="c4d--lightbox-media-viewer__content__desc"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
          data-autoid="c4d--lightbox-media-viewer__content__desc"
          part="description"
        >
          <slot name="description">
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>

```

#### `should render with various attributes`

```
<<<<<<< HEAD
<div class="cds--lightbox-media-viewer__container">
  <div class="cds--lightbox-media-viewer__row">
    <div class="cds--lightbox-media-viewer__media cds--no-gutter">
      <img
        alt="image-alt-foo"
        class="cds--image__img"
=======
<div class="c4d--lightbox-media-viewer__container">
  <div class="c4d--lightbox-media-viewer__row">
    <div class="c4d--lightbox-media-viewer__media">
      <img
        alt="image-alt-foo"
        class="c4d--image__img"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
        loading="lazy"
        src="https://example.com/image"
      >
    </div>
<<<<<<< HEAD
    <div class="cds--lightbox-media-viewer__media-description cds--no-gutter">
      <div class="cds--lightbox-media-viewer__content">
        <div
          class="cds--lightbox-media-viewer__content__title"
=======
    <div class="c4d--lightbox-media-viewer__media-description">
      <div class="c4d--lightbox-media-viewer__content">
        <div
          class="c4d--lightbox-media-viewer__content__title"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
          data-autoid="c4d--lightbox-media-viewer__content__title"
          part="title"
        >
          <slot name="title">
            image-title-foo
          </slot>
        </div>
        <div
<<<<<<< HEAD
          class="cds--lightbox-media-viewer__content__desc"
=======
          class="c4d--lightbox-media-viewer__content__desc"
>>>>>>> 6575f00934 (fix(web-components): updated web-components tests)
          data-autoid="c4d--lightbox-media-viewer__content__desc"
          part="description"
        >
          <slot name="description">
            image-description-foo
          </slot>
        </div>
      </div>
    </div>
  </div>
</div>

```

