<template>
  <div>
    <a v-bind:href="url">Link</a><br />
    <a href="url">Another link</a><br />
    <div v-html="html"></div>
    <br />
    <input type="text" v-model="model" /> {{ model }}<br />
    <span v-if="condition">Condition is true</span>
    <span v-else>Condition is false</span><br />
    <span v-show="condition">show if true</span>
    <div v-for="(item, index) in items" v-bind:key="index">
      {{ item }}
    </div>
    <button type="button" v-on:click="click()">Click</button>
  </div>
</template>

<script>
export default {
  name: "DirectiveComponent",
  data() {
    return {
      url: "http://xyz.com",
      html: "<h1>test</h1>",
      model: "test",
      condition: true,
      items: [0, 1, 2, 3, 4, 5],
    };
  },
  methods: {
    click() {
      alert("clicked");
    },
  },
};
</script>
