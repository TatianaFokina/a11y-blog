---
title: Клавиатура
description: Разбираемся с критерием про доступность интерфейса для клавиатуры.
ogImage: cover.png
keyTheme:
  - WCAG
  - Клавиатура
  - HTML
date: 2023-03-07
updated: 2024-08-27
layout: article.njk
templateEngineOverride: md, njk
---

В этом посте из серии про разбор Руководств по доступности веб-контента (Web Content Accessibility Guidelines, а коротко WCAG) расскажу про два принципа, связанных с клавиатурой.

Это критерии [2.1.1: клавиатура](https://www.w3.org/TR/WCAG22/#keyboard) базового уровня A и [2.1.3: клавиатура (без исключений)](https://www.w3.org/TR/WCAG22/#keyboard-no-exception) самого высокого уровня AAA. Они связаны с принципом управляемости и руководством про доступность с клавиатуры.

## Коротко о критериях

Пользователи клавиатуры имеют доступ ко всей функциональности интерфейса без специальных таймингов при нажатии на отдельные клавиши.

В критерии уровня A есть исключение — функции, которые требуют ввода, который зависит от траектории движения. Это могут быть симуляторы полётов, езды или программы для рисования, где для работы с некоторыми кистями нужна разная сила нажатия.

Критерий уровня AAA отличается от критерия минимального уровня только тем, что в нём нет исключений. Однако это не значит, что нужно пытаться сделать невозможное. Если разрабатываете приложение для рисования, то в каких-то случаях оно просто не будет соответствовать критерию уровня AAA.

## Подробнее

Основная цель критерия — не забывать при разработке интерфейса учитывать потребности пользователей обычных и альтернативных клавиатур — экранных клавиатур, программ для sip-and-puff-технологий, для которых пользователи используют вдох и выдох, и других эмуляторов.

Какую именно функциональность должны поддерживать клавиатуры? Почти всю ту же, что и мышки. Например, выбор и перемещение элемента, изменение его размеров и так далее. Обратите внимание, что клавиши мыши не равны клавишам клавиатуры, так что в этом критерии вообще не идёт речь о мышках. При этом критерий не запрещает поддерживать другие устройства ввода.

Критерий также позволяет добавлять альтернативный способ для клавиатуры там, где никак не поддержать доступную функциональность для мышки. Например, как у драг-н-дроп элемента. В его случае можно добавить область для перетаскивания файла, с которым можно взаимодействовать только мышкой или касаниями, и отдельную кнопку для загрузки файла, которая доступна для клавиатуры.

Критерий не касается фокуса, только возможности взаимодействовать со всем интерактивным на странице с помощью клавиатуры. С фокусом связаны другие критерии — [2.4.7: видимый фокус](/ru/articles/wcag-focus-visible/) и [2.4.11: внешний вид фокуса](/ru/articles/wcag-focus-appearance/).

## Кому это важно

Всем пользователям клавиатуры, но в особенности:

- пользователям со слепотой;
- слабовидящим пользователям;
- пользователям с особенностями моторики, например, с тремором.

## Как избежать барьер

В первую очередь барьеры для пользователей клавиатуры создают разработчики в момент, когда решают не использовать все возможности HTML для ссылок, кнопок и других интерактивных элементов.

Если нет возможности использовать семантические теги вроде `<a>`, `<button>` или `<input>`, кастомные интерактивные элементы должны полностью повторять встроенное в них поведение. С этим помогут разобраться JavaScript и глобальный HTML-атрибут `tabindex`. В качестве значения атрибута лучше указывать `0`, а также избегать отрицательных и положительных значений больше нуля.

## Примеры соответствия критериям

- На странице с формой можно перемещаться между полями с помощью клавиатуры, вводить, копировать и вставлять в них данные, а также взаимодействовать так с кнопкой отправки.
- В выпадающем меню для клавиатуры недоступна кнопка «Закрыть», но оно также закрывается при нажатии на Esc.
- В слайдере недоступны с клавиатуры кнопки со стрелками вперёд и назад, но слайды можно перелистывать клавиатурными стрелками.
- На сайте есть область для перетаскивания файла. Рядом с ней есть альтернативный способ загрузки файла в виде кнопки, с которой можно взаимодействовать с клавиатуры.
- В веб-приложении для рисования можно создавать объекты, изменять их размеры, цвета и перемещать с помощью клавиатуры.
- С элементом для выбора даты из календаря можно взаимодействовать только с мышкой, при этом в поле можно ввести дату вручную с клавиатуры.

## Примеры барьеров

- На сайте для ссылок и кнопок используют `<div>` и `<span>`, у них нет атрибутов `tabindex` со значением `0`. Из-за этого пользователи не могут взаимодействовать с элементами с клавиатуры.
- На странице есть область для загрузки файла, но с ней можно взаимодействовать только с помощью мышки или касаний. На странице нет альтернативного способа загрузить файл без перетаскивания.

## Как тестировать

Протестировать оба критерия можно только ручным способом. Для этого проверьте всю функциональность интерфейса с помощью клавиатуры.

- Пройдитесь с помощью <kbd>Tab</kbd> по всем интерактивным элементам.
- Повзаимодействуйте с элементами с помощью <kbd>Enter</kbd> и пробела или других клавиш, если они поддерживаются.
- Если элемент прокручивается, попробуйте это сделать с помощью стрелок вверх, вниз, вправо и влево.
- Проверьте, есть ли альтернативный способ взаимодействия с элементом с помощью клавиатуры.

## Что почитать

- [Understanding SC 2.1.1: Keyboard (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard/), WCAG 2.2
- [Understanding SC 2.1.3: Keyboard (No Exception) (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception/), WCAG 2.2
- [Make all functionality available through the keyboard](https://www.accessguide.io/guide/keyboard/), Acess Guide
- [Accessibility testing guide. 2.1.1 Keyboard](https://github.com/alphagov/wcag-primer/wiki/2.1.1#211-keyboard), gov.uk
