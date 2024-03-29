---
title: Принципы WCAG. Размер цели
description: Что такое размер цели и как не создать этот барьер для пользователей.
keyTheme:
    - WCAG
    - UX
    - CSS
date: 2022-10-31
tags: post
layout: post.njk
templateEngineOverride: md, njk
---
В этом посте из серии про разбор Руководств по доступности веб-контента (Web Content Accessibility Guidelines или коротко WCAG) расскажу про несколько принципов, связанных с размером интерактивных элементов.

Во WCAG 2.1 c этим принципом связан [критерий 2.5.5: Размер цели](https://www.w3.org/TR/WCAG22/#target-size-enhanced), и он самого высокого уровня AAA.

WCAG 2.2 добавляет ещё один критерий, который устанавливает минимальные требования к размеру элементов. Это [критерий 2.5.8: Размер цели (Минимальный)](https://www.w3.org/TR/WCAG22/#target-size-minimum), он относится к уровню AA.

{% note "Только в первой половине 2023 появится финальная версия WCAG 2.2, так что этот критерий могут изменить или вообще удалить." %}

Оба критерия относятся к руководству по воспринимаемости и его подразделу о способах ввода.

## Коротко о критериях

Величина целей должна быть определённых размеров в пикселях.

Это требование касается интерактивных элементов, с которыми взаимодействуют пользователи с помощью разных указателей — мышки, стилуса, пера, головного указателя или пальца.

## Подробнее

В основном принцип касается размеров кнопок, отдельных ссылок на странице, полей и похожих элементов. При этом есть элементы, размеры которых не надо учитывать:

- Элементы с браузерными стилями, которые не изменяли.
- Элементы, размер и расстояние между которыми нельзя изменить, так как это связано с их смыслом или с требованиями законов. Например, маркеры на карте.
- Ссылки в тексте.
- Два одинаковых по функциональности элемента на странице, один из которых нужного размера.

Критерий про размер целей касается любых интерфейсов, но особенно мобильных. Интерактивный элемент, на который легко кликать мышкой, может быть слишком маленьким для пользователя мобильного устройства. Это называется _асимметрия видимости и нажатия (view–tap asymmetry)_.

Также есть закон, который описывает важность размера цели, — _[закон Фиттса](https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%BA%D0%BE%D0%BD_%D0%A4%D0%B8%D1%82%D1%82%D1%81%D0%B0)_. Он гласит, что время, которое нужно для достижения цели, зависит от размеров этой цели и расстояния до неё. В интерфейсах чем меньше интерактивный элемент, тем сложнее до него добраться. С большим элементом легче взаимодействовать, а ещё проще найти на странице.

Чтобы пользователи не сталкивались с этой проблемой, максимальный размер интерактивного элемента должен быть 44 на 44 пикселя и выше. Так как это не так просто сделать на практике, принцип в первую очередь касается следующих случаев:

- Элементы, которыми часто пользуются. Например ссылка с иконкой корзины для перехода к оплате покупок в интернет-магазине.
- Элемент, который помогает изменять результат работы другого элемента. Например, кнопка редактирования формы после её отправки.
- Элемент, до которого сложно дотянуться. К примеру кнопка в верхнем правом углу экрана.
- Элемент из группы других, которые являются частью одного действия. Например кнопка с переходом к следующему шагу в форме.

Минимальный размер интерактивного элемента — 24 на 24 пикселя.

Ещё важно расстояние между элементами. Если расположить их слишком близко друг к другу, это спровоцирует _ошибку касания цели (touch-target error)_. Пользователи будут чаще промахиваться и нажимать не на тот элемент. Так что, если размер несколько кнопок `20px`, а расстояние между ними `4px`, это соответствует минимальным требованиям к размерам целей. В общей сумме их размер и расстояние между ними — `24px`.

Следить за расстоянием между элементами стоит не только в случае кнопок, но и у списков ссылок. Например, в обычном блоке со ссылками на странице, в выпадающем списке меню или у комбинированного списка.

<figure>
	<img src="images/pass.png" alt="Кнопка «Настройки» шириной 115 пикселей и высотой 44 пикселя. Кнопка с иконкой лупы размером 44 на 44 пикселя. Кнопка с иконкой со стрелкой вниз, направленная на линию с приподнятыми краями, её размер 24 на 24 пикселя. Две кнопки рядом размером 44 на 44 пикселя. Две кнопки с пространством между ними, их размер 22 на 22 пикселя. Список ссылок «Гёзда», «Хинкали», «Равиоли», их размер 20 пикселей, высота строки 27 пикселей. Кнопка с иконкой в виде трёх параллельных линий, из неё выпал список ссылок с высотой 24 пикселя.">
	<figcaption>Элементы, которые соответствуют критериям о размере целей.</figcaption>
</figure>

<figure>
	<img src="images/fail.png" alt="Кнопка с иконкой со стрелкой вниз, направленная на линию с приподнятыми краями, её размер 23 на 23 пикселя. Две кнопки размером 22 на 22 пикселя, между ними нет пустого пространства. Список ссылок «Гёзда», «Хинкали», «Равиоли», их размер 20 пикселей, высота строки 21 пиксель. Кнопка с иконкой в виде трёх параллельных линий, из неё выпал список ссылок с высотой 21 пиксель.">
	<figcaption>Элементы, которые нарушают критерии о размере целей.</figcaption>
</figure>

## Почему такие размеры целей

За рекомендуемыми размерами интерактивных элементов стоит несколько исследований.

В 2005 MIT Touch Lab проводила [исследования на тему размера пальцев рук людей](http://touchlab.mit.edu/publications/2003_009.pdf) (PDF). Результаты показали, что средний размер указательных пальцев взрослых людей 1.6–2 сантиметра, а большого пальца — 2.5 сантиметра. Если переводить это в пиксели, получится 45–57 пикселей и 72 пикселя соответственно.

В 2006 Пекка Фархи, Эми Карлсон и Бенджамин Бедерсон [установили оптимальный размер целей на сенсорном экране](https://dl.acm.org/doi/10.1145/1152215.1152260), если взаимодействовать с ним одной рукой. Это минимум 1 на 1 сантиметр. Если переводить сантиметры в пиксели, получится 28 на 28 пикселей. Также они выяснили, что чем больше размер интерактивного элемента на экране, тем меньше ошибок совершают пользователи. Это же показало другое [исследование дизайна сенсорных клавиш для выбора цели на мобильном телефоне](https://docbox.etsi.org/STF/Archive/STF322_HF_EC_3G_MobileUserInterface/STFworkarea/FoldersFiles/MobileHIC%202008%20Proceedings/papers/p423-park.pdf) (PDF).

## Кому это важно

- Пользователи с особенностями устройства скелета и мышц — c церебральным параличом, мышечной дистрофией, артритом.
- Пользователи с особенностями мелкой моторики — с тремором из-за рассеянного склероза, болезни Паркинсона, инсультом, [диспраксией](https://ru.frwiki.wiki/wiki/Dyspraxie) и другими состояниями.
- Пользователи с пониженным, сниженным зрением или слабовидящие.
- Пользователи с крупными пальцами.
- Все пользователи мобильных устройств, особенно когда они пользуются ими в транспорте или на ходу.

## Как избежать барьер

Критерии в основном связаны с дизайном, так что в первую очередь важно всё продумать на этом этапе.

В коде проблему с небольшими кнопками можно исправить, если увеличить область клика. Есть несколько способов. Например с помощью `padding` или `min-width` и `min-height`.

```css
button {
    font-size: 14px;
    padding: 20px;
}
```

```css
ul li {
    display: inline-block;
    min-width: 44px;
    min-height: 44px;
}
```

## Примеры соответствия критериям

- Кнопка размером `44px` на `48px`.
- Две ссылки в меню размера `20px` на `20px` и с расстоянием между ними в `4px`.
- Несколько кнопок с размером `24px` на `20px` и с расстоянием между ними в `10px`.
- Две кнопки, которые делают одно и то же. Одна из них `20px` на `20px`, другая — `46px` на `44px`. Это исключение.
- Якорная ссылка меньше `24px` на `24px`. Пользователь может проскролить к нужной части страницы и не пользоваться ссылкой. Это исключение.
- Маркеры на карте, которые расположены близко друг к другу. Это исключение.
- Иконка с вопросительным знаком размером `24px` на `24px` в конце предложения, которая показывает тултип. Это исключение.
- Ссылки в сноске размером `12px`, расстояние между ними меньше `12px`. Это исключение.

На [сайте Pocket](https://getpocket.com/) в меню несколько кнопок. Их размер `44px` на `44.06px`. Это соответствует максимальному требованию к размеру целей.

<figure>
	<img src="images/pocket-site.png" alt="В меню выделена кнопка с иконкой в виде плюса. На неё наведён курсор в режиме инструмента разработчика, видна информация об элементе. Она размера 44 пикселя на 44.06 пикселя.">
	<figcaption>Меню с кнопками в десктопной версии Pocket.</figcaption>
</figure>

На [сайте NRK](https://www.nrk.no) есть блок с информацией об авторе текста и его контактами. В нём ссылка на почту, её размер `196.18px` на `41px`. Это соответствует максимальным требованиям о размере цели, так как между ссылкой и другими интерактивными элементами большое расстояние.

<figure>
	<img src="images/nrk-site.png" alt="Блок с информацией об авторе текста. Это литературный критик и автор нескольких книг для детей. Её имя Анна-Катрина Штрайм. Курсор в режиме разработчика наведён на ссылку с подписью «Напишите мне на почту». Её размер 196.18 пикселей на 41 пиксель.">
	<figcaption>Ссылка на почту автора текста на сайте NRK.</figcaption>
</figure>

На [сайте Chanel](https://www.chanel.com/us/) есть слайдеры с кнопками для переключения к конкретным слайдам и для перехода к следующему или предыдущему. Размер кнопок для переключения к конкретным слайдам всего `20px` на `20px`. Кнопки для перехода к следующему слайду `40px` на `40px`. Получается, что размеры элементов отвечают минимальному требованию, но не проходят максимальное.

<figure>
	<img src="images/chanel-site.png" alt="Первый слайд в слайдере из четырёх. Курсор в режиме разработчика наведён на небольшую точку под слайдером. Это span и он 20 на 20 пикселей. Другой курсор наведён на кнопку со стрелкой, указывающей влево. Её размер 40 на 40 пикселей.">
	<figcaption>Слайдер с двумя видами кнопок на сайте Chanel.</figcaption>
</figure>

## Примеры барьеров

- Кнопка размером `20px` на `20px`.
- Список ссылок, восота которых меньше `24px`, а ещё между ними небольшие расстояния.

На [сайте Zara](https://www.zara.com) в выпадающем списке меню со ссылками небольшое расстояние между элементами, а их высота всего `16px`. Так что они не соответствуют минимальному требованию.

<figure>
	<img src="images/zara-site.png" alt="Открыто боковое меню со списком всех товаров. В режиме разработчика выделена ссылка «База». Она 100.76 на 16 пикселей. Между ссылками нет свободного пространства.">
	<figcaption>Выпадающее меню со списком ссылок на сайте Zara.</figcaption>
</figure>

На [сайте Mango](https://shop.mango.com/) под фотографиями товаров есть кнопки для выбора цвета. Их размер всего `16px` на `16px`, поэтому они не соответствуют минимальному требованию.

<figure>
	<img src="images/mango-site.png" alt="Курсор в режиме разработчика наведён на круглую кнопку бордового цвета. Её размер 16 на 16 пикселей.">
	<figcaption>Кнопки для выбора цвета товара на сайте Mango.</figcaption>
</figure>

## Как тестировать

Проверить размеры интерактивных элементов поможет смешанное тестирование.

- В браузерах приходят на помощь инструменты разработчика. В них можно проверять фактический размер элементов и область клика.
- На Andriod есть приложение для автоматического тестирования [Accessibility Checker](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor&hl=en_US&gl=US). Оно проверяет в том числе размеры кнопок в мобильных приложениях.
- В Figma, Sketch и Adobee XD можно использовать платный плагин [Adee](https://adee.co/).

## Что почитать

- [Success Criterion 2.5.5 Target Size (Enhanced)](https://www.w3.org/TR/WCAG22/#target-size-enhanced), WCAG 2.2.
- [Success Criterion 2.5.8 Target Size (Minimum)](https://www.w3.org/TR/WCAG22/#target-size-minimum), WCAG 2.2.
- [Understanding Success Criterion 2.5.5: Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html), WCAG 2.2.
- [Understanding Success Criterion 2.5.8: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), WCAG 2.2.
- [Provide buttons with a large target size](https://www.accessguide.io/guide/large-target-size), Access Guide.
- [Touch Targets on Touchscreens](https://www.nngroup.com/articles/touch-target-size/), Аврора Харли.
- [Fitts's Law](https://www.nngroup.com/videos/fittss-law/) (видео), Лекси Кейн.
- [Finger-Friendly Design: Ideal Mobile Touchscreen Target Sizes](https://www.smashingmagazine.com/2012/02/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/), Энтони Т.
