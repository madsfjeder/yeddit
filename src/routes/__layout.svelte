<script>
	import "../app.css";
</script>

<div class="w-full min-h-screen h-full">
	<div class="p-4 flex space-x-4 h-14 w-full border border-blue-500">
	</div>
	<div class="m-5 p-4 h-24 border border-green-500">
		<slot/>
	</div>
	<div class="p-4 flex justify-center w-full h-14 fixed bottom-0 border border-red-500">
	</div>
</div>
