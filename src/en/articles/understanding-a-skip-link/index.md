---
title: Understanding skip link
description: How to skip large navigation with skip link, who needs it and what are the approaches to implementing skip content pattern.
keyTheme:
    - Patterns
    - HTML
    - CSS
date: 2024-05-05
layout: article.njk
templateEngineOverride: md, njk
---
There are many small but useful patterns available on the web. One of them is the content skip link or skip link. This is a hyperlink that leads to the main content of the page and helps to skip through lengthy, repetitive content. Its main purpose is to save users' time.

What kind of content is considered bulky? A navigation menu with a logo and a lot of links, a bulky complex table, letter indexes, and lists with chapters or technical specifications. Most often skip link is useful for skipping site navigation in the header.

Exceptions are the menu in the footer and small navigation in the header, which consists of a couple of links and a logo. In the case of the footer, you can return to the top of the page using keys, gestures and other in-built browser' features. And the small navigation won't take up much time for users.

In theory, everything is simple, but in practice, it is a bit more complicated. Let's try to deal with everything in order.

## Theory

### What WCAG 2.1 says about this.

In the accessibility guidelines, there are two criterions related to skip links. The first deals with them indirectly and the second directly.

- [Criterion 2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard) (A). All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.
- [Criterion 2.4.1 Block Skipping](https://www.w3.org/TR/WCAG21/#bypass-blocks) (A). A mechanism is available to bypass blocks of content that are repeated on multiple web pages.

#### Mechanics for skipping blocks

There are two mechanics:

- landmark navigation (landmarks);
- skip link.

The first method is available for screen reader users. Landmarks are added using semantic tags or thanks to ARIA. The second mechanic has a larger audience. It is not only users with visual impairments.

You can meet the advice that skip link is not needed on a site with a good semantic layout. This is not quite true. Not all screen reader users know about shortcuts to open a menu with landmarks, and other keyboard users don't have this option. Also, the more navigation options, the better.

### Who needs a skip link

In short, anyone who consistently navigates pages and can't skip content quickly. In a nutshell, four categories of users. These are:

- Screen reader users, who navigate desktop sites with a keyboard and mobile sites with taps and swipes.
- Users with motor impairments who use a keyboard, remote computer buttons, and [other switches](https://axesslab.com/switches/).
- Any other keyboard users. They may be advanced level or have a temporarily broken mouse.
- Screen magnifier users who use the keyboard to navigate.

Imagine that you are using a keyboard for navigation and you have entered the site of an online shop, for example, Ozon. You found the product you wanted, navigated to it and found yourself back at the beginning of the page. About 40 tabs and finally you can find out more about your favourite backpack. With skip link you would be in the right place in one click and not fall asleep on the way.

### Requirements for skip link

- Located in the first place in tab order.
- Leads directly to the main content and sets the focus on it. It is more effective if the page has one main area, `<main>`.
- It can be located in the main area of the page. In this case, it skips the necessary block and leads to the beginning of the next.
- It has a clear name and a good description of where it leads.
- It can be always visible, or it can appear at the keyboard focus. In both cases, it meets WCAG criteria.
- You can add more than one of these links. For example, one leads to the main content, and the second - to the search bar. You should not overdo the number, otherwise there is no point in links.
- Should not interfere with the mouse users. This is a controversial requirement, but it has a grain of truth. If such a link is always visible, it may confuse mouse users. They aren't familiar with the pattern, and they don't need another way to scroll to the main content.

## Practice

A project should already support keyboard focus and use a semantic layout. Without this, skip link is useless.

### Marking up the page

Before we move on to markup, a couple of words about the link text. On English websites, "Skip to main content" or "Skip to content" is most often used.

A few more variations on the title:

- Skip navigation;
- Skip main navigation;
- Skip navigation links.

Now let's talk about markup.

The practical implementation of skip link is an anchor link. It is better to add it to the beginning of `<body>` or `<header>` if it is the first element on the page. In the examples, I will add it to the beginning of the header.

```html
<header>
    <a href="#main-content" class="skip-link">Skip to main content</a>
     <!-- Enormous navigation -->
</header>
```

But where it should lead is the main sticking point. There are several answers to that question.

**Option 1**, the classic one. The link leads directly to ``<main>``.

``html
<!-- Option 1 -->

<header>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- Enormous navigation -->
</header>

<main id="main-content">
    <!-- Main Block Content -->
</main>
```

This option works more or less well in modern browsers, but there is one "but". [There may be problems](https://axesslab.com/skip-links/) in all mobile browsers on older versions of iOS and Android, in older Chrome and even in Safari 14. Every place has its bugs.

- **iOS + VoiceOver**. 
When skip linking, scrolling is visually triggered, but after swiping, the focus moves to a different area rather than the content of the main block. Another bug returns to the beginning of the page when you try to go to the next item in the main block.
- **Android + TalkBack**. Hidden links just don't get focus. This is a system-wide bug that causes the focus event to not fire on such items.
- **Chrome**. Focus stays on the skip link and moves to the next element after the link after clicking on <kbd>Tab</kbd>.

[The bug on iOS](https://bugs.webkit.org/show_bug.cgi?id=179011) was fixed in April 2020, on [Android](https://bugs.chromium.org/p/chromium/issues/detail?id=657157) in February 2021 and in [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=37721) back in 2017. Hence, they don't occur with iOS 13+, at least not with Android 10+ and in older versions of Chrome. However, a part of screen reader users don't update browsers and operating systems for a long time, so fixing bugs doesn't make it any better.

**Option 2**, where the link leads to `<h1>` inside `<main>`.

```html
<!-- Option 2 -->

<header>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- Enormous navigation -->
</header>

<main>
    <h1 id="main-content">Main heading</h1>
    <!-- The rest of the content of the main block -->
</main>
```

It differs from the first option in that screen readers will announce the header text rather than the entire `<main>` text content. This will give users more control, as they don't have to interrupt the automatic announcement manually.

This markup has the same bugs as the previous option with `<main>` with the `id` attribute.

**Option 3**, which solves the problem of the previous two.

```html
<!-- Option 3 -->

<header>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- Enormous navigation -->
</header>

<main id="main-content" tabindex="-1">
    <!-- Main block content -->
</main>
```

A `tabindex` attribute with a negative value removes the element from the sequential navigation.

This hack works well with older versions of Chrome and on iOS. Again, a "but". In other browsers, this can lead to new bugs:

- When navigating to the main block, the entire area with a negative `tabindex` is highlighted.
- When you click on the page, the focus will return to the beginning of the page.

This is where JavaScript comes to the rescue. We need a script that sets the focus on `main` and adds the attribute `tabindex="-1"` to it after the click event of the skip link. When focus is lost, this attribute is removed. You can sneak a peek at the implementation in [Mike Foskett's demo](https://codepen.io/2kool2/pen/bxdzEJ), also for Android. Anika Henke offers a more generic [jQuery solution](https://github.com/selfthinker/dokuwiki_template_writr/blob/master/js/skip-link-focus-fix.js) that fixes all links and also removes `tabindex` when the focus is lost.

**Option 4**, where skip link leads to another link before `<main>`.

```html
<!-- Option 4 -->

<header>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- Enormous navigation -->
</header>

<a href="#main-content" id="main-content" class="skip-link skip-link-target">Beginning of the main content</a>

<main>
    <!-- Main block content -->
</main>
```

The solution was proposed by Paul Radcliffe in [«A Deep Dive on Skipping to Content»](https://css-tricks.com/a-deep-dive-on-skipping-to-content/). He did a [demo](https://rpress.io/examples/skip-to-content/skip-to-content-additional-in-content-skip-link.html) for more clarity.

In this case, the screen reader will announce that we have navigated to the " Beginning of the main content" link.

Markup solves the problem of users who don't realise whether the link worked or not. It also helps to avoid bugs with incorrect keyboard focus behaviour in some browsers.

This method is new and interesting, but I see a few problems.

1. The second link can be confusing for screenreader users. It doesn't lead anywhere, but it makes you want to click on it.
2. If a user without visual impairments tabs through the entire navigation, they will see an incomprehensible link "Start of main content".
3. You'll definitely catch the Android bug from the first option because these are still visually hidden elements.

**Option 5** where the second link is without text inside `<main>`, with or without `href`.

```html
<!-- Option 5 -->

<header>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- Enormous navigation -->
</header>s

<main>
    <a id="main-content" class="visually-hidden-link"></a>
    <!-- The rest of the content of the main block -->
</main>
```

It's used on [Deque](https://www.deque.com). And it seems to be the most problematic option.

A link without `href` is considered a [placeholder link](https://www.scottohara.me//note/2019/07/17/placeholder-link.html). It can be used for some situations, but only if it is not supposed to work as a link. This is because it doesn't get keyboard focus.

If it's an untitled link but with `href`, screen readers will read the contents of that attribute. For example, `"#main-content"`. For NVDA, `aria-hidden="true"` will fix this problem.

**Option 6** with multiple references, which is suitable for rare cases.

```html
<!-- Option 6 -->

<header>
    <nav aria-label="Ссылки для пропуска меню">
        <a href="#search" class="skip-link">Jump to site search</a>
        <a href="#main-content" class="skip-link">Skip to main content</a>
    </nav>
    <!-- Enormous navigation -->
    <form id="search">
        <!-- Site search -->
    </form>
</header>

<main id="main-content">
    <!-- Main block content -->
</main>
```

In this example, both links are wrapped in an extra `<nav>` with `aria-label`. Screen readers will declare that this is navigation with links to skip the menu. You can wrap them in `<ul>` additionally to make it easier for users to navigate.

Without the hack with `tabindex="-1"` from the third option, you may also have issues in old and some new browsers.

## Hide a link

Visually hiding a link and showing it when in focus can also be done in different ways. There are a couple of basic rules:

- Don't use the `display: none`, `visibility: hidden` properties or the `hidden` attribute. We only need to hide the link visually.
- Don't set the `width` and `height` to 0. Then the focus will simply not be set on such an element.

Let's take a look at a couple of specific examples with styles.

**Option 1** with `position: absolute` and an insanely large negative `left` value.

We just absolutely position the element, move it outside the visible area, and return it to where we want it when the focus is set.

```css
/* Option 1 */

.skip-link {
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

/* Show on focus */
.skip-link:focus {
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    overflow: visible;
}
```

**Вариант 2** с `clip` или `clip-path`. Старый-добрый visually-hidden способ.

You can use them at the same time for better compatibility. I also met an option with `clip-path: inset(50%)`.

```css
/* Option 2 */

.skip-link {
    position: absolute;
    margin: 0;
    padding: 0;

    /* For all browsers */
    clip: rect(0 0 0 0);

    /* A more modern way. Supported with prefix */
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
}

/* Show on focus */
.skip-link:focus {
    top: 0;
    left: 0;
    width: auto;
    height: auto;

    /* If you use clip */
    clip: auto;

    /* If you use clip-path */
    -webkit-clip-path: none;
    clip-path: none;
}
```

The `clip` property is deprecated and should be replaced by `clip-path`, it is supported in [most modern browsers](https://caniuse.com/css-clip-path).

**Вариант 3** с `transform`.

Position the link absolutely again and hide it outside the visible area with `transform`. When the focus is on it, we bring it back.

```css
/* Option 3 */

.skip-link {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
}

/* Show on focus */
.skip-link:focus {
    transform: translateY(0%);
}
```

## Putting the final touches

The rest of skip link styling depends on your design vision. The most important thing is that it should be clearly visible when on keyboard focus.

[WebAIM](https://webaim.org) recommends not to show the link unexpectedly. This can confuse keyboard users who are seeing the interface. A smooth animation will fix this. Then the link will move out from behind the edge of the screen and move back in when there's no longer focus on it.

You can place the links in any top part of the screen. They are often placed in the top left corner, but this isn't an ironclad rule.

I've put together a small list of sites with skip link where you can see how it works and looks. Use <kbd>Tab</kbd> for navigation on Windows and <kbd>Tab</kbd> or <kbd><kbd>Option</kbd>+<kbd>Tab</kbd></kbd> on macOS.

- [The New York Times](https://www.nytimes.com).
- [BBC](https://www.bbc.com).
- [GOV.UK](https://www.gov.uk).
- [Deque](https://www.deque.com).
- [WebAIM](https://webaim.org).
- [Amazon](https://www.amazon.com).
- [PlayStation](https://www.playstation.com).
- [Microsoft](https://www.microsoft.com/).
- [World of Warcraft](https://worldofwarcraft.com/en-gb/).
- [Reddit](https://www.reddit.com).

## A few last words

Often the simpler something seems, the more complicated it is in reality. This happened with skip link.

There are quite a few ways to make a skip link for such a small element. They have pros and cons. I would go for the classic implementation with the link that leads to `<main>` or `<h1>` with `tabindex="-1"` from the third option. As for styles for hiding the link, all the options are good. You can choose whichever one suits the project best. I mostly use absolute positioning and negative `left` value.

## Further reading

- [Bypass Blocks. Understanding SC 2.4.1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html), W3C.
- [Accessibility Skip links](https://www.w3schools.com/accessibility/accessibility_skip_links.php), W3C School.
- [«Skip Navigation» Links](https://webaim.org/techniques/skipnav/), WebAIM.
- [Use skip navigation links](https://www.a11yproject.com/posts/skip-nav-links/), Cameron Cundiff.
- [A Deep Dive on Skipping to Content](https://css-tricks.com/a-deep-dive-on-skipping-to-content/), Paul Ratcliffe.
- [Some thoughts on CSS Tricks' «Deep Dive on Skipping to Content»](https://plousia.com/blog/some-thoughts-css-tricks-deep-dive-skipping-content), Susanna Celso.
- [How to Create a «Skip to Content» Link](https://css-tricks.com/how-to-create-a-skip-to-content-link/), Paul Ryan.
- [Implement a Skip Link for Navigation-Heavy Sites](https://benmyers.dev/blog/skip-links/), Ben Myers.
- [Your skip links are broken](https://axesslab.com/skip-links/), Hampus Sethfors.
- [Skip links: the 5 most common mistakes](https://www.system-concepts.com/insights/skip-links-the-5-most-common-mistakes/), System Concepts.

***

Thanks to [Vasily Dudin](https://twitter.com/vasiliy_dudin) for help with editing.
