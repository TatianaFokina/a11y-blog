---
title: How to avoid harming users with epilepsy and vestibular impairment
description: What if the user gets motion sickness because of a website? What if he or she has an epileptic seizure? Let's look at what interfaces for users with epilepsy and vestibular impairment should look like.
ogImage: cover.png
keyTheme:
    - Usability
    - Design
    - Animation
    - CSS
date: 2024-05-16
layout: article.njk
templateEngineOverride: md, njk
---
Accessibility helps people not only to use interfaces without issues but also not to feel literally sick. People with epilepsy and vestibular impairment can struggle with this. In this article, I want to discuss what accessibility means for them.

Let's start by talking about vestibular impairments, epilepsy, and epileptic seizures.

## Vestibular Disorders

Many people know the feeling of motion sickness, dizziness, and nausea. It could be happening to you because of poor sleep, a cold, and a bunch of other reasons.

**Vestibular Disorders** are related to the inner ear and the part of the brain that controls balance and eye movement.

This is a large group of disorders. It includes head injuries, vestibular migraine or migraine with aura, brain tumours and more. They often have similar symptoms:
- dizziness;
- nausea;
- blurred vision;
- headaches;
- trouble concentrating.

And the trigger can be inaccessible interfaces. Facundo Corradini in [an article on A List Apart](https://alistapart.com/article/accessibility-for-vestibular/) described how he lay in bed for hours with severe vertigo after encounters with parallax.

There are indeed many such users. There are [about 15%](https://en.wikipedia.org/wiki/Migraine#Epidemiology) of the world's people with chronic migraines alone.

## Epilepsy and seizures

**Epileptic seizure** is uncontrolled increased or synchronised activity of neurons in the brain. It results in seizures, paralysis, temporary failure of internal organs, loss or confusion, partial amnesia, and outbreaks of fear and anxiety.

Seizures can occur on their own or be part of entire illnesses. If they recur frequently, they are considered **epilepsy**.

Some statistics. [About 8-10% of people in the world](https://books.google.ru/books?id=-L5dDwAAQBAJ&pg=PA959&redir_esc=y#v=onepage&q&f=false) have had at least one epileptic seizure. In 3% they have resulted in epilepsy.

Seizures can be influenced not only by internal factors but also by external factors. For example, light or sounds.

Seizures triggered by light, sounds and even reading are called reflex seizures. When there are many such seizures, a person has reflex epilepsy (RE).

Reflex epilepsy comes in several types. We are most interested in photosensitive epilepsy (PSE). It is triggered by intense flickering light or movement. It occurs in [5% of all people with epilepsy](https://www.seizure-journal.com/article/S1059-1311(17)30252-2/fulltext). It occurs most often between the ages of 7 and 19.

So content that flashes, flickers and flashes can lead to an epileptic seizure. It seriously increases electrical activity in neurons.

{% note "The most dangerous spectra for people with light-sensitive epilepsy are red and blue-red." %}

## What are the threats

So who can cause an epileptic seizure or other negative physical reaction?

- Video.
- Gifs.
- Canvas.
- SVG, CSS, and JS animations. For example, when there are moving images next to the text or the foreground and background are simultaneously scrolling in different directions - parallax effects.
- Animated scrolling that lasts longer than 1/4 second.
- Graphics with contrasting stripes, squares, spirals and concentric circles.
- High contrast.

Not too long ago, I faced eye strain and feelings of nausea because of [splash screen in WebStorm 2021.1](http://mikeozornin.ru/blog/all/jetbrains-ide-splashscreens/) myself. It's just a static image though. Thanks to a JetBrains team for listening to the feedback and reduced the saturation of the images.

There are more examples of problematic interfaces in ["Your Interactive Makes Me Sick"](https://source.opennews.org/articles/motion-sick/) by Eileen Webb. I hope your vestibular system handles this challenge better than mine.

<figure>

> You don't even need an image or video to cause harm. A <div> element set to change colour and luminosity at high frequency, easily done via JavaScript, can cause real harm. And, flickering can occur everywhere. For example, "spinners" commonly used to display while pages load can easily "flicker" while spinning.
<figcaption>MDN.</figcaption>

</figure>

## Tips & Tricks

It is dangerous to involve people with epilepsy and vestibular impairment in testing. So the only thing left to do is to be proactive and take into account the advice given by experts.

So what can we do to avoid harming users?

{% hiddenSpan "👉" %} The frequency of normal and red flashes is no more than 3 times per second (3 Hz). This is the minimum accessibility requirement for people with epileptic seizures.

**A general flash** is a pair of opposite states of relative brightness when it changes by 10% or more. In this case, the relative brightness of the dark image is less than 0.8. And **red flash** is a pair of opposite transitions where there is a saturated red colour in between.

{% note "In addition to flashes, there are blinks. Blinking content switches between two states. It is usually needed to draw attention to an element. If the blinks don't last long and stop automatically, it's fine. If not, the requirements are the same as for flashes: no more than 3 times per second." %}

You can check video and animations with the free software [Photosensitive Epilepsy Analysis Tool (PEAT)](https://trace.umd.edu/peat/). However, it is only suitable for non-commercial purposes. For commercial purposes, there is a paid [Harding Test](https://www.hardingfpa.com).

{% hiddenSpan "👉" %} If the frequency of flashes is more than 3 times per second, you can reduce their area and make it a "Small safe area". This is less than 10% of the centre of the field of view or less than 25% of the screen size. This is because the central part of the eye consists of a large number of sensors. They are more active than others in transmitting signals to the visual cortex and can overload neurons.

{% note "The recommended flash area for a 1024x768 ratio display with a 15-17 inch diagonal at standard eye distance (58-68 cm) is **341x256 pixels**." %}

This isn't the most reliable solution. A user could visit the site from a mobile device and bring it too close to their eyes.

{% hiddenSpan "👉" %} If possible, it's best to avoid red flashes or saturated shades of red in videos and animations altogether.

{% hiddenSpan "👉" %} Watch the contrast of the animation and do not make it too high.

{% hiddenSpan "👉" %} You can switch off the animation if it's not a key functionality. The `prefers-reduced-motion` media feature comes in handy for this.

It checks a selection of "Reduce Motion" on macOS or "Show animations" on Windows. Right now [its global support is 96.75%](https://caniuse.com/?search=prefers-reduced-motion). There's an example of how it works in the [W3C demo](https://www.w3.org/WAI/WCAG21/working-examples/css-reduced-motion-query/).

There're no ironclad values for speed, smoothness and other animation properties. So you can use the experience of other developers or ask users about their experience.

[Option 1](https://github.com/jensimmons/cssremedy/issues/11#issuecomment-462867630) with `prefers-reduced-motion` only:

```CSS
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

[Option 2](https://css-tricks.com/revisiting-prefers-reduced-motion/#taking-it-to-code) with `advantages of reduced motion' and `upgrade':

```CSS
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
An `update` media feature from the [Media Queries Level 4](https://www.w3.org/TR/mediaqueries-4/#update) specification, which is now in candidate recommendation status. `update` determines whether the output device can change an appearance of content once it has been rendered. There are three values: `none`, `slow` and `fast`.

The snippet below uses `low`. It is suitable for situations where the layout changes dynamically according to normal CSS rules, but the device doesn't display the changes smoothly. For example, e-ink screens or cheap smartphones.

{% note "You can use the [Magica11y](https://magica11y.github.io) suite of utilities to work with this and other media features." %}

[Option 3](https://css-tricks.com/revisiting-prefers-reduced-motion/#reduce-isnt-necessarily-remove), which has everything:

```CSS
:root {
    --animation-duration: 250ms;
    --transition-duration: 250ms;
}

@media screen and (prefers-reduced-motion: reduce), (update: slow) {
    :root {
        --animation-duration: 0.001ms !important;
        --transition-duration: 0.001ms !important;
    }
}

@media screen and (prefers-reduced-motion: reduce), (update: slow) {
    * {
        animation-duration: var(--animation-duration);
        animation-iteration-count: 1 !important;
        transition-duration: var(--animation-duration);
    }
}

@media screen and (prefers-reduced-motion: reduce), (update: fast) {
    .c-educational-concept {
        --animation-duration: 6000ms !important;
        ...
        animation-name: educational-concept;
        animation-duration: var(--animation-duration);
    }
}
```

[Option 4](https://web.dev/prefers-reduced-motion/#(bonus)-forcing-reduced-motion-on-all-websites), which can be added to a browser extension for personal use:

```CSS
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

{% hiddenSpan "👉" %} If possible, add alternative styles without animation and dangerous images or give a link to a text version from pages with parallax.

{% hiddenSpan "👉" %} Not all users are advanced and know where the animation settings are. If you consider the human factor, you can add a special button in the menu. It will enable safer animations. This is what they did on an [Animal Crossing website](https://animal-crossing.com/).

{% hiddenSpan "👉" %} It should be possible to pause, stop or generally hide any information that:

- automatically scrolls, moves, and blinks;
- refreshes for more than 5 seconds;
- displayed in parallel with other content.

For example, parallax effects or carousels. Usually, pause and stop buttons handle this.

Automatic video playback can be stopped by removing `autoplay` in `<video controls>`. Sound can be muted with the `muted` attribute.

For all animated elements, you can set `animation-play-state: paused;`. This will pause an animation by default.

This requirement does not apply to loading animations. Users might think the loading is paused or cancelled. The same goes for ads, as they are sometimes necessary for accessing content. Hello, YouTube.

{% hiddenSpan "👉" %} Set a short `animation-duration` and `transition-duration` instead of `animation: none` or `transition: none`.

{% hiddenSpan "👉" %} GIFs cause the most trouble. Users cannot control their speed or turn them off.

A good option is to replace GIFs with videos using the `loop` attribute or with SVG animation. Use scripts to add control elements for them. For example, [gifplayer on jQuery](https://github.com/rubentd/gifplayer). Or you can add the [web component `<x-gif>`](https://github.com/geelen/x-gif).

{% hiddenSpan "👉" %} Animated text is also not the most harmless part of the interface. There are no standard ways to adjust its animation yet. If it moves significantly to the side or noticeably increases/decreases in size, it can also cause seizures or dizziness. So, it's better to either completely abandon this idea or change the content slightly and smoothly.

{% hiddenSpan "👉" %} Place a warning about dangerous content if you're unsure and can't do anything else.

{% hiddenSpan "👉" %} Follow a couple of simple recommendations about patterns and images. If they consist of straight contrasting lines, it's better to stop at 8. If they are waves, then place no more than 5 next to each other.

## What to refer to in WCAG 2.1

Accessibility criteria for people with epileptic seizures and vestibular impairment are collected in two guidelines:
- Guideline 2.2. Sufficient time.
    - [Criterion 2.2.2. Pause, stop, and hide](https://www.w3.org/TR/WCAG21/#pause-stop-hide) (A).
- [Guideline 2.3. Epileptic seizures and physical reactions](https://www.w3.org/TR/WCAG21/#seizures-and-physical-reactions).
    - Criterion 2.3.1 Three Flashes or Below Threshold (A).
    - Criterion 2.3.2 Three Flashes (AAA).
    - Criterion 2.3.3 Animation during interaction (AAA).

***

Making an interface safe is not that hard, but very important. When people with epilepsy or vestibular impairment visit a website, it's not just about being able to read a text. An inaccessible interface can make them feel worse and sometimes pose a threat to life.

Vestibular impairment can appear spontaneously. For example, due to side effects from medications, head injuries, and even hot weather. The same situation applies to epileptic seizures. We are somewhat prepared for users with screen readers, but we cannot predict what will make a person feel unwell. Therefore, it is so important not to create barriers from the start.

## Further reading

- [WCAG 2.1](https://www.w3.org/TR/WCAG21).
- [Web accessibility for seizures and physical reactions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Seizure_disorders), MDN.
- [Seizure and Vestibular Disorders](https://webaim.org/articles/seizure), WebAIM.
- [Your Interactive Makes Me Sick](https://source.opennews.org/articles/motion-sick), Eileen Webb.
- [Revisiting prefers-reduced-motion, the reduced motion media query](https://css-tricks.com/revisiting-prefers-reduced-motion/), Eric Bailey.
- [Accessibility for Vestibular Disorders: How My Temporary Disability Changed My Perspective](https://alistapart.com/article/accessibility-for-vestibular), Facundo Corradini.
- [Accessible Web Animation: The WCAG on Animation Explained](https://css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained), Val Head.
- [Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity), Val Head.
- Lots of useful stuff about accessible animation on [Val Head's blog](https://valhead.com/blog/).
