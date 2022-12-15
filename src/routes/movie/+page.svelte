<script>
    import { browser } from '$app/environment'
    import { onMount } from 'svelte'
 
    let accessToken = browser ? localStorage.getItem('accessToken') : ''
    let refreshToken = browser ? localStorage.getItem('refreshToken') : ''
    let reviewId = browser ? localStorage.getItem('reviewId') : ''
    let movieId = browser ? localStorage.getItem('movieId') : ''
 
    let resultData = []
 
    // function gatherData(data) {
    //    console.log(data)
 
    //    for (let i = 0; i < data.data.length; i++) {
    //       resultData[i] = data.data[i]
    //    }
 
    //    console.log(resultData)
    // }


//     onMount(async () => {
//       fetch('http://127.0.0.1:5000/reviews/view_biodata/' + reviewId, {
//          method: 'GET',
//          headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + accessToken
//          }
//       })
//          .then(response => response.json())
//          .then(result => gatherData(result.data))
//    })


    onMount(async () => {
       fetch('http://127.0.0.1:5000/reviews/fetch_movie/' + movieId, {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
             Authorization: 'Bearer ' + accessToken
          },
         
       })
          .then(response => response)
          .then(result => console.log(result))
    })
 </script>
 
 {#if accessToken == 'None'}
    {window.location.replace('http://localhost:5173/')}
 {:else}
    <video src="C://Users//Kacper//OneDrive - Dundalk Institute of Technology//Year 3 Semester 5//UDP//backend_final_backend_rel2//api//static//uploads//{movieId}//movie.mp4"></video>
 {/if}
 