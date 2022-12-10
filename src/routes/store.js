import { writable } from 'svelte/store'

export let accessToken = writable('None')
export let refreshToken = writable('None')