import Vue from 'vue'
import Index from './Index.vue'
import Vconsole from 'vconsole'
new Vconsole()

new Vue ({
    el:'#app',
    template: '<Index />',
    components:{Index}
})
