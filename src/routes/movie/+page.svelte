<script>
   import { browser } from '$app/environment'
   import { onMount } from 'svelte'
   import PubNub from 'pubnub'
   import { goto } from '$app/navigation'

   let accessToken = browser ? localStorage.getItem('accessToken') : ''
   let refreshToken = browser ? localStorage.getItem('refreshToken') : ''
   let reviewId = browser ? localStorage.getItem('reviewId') : ''
   let movieId = browser ? localStorage.getItem('movieId') : ''
   let val = ''



//    const video = document.querySelector('video');

//    video.addEventListener('play', (event) => {
//   console.log('The Boolean paused property is now false. Either the ' +
//   'play() method was called or the autoplay attribute was toggled.');
// });

let video

onMount(() => {
   video = document.querySelector('video');
})




function handlePausePlay(){
   if (video.paused) {
      if(video.currentTime == 0){
         const publishPayload = {
         channel: 'Moviology-Channel',
         message: 'start'
      }
      pubnub.publish(publishPayload)
      video.play(); 
      }
      else{
         const publishPayload = {
         channel: 'Moviology-Channel',
         message: 'resume'
      }
      pubnub.publish(publishPayload)
      video.play(); 
      }
      
   }
      
  else {
   const publishPayload = {
         channel: 'Moviology-Channel',
         message: 'pause'
      }
      pubnub.publish(publishPayload)
      video.pause(); 

  }


}


function stop() { 
   
   const publishPayload = {
         channel: 'Moviology-Channel',
         message: 'stop'
      }
      pubnub.publish(publishPayload)
      video.currentTime = 0
      video.pause()
} 

// function makeSmall() { 
//    video.width = 320; 
// } 

// function makeNormal() { 
//    video.width = 420; 
// } 



   

   let pubnub = new PubNub({
      publishKey: 'pub-c-60cb8668-e930-4e11-bb2e-65996cf9d14a',
      subscribeKey: 'sub-c-7e0595fb-09cc-4333-b707-b20f4a6b96cd',
      userId: reviewId
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
         message: 'start'
      }
      await pubnub.publish(publishPayload)
   }

   const handleClick = () => {
      console.log('hello')
      publishMessage(val)
   }

   let fileer = ''

   function storeVideo(vid){
      console.log(vid)
      fileer = "C:/Users/Kacper/OneDrive - Dundalk Institute of Technology/Year 3 Semester 5/UDP/backend_final_backend_rel2/api/static/uploads/" + movieId + "/movie.mp4"
      console.log(vid.url)
   }

   onMount(async () => {
      fetch('https://api.moviology.org/reviews/fetch_movie/' + movieId, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
         }
      })
         .then(response => response)
         .then(result => storeVideo(result))
   })
</script>

{#if accessToken == 'None'}
   {goto('/')}
{:else}
   <!-- <input type="text" bind:value={val} />
   <button on:click={handleClick}>click me</button> -->
   <!-- <video
      src="C://Users//Kacper//OneDrive - Dundalk Institute of Technology//Year 3 Semester 5//UDP//backend_final_backend_rel2//api//static//uploads//{movieId}//movie.mp4"
   /> -->

   <div style="text-align:center"> 
      <button 
      style="background-color:#5C728A;cursor:pointer;margin-top:0.5em;"
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
      on:click={handlePausePlay}>Play/Pause</button> 

      <button 
      style="background-color:#5C728A;cursor:pointer;margin-top:0.5em;"
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
      on:click={stop}>Stop recording</button> 

      <!-- <button on:click={makeSmall}>Small</button> 
      <button on:click={makeNormal}>Normal</button>  -->

      <br><br>
      <center>
      <video id="video" width="1000" controls>
        <source src="https://api.moviology.org/static/uploads/{movieId}/movie.mp4" type="video/mp4">
        Your browser does not support HTML video.
      </video>
   </center>
    </div> 
{/if}

<style>
   video::-webkit-media-controls-play-button {
      display:none;
   }
</style>