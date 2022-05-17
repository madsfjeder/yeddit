import { expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import AutoCompleteResult from './AutoCompleteResult.svelte';

it('displays an autocomplete result', () => {
	const { getByText } = render(AutoCompleteResult, {
		result: { display_name: 'Test' }
	});
	getByText('Test');
});
