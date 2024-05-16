---
title: Everything you need to know about ARIA Live Regions
description: If you have a dynamically changing part of a page and you're thinking about making it accessible, there may be a legitimate question about how to do it. In the past, assistive technologies (including screen readers) didn't know how to handle them properly. Now the problem of accessibility of dynamically changing page content can be solved with ARIA.
keyTheme:
    - HTML
    - Screen readers
date: 2024-05-11
layout: article.njk
templateEngineOverride: md, njk
---

(This is a translation of my article from [Web Standarts](https://web-standards.ru/articles/aria-live-regions/), editor Vadim Makeev)

How to make content changes accessible.

If you have a dynamically changing part of a page and you're thinking about making it accessible, there may be a legitimate question about how to make it so. These could be:

- Chats;
- Progress bars and timers;
- Widgets with news and weather forecasts;
- Miscellaneous bugs and alerts: new post, like, subscribe;
- Tickers (stock exchange information about stock quotes, indices, bonds), currency rates;
- Sports statistics and much more.

Previously, assistive technologies (including screen readers) didn't know how to properly process these. Users couldn't know if there was an error or new data until they returned to the previous block or reached the end of the page. Now the problem of accessibility of dynamically changing page content can be solved with ARIA.

If you're not familiar with this acronym, WAI-ARIA _(Web Accessibility Initiative - Accessible Rich Internet Applications)_ or simply ARIA is a standard consisting of a set of special roles and attributes that are added to markup and extend or augment the functions of standard HTML elements.

All we need to do is make the part of the page where the changes occur. In ARIA terminology, this is called a "live region." You can find [this definition](https://www.w3.org/TR/wai-aria-1.2/#dfn-live-region) in the standard:

> **Live Regions** are perceived areas of pages that are usually updated as a result of an external event when a user focuses somewhere else. These regions are not always updated due to user interaction with an UI. This practice has become commonplace as a result of the heavy use of Ajax.

Thus, the main purpose of such areas is to tell screen readers how to properly handle content changes that aren't necessarily dependent on users.

To make an interactive area on a page, we just need to add the `aria-live=""` attribute or a special ARIA role to any parent element. Then the changes of all its child elements will become available to screen readers. They will know now how to handle updates to the contents of such elements.

There are several such roles and attributes in ARIA. Let's talk about the roles first.

## Interactive Area Roles

There aren't many ARIA roles that make part of a page an interactive area. They are used like this: `role="alert"` Here's a complete list of them:

- `alert`;
- `status`;
- `log`;
- `timer`;
- `marquee`.

Let's deal with each role in order.

### Alert

A type of interactive area that contains information that is important at a certain point in time. It can be an error message, a warning that appears on the screen after some user actions or without his participation (a sudden error on the server side). Such a message can be either text or sound.

Let's take a look at a simple example where we warn users about something _really_ important:

```html
<div class="warning" role="alert">
    You've stared into the abyss for too long,
    and now the abyss is staring back at you.
</div>
```

Screen reader will instantly announce it the moment it appears, and interrupt the other announcement if there is one.

👉 For maximum compatibility, use `role="alert"` together with the `aria-live="assertive"` attribute. That said, such an element can still be incorrectly declared by VoiceOver on iOS. Let's make some minor changes to our example:

```html
<div class="warning" role="alert" aria-live="assertive">
    You've stared into the abyss for too long,
    and now the abyss is staring back at you.
</div>
```

It turns out that we duplicated the behaviour already built into `role="alert"` by using the `assertive` value of the `aria-live` attribute. The latter tells screen readers to announce changes immediately.

### Status

The area with this role contains additional information that is not particularly important and describes the status of changes (status bar). It can be information that a user action is successful or vice versa, that it is necessary to wait for some process to complete or that there is an error somewhere. For example, such a role can be assigned to the message about successful autosave of text or used when validating fields in the registration form.

By the way, there is a special command in screen readers that helps users to find out about a status. In NVDA this command is invoked by pressing the keys <kbd>Ins End</kbd>. And by <kbd>Ins 3</kbd> in JAWS.

In the example, we tell users that changes have been saved:

```html
<div class="status-message" role="status">
    We've saved your changes automatically.
</div>
```

The screen reader will declare this with a pause, not immediately, as in the case of `role="alert"`.

👉 The behaviour of `aria-live="polite"` attribute is included in `role="status"`. It's recommended to use them together for maximum compatibility. Therefore, the example above now looks like this:

```html
<div class="status-message" role="status" aria-live="polite">
    We've saved your changes automatically.
</div>
```

A screen reader will announce a successful autosave with a pause and won't interrupt other announcements.

### Log

A type of interactive area that contains logs. For example, a history of messages from chat rooms, a list of errors, and the like. For logs, the sequence in which new information appears is important. Think of the event log in your OS.

This example shows content updates in a chat room. When a user types a message in a text box, it is added to the end of the conversation.

```html
<div role="log">
    <h4>Message history</h4>
    <ul>
        <li>
            Can you borrow your Welsh corgi cardigan
            till Monday? I really need it.
        </li>
    </ul>
</div>
```

Теперь скринридер объявляет о новых комментариях после того, как пользователь перестал набирать или отправлять сообщение.

👉 `role="log"` на всякий случай лучше сочетать с атрибутом `aria-live="polite"`:

```html
<div role="log" aria-live="polite">
    <h4>Message history</h4>
    <ul>
        <li>
            Can you borrow your Welsh corgi cardigan
            till Monday? I really need it.
        </li>
        <li>Have you been hacked again?</li>
    </ul>
</div>
```

In this case, all changes will surely be announced with a pause and not interrupt other more important changes.

### Marquee

This kind of area contains information that changes rapidly. This role is similar to `log`, but in this case the sequence in which the information is updated is irrelevant. A simple example where `role="marquee"` might come in handy is tickers and exchange rates.

In this example, we add `role="marquee"` for a block with information about currency rates:

```html
<ul role="marquee">
    <li>1 yuan for 9999.56 ₽</li>
    <li>1 frontendcoin for 100000000000.32 ₽</li>
</ul>
```

A screen reader will announce changes in this block when the user focuses on it. Exchange rates change frequently, so constant announcements about it will only annoy users.

👉 `role="marquee"` should be used together with the `aria-live="off"` attribute:

```html
<ul role="marquee" aria-live="off">
    <li>1 yuan for 9999.56 ₽</li>
    <li>1 frontendcoin for 100000000000.32 ₽</li>
</ul>
```

We've simply duplicated the default `role="marquee"` behaviour for maximum compatibility.

### Timer

This role is needed for areas that contain counters that count down and backward. For example, a countdown timer, clock, or stopwatch.

```html
<div role="timer">
    <!-- Time is rapidly running out here -->
</div>
```

This role has a default behaviour built in, where the A screen reader won't announce changes to the timer, and the user will only know about them when focusing on it.

👉 The element with `role="timer"` should also be set to the `aria-live="off"` attribute for full compatibility with all assistive devices and browsers:

```html
<div role="timer" aria-live="off">
    <!-- Time is rapidly running out here -->
</div>
```

If you want a screen reader to announce changes after a certain time interval, you can do it with JavaScript. We need to switch `aria-live="off"` to `aria-live="polite"` at the desired interval, e.g. 60 minutes.

## Attributes of interactive areas

Now let's talk about attributes that make any area of the page interactive. There are four of them in total:

- `aria-live`;
- `aria-atomic`;
- `aria-relevant`;
- `aria-busy`.

Let's take a look at each of them.

### Aria-live.

This attribute is used to determine how important changes that have occurred to elements are.

That is, the values of this attribute reflect how urgently and quickly assistive technologies need to inform users of these changes. The attribute has three values: `off`, `polite`, and `assertive`.

- `off` (default value) - indicates the lowest priority, so such changes aren't announced. This behaviour is built into elements with `role="marquee"` and `role="timer"`. It can be set to areas that aren't important or change too quickly.
- `polite` - indicates a low priority level. It is used when there are changes to an area that assistive technologies don't need to announce instantly. Screen readers pause before such an announcement, don't interrupt current tasks and wait until a user stops interacting with the interface. This is how elements with `role="status"` and `role="log"` behave. It's suitable for notifications about new posts, likes, autosaves and the like.
- `assertive` - indicates the highest priority level. Such changes will be announced immediately, while changes with lower priority will be queued and announced later. This is how elements with `role="alert"` behave, so this attribute can be used to announce important changes, for example, a server error or that data hasn't been saved. The specification doesn't recommend using this value when there's no immediate need to notify users of changes.

Here are a couple of simple examples of using `aria-live="polite"` and `aria-live="assertive"`.

In this example with `aria-live="polite"` the name of the dish in the paragraph is changed when the button is clicked using the script.

```html
<p aria-live="polite">My favourite dish is
    <span id="food">lutefisk</span>.
</p>

<button type="button">Next dish</button>
```

A screen reader will pause before an announcement.

Here we have a form with several settings and a save button. If the changes aren't saved, a message about it should appear. Let's set it to `aria-live="assertive"`:

```html
<form>
    <p>
        <label for="devil-fruit">Devil fruit</label>
        <input type="text" id="devil-fruit">
    </p>
    …
    <button type="submit">Save settings</button>
</form>

<div class="alert-window" role="alert" aria-live="assertive">
    Your settings weren't saved,
    try again, yo-ho-ho!
</div>
```

Here a screen reader announces it immediately.

❗ The WAI-ARIA standard also specifies that in some cases assistive technologies may override the values of the `aria-live` attribute and announce any changes instantly.

### Aria-atomic

This attribute is optional and affects the extent to which assistive technologies will announce changes: the whole content or just the changed part of it.

The attribute has only two values, `false` and `true`.

- `false` (default value) - the value when assistive technologies will only report changes.
- `true` - with this value all content is declared, including the changed part.

When choosing the right value for `aria-atomic=""`, you need to understand whether the context is important for understanding changes. In most cases, leaving the default value is sufficient.

In this example, it's important to keep the context, so you can use `aria-atomic="true"`:

```html
<p aria-live="polite" aria-atomic="true">My favourite dish is
    <span id="food">lutefisk</span>.
</p>

<button type="button">Next dish</button>
```

Now a screen reader will read out the whole sentence, not just the part that changes after the button is clicked.

### Aria-relevant

The purpose of this attribute is to tell assistive technologies exactly what changes have taken place on the page and therefore in the accessibility tree. This could be removing old content or adding new content. The attribute is optional.

`aria-relevant=""` can contain one or more values separated by a space.

- `additions` - new information has been added to the page.
- `removals` - information has been removed.
- `text` - new text or equivalent information has been added, such as the new content of the `alt` attribute.
- `additions text` **(default value)** indicates that a text has been changed and there's a piece of new information on the page.
- `all` - all possible values. Equivalent to the ``additions removals text`` value.

In fact, there are few real-world scenarios for using this attribute. It either [doesn't work in many browsers and screen readers](https://github.com/w3c/aria/issues/712), or it's [advised not to use it at all](https://medium.com/dev-channel/why-authors-should-avoid-aria-relevant-5d3164fab1e3) and use alternative methods.

The most realistic scenario for using it is a friends list. When a friend has gone offline and is no longer available, we can use this attribute to let a user know. We need to set `aria-relevant="all"` for the list. Then some screen readers will announce that a contact has been deleted. This works in JAWS when a child item is deleted (it no longer works with a parent item). VoiceOver and NVDA aren't affected by this attribute.

### Aria-busy

`aria-busy=""` lets assistive technologies know whether an element's content is currently being updated or not. The attribute makes sense to apply when the page is auto-updating content. Something has been removed, something has been added, some part of it has been changed, and we need to be informed about it all at once in one go. This can be useful when our page has sports statistics that are updated in real-time, a text document that can be edited by several people, some news widget or a weather widget.

`aria-busy=""` has two values, `false` and `true`.

- `false` (default value) - with this value, assistive technologies don't wait for changes to complete.
- `true` - this value tells assistive technologies that they need to wait until an element has finished changing, at which point they can collect all changes and make an announcement. That is, while the content is updating, screen reader users, for example, won't be able to read that updating part.

In the example below, we have sports scores that are updated regularly during competitions:

```html
<h2>Current score</h2>
<p role="score" aria-live="polite" aria-busy="true">9:0</p>
```

To ensure that all information is declared after all changes, we'll first add `aria-busy` attribute with a value of `true` and then use JavaScript to replace its value with `false` or remove it altogether when all changes are complete.

## Summary

If you have a part of your page whose content changes, you need to make it an interactive area. Screen readers will then be able to keep their users informed about all the changes. You can make such a part interactive by using `role="alert"`, `role="status"`, `role="log"`, `role="marquee"`, `role="timer"` and `aria-live` attribute.

Use `role="alert"` for important errors and warnings. For better compatibility, add it for necessary elements together with the `aria-live="assertive"` and `aria-atomic="true"` attribute (optional).

`role="status"` is suitable for reporting less important errors and warnings. For example, an autosave message, an incorrectly filled field, and the like. This role should be combined with the `aria-live="polite"` attribute for compatibility.

If you need to make message history, error list and anything where the sequence of information updates is important, use `role="log"`. For greater compatibility, use the `aria-live="polite"` attribute along with it.

When you have tickers, currency rates or any other element on your page where information changes quickly, then set `role="marquee"` for them. For compatibility, supplement it with `aria-live="off"`.

For a timer, counter or stopwatch set `role="timer"`. Don't forget `aria-live="off"` for better compatibility.

`aria-live=""` is responsible for how urgently changes need to be announced. Where changes don't need to be announced, use `aria-live="off"`. In most cases there's no urgency to announce changes, so `aria-live="polite"` comes in handy. Sometimes, when it's an important message, such as a server error, you can use `aria-live="assertive"`.

`aria-atomic=""` is an optional attribute. It affects whether a screen reader announces a context or only announces changes. By default, all elements are set to `aria-atomic="false"`, meaning screen readers only report content changes. If you change it to `aria-atomic="true"`, screen readers will read out the whole thing, including the unchanged part. In most cases, there's no need to change the default behaviour.

Another optional attribute is `aria-relevant=""`. It is needed to define the type of content changes. It has several values, which can be listed with a space. There are few real-world usage scenarios (deleting or adding a friend to your friend list), and many A screen readers ignore it.

The last optional attribute is `aria-busy=""`. Tells assistive technologies whether the element's content is currently being updated or not. By default, elements are set to `aria-busy="false"`. Screen readers announce changes without waiting for them to complete. In some cases, you can use `aria-busy="true"` when you want to wait for all updates. May be useful for sports statistics or a text document in group edit mode.

## Further reading

- Standard [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/).
- Note [Hiding and Updating Content](https://web.dev/articles/hiding-and-updating-content) on web.dev.
- Some examples of using ARIA attributes in [ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) on MDN.
- [ARIA Live Regions](https://medium.com/@rishabhsrao/aria-live-regions-6cc96e1a8b72) by Rishabh Rao.
- [How to make inline error messages accessible](https://hidde.blog/how-to-make-inline-error-messages-accessible/) by Hidde de Vries.
