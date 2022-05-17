<script lang="ts">
	export let toggled: boolean = false;
	const enabledFirst = `bg-indigo-600`;
	const notEnabledFirst = `bg-gray-200`;
	const enabledSecond = `translate-x-5`;
	const notEnabledSecond = `translate-x-0`;
</script>

<button
	type="button"
	class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	role="switch"
	on:click={() => {
		toggled = !toggled;
	}}
	aria-checked="false"
>
	<span class="sr-only">Use setting</span>
	<span
		aria-hidden="true"
		class={`pointer-events-none absolute h-full w-full rounded-md bg-white `}
	/>
	<!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
	<span
		aria-hidden="true"
		class={`pointer-events-none absolute mx-auto h-4 w-9 rounded-full  ${
			toggled ? enabledFirst : notEnabledFirst
		} transition-colors duration-200 ease-in-out`}
	/>
	<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
	<span
		aria-hidden="true"
		class={`pointer-events-none absolute left-0 inline-block h-5 w-5 ${
			toggled ? enabledSecond : notEnabledSecond
		} transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out `}
	/>
</button>
