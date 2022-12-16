<script>
   import { browser } from '$app/environment'
   import { goto } from '$app/navigation'

   const registerInfo = {
      name: '',
      email: '',
      password: ''
   }

   let accessToken = browser ? localStorage.getItem('accessToken') : ''
   let refreshToken = browser ? localStorage.getItem('refreshToken') : ''

   let resultData = {
      message: '',
      success: false,
      data: {}
   }

   function gatherData(data) {
      resultData = data

      if (resultData.success) {
         localStorage.setItem('accessToken', resultData.data.access_token)
         localStorage.setItem('refreshToken', resultData.data.refresh_token)
         accessToken = browser ? localStorage.getItem('accessToken') : ''
         refreshToken = browser ? localStorage.getItem('refreshToken') : ''
         goto('http://localhost:5173/reviews')
      }
      console.log(resultData)
   }

   function formHandler(event) {
      event.preventDefault()

      fetch('https://api.moviology.org/auth/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: registerInfo['name'],
            email: registerInfo['email'],
            password: registerInfo['password']
         })
      })
         .then(response => response.json())
         .then(result => gatherData(result))
   }
</script>

<center>
   <form style="width:30%;margin-top:10em;" method="post" on:submit={formHandler}>
      <div class="mb-6">
         <input
            name="name"
            type="text"
            id="name"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Username"
            bind:value={registerInfo.name}
            required
         />
      </div>
      <div class="mb-6">
         <input
            name="email"
            type="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Email"
            bind:value={registerInfo.email}
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
            bind:value={registerInfo.password}
            required
         />
      </div>
      <input
         type="submit"
         value="Register"
         class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         style="background-color:#5C728A;margin-top:0.5em;cursor:pointer"
      />
   </form>
</center>

<!-- {#if accessToken}
   {accessToken}
{:else}
   you are not logged in
{/if} -->

<style>
   #email,
   #password,
   #name {
      background-color: white;
      border: 0;
      color: black;
   }
</style>
