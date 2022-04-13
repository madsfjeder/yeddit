<script>
	import "../app.css";
</script>

<div class="w-full min-h-screen h-full">
	<div class="p-4 flex space-x-4 h-14 w-full border border-blue-500">
		<p>
			Item 1
		</p>
		<p>
			Item 2
		</p>
		<p>
			Item 3
		</p>
	</div>
	<div class="m-5 p-4 h-[36rem] border border-green-500">
		<p>Item 1</p>
		<slot/>
	</div>

	<div class="p-4 flex justify-center w-full h-14 fixed bottom-0 border border-red-500">
		<p>Footer item</p>
	</div>
</div>
