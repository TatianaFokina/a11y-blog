---
title: What you need to know about ARIA live regions
description: If you're looking to make dynamic page content accessible, WAI-ARIA provides a solution. Previously, assistive technologies struggled with these elements, but now they can be properly handled using ARIA live regions.
ogImage: cover.png
keyTheme:
  - ARIA
  - HTML
  - Screen readers
date: 2024-05-11
updated: 2024-09-02
layout: article.njk
templateEngineOverride: md, njk
---

(This is a translation of my [Russian-language article from Web Standards](https://web-standards.ru/articles/aria-live-regions/) edited by Vadim Makeev and Olga Aleksashenko. I've also rewritten some parts and provided more details based on ″[What Live Regions are?](https://doka.guide/a11y/live-region/)″ on Doka Guide).

If you have a dynamically changing part of a page and you're thinking about making it accessible, you may wonder how to do it. This could apply to:

- Chats
- Progress bars and timers
- News and weather widgets
- Alerts and notifications (new messages, likes, subscriptions)
- Currency rates and tickers (stock quotes, indices, bonds)
- Sports statistics, and more.

Previously, assistive technologies (particularly screen readers) couldn't properly process these dynamic elements. Users wouldn't know about errors or new data until they returned to a previous section or reached the end of the page. Now the accessibility of dynamically changing content can be addressed using ARIA.

If you're unfamiliar with this acronym, _WAI-ARIA_ or simply _ARIA_ (Web Accessibility Initiative - Accessible Rich Internet Applications) is a standard consisting of special roles and attributes added to markup. These roles and attributes extend or augment the functionality of standard HTML elements or elements in another programming host languages.

To create a dynamic (″alive″) part of the page where changes occur, we need to implement what ARIA terminology calls a ″Live Region.″ The WAI-ARIA 1.2 standard [defines a live region](https://www.w3.org/TR/wai-aria-1.2/#dfn-live-region) as follows:

> _Live Regions_ are perceived areas of pages that are usually updated as a result of an external event when a user focuses somewhere else. These regions are not always updated due to user interaction with an UI. This practice has become commonplace as a result of the heavy use of Ajax.

Thus, by using live regions, we can ensure that users of screen readers are informed about important changes on the page, even when they set keyboard focus on a different element.

First of all, we need to create changes on a page. Basically, it's all about manipulating HTML elements and their content. For that, you can do these:

- Add or delete a content as the page loads or after it's refreshed
- Add or delete an element to the page using JavaScript
- Change or add only the content of an element while keeping the element itself on the page
- Change the value of the `display` CSS property from `none` to `block`, or `visibility` from `hidden` to `visible`
- Add or remove the `hidden` HTML attribute from an element.

The second step is all about creating a live region where any of the changes from the previous list happen. For this purpose, we have two options: Use native HTML elements and a set of special ARIA roles and attributes. Once implemented, changes to all child elements within the live region will become accessible to screen readers.

## HTML elements

Unfortunately, there are not many native HTML elements for live regions (at least for now). One of them is the `<output>` element.

`<output>` used to display results. These could be mathematical calculations or the correct missing word in a sentence for grammar tests. Another less obvious use case is for pop-up notifications or toasts 🧇. These are alerts that slide in at the bottom or top of the screen and disappear after some time.

```html
<button>Save</button>

<div>
  <output>
    <!-- Message text added by JavaScript -->
  </output>
  <button aria-label="Close">X</button>
</div>
```

The content of `<output>` is automatically read by screen readers thanks to the implicit `status` role. This is one of the commonly use live region roles. The role has a low announcement priority, so screen readers will announce changes inside `<output>` after other, higher-priority content. For example, after a message that a button has been pressed, or after an error text with the `alert` role.

Now `<output>` is not yet supported in all browsers and by all screen readers. To be safe, explicitly assign the `status` role to the element.

```html
<output role="status">
  <!-- Message text added by JavaScript -->
</output>
```

The second HTML element is `<progress>`. It's used for task completion indicators, also known as progress bars. This could be an indicator for file uploading or clearing a folder with deleted emails.

Technically speaking, the `<progress>` element doesn't create a live region, but screen readers still announce the loading progress in percentages or with a special sound notification.

When you use `<progress>`, don't forget to set the `max` and `value` attributes for it. Without them, screen readers won't be able to track the loading progress when it has a clear beginning and end. So, change the value attribute using JavaScript and explicitly set the `max` value.

`<progress>` should also have a label so users understand what's being loaded. Use `<label>` for a visible element's name, and `aria-label` for a label accessible only to assistive technologies.

```html
<label for="progress-bar">Deleting old emails</label>
<progress id="progress-bar" max="100" value="0"></progress>
```

## ARIA attributes

Let's start with ARIA attributes that help us create a live region on any area of the page. The primary attribute for this purpose is `aria-live`. Other attributes allows us to set up how changes in the region should be announced.

The `aria-live` attribute is commonly used one. It determines how important changes are. By default, almost all HTML elements have the `off` value. Such parts of a page could be changed, but users will only learn that's something is going on if they have focused on them or on elements inside.

<aside>

By the way, WAI-ARIA specifies that in some cases assistive technologies may override the values of the `aria-live` attribute and announce any changes instantly.

</aside>

The second value of `aria-live` is `polite`. It indicates a low priority of announcement. Screen readers pause before such an announcement, don't interrupt current tasks, and wait until a user stops interacting with the interface.

`aria-live="polite"` is suitable for notifications about new posts, likes, and autosaves. In this example, we show the status message using JavaScript after the button is clicked.

```html
<form>
  <!-- Other form elements -->
  <button
    type="submit"
    aria-describedby="success"
  >
    Send
  </button>
  <span id="success" aria-live="polite">
    We have received your application. Processing will take
    one eternity.
  </span>
</form>
```

`aria-live="assertive"` indicates the highest priority level of announcements. Such changes will be announced immediately, while changes with lower priority will be queued and announced later. The WAI-ARIA standard doesn't recommend using this value when there's no immediate need to notify users of changes. Such cases would be a server error or when data hasn't been saved.

```html
<form>
  <label for="devil-fruit">Devil fruit</label>
  <input type="text" id="devil-fruit">
  <button type="submit">Save settings</button>
</form>

<div id="error" aria-live="assertive">
  Your settings weren't saved.
  Please try again.
</div>
```

The `aria-atomic` attribute describes the amount of changes that need to be announced. This can be the entire live region or a part of it. The attribute is extremely useful for timers.

The attribute has only two values, default `false` and `true`. When choosing the right value for `aria-atomic`, you need to understand whether the context is important for understanding changes. In most cases, leaving the default value is the best idea.

If you use `aria-atomic="true"` in a timer, assistive technologies will correctly announce the current time: First the hours, even if they haven't changed, then the minutes. Without this attribute, screen readers will only announce the changed minutes.

```html
<div role="timer" aria-live="polite" aria-atomic="true">
  <span id="timer-hours"></span>
  <span id="timer-mins"></span>
</div>
```

The `aria-busy` attribute lets assistive technologies know an element is currently changing and that they should not announce anything yet, but wait for these changes to complete.

`aria-busy` attribute has two possible values: `false` and `true`. By default, if the attribute is not specified, it is assumed to be `false`.

It makes sense to use the attribute when the page is auto-updating. Something has been removed, something has been added, and so on. For example, a feed like in social media. In this cases, you can set `aria-busy="true"` for the entire region during loading, and then remove it. This way, screen readers will only announce the changes when the user clicks the ″Refresh Feed″ button and all elements have loaded.

```html
<div role="feed" aria-busy="true">
  <!-- Here all posts are uploading -->
</div>
```

To ensure that all changes is declared, we'll first add the `aria-busy` attribute with the `true` value and then use JavaScript to replace its with `false` or remove it altogether when all changes are complete.

The `aria-relevant` attribute informs screen readers about which type of changes to announce. This can be the addition of text or elements, their removal, or all of these.

You can set for `aria-relevant` a few values:

- `additions` for added elements
- `text` for added text
- `removals` for removed content
- `all` when all types of changes in the live region are important.

By default, the attribute is set to `additions text`, which indicates that text has been changed and there's new information on the page.

In fact, there are few real-world scenarios for using this attribute. It either [doesn't work in many browsers and screen readers](https://github.com/w3c/aria/issues/712/), or it's advised not to use it at all.

The attribute was intended to be particularly useful in cases like a chat or updating a friends list. For example, when a friend has gone offline and is no longer available, we could use `aria-relevant` to let a screen reader user know. We would need to set `aria-relevant="all"` for the list. Then, some screen readers should announce that a contact has been deleted. However, this only works in JAWS when a child item is deleted (it no longer works with a parent item.) VoiceOver and NVDA aren't affected by this attribute.

```html
<ul
  id="friend-list"
  aria-live="polite"
  aria-relevant="additions removals"
>
  <!-- Links on friends profiles -->
</ul>
```

## ARIA roles

There aren't many ARIA roles that make part of a page a live region. Here's a complete list of these roles:

- `alert`
- `status`
- `log`
- `timer`
- `marquee`.

They are used like this: `role="alert"`, `role="timer"`, and so on.

**Tell me about your status**. The `status` live region contains additional information that is not particularly urgent and describes the status of changes (also known as a status bar). It can convey information about a successful user action, a need to wait for a process to complete, or a small error occurrence. For example, this role can be assigned to a message about successful autosave of text or used when validating fields in a registration form.

In this example, we tell that happend with changes in document:

```html
<div class="status-message" role="status">
  Your changes haven't been saved 👋
</div>
```

The `status` role is most commonly used and has a low announcement priority due to its default attributes `aria-live="polite"` and `aria-atomic="true"`. This means that screen readers will announce everything happening in the area, but not immediately and without interrupting other announcements.

By the way, screen readers have a special command that helps users find out about a status. In NVDA, this command is invoked by pressing <kbd>Insert End</kbd>. In JAWS, it's <kbd>Insert 3</kbd>.

**Be on a high alert**. The `alert` live live region contains information that is important at a certain point in time. It can be an error message or a warning that appears on the screen after user actions or without their participation (such as a sudden server-side error). Such a message can be either text or sound.

Let's take a look at a simple example where we warn users about something _really_ important:

```html
<div class="so-warning" role="alert">
  You've stared into the abyss for too long,
  and now the abyss is staring back at you.
</div>
```

Keep in mind that the changing content should be textual and dynamically appear, not load. For example, an error message that becomes visible after clicking the ″Submit″ button in a form.

Screen readers will instantly announce urgent changes, interrupting any ongoing announcements. This behavior is due to the attributes `aria-live="assertive"` and `aria-atomic="true"` which are implicit in the `alert` role.

**Check your logs**. The `log` live region, surprisingly, contains logs 😱. For example, it can be a history of messages from chat, a list of errors, and similar content. For logs, the sequence in which new information appears is important. Think of the event log in your operating system.

This example shows content updates in a chat. When a user types a message in a text box, it is added to the end of the conversation.

```html
<h3>Message history</h3>
<div role="log">
  <ul>
    <li>
      Can i pet your Welsh Corgi Cardigan
      right now i really need it
      <time datetime="2077-04-21T12:09">12:09</time>
    </li>
    <li>
      Were you hacked again?
      <time datetime="2077-04-21T13:00">13:00</time>
    </li>
  </ul>
</div>
```

By default, the `log` role is assigned `aria-live="polite"` and `aria-atomic="false"`, so screen readers don't immediately announce the latest changes.

**Sell me this pen**. The `marquee` live region contains information that changes rapidly. This role is similar to `log`, but in this case the sequence in which the information is updated is irrelevant. A simple example where the `marquee` role might come in handy is tickers and exchange rates.

In this example, we add `role="marquee"` for a block with information about currency rates:

```html
<h3>Current currency rates</h3>
<ul role="marquee">
  <li>999 USD = 1 Septim</li>
  <li>333 EUR = 1 Septim</li>
</ul>
```

The `marquee` role contains the attribute `aria-live="off"` by default, so the role has no announcement priority. Screen readers will not report changes in such an area without focus on it, even if users are not currently interacting with the page.

**What you waiting for?**. The `timer` live region is any area where a countdown or regular time count is displayed. For example, a countdown timer, clock, or stopwatch.

```html
<div
  role="timer"
  aria-atomic="true"
>
  <span id="clock-mins"></span>
  <span id="clock-secs"></span>
</div>
```

The `timer` role has no announcement priority, so it's set to `aria-live="off"` by default. Therefore, it's recommended to additionally use `aria-live="polite"` and `aria-atomic="true"` with it. If you want a screen reader to announce changes after a certain time interval, you can do it with JavaScript. Just switch `aria-live="off"` to `aria-live="polite"` at the interval what you need, e.g., every 60 minutes.

## Wrapping up

If you have a part of your page whose content changes, you need to make it a live region. Assistive technologies will then be able to keep users informed about all the changes. You can make such a part a live region by using ARIA roles such as `status`, `alert`, `log`, `marquee`, and `timer`. Another way is using the `aria-live` attribute.

The use cases for ARIA live regions roles:

- `status` for less important notifications: Autosave messages, form validation feedback
- `alert` for important and time-sensitive information: Server errors, lost internet connection
- `log` for situations where the sequence of information updates is important: Message history, list of system errors
- `marquee` for frequently updating information: Tickers, currency rates, forecast widgets
- `timer` for a part of a page where we count down or up: Stopwatch, timers, pomodoro timer

The `aria-live` ARIA attribute is responsible for how urgently changes need to be announced. In most cases, there's no urgency to announce changes, so `aria-live="polite"` comes in handy. Sometimes, when it's an important message, such as a critical error, you can use `aria-live="assertive"`.

Other ARIA live regions attributes are optional and provide assistive technologies with more details about the amount of changes, their type, and so on. Here is the list of them:

- `aria-atomic` affects whether a screen reader announces the entire region or only that part where changes occured
- `aria-busy` indicates whether the element's content is currently being updated or not.
- `aria-relevant` defines the type of content changes to be announced

Finally, you can use native HTML elements such as `<output>` and `<progress>`, which have implicit live region behavior.

## Further reading

- [WAI-ARIA 1.3](https://www.w3.org/TR/wai-aria-1.3/)
- ″[ARIA Live Regions](https://medium.com/@rishabhsrao/aria-live-regions-6cc96e1a8b72/)″ by Rishabh Rao
- ″[How to make inline error messages accessible](https://hidde.blog/how-to-make-inline-error-messages-accessible/)″ by Hidde de Vries.
