
<script>
	import { accessToken } from '../store.js'
    import { refreshToken } from '../store.js'  

    
</script>

<svelte:head>
    <title>Moviology</title> 
</svelte:head>

<!--Svelte head can't be on very top for some reason or page breaks-->

<!-- <h1 class="text-3xl font-bold underline">
    Thank you, very cool
  </h1> -->


  {#if $accessToken == 'None'}
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

welcome home

{/if}





