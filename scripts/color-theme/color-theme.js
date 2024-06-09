export function colorTheme() {
	const bodyClass = document.querySelector('.base');
	const storageKey = 'theme-preference';
	const switchers = document.querySelectorAll('.header__switcher-button');

	const getThemePreference = () => {
		if (localStorage.getItem(storageKey))
			return localStorage.getItem(storageKey)
		else
			return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	};

	// Add a false value for aria-pressed first and after that set true
	const pressSwither = (clickedSwitcher) => {
		for (let switcher of switchers) {
			switcher.setAttribute('aria-pressed', 'false');
		};
		clickedSwitcher.setAttribute('aria-pressed', 'true');
	};

	// Find a pressed switcher and find the currunt theme value
	const restore = () => {
		let savedTheme = getThemePreference();
		const savedSwitcher = document.querySelector(`.header__switcher-button[value=${savedTheme}]`);

		pressSwither(savedSwitcher);
	};

	const setPreference = () => {
		localStorage.setItem(storageKey, theme.value);

		reflectPreference();
	};

	const reflectPreference = () => {
		bodyClass.setAttribute('data-theme', theme.value);
	};

	const theme = {
		value: getThemePreference(),
	};

	// Set early so no page flashes / CSS is made aware
	restore();
	reflectPreference();

	window.onload = () => {
		// Set on load so screen readers can see latest value on the button
		reflectPreference();

		// Now this script can find and listen for clicks on the control
		switchers.forEach(
			(event) => event.addEventListener('click', 
				() => {

					// Set theme current variable
					theme.value = event.getAttribute('value') === 'light'
					? 'light'
					: 'dark';

					pressSwither(event);
					setPreference();
				}
			)
		);
	};

	// Sync with system changes
	window
		.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ( {matches:isDark} ) => {
  		theme.value = isDark ? 'dark' : 'light';
  		setPreference();
	});
}
