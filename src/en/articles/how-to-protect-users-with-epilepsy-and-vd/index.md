---
title: Thinking about users with seizures and vestibular conditions
description: What if the user gets motion sickness because of a website? What if he or she has an epileptic seizure? Let's look at what interfaces for users with seizures and vestibular conditions should look like.
ogImage: cover.png
keyTheme:
  - Design
  - Animation
  - CSS
date: 2024-05-16
updated: 2024-08-26
layout: article.njk
templateEngineOverride: md, njk
---

Accessibility helps users not only use interfaces without trouble but also avoid feeling physically unwell. Here, I want to discuss what accessibility means for people with seizures and vestibular conditions.

Vestibular conditions can appear spontaneously. For example, they may occur due to side effects from medications, head injuries, and even hot weather. A similar situation applies to seizures. While we are somewhat prepared for screen reader users, we cannot predict what will make a person feel unwell. Therefore, it's crucial to avoid creating barriers from the start.

Let's start with the definitions of vestibular disorders, seizures, and epilepsy.

## Vestibular disorders

It's likely that you have experienced motion sickness, dizziness, or nausea at least once in your life. The reason could be lack of sleep, a cold, a long car journey, or various other factors.

_Vestibular disorders_ are related to the inner ear and the part of the brain that controls balance and eye movement.

This is a large group of medical conditions, including head injuries, vestibular migraine or migraine with aura, and brain tumors. They often have similar symptoms:

- dizziness (vertigo)
- nausea
- blurred vision
- eye strain
- headaches
- trouble concentrating
- confusion.

One of the triggers can be inaccessible user interfaces. Facundo Corradini, in [an article on A List Apart](https://alistapart.com/article/accessibility-for-vestibular/), described how he lay in bed for hours with severe vertigo after encountering parallax scrolling effects.

There are indeed many such users. Worldwide, [about 15% of people experience migraines](https://pubmed.ncbi.nlm.nih.gov/36693999/) (statistics as of 2023).

## Seizures and epilepsy

_A seizure_ is uncontrolled increased or synchronized activity of neurons in the brain. Its effects can include dizziness, paralysis, temporary failure of internal organs, loss of consciousness, confusion, partial memory loss, and outbreaks of fear and anxiety.

Seizures can occur on their own or be part of a disability. If they recur frequently, more than three times, they are considered _epilepsy_. Globally, [about 6,5% of people have epilepsy](https://www.who.int/news-room/fact-sheets/detail/epilepsy) (statistics as of 2019).

Seizures can be influenced not only by internal factors but also by external ones, such as light or sounds. Seizures triggered by light, sounds, and even reading are called _reflex seizures_. When there are many such seizures, a person has _reflex epilepsy (RE)_.

Reflex epilepsy comes in several types. I am going to focus only on _photosensitive epilepsy (PSE)_. It's triggered by intense flickering light or movement. [PSE occurs in 3–5% of all people with epilepsy](https://www.epilepsy.com/what-is-epilepsy/seizure-triggers/photosensitivity/). The condition manifest between the ages of seven (7) and nineteen (19), but people can experience it in their adult life as well.

Content that flashes, flickers, or blinks can lead to an epileptic seizure. These triggers seriously increase electrical activity in neurons.

{% note %}
The most dangerous spectra for people with photosensitive epilepsy are red and blue.
{% endnote %}

## Problematic content

Several elements in web interfaces can potentially cause seizures or other adverse physical reactions:

- media content such as videos and GIFs
- animated scrolling that lasts longer than one quarter (1/4) second or 15 milliseconds
- web canvas animations
- graphics with contrasting stripes, squares, spirals, and concentric circles
- SVG, CSS, and JavaScript animations. E.g., moving images next to text or parallax scrolling effects where foreground and background scroll simultaneously in different directions
high contrast elements and interfaces.

I have personally experienced eye strain and nausea due to such visual elements. In my case, it was caused by [the splash screen in WebStorm 2021.1](http://mikeozornin.ru/blog/all/jetbrains-ide-splashscreens/), which was just a static image. I'm grateful to the JetBrains team for listening to feedback and reducing the saturation of the images.

For more examples of problematic interfaces, I recommend reading ″[Your Interactive Makes Me Sick](https://source.opennews.org/articles/motion-sick/)″ by Eileen Webb. It provides valuable insights into this issue, though I hope your vestibular system handles the challenge better than mine did.

<figure>

> You don't even need an image or video to cause harm. A `<div>` element set to change colour and luminosity at high frequency, easily done via JavaScript, can cause real harm. And, flickering can occur everywhere. For example, ″spinners″ commonly used to display while pages load can easily ″flicker″ while spinning.
<figcaption>MDN.</figcaption>

</figure>

## How to protect users?

It's crucial to note that directly involving people with epilepsy and vestibular disorders in testing can be potentially dangerous. Therefore, the most responsible approach is to be proactive and implement expert recommendations.

To ensure we don't unintentionally harm users, consider the guidelines below.

**Monitor flash frequency**. The rapid appearance of bright light is called _flashes_. They can be either general or red. Flashes are common in videos and animations.

_A general flash_ is a rapid increase in brightness by 10% or more, followed by a decrease to 0,8% or less.

_A red flash_ is a pair of opposite transitions involving a saturated red color.

Besides flashes, there are also _blinks_. Blinking content switches between two states. It's usually used to draw attention to specific elements on a page.

The frequency of general and red flashes, as well as blinks, should not exceed three (3) times per second or three (3) hertz (Hz). This is the minimum accessibility requirement for people with photosensitive epilepsy.

The best solution to the problem of flashes and blinks is to avoid them altogether. Another approach is the small safe area technique, where you reduce the size of the video or the part of the page with potentially dangerous animation. The area should occupy less than 10% of the central field of vision or less than 25% of the screen size. This is because the central part of the eye consists of a large number of sensors that more actively transmit signals to the visual cortex and can overload neurons.

Reducing the area of flashes and blinks is not the best solution, as users may access the site from a mobile device and hold it too close to their eyes.

{% note %}
The recommended flash area for a display with a 1024 by 768 aspect ratio and a 15-17 inch diagonal at a standard viewing distance (58-68 centimeters) is 341 by 256 pixels.
{% endnote %}

Regarding blinks, if they are short-lived and stop automatically, that's generally acceptable.

You can check videos and animations using the free [Photosensitive Epilepsy Analysis Tool (PEAT)](https://trace.umd.edu/peat/). However, it's only suitable for non-commercial purposes. For commercial use, there's the paid [Harding Test](https://www.hardingfpa.com).

**Turn off animation**. You can disable animation if it's not a key functionality. The `prefers-reduced-motion` media feature is useful for this. It checks the ″Reduce Motion″ setting in macOS or the ″Show Animations″ setting in Windows. You can see how this media feature works in [W3C demo](https://www.w3.org/WAI/WCAG21/working-examples/css-reduced-motion-query/).

There are no absolute values for speed, smoothness, and other animation properties. So you can rely on the experience of other developers or ask for advice from users.

Option one (1): Only `prefers-reduced-motion` ([suggested by Val Head](https://github.com/jensimmons/cssremedy/issues/11#issuecomment-462867630)).

```css
@media (prefers-reduced-motion: reduce) {
  *:not(.safe-animation),
  *:not(.safe-animation)::before,
  *:not(.safe-animation)::after {
    animation-duration: 0.01s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    scroll-behavior: auto !important;
  }
}
```

Option two (2): Combining `prefers-reduced-motion` and `update`.

[The `update` media feature](https://www.w3.org/TR/mediaqueries-4/#update) determines whether the device can change the appearance of the site's content once it has been rendered. There are three values: `none`, `slow`, and `fast`.

In this example, the `slow` value is used. It triggers when the layout changes according to normal CSS rules, but the device doesn't display changes smoothly. For example, e-ink screens or low-end smartphones.

```css
@media screen and
(prefers-reduced-motion: reduce),
(update: slow) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

{% note %}
You can use the [Magica11y](https://magica11y.github.io) suite of utilities to work with this and other media features.
{% endnote %}

Option three (3) what has everything.

```css
:root {
  --animation-duration: 250ms;
  --transition-duration: 250ms;
}

@media screen and
(prefers-reduced-motion: reduce),
(update: slow) {
  :root {
    --animation-duration: 0.001ms !important;
    --transition-duration: 0.001ms !important;
  }
}

@media screen and
(prefers-reduced-motion: reduce),
(update: slow) {
  * {
    animation-duration: var(--animation-duration);
    animation-iteration-count: 1 !important;
    transition-duration: var(--animation-duration);
  }
}

@media screen and
(prefers-reduced-motion: reduce),
(update: fast) {
  .safe-animation {
    --animation-duration: 6000ms !important;
    animation-name: educational-concept;
    animation-duration: var(--animation-duration);
  }
}
```

Option fourth (4) what is suitable for your browser CSS-extension.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-delay: -1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    background-attachment: initial !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
}
```

**Allow users to disable animation**. Not all users are tech-savvy and know where to find animation settings. You can add a special button in the menu or on the page that enables safe animation. This is what the developers team did on [the Animal Crossing website](https://animal-crossing.com/).

**Give people control over video and animation**. Users should have the ability to pause, stop, or completely hide any content that:

- automatically scrolls, moves, or blinks
- updates for more than five (5) seconds
- is displayed parallel to other content.

These could be parallax scrolling effects, videos, hover animations on buttons, carousels, and so on.

When a parallax scrolling is absolutely crucial, you can add alternative styles without animation and dangerous images, or provide a link to a text version of the page without parallax.

Pause, stop, or slide-switching buttons work well for controlling videos and carousels.

Automatic video playback can be disabled by removing `autoplay` from `<video controls>`. Sound is muted by default with the `muted` attribute.

For all elements with animation, you can set `animation-play-state: paused`. This pauses the animation by default. By the way, you can leave loading animations alone. Without them, users might think the loading is paused or canceled. The same applies to ads, as they are sometimes a necessary part of functionality for accessing content. Hello, YouTube.

Alternatively, you can set a short animation duration using `animation-duration` and `transition-duration` instead of `animation: none` or `transition: none`.

**Tame GIFs**. GIFs cause the most trouble. Users can't control their speed or turn them off.

The best way to deal with GIFs replace them with videos or SVG animations. If you absolutely can't get rid of GIFs, add control elements using scripts. For example, [gifplayer on jQuery](https://github.com/rubentd/gifplayer/). You can even make the GIF a separate [web component `<x-gif>`](https://github.com/geelen/x-gif/).

Another solution with GIFs is to give users a choice between video, .gif, or a static image for when animation is turn off or reduced.

```html
<picture>
  <!-- For video -->
  <source
    srcset="animation.mp4"
    type="video/mp4"
    media="(prefers-reduced-motion: no-preference)"
  >
  <!-- For GIFs -->
  <source
    srcset="animation.gif"
    type="image/gif"
    media="(prefers-reduced-motion: no-preference)"
  >
  <img src="pic.png" alt="Text alternative">
</picture>
```

**Animate text wisely**. Animated text is also not the most harmless part of an interface. There are no standard ways to adjust its animation yet. If it shifts significantly to the side, noticeably increases or decreases in size, it can also trigger a seizure or dizziness. So it's better to either abandon this idea altogether or change the content minimally and smoothly.

**Don't burn users' eyes**. High contrast isn't always good, especially with animation. It's best when the contrast is neither too high nor too low, or when there are color theme settings on a site itself.

**Check images**. Follow a couple of simple recommendations about patterns and images. If graphics consist of straight contrasting lines, it's better to stop at eight (8). If they're waves, place no more than five (5) next to each other.

**Warn about risks**. Place a warning about dangerous content if you're unsure and can't do anything else. This is often done with videos and games.

## What WCAG 2.2 say?

Accessibility criteria for people with seizures and vestibular conditions are presented in two guidelines:

- Guideline 2.2. Sufficient time
  - [Criterion 2.2.2. Pause, stop, and hide](https://www.w3.org/TR/WCAG22/#pause-stop-hide) (level A)
- [Guideline 2.3. Epileptic seizures and physical reactions](https://www.w3.org/TR/WCAG22/#seizures-and-physical-reactions)
  - Criterion 2.3.1 Three Flashes or Below Threshold (level A)
  - Criterion 2.3.2 Three Flashes (level AAA)
  - Criterion 2.3.3 Animation during interaction (level AAA).

***

Making an interface safe is not that hard, but very important. When people with epilepsy or vestibular impairment visit a website, it's not just about being able to read a text. An inaccessible interface can make them feel worse and sometimes pose a threat to life.

## Further reading

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- ″[Web accessibility for seizures and physical reactions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Seizure_disorders/)″ on MDN
- ″[Seizure and Vestibular Disorders](https://webaim.org/articles/seizure/)″ from WebAIM
- ″[Revisiting prefers-reduced-motion, the reduced motion media query](https://css-tricks.com/revisiting-prefers-reduced-motion/)″ by Eric Bailey
- ″[Accessible Web Animation: The WCAG on Animation Explained](https://css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained)″ by Val Head
- ″[Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity)″ by Val Head
- Lots of useful stuff about accessible animation on [Val Head's blog](https://valhead.com/blog/)
- ″[Are animated GIFs accessible?](https://mary.codes/blog/web_accessibility/are_animated_gifs_accessible/)″ by Mary Knize.
