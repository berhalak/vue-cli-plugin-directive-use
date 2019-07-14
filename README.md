# vue-cli-plugin-directive-use
Custom vue directive v-use to bind whole objects to components

Installation:
vue add vue-cli-plugin-directive-use

Or through vue ui, search for vue-cli-plugin-directive-use

Sample (also see test.ts)

Transforms vue template:
```html
<template>
  <div>
    <textbox v-use="name" /> 
    <textbox v-use.change="name" /> 
    <template v-use="name" />
    <template v-use="name" as="other" />
    <var:name />
    <!-- will be translated to -->
    <textbox v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" />
    <textbox v-bind="name" @change="x => name.set ? name.set(x) : (name.value = x)" />
    <component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="name.$use || name.constructor.name" />
    <component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" is="other" />
    <component :is="name.type && (typeof(name.type) == 'function') ? name.type() : (name.type ? name.type : name.constructor.name)" :value="name" />
  </div>
</template>
<script>
class Textbox {
  constructor(value){
    this.value = value;
  }
  // optional
  set(value){
    this.value = value;
  }
}
  export default {
    data(){
      return {
        name : new Textbox("")
      }
    }
  }
</script>
```