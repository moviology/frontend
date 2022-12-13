<script>
	 import { browser } from '$app/environment'
	import { redirect } from '@sveltejs/kit';

let accessToken = browser ? localStorage.getItem('accessToken') : ''
let refreshToken = browser ? localStorage.getItem('refreshToken') : ''

</script>


{#if accessToken == 'None'}

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



{:else}


{/if}
