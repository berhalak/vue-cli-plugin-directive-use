<template>
	<div>
		<textbox v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)"/> 
		<component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="name['$name'] || name.constructor.name"/>
		<component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="'other'"/>		
	</div>
</template>
<script>
</script>