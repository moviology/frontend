<script>
   import { LineChart } from '@carbon/charts-svelte'

   import { browser } from '$app/environment'
   import { onMount } from 'svelte'
   import '@carbon/styles/css/styles.css'
   import '@carbon/charts/styles.css'

   let accessToken = browser ? localStorage.getItem('accessToken') : ''
   let refreshToken = browser ? localStorage.getItem('refreshToken') : ''
   let reviewId = browser ? localStorage.getItem('reviewId') : ''

   let reviews = []

   function gatherData(data) {
      data.forEach(d => {
         const firstTimestamp = d.data_set[0].timestamp
         const lastTimestamp = d.data_set[d.data_set.length - 1].timestamp

         const average_values = [
            {
               group: 'Average Heart Rate',
               timestamp: firstTimestamp,
               value: d.average_heart_rate
            },
            {
               group: 'Average Heart Rate',
               timestamp: lastTimestamp,
               value: d.average_heart_rate
            },
            {
               group: 'Average Perspiration',
               timestamp: lastTimestamp,
               value: d.average_sweat
            },
            {
               group: 'Average Perspiration',
               timestamp: lastTimestamp,
               value: d.average_sweat
            }
         ]

         reviews = [
            ...reviews,
            {
               title: `Review ${d.machine_id}`,
               data: [...d.data_set, ...average_values]
            }
         ]
      })
   }

   onMount(async () => {
      fetch('http://127.0.0.1:5000/reviews/view_biodata/' + reviewId, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
         }
      })
         .then(response => response.json())
         .then(result => gatherData(result.data))
   })
</script>

{#if reviews.length}
   {#each reviews as review}
      <LineChart
         data={review.data}
         options={{
            title: review.title,
            axes: {
               bottom: {
                  title: 'Time (hh:mm:ss)',
                  mapsTo: 'timestamp',
                  scaleType: 'labels'
               },
               left: {
                  mapsTo: 'value',
                  title: 'Heart Rate: BPM | Perspiration: GSR',
                  scaleType: 'linear'
               }
            },
            curve: 'curveMonotoneX',
            height: '600px',
            theme: 'g10'
         }}
      />
   {/each}
{/if}
