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

	let heartDataSetCount = 1
	let sweatDataSetCount = 1

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

	function handlePopulate(dataset){
		populateDataSet(dataset)
	}


	function iterateData(){
		for (let i = 0; i < resultData.length; i++){
			for (let j = 0; i < resultData[i].length; j++){
				handlePopulate(resultData[i][j])
			}
			heartDataSetCount++
			sweatDataSetCount++
		}
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


{#each review.data_set as data_set}

{handlePopulate(data_set)}



{/each}


<LineChart
	data={
		heartRates
	}
	options={{
	"title": "Line (dense time series)",
	"axes": {
		"bottom": {
			"title": "2019 Annual Sales Figures",
			"mapsTo": "date",
			"scaleType": "linear"
		},
		"left": {
			"mapsTo": "value",
			"title": "Conversion rate",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "400px"
}}
	/>

	<LineChart
	data={
		sweatRates
	}
	options={{
	"title": "Line (dense time series)",
	"axes": {
		"bottom": {
			"title": "2019 Annual Sales Figures",
			"mapsTo": "date",
			"scaleType": "linear"
		},
		"left": {
			"mapsTo": "value",
			"title": "Conversion rate",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "400px"
}}
	/>


	{/each}
