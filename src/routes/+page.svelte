<script>
	// import Modal from '../components/Modal.svelte';
	// let showLoginModal = false;
</script>

<!-- {#if showLoginModal}
	<Modal on:close={() => (showLoginModal = false)}>
		<h1 slot="header" style="text-align:center">Login</h1>
		<center>
			<form class="w-full max-w-sm" style="margin-top:1em;">
				<input
					style="margin-bottom:1em;background-color:white;border:none;"
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					id="inline-full-name"
					type="email"
					placeholder="Email"
				/>
				<input
					style="background-color:white;border:none;"
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					id="inline-password"
					type="password"
					placeholder="Password"
				/>
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					style="background-color:#5C728A;margin-top:0.5em;margin-bottom:1em;"
				>
					Login
				</button>
			</form>
		</center></Modal
	>
{/if} -->

<center>
	<div id="buttons" style="">
		<img src="src/public/logo.png" style="height:45em;" alt="logo" />

		<!-- Using utilities: -->
		<!-- Simplest use: modal without an `id` or callback function -->
		<!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style="background-color:#5C728A;display:block" on:click="{() => showLoginModal = true}">
    Login
  </button> -->
		<a href="/login" >
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				style="background-color:#5C728A;display:block"
			>
				Login
			</button>
		</a>

    <a href="/register">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				style="background-color:#5C728A;display:block;margin-top:0.5em;"
			>
				Sign up
			</button>
		</a>

		
	</div>
</center>
