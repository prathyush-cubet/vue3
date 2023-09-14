<template>
    <div>
        <PropComponent title="Sample title" @emit-event="receiveEvent"/>
    </div>
</template>

<script>
import PropComponent from '@/components/PropComponent.vue'

export default {
    name:'ExampleComponent',
    components: {PropComponent},
    methods: {
        receiveEvent(val) {
            alert(val)
        }
    }
}
</script>
