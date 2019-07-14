<template>
	<div>
		<textbox v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)"/> 
		<component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="name['$name'] || name.constructor.name"/>
		<component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="other"/>		
		<component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="'other'"/>
		<component :is="name.type && (typeof(name.type) == 'function') ? name.type() : (name.type ? name.type : name.constructor.name)" :value="name"/>
	</div>
</template>
<script>
</script>