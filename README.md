# vue-cli-plugin-alias
Custom vue directive v-use

Installation:
vue add vue-cli-plugin-directive-use

Or through vue ui, search for vue-cli-plugin-directive-use

Sample (also see test.ts)

Transforms vue template from alias form:
```html
<template>
  <div>
    <textbox v-use="name" /> 
    <component v-use="name" />
    <component v-use="name" as="other" />
    <!-- will be translated to -->
    <textbox v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" />
    <component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" :is="name.$use || name.constructor.name" />
    <component v-bind="name" @input="x => name.set ? name.set(x) : (name.value = x)" is="other" />
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