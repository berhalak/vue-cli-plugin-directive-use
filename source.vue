<template>
	<div>
		<textbox v-use="name" /> 
		<component v-use="name" />
		<component v-use="name" as="other" />		
	</div>
</template>
<script>
</script>