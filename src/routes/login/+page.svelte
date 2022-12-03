<script>
const postData = {
    email: 'silvester@weebhood.com',
    password: 'silvester',
  }

    import { onMount } from 'svelte';
    // // let footprint;
    
        onMount(async () => {
            const response = await fetch(
                'http://127.0.0.1:5000/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: postData['email'],
                        password:   postData['password'],
                    })
                }
            );
            const data = await response.json();
            console.log(data)

            if (data.success){
                console.log("YES")
            }
            else{
                console.log("NO")
            }
            // footprint = data.carbonFootprint;
        });


        function formHandler(event) {
            event.preventDefault()

            fetch('http://127.0.0.1:5000/auth/login',{
            method:  'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: postData['email'],
                password:   postData['password'],
            })
            })
            .then(response => response.json())
            .then(result => console.log(result))

            
  }



    
  </script>
  

<center>
    <form>
        <div>
          <label for="userId">UserID:</label>
          <input type="text" id="email" bind:value={postData.email}>
        </div>
        <div>
          <label for="title">Title: </label>
          <input type="text" id="password" bind:value={postData.password}>
        </div>
        <button on:click="{formHandler}">Create Post</button>
      </form>
      
	<form style="width:30%;margin-top:10em;" method="post">
		<div class="mb-6">
			<input
				name="email"
				type="email"
				id="email"
				class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				placeholder="Email"
				required
			/>
		</div>
		<div class="mb-6">
			<input
				name="password"
				type="password"
				id="password"
				class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				placeholder="Password"
				required
			/>
		</div>
		<input
			type="submit"
			value="Login"
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			style="background-color:#5C728A;margin-top:0.5em;cursor:pointer;"
		/>
	</form>
</center>

<style>
    #email, #password{
        background-color: white;
        border:0;
        color: black;
    }
</style>

