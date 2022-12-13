<script>
    import { browser } from '$app/environment'
    import { redirect } from '@sveltejs/kit';

    let genres = ["Action", "Adventure", "Comedy", "Horror"]
    let selectedGenres = []
 
    let accessToken = browser ? localStorage.getItem('accessToken') : ''
    let refreshToken = browser ? localStorage.getItem('refreshToken') : ''

    const bookingInfo = {
        movie_title: '',
        movie_description: '',
        review_date:'',
        movie_url: '',
        movie_genres: ''
    }

    function formHandler(event) {
        event.preventDefault()

        for (let i = 0; i < genres.length; i++){
            let current = document.getElementById(genres[i])
            console.log(current)
            if (current?.checked == true){
                selectedGenres.push(genres[i])
            }
        }

        fetch('http://127.0.0.1:5000/reviews/book',{
        method:  'POST',
        headers: {
            'Authorization': "Bearer " + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            movie_title: bookingInfo['movie_title'],
            movie_description: bookingInfo['movie_description'],
            review_date: bookingInfo['review_date'],
            movie_url: bookingInfo['movie_url'],
            movie_genres: selectedGenres,
        })
        })
        .then(response => response.json())
        .then(result => console.log(result))

        {window.location.replace("http://localhost:5173/reviews")}
  }

    let  fileinput;
	const onFileSelected =(e)=>
    {
        let video = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(video);
    
    }

  </script>

{#if accessToken != 'None'}
<center>
	<form style="width:30%;margin-top:10em;" method="post" on:submit="{formHandler}">
		<div class="mb-6">
			<input
				name="movie_title"
				type="text"
				id="movie_title"
				class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				placeholder="Movie title"
                bind:value={bookingInfo.movie_title}
				required
			/>
		</div>
		<div class="mb-6">
			<input
				name="movie_description"
				type="text"
				id="movie_description"
				class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				placeholder="Movie description"
                bind:value={bookingInfo.movie_description}
				required
			/>
		</div>
        {#each genres as genre}
        <input type="checkbox" style="margin-left:0.2em;margin-bottom:1em;margin-top:-0.5em;" name={genre} value={genre} id={genre}> {genre}
        {/each}
       <br>

        <div class="mb-6">
			<input
				name="review_date"
				type="date"
				id="review_date"
				class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				placeholder="Date of review"
                bind:value={bookingInfo.review_date}
				required
			/>
		</div>
        <div class="mb-6">
            <img class="upload" src="https://static.thenounproject.com/png/556238-200.png" alt="" on:click={()=>{fileinput.click();}} />
            <div class="chan" on:click={()=>{fileinput.click();}}>Choose Video</div>
			<input
				name="movie_url"
				type="file"
				id="movie_url"
				class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
				placeholder="Movie URL"
                accept=".mp4"
                bind:value={bookingInfo.movie_url}
                on:change={(e)=>onFileSelected(e)} bind:this={fileinput}
				required
			/>
		</div>
		<input
			type="submit"
			value="Submit"
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			style="background-color:#5C728A;margin-top:0.5em;cursor:pointer;"
		/>
	</form>
</center>
{:else}
{window.location.replace("http://localhost:5173/")}

{/if}

<style>
    #movie_title, #movie_description, #movie_url, #review_date{
        background-color: white;
        border:0;
        color: black;
    }
</style>

