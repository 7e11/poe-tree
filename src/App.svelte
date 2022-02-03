<script lang="ts">
	// Firebase stuff
	// Import the functions you need from the SDKs you need
	import { initializeApp } from "firebase/app";
	import { getAnalytics } from "firebase/analytics";
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: "AIzaSyCNFiQrpHO84HaJvtifGoUZRnojizXbT_U",
		authDomain: "poe-tree.firebaseapp.com",
		projectId: "poe-tree",
		storageBucket: "poe-tree.appspot.com",
		messagingSenderId: "800264654112",
		appId: "1:800264654112:web:22b4855f5e44b2e1711b45",
		measurementId: "G-J6VDDK16KQ"
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);

	// Back to normal
	import {v4 as uuidv4} from "uuid";
	const baseURL = "https://api.pathofexile.com"
	const authBaseURL = "https://www.pathofexile.com"


	const client_id = "poe-tree"
	const version = 0.1
	const contact = "hruskar.evan@gmail.com"
	const client_secret = "77009532-dc75-426d-91b1-2e66621695f1"
	const user_agent = `OAuth ${client_id}/${version} (contact: ${contact})`
	type League = 'Standard' | 'SSF Standard' | 'SSF Hardcore' | 'Hardcore'

	async function poeAuth() {
		const params = {
			client_id,
			response_type: 'code',
			scope: 'service:leagues:ladder',
			state: uuidv4(),
			redirect_uri: 'https://lvh.me',
			prompt: 'consent',
		}
		const resp = await fetch('https://www.pathofexile.com/oauth/authorize', {
			method: 'POST',
			body: new URLSearchParams(params)
		})
		console.log(resp)
	}
</script>

<main>
	<button on:click={poeAuth}>Authorize with POE</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>