<script>
   import { browser } from '$app/environment'
   import { onMount } from 'svelte'

   let accessToken = browser ? localStorage.getItem('accessToken') : ''
   let refreshToken = browser ? localStorage.getItem('refreshToken') : ''
   let reviewId = browser ? localStorage.getItem('reviewId') : ''

   let resultData = []

   function updateReviewId(newId) {
      localStorage.setItem('reviewId', newId)
   }

   function gatherData(data) {
      console.log(data)

      for (let i = 0; i < data.data.length; i++) {
         resultData[i] = data.data[i]
      }

      console.log(resultData)
   }
   onMount(async () => {
      fetch('http://127.0.0.1:5000/reviews/profile', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
         }
      })
         .then(response => response.json())
         .then(result => gatherData(result))
   })
</script>

{#if accessToken == 'None'}
   {window.location.replace('http://localhost:5173/')}

   {accessToken}
{:else}
   <center
      ><button
         class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         style="background-color:#5C728A;margin-top:0.5em;margin-bottom:0.5em;"
      >
         <a href="/book">Book Review</a>
      </button>
      <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style="background-color:#5C728A;margin-top:0.5em;margin-bottom:0.5em;">
    <a href='/logout'>Logout</a>
</button> -->
   </center>

   {#each resultData as review}
      <div
         style="margin-left:1em;padding-bottom:1em;border-radius:1em;display:inline-block;background-color:whitesmoke;border:none"
         class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
         <a href="/dune.jpg" target="_blank">
            <img
               class="rounded-t-lg"
               src="/dune.jpg"
               style="border-radius:1em 1em 0 0;"
               alt="sss"
            />
         </a>
         <div class="p-5" style="margin-left:1em;margin-right:1em;overflow-y:scroll">
            <h1
               style="font-size:1.5em;text-align:center;"
               class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
            >
               {review.movie_title}
            </h1>
            {#if review.complete}
               <h2
                  style="font-size:1.2em;margin-bottom:-0.2em;"
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
               >
                  Status: <span style="color:green">Complete</span>
               </h2>
            {:else}
               <h2
                  style="font-size:1.2em;"
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
               >
                  Status: <span style="color:red">Incomplete</span>
               </h2>
            {/if}
            <h2
               style="font-size:1.2em;display:inline-block;margin-bottom:-0.2em;"
               class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
            >
               Date of review:
            </h2>
            <span style="font-size:1.2em">{review.review_date}</span>
            <h2
               style="font-size:1.2em;display:inline-block;margin-bottom:0.3em;"
               class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
            >
               Date booked:
            </h2>
            <span style="font-size:1.2em">{review.date_booked}</span>

            <ul style="margin-top:-0.5em;margin-bottom:0.5em;">
               <h2
                  style="font-size:1.2em;display:inline-block"
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
               >
                  Genres:
               </h2>
               {#each review.movie_genres as genre}
                  <li style="display:inline-block;font-size:1.2em;">{genre},</li>
               {/each}
            </ul>
            <br />
            <h2
               style="font-size:1.2em;margin-top:-1.5em"
               class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
            >
               Description
            </h2>
            <p
               style="margin-bottom:1em;margin-top:-0.5em;color:black;font-size:1.2em;"
               class="mb-3 font-normal text-gray-700 dark:text-gray-400"
            >
               {review.movie_description}
            </p>
            <center>
               <!-- <a style="background-color:#5C728A;" href='/biodata' class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            View Biometric Data
        </a> -->
               <!-- Using utilities: -->

               <form action="/biodata/" on:submit={() => updateReviewId(review._id)}>
                  <input
                     type="submit"
                     value="View Biometric Data"
                     style="background-color:#5C728A;cursor:pointer;"
                     class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  />
               </form>

               <form action="/biodata/" on:submit={() => updateReviewId(review._id)}>
                  <input
                     type="submit"
                     value="View Movie"
                     style="background-color:#5C728A;cursor:pointer;margin-top:0.5em;"
                     class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  />
               </form>
            </center>
         </div>
      </div>
   {/each}
{/if}
