<script>
   import { browser } from '$app/environment'
   import { onMount } from 'svelte'
   import PubNub from 'pubnub'

   let accessToken = browser ? localStorage.getItem('accessToken') : ''
   let refreshToken = browser ? localStorage.getItem('refreshToken') : ''
   let reviewId = browser ? localStorage.getItem('reviewId') : ''
   let movieId = browser ? localStorage.getItem('movieId') : ''
   let val = ''
   let resultData = []

   let pubnub = new PubNub({
      publishKey: 'pub-c-60cb8668-e930-4e11-bb2e-65996cf9d14a',
      subscribeKey: 'sub-c-7e0595fb-09cc-4333-b707-b20f4a6b96cd',
      userId: 'HELLO'
   })

   const listener = {
      status: e => {
         if (e.category === 'PNConnectedCategory') {
            console.log('Connected')
         }
      },
      message: e => {
         console.log(e)
         return
      },
      presence: e => {
         return
      }
   }
   pubnub.addListener(listener)

   pubnub.subscribe({ channels: ['Moviology-Channel'] })

   const publishMessage = async message => {
      const publishPayload = {
         channel: 'Moviology-Channel',
         message: {
            message: 'start'
         }
      }
      await pubnub.publish(publishPayload)
   }

   const handleClick = () => {
      console.log('hello')
      publishMessage(val)
   }

   onMount(async () => {
      fetch('http://127.0.0.1:5000/reviews/fetch_movie/' + movieId, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
         }
      })
         .then(response => response)
         .then(result => console.log(result))
   })
</script>

{#if accessToken == 'None'}
   {window.location.replace('http://localhost:5173/')}
{:else}
   <input type="text" bind:value={val} />
   <button on:click={handleClick}>click me</button>
   <video
      src="C://Users//Kacper//OneDrive - Dundalk Institute of Technology//Year 3 Semester 5//UDP//backend_final_backend_rel2//api//static//uploads//{movieId}//movie.mp4"
   />
{/if}

