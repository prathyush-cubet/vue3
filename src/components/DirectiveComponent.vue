<template>
  <div>
    <a :href="url">Link</a><br />
    <a href="url">Another link</a><br />
    <div v-html="html"></div>
    <br />
    <input type="text" v-model="model" /> {{ model }}<br />
    <span v-if="condition">Condition is true</span>
    <span v-else>Condition is false</span><br />
    <span v-show="condition">show if true</span>
    <div v-for="(item, index) in items" :key="index">
      {{ item }}
    </div>
    <button type="button" v-on:click="click()">Click</button><br />
    Press enter here:<input type="text" v-on:keypress.enter="keypress()" /><br />
    Important?:{{ isImportant }}
    <br />
    Watch changes in this box<input v-model="rangeVal" />
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
      val: false,
      rangeVal: 39,
    };
  },
  methods: {
    click() {
      alert("clicked");
    },
    keypress() {
      alert("key pressed");
    },
  },
  computed: {
    isImportant() {
      return this.val ? "Yes" : "No";
    },
  },
  watch: {
    rangeVal(newVal, oldVal) {
      alert("new val=" + newVal + ", old val=" + oldVal);
    },
  },
};
</script>
