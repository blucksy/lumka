<script>
	let email = '';
	let message = '';

	async function subscribe() {
		const res = await fetch('/api/subscribe', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		const data = await res.json();

		if (res.ok) {
			message = 'Successfully subscribed!';
			email = '';
		} else {
			if (data.detail.includes('is already a list member')) {
				message = 'You are already subscribed.';
				return;
			}
			message = data.detail || 'Something went wrong.';
		}
	}
</script>

<div class="flex flex-col gap-[9px] w-full">
	<div class="border-y border-black/5">
		<form
			class="w-full flex mobile-small-serif sm:small-serif !my-0 h-[33px] sm:h-[27px]"
			on:submit|preventDefault={subscribe}
		>
			<input
				type="email"
				id="email"
				placeholder="Enter your email address"
				class="w-full pl-[9px] outline-none!"
				bind:value={email}
			/>
			<button type="submit" class="pr-[9px] h-full cursor-pointer hover:opacity-60 anim-opacity">
				Subscribe
			</button>
		</form>
	</div>
	{#if message}
		<p class="small-serif text-[9px]">
			{message}
		</p>
	{:else}
		<p class="small-serif text-[9px] opacity-60 italic">
			By subscribing to our newsletter you are agreeing to our Privacy Policy.
		</p>
	{/if}
</div>
