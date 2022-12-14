<script>
	import { LineChart } from "@carbon/charts-svelte";

    import { browser } from '$app/environment'
    import { onMount } from 'svelte';

    let accessToken = browser ? localStorage.getItem('accessToken') : ''
    let refreshToken = browser ? localStorage.getItem('refreshToken') : ''
	let reviewId = browser ? localStorage.getItem('reviewId') : ''



	let resultData = []
	let heartRates = []
	let sweatRates = []

	let heartsCount = 0
	let sweatCount = 0

	let heartDataSetCount = 0
	let sweatDataSetCount = 0

	 let finalSize = -1
	 let currentSize = 0

	let printed = false

	function populateDataSet(dataset){
		console.log(dataset)

		if (dataset.group == "Heart Rate"){
			let currentEntry = {
				"group": "Dataset " + heartDataSetCount,
				"date": heartsCount,
				"value": dataset.value
			}
			heartsCount+= 2;
			heartRates.push(currentEntry)
		}
		else{
			let currentEntry = {
				"group": "Dataset " + sweatDataSetCount,
				"date": sweatCount,
				"value": dataset.value
			}
			sweatCount+= 2
			sweatRates.push(currentEntry)
		}
	
	}

	function updateCounts(){
		heartDataSetCount++
		sweatDataSetCount++
		currentSize++
		heartsCount = 0
		sweatCount = 0
		finalSize = resultData.length
	}

	function handlePopulate(dataset){
		populateDataSet(dataset)
	}

	function gatherData(data){
        console.log(data)
        resultData = data.data
		console.log(resultData)
    }
    onMount(async () => {
        fetch('http://127.0.0.1:5000/reviews/view_biodata/' + reviewId, {
        method:  'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken
        },
        })
        .then(response => response.json())
        .then(result => gatherData(result))
  });

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
	import { append } from "svelte/internal";
</script>

{#each resultData as review}

{console.log("first for loop")}

{#each review.data_set as data_set}


<p hidden>{handlePopulate(data_set)}</p>


{/each}

{console.log("printing sizes")}

{console.log("ended printing sizes")}
{finalSize = resultData.length}

{#if currentSize === finalSize}
{console.log("inside of if")}
{console.log(currentSize)}
{console.log(finalSize)}
<LineChart
	data={
		heartRates
	}
	options={{
	"title": "Heart Rate of audience members",
	"axes": {
		"bottom": {
			"title": "Time (seconds)",
			"mapsTo": "date",
			"scaleType": "linear"
		},
		"left": {
			"mapsTo": "value",
			"title": "Heart Rate(bpm)",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "400px"
}}
	/>
<br><br><br>
	<LineChart
	data={
		sweatRates
	}
	options={{
	"title": "Perspiration of audience members",
	"axes": {
		"bottom": {
			"title": "Time (seconds)",
			"mapsTo": "date",
			"scaleType": "linear"
		},
		"left": {
			"mapsTo": "value",
			"title": "Perspiration",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "400px"
}}
	/>

	{console.log("finished charts")}

	{/if}

	{console.log("outside if")}

	{updateCounts()}
	{/each}
