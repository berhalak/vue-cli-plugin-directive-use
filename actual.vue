<template>
	<div>
		<textbox v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)"/>
		<component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="name['$name'] || name.constructor.name"/>
		<component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="other"/>
		<component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="'other'"/>
		<component :is="test.type && (typeof(test.type) == 'function') ? test.type() : (test.type ? test.type : test.constructor.name)" :value="test"/>
	</div>
</template>
<script>
</script>