<template>
    <div>
        <h1>{{ title }}</h1>
        <input type="text" @keyup.enter="doEmit($event)"/>
    </div>
</template>
<script>
export default {
    name: 'PropCompenent',
    emits : ['emitEvent'],
    props: [
        'title'
    ],
    methods: {
        doEmit(e)
        {
            this.$emit('emit-event', e.target.value)
        }
    }
}
</script>