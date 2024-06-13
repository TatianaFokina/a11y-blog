---
title: Understanding skip links
description: How to help users to skip large chank of a page content, whose these users are, and how to implement it on your website.
keyTheme:
  - Patterns
  - HTML
  - CSS
date: 2024-05-05
updated: 2024-06-13
layout: article.njk
templateEngineOverride: md, njk
---

There are many small but useful patterns available on the web. One of them is a _content skip link_ or _skip link_. This is a hyperlink that leads to the main content of a page and helps to skip through lengthy, repetitive content. Its main purpose is to save users' time.

What kind of content is considered bulky? A navigation menu with a logo and a lot of links, a complex table, letter indexes, and lists with chapters or technical specifications. Most often, the skip link is useful for skipping site navigation from a header.

Exceptions are a footer menu and a brief header navigation, which consists of a couple of links and a site logo. In the case of footers, you can return to the top of a page using keyboard keys, gestures, and other in-built browser features. So, a brief navigation won't take up much time for users.

In theory, everything is simple. In practice, it's a bit more complicated. Let's learn step by steps.

## Theory

### What WCAG 2.2 says

In the accessibility guidelines, there are two criteria related to skip links.

- [Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG22/#keyboard) (A). All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.
- [Criterion 2.4.1 Block Skipping](https://www.w3.org/TR/WCAG22/#bypass-blocks) (A). A mechanism is available to bypass blocks of content that are repeated on multiple web pages.

#### Mechanics for skipping blocks

There are two mechanics for skipping content on a web page:

- Landmark navigation (landmarks)
- Skip link.

The first method is available for screen reader users. Landmarks are created using semantic tags, thanks to ARIA. The second mechanic has a larger audience. It's not only for users with visual impairments.

You can find advice that the skip link isn't necessary for websites with a good layouts. This isn't quite true. Not all screen reader users know about shortcuts for landmarks. Other keyboard users don't have this option at all. Also, the more options for navigation, the better.

### Who needs it

In short, anyone who consistently navigates through pages and can't skip content quickly. In a nutshell, there are four (4) categories of users.

- Screen reader users, who navigate through websites with a keyboard and mobile versions of websites by taps and swipes
- Users with motor impairments who use a keyboard, remote computer buttons, and [other switch devices](https://axesslab.com/switches/)
- Any other keyboard users. They may be of an advanced level or have temporarily broken devices, such as a computer mouse, etc.
- Screen magnifier users who use the keyboard to navigate.

Imagine that you're using a keyboard for navigation and open any online shopping platform. You found the product you wanted, navigated to it, and found yourself on the top of the page. About forty (40) tabs later, you can finally find out more about your perfect backpack. With the skip link, you would be in the right part of a page in one tab and not fall asleep on the way 😴.

### List of requirements

- Located in tab order first
- Leads directly to the main content and sets the focus on it. It's more effective if the page has one main area
- It can be located in the main part of the page. In this case, it skips the necessary block and leads to the beginning of the next part of a web page
- It has a clear name and a good description of where it leads
- It can always be visible, or it can appear when a person uses a keyboard. In both cases, it meets WCAG criteria
- You can add more than one of the skip links. For example, one leads to the main content, and the second to the search bar. It's better don't overdo the number. Otherwise, there is no point in the skip-link pattern
- It shouldn't interfere with mouse users. This is a controversial requirement, but it has a grain of truth. If such a link is always visible, it may confuse mouse users. They aren't familiar with this pattern, and don't need another way to scroll to the main content.

## Practice

You need to support keyboard navigation from the start. In other cases, the skip link is useless by default.

### Marking up the page

Before we move on to HTML and CSS, I want to say a couple of words about skip link names. On English-language websites, ″Skip to main content″ or ″Skip to content″ is most often used. There are a few more options:

- Skip navigation
- Skip main navigation
- Skip navigation links.

Finally, let's talk about HTML.

The practical implementation of the skip link is an anchor link. It's better to add it at start of a page, before other HTML elements. The best parts of HTML code for that reason are `<header>` if it's the first element on the page or `<body>`. I'm going to use the link as the first child element for the header one.

```html
<header>
  <a href="#main-content" class="skip-link">
    Skip to content
  </a>
  <!-- Enormous navigation -->
</header>
```

But where the skip link should lead? There are several answers to that question.

**Option 1**: The classic one, the anchor link leads directly to the `main` element.

```html
<header>
  <a href="#main-content" class="skip-link">
    Skip to content
  </a>
  <!-- Enormous navigation -->
</header>

<main id="main-content">
  <!-- Main page content -->
</main>
```

The first option works more or less well in modern browsers, but there is one ″but″. There may be problems with [old versions of browsers on iOS and Android and in old Chrome](https://axesslab.com/skip-links/).

**Mobile VoiceOver**: When you scroll to the anchor element after pressing on, focus set to a different area rather than the content of the main block. The second bug returns you to the top part of a page when to go to the next item in the main block.

**Desktop VoiceOver with Safari**: Focus stuck in the top banner when VoiceOver users set focus on an anchor elements and press right arrow key. Take a look at [the issue from GOV.UK repo on GitHub](https://github.com/alphagov/govuk-frontend/issues/2187).

**TalkBack**: You just can't set focus on visually hidden links. This is one of the system bug on Android that causes the focus event not to fire on this type of element.

**Chrome blowser**: The skip link doesn't send focus to the anchor element via the <kbd>Tab</kbd> key, and moves to the next element after the link.

[The bug on the iOS platform](https://bugs.webkit.org/show_bug.cgi?id=179011) was fixed in April 2020. [Chromium team fixed bug](https://bugs.chromium.org/p/chromium/issues/detail?id=37721) back in 2017. [The bug on Android](https://bugs.chromium.org/p/chromium/issues/detail?id=657157) haven't been fixed yet. [The bug on Android](https://bugs.chromium.org/p/chromium/issues/detail?id=657157) hasn't been fixed yet. Hence, these bugs don't occur with iOS 13+ or older versions of Chrome. However, some screen reader users don't update versions of browsers and operating systems frequently.

**Option 2**: The skip link refers to the `h1` element as a child of the `main` one.

```html
<header>
  <a href="#main-content" class="skip-link">
    Skip to content
  </a>
  <!-- Enormous navigation -->
</header>

<main>
  <h1 id="main-content">Main heading</h1>
  <!-- Another page content -->
</main>
```

It differs from the first option in that screen readers will announce the header text rather than the entire `<main>` text content. This will give users more control, as they don't have to interrupt the automatic announcement manually.

This markup has the same bugs as the previous option with the `id` attribute of the `main` element.

**Option 3**: The solution that fixes the problems with the previous examples.

The `tabindex` HTML attribute with a negative value removes the element from the sequential navigation order.

```html
<header>
  <a href="#main-content" class="skip-link">
    Skip to content
  </a>
  <!-- Enormous navigation -->
</header>

<main id="main-content" tabindex="-1">
  <!-- Main page content -->
</main>
```

This hack works well with older versions of Chrome and on iOS. Again, one ″but″. In other browsers, this can lead to new bugs:

- When a user navigating to the main block, the entire area with a negative value for `tabindex` is highlighted
- When you click on a page, focus will return to the top part of a page.

This is where JavaScript comes to help us. We need a script that move focus on the `main` element. After click event on the skip link, we also want to set `tabindex="-1"` for the main block. When focus is lost, the HTML attribute is removed. You can sneak a peek at [the Mike Foskett's implementation](https://codepen.io/2kool2/pen/bxdzEJ). Anika Henke offers a more generic [jQuery solution](https://github.com/selfthinker/dokuwiki_template_writr/blob/master/js/skip-link-focus-fix.js) that fixes all links and also removes `tabindex` when focus isn't on the anchor element anymore.

**Option 4**: The skip link leads to another link before the `main` element.

```html
<header>
  <a href="#main-content" class="skip-link">
    Skip to content
  </a>
  <!-- Enormous navigation -->
</header>

<a
  href="#main-content"
  id="main-content"
  class="skip-link skip-link-target"
>
  Beginning of the main content
</a>

<main>
  <!-- Main page content -->
</main>
```

The solution was proposed by Paul Ratcliffe in ″[A Deep Dive on Skipping to Content](https://css-tricks.com/a-deep-dive-on-skipping-to-content/)″. He made [a demo for more clarity](https://rpress.io/examples/skip-to-content/skip-to-content-additional-in-content-skip-link.html).

In this case, the screen reader will announce that we have navigated to the ″Beginning of the main content″ link.

The last markup example solves the problem for users who don't realise whether the link worked or not. It also helps to avoid bugs with incorrect keyboard focus behavior in some browsers.

This method is new and interesting, but I see a few problems.

- The second link can be confusing for screen reader users. It doesn't lead anywhere, but it makes you want to click on it
- If a user without visual impairments tabbing through an entire navigation, they will see an incomprehensible link ″Start of main content″
- You'll definitely face with the Android bug because these are still visually hidden elements.

**Option 5**: The second link doesn't contain text, with or without the `href` attribute.

```html
<header>
  <a href="#main-content" class="skip-link">
    Skip to content
  </a>
  <!-- Enormous navigation -->
</header>

<main>
  <a id="main-content" class="visually-hidden-link"></a>
  <!-- The rest of the content of the main block -->
</main>
```

A link without `href` is considered [a placeholder link](https://www.scottohara.me//note/2019/07/17/placeholder-link.html). It can be used in some situations, but only if it's not supposed to work as a link. This is because it doesn't get keyboard focus.

If it's an unnamed link but with `href`, screen readers will announce a value of the HTML attribute. For instance, `"#main-content"`. For NVDA, `aria-hidden="true"` may fix this issue.

**Option 6**: Multiple references, which is suitable for rare cases.

In this code snippet, both links are wrapped with the extra `<nav>` container with `aria-label`. Screen readers will announce about the navigation contains links for skipping the website menu. You can also use the `ul` element to make it easier for screen readers users to navigate throug a page.

```html
<header>
  <nav aria-label="Skip links">
    <a href="#search" class="skip-link">
      Jump to search
    </a>
    <a href="#main-content" class="skip-link">
      Skip to content
    </a>
  </nav>
  <!-- Enormous navigation -->
  <form id="search">
    <!-- Searching elements -->
  </form>
</header>

<main id="main-content">
  <!-- Main page content -->
</main>
```

You may also have issues in old and some modern versions of browsers without the hack with `tabindex="-1"`.

## Hide the link

It's possible to hide the link visually and show it in different ways. There are a couple of basic rules:

- Don't use `display: none`, `visibility: hidden` or the `hidden` HTML attribute. We only need to hide the link visually
- Don't set the value for `width` and `height` to `0`.

Let's take a look at a few examples with styles.

**Option 1**: `position: absolute` and an insanely large negative value for the `left` property.

We just absolutely position the element, move it outside the visible area, and return it to where we want it when the focus is set.

```css
.skip-link {
  position: absolute;
  top: auto;
  left: -999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Show keyboard focus */
.skip-link:focus-visible {
  top: 0;
  left: 0;
  width: auto;
  height: auto;
  overflow: visible;
}
```

**Option 2**: `clip` or `clip-path` CSS properties.

You can use both properties for better compatibility. I've also found an implementation with `clip-path: inset(50%)`.

```css
.skip-link {
   position: absolute;
  margin: 0;
  padding: 0;

  /* For all browsers */
  clip: rect(0 0 0 0);

  /* The modern way */
  -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  clip-path: polygon(0 0, 0 0, 0 0, 0 0);
}

/* Show keyboard focus */
.skip-link:focus-visible {
  top: 0;
  left: 0;
  width: auto;
  height: auto;

  /* If you use the clip property */
  clip: auto;

  /* If you use the clip-path property */
  -webkit-clip-path: none;
  clip-path: none;
}
```

The `clip` property is deprecated and should be replaced by the `clip-path` one. Currently, in 2024, [`clip-path` supported by modern browsers with vendor prefix or just partly](https://caniuse.com/css-clip-path) (`-webkit-clip-path`).

**Option 3**: Let's use the `transform` property now.

Again, the link is positioning absolutely and placed somewhere outside the visible area via the `transform` property. When we set focus on the link, it comes back.

```css
.skip-link {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-100%);
}

/* Show keyboard focus */
.skip-link:focus-visible {
  transform: translateY(0%);
}
```

## The final touches

The rest of the skip link styles depends on your design vision. The most important thing is the link should be clearly visible in keyboard focus state.

WebAIM recommends not to show the link unexpectedly. This can confuse keyboard users who are seeing the interface. A smooth animation will fix this. Then the link will move out from behind the edge of the screen and move back in when there's no longer any focus on it.

You can place the links on any part of the screen. They're often placed in the top left corner, but this isn't an ironclad rule.

I've created a list of sites where the skip-link pattern is used. Press <kbd>Tab</kbd> for navigation on Windows and <kbd>Tab</kbd> or <kbd>Option Tab</kbd> on macOS.

- [The New York Times](https://www.nytimes.com)
- [BBC](https://www.bbc.com)
- [GOV.UK](https://www.gov.uk)
- [Deque](https://www.deque.com)
- [WebAIM](https://webaim.org)
- [Amazon](https://www.amazon.com)
- [PlayStation](https://www.playstation.com)
- [Microsoft](https://www.microsoft.com/)
- [World of Warcraft](https://worldofwarcraft.com/en-gb/)
- [Reddit](https://www.reddit.com).

## Wrapping up

Often, the simpler something seems, the more complicated it's in reality. This happened with the skip link too.

There are quite a few ways to develop the skip link. All of them have pros and cons. I would go for the classic implementation with the link leading to the main block or the `h1` element with `tabindex="-1"`. As for styles for hiding the link, all the options are good. You can choose whichever one suits your project best. I prefer to use absolute positioning and the `left` property with a negative value.

## Further reading

- [″Skip Navigation″ Links](https://webaim.org/techniques/skipnav/)
- [Use skip navigation links](https://www.a11yproject.com/posts/skip-nav-links/) by Cameron Cundiff
- [A Deep Dive on Skipping to Content](https://css-tricks.com/a-deep-dive-on-skipping-to-content/) by Paul Ratcliffe
- [Some thoughts on CSS Tricks' ″Deep Dive on Skipping to Content″](https://plousia.com/blog/some-thoughts-css-tricks-deep-dive-skipping-content) by Susanna Celso
- [How to Create a ″Skip to Content″ Link](https://css-tricks.com/how-to-create-a-skip-to-content-link/) by Paul Ryan
- [Implement a Skip Link for Navigation-Heavy Sites](https://benmyers.dev/blog/skip-links/) by Ben Myers
- [Your skip links are broken](https://axesslab.com/skip-links/) by Hampus Sethfors.

***

Thanks to [Vasily Dudin](https://twitter.com/vasiliy_dudin) for help with editing ❤️
