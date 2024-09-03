---
title: CSS media features to improve accessibility
description: Learn how to incorporate user-defined settings into web interfaces. This article explores media features that track various user preferences, including animation, contrast, transparency, inversion, color schemes and forced color modes.
ogImage: cover.png
keyTheme:
  - CSS
  - Usability
date: 2024-05-09
updated: 2024-09-04
layout: article.njk
templateEngineOverride: md, njk
---

When people talk about accessibility and CSS, they often mean properties that affect the accessibility tree and assistive technologies such as screen readers and voice control software. But there's another ally in the battle for accessible interfaces — media features.

_Media features_ are conditions for the `@media` CSS at-rule. They indicate specific characteristics of the device or browser. For example, screen orientation (`orientation`) or display mode (`display-mode`).
In this article, I'll talk about a few media features: `prefers-reduced-motion`, `prefers-color-scheme`, `inverted-colors`, `forced-colors`, `ms-high-contrast`, `prefers-contrast`, and `prefers-reduced-transparency`.

These media features track operating system settings which changed by users who aren't satisfied with the default behavior of the system. For example, people with disabilities and those who are uncomfortable with the default design. Real world examples:

- Users prone to epileptic seizures turn off animation because it can trigger a photosensitive seizures
- Some people with astigmatism choose a dark theme and reduce contrast to avoid eye strain.

Considering user preferences will make the site's interface more flexible and personalized. This will not only help improve its accessibility but can also increase conversion rates. It's always nice to use products that cares about your preferences.

Most customizations apply only to the operating system. Many of them, like animations and contrast levels, don't change website interfaces. It all depends on whether the developers have taken them into account. This is where media features come in handy.

You can also track user settings with JavaScript, but I don't want to make this post bigger. I'll just focus on CSS features.

## System settings

Let's take a look at the settings which can be considered in web interfaces now or in the future.

### Animation

Animation settings allow you to change the speed of animations or turn them off completely. These settings don't affect websites unless they contain specific CSS at-rule styles.

Users who may adjust animation settings include:

- People with vestibular disorders or those prone to seizures
- People with cognitive disabilities and neurodivergent users, particularly those with attention deficit disorder (ADD).

Most operating systems include a ″reduce motion″ or ″minimize animation″ setting to accommodate these users needs.

### Color scheme

Users can also change the color scheme settings and select the colors that will dominate the system. These are either light or dark shades. The setting does not affect sites if they do not support color schemes.

{% note "Don't confuse dark or light color schemes with night and day modes. This is a different group of settings — the filtered display mode. These settings alter the intensity of blue light." %}

The following categories of users utilize color scheme setting:

- People with visual impairments. For example, a person with low vision, eye strain, and light sensitivity
- Those with cognitive disabilities and neurodivergent folks. For instance, individuals with ADD
- Everyone else due to aesthetic preferences, habits, or lighting conditions.

Color schemes can be selected in all popular operating systems. macOS and iOS have an additional automatic theme. If selected, it applies a light theme during the day and a dark theme at night.

### Inverted colors

_Inverted colors mode_ replaces system colors with their opposites, like a negative. It's a part of the filtered display mode category of settings.

Colors change not only in the system but also in browser tabs. So users might choose this mode instead of a dark theme. The screenshot shows how the inversion mode works. Yellow shades have turned blue, green has become magenta, and white has turned black.

<figure class="article__image">
  <img
    class="article__image-item"
    src="images/invert-colors.png"
    alt="Website interface in inverted colors mode."
  >
  <figcaption class="article__image-caption">
    Doka Guide with inverted colors on Windows 10.
  </figcaption>
</figure>

Who uses inverted colors mode:

- People with visual impairments. For example, individuals with glaucoma or eye strain
- People with migraines and headaches
- Other users due to personal preferences, habits, or lighting conditions.

Most operating systems have inverted colors setting. On iOS, there are even two types of inversion: Smart and classic. In smart invert mode, pictures and videos are not inverted, while in classic one, all content is inverted.

### Color mode

_Forced colors mode_ limits the number of colors to improve text readability by changing the contrast between text and background. High-contrast colors are mainly used. This mode changes colors both in the system and on websites.

Who uses forced colors mode:

- Users with visual impairments;
- People with migraines and headaches
- People with photosensitive epilepsy
- Users who need to reduce visual noise to improve concentration.

Currently, this mode can only be selected in Windows. In Windows 10 and earlier versions, it's called Windows high contrast mode (WHCM). In Windows 11, it's called contrast themes.

The high contrast mode has several pre-set color schemes:

- High contrast black
- High contrast white
- High contrast one (1) and two (2).

The technology for replacing the color palette depends on the browser. It differs in Chromium-based browsers, Firefox (Quantum engine), Internet Explorer (Trident), and in older versions of Edge (EdgeHTML). For example, in Vivaldi (Chromium), the white background of the site becomes black, gray links and borders become bright yellow, and regular text becomes white instead of dark gray.

<figure class="article__image">
  <img
    class="article__image-item"
    src="images/black-whcm-vivaldi.png"
    alt="Section with podcast episodes on the main page."
  >
  <figcaption class="article__image-caption">
    ″Web Standards″ website with the high contrast black mode in Vivaldi on Windows 10.
  </figcaption>
</figure>

In Firefox, the originally white background will remain the same, gray links and borders will become bright blue, and regular text will be black instead of dark gray.

<figure class="article__image">
  <img
    class="article__image-item"
    src="images/black-whcm-firefox.png"
    alt="List of recent episodes of the ″Web Standards″ podcast."
  >
  <figcaption class="article__image-caption">
    A distinctive display of the high contrast black mode in Firefox on Windows 10.
  </figcaption>
</figure>

You can change the default behavior in Firefox. The setting is located in the Language and Appearance section, specifically in the ″Colors″ subsection. Open the modal window with the ″Manage Colors…″ button and select the ″Use system colors″ checkbox.

In Windows 11, the set of contrast themes has changed: Aquatic, desert, dusk, and night sky have been added.

<figure class="article__image">
  <img
    class="article__image-item"
    src="images/night-sky-vivaldi.png"
    alt="The podcast section from the ″Web Standards″ homepage with system colors. The white background has become black, links and borders are purple, and regular text is white instead of dark gray."
  >
  <figcaption class="article__image-caption">
    ″Web Standards″ with the night sky mode in Vivaldi on Windows 11.
  </figcaption>
</figure>

If the pre-set themes don't suit you, you can customize them yourself. This includes the option to reduce contrast.

### Contrast

Users can separately increase or decrease the level of contrast in the system without changing the screen brightness.

The contrast settings is used by:

- People with visual impairments, for example, those with glaucoma
- People who have migraines and headaches
- Those with old or low-quality displays
- Others who need higher contrast due to lighting conditions.

macOS and iOS have _the increased contrast mode_. It increases the difference between shades of gray and makes element borders more distinct.

Increasing contrast affects the appearance of both the system and web interfaces. Unlike system windows, only the contrast level changes on websites.

Let's look at what happens to a modal window in macOS with default mode and with increased contrast mode. Both windows show an image of a screaming cat called ″cute-cat.jpeg″. The first window has no frame, and the background of the control panel with buttons and additional settings is light gray. The second window looks visually different from the first. It has a black frame, the background of the control panel has become white, and all buttons and other elements in the panel have separate black frames.

<figure class="article__image">
  <img
    class="article__image-item"
    src="images/increase-contrast-mode.png"
    alt="Comparison of windows in default mode and increased contrast mode."
  >
  <figcaption class="article__image-caption">
    Oddly enough, everything has become more contrast.
  </figcaption>
</figure>

### Transparency

Users can enable or disable background transparency. Those who increase contrast often choose an opaque background.

A transparent background can increase cognitive load and reduce text readability. Therefore, this setting is used by:

- People with visual impairments. For example, those with astigmatism or low vision
- Users with cognitive disabilities and neurodivergent people. For instance, dyslexic users or those with ADD
- People with migraines and headaches.

Transparency can be precisely adjusted in Windows and macOS. These settings not only affect the transparency in the system interface but also on websites and in browsers. This screenshot shows the navigation background of the first window is semi-transparent, while the second one has an opaque and solid background.

<figure class="article__image">
  <img
    class="article__image-item"
    src="images/transparency-mode.png"
    alt="Comparison of two windows with transparency turned on and off."
  >
  <figcaption class="article__image-caption">
    This is how the transparency setting works in Windows 11.
  </figcaption>
</figure>

## A few words about media types

The `@media` at-rule in CSS has several media types. They describe the device on which the document is displayed.

- `all`: All devices. It's set automatically if no other type is specified
- `screen`: Devices with screens. For example, phones and laptops
- `print`: Devices with preview and print functions. This includes printers
- `speech`: Devices with speech synthesis. For example, screen readers and voice assistants.

The `speech` media type may be interesting from the point of view of accessibility. However, it is not currently supported by any browser. It used to be supported by the Opera browser on the Presto engine but support ceased after switching to Blink.

In the future, it may be useful for special styles for screen readers, such as to apply [CSS properties for speech synthesis devices](https://drafts.csswg.org/css-speech-1/) to some elements on a page.

## Media features

Now we move on to media features that will help make web interfaces more accessible.

Some of them are not yet well supported by browsers. Things may change in the future with the development of CSS. In any case, it's useful to know about them.

### prefer-reduced-motion

It tracks whether animation settings are selected to reduce its intensity. This is useful for any animation on the website. The animation can be slowed down or completely disabled.

Values for `prefers-reduced-motion`:

- `no-preference`: Default animation settings
- `reduce`: Modified animation settings.

[Browser support for `prefers-reduced-motion`](https://caniuse.com/prefers-reduced-motion/) is relatively good: 97% (as of 2024).

In this code example we stop animation completely by using `animation: none`.

```css
@media (prefers-reduced-motion: reduce) {
  .danger-animation {
    animation: none;
  }
}
```

Another example: The website uses `scroll-behavior` for smooth scrolling to blocks on a page. If the page has a lot of content, such animation might cause motion sickness. In this case, you can animate the scrolling when animation is not configured in the system settings.

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

Parallax effects often causes users to feel nauseous and dizzy. To prevent anyone from feeling unwell due to an image with `position: sticky`, you can replace the property value with `relative`.

```css
.parallax-scrolling-image {
  position: sticky;
}

@media (prefer-reduced-motion: reduce) {
  .parallax-scrolling-image {
    position: relative;
  }
}
```

Animation can also be an important part of a website. Therefore, it's better to base decisions on the content. You can always slow down the animation so that it's not dangerous for users or doesn't distract them.

I wrote more about this media feature and animation requirements in a [post about people with vestibular conditions and seizures](/en/articles/how-to-protect-users-with-epilepsy-and-vd/).

#### Test the preference-reduced-motion feature

In Chrome and other Chromium-based browsers, you can quickly emulate reduced animations in the developer tools. Click on the three-dot button ″Customize and control DevTools″, then expand ″More tools″ and open the ″Rendering″ section. Finally, select the option ″Emulate CSS media feature prefers-reduced-motion″.

Firefox doesn't allow emulating `prefers-reduced-motion` through its inspector, but there's a workaround. Enter `about:config` in the browser's search bar, find `ui.prefersReducedMotion` through the search, and set it to `1`. This will completely turn animation off. Setting it to `0` will return you to normal playback.

You can also change the animation settings manually.

**Windows 11**: <samp>Settings</samp> → <samp>Personalization</samp> → <samp>Visual effects</samp> → <samp>Animation effects</samp>.

**MacOS**: <samp>System Preferences</samp> → <samp>Accessibility</samp> → <samp>Display</samp> → <samp>Reduce Motion</samp>.

**iOS**: <samp>Settings</samp> → <samp>Accessibility</samp> → <samp>Motion</samp> → <samp>Reduce Motion</samp>.

**Android**: <samp>Settings</samp> → <samp>Accessibility</samp> → <samp>Display</samp> → <samp>Remove animations</samp>.

### prefers-color-scheme

It determines the selected color theme.

{% note "The dark theme isn't necessarily taken from the system. If the system default is set to a light theme, but the application is set to dark, the web interface will apply the application's theme. So application settings can take priority over system settings." %}

Values for `prefers-color-scheme`:

- `light` for light theme
- `dark` for dark theme.

[`prefers-color-scheme` has high browser support](https://caniuse.com/prefers-color-scheme/) — 96% (as of the second half of 2024).

Developers can control all styles when working with dark themes on a website. It's particularly important to pay attention to the colors of backgrounds, texts, interactive elements in different states, icons and images, as well as other decorative elements.

For example, images in dark theme can be made less contrasting using filter, and you can also change the values of `background-color` and `color`. In the example, I use pure black and white for code readability. In the real world, it's better to avoid such high-contrast colors. White text on a black background is usually difficult to read for a large number of users.

```css
.body {
  color: black;
  background-color: white;
}

@media (prefers-color-scheme: dark) {
  .body {
    color: white;
    background-color: black;
  }

  .image {
    filter: brightness(.8) contrast(1.2);
  }
}
```

#### Test the prefers-color-scheme feature

In Chromium-based browsers, you can enable the emulation of `prefers-color-scheme` through the developer tools. Click on the three-dot button ″Customize and control DevTools″, then click on ″More tools″ and go to the ″Rendering″ section. There, enable the option ″Emulate CSS media feature prefers-color-scheme″.

In Firefox, the themes are located in the first tab with the inspector. The toggles are positioned near the styles block. The toggle with a moon icon enables the dark theme emulation, while the sun icon enables the light theme emulation.

<figure class="article__image">
  <img
    class="article__image-item"
    src="images/firefox-inspector.png"
    alt="Part of the inspector interface from Firefox."
  >
  <figcaption class="article__image-caption">
    The inspector tab in Firefox.
  </figcaption>
</figure>

In Safari, dark theme emulation is enabled in the web inspector. The toggle is called ″Force Dark Appearance″ and is located in the panel below all the tabs.

<figure class="article__image">
  <img
    class="article__image-item"
    src="images/safari-web-inspector.png"
    alt="The toggle for print mode, dark theme, and other settings are visible."
  >
  <figcaption class="article__image-caption">
    The elements tab in Safari's web inspector.
  </figcaption>
</figure>

You can manually switch the theme in your operating system.

**Windows 11**: <samp>Settings</samp> → <samp>Personalization</samp> → <samp>Colors</samp> → <samp>Dark</samp> in the app mode section.

**macOS**: <samp>System Preferences</samp> → <samp>General</samp> → <samp>Dark</samp> or <samp>Auto</samp> in the appearance section.

**iOS**: <samp>Settings</samp> → <samp>Display and brightness</samp> → <samp>Dark</samp> in the appearance section.

**Android**: <samp>Settings</samp> → <samp>Display</samp> → <samp>Dark theme</samp>.

### inverted-colors

It tracks the inverted colors mode.

The `inverted-colors` values:

- `none`: Mode is not selected, the system displays default colors
- `inverted`: Inverted colors mode is selected.

[Global browser support for `inverted-colors`](https://caniuse.com/mdn-css_at-rules_media_inverted-colors/) is 18% (second half of 2024). Currently, it's only supported in Safari.

For the inverted colors mode, additional styles are usually not required, except for canceling the inversion of videos and images. This can be done using the `filter` CSS property.

```css
@media (inverted-colors: inverted) {
  img,
  video {
    filter: invert(100%);
  }
}
```

#### Test the inverted-colors feature

There is only manually option for testing styles for the inverted colors mode.

**macOS**: <samp>System preferences</samp> → <samp>Accessibility</samp> → <samp>Display</samp> → <samp>Invert colors</samp>.

**iOS**: <samp>Settings</samp> → <samp>Accessibility</samp> → <samp>Display and text size</samp> → <samp>Smart invert</samp> or <samp>classic invert</samp>.

### forced-colors

The translation is work in progress.
