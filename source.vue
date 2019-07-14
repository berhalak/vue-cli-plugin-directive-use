<template>
	<div>
		<textbox v-use="name" />
		<template v-use="name" />
		<template v-use="name" :as="other" />
		<template v-use="name" as="other" />
		<var:test />
	</div>
</template>
<script>
</script>