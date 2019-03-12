<template>
        <div>
           <div v-for="item of data">
               名字 ： {{item.name}}   年龄 ： {{item.age}}
           </div>


            输入名字 ： <input v-model="name" />
            输入年龄 ： <input v-model="age" />

            <div @click="add" style="cursor:pointer">
                add
            </div>

            <div @click="clear" style="cursor:pointer">
                清空所有数据
            </div>

        </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'test',
    data(){
        return {
            data : [],
            name : '',
            age : ''
        }
    },
    created(){
       
    },

    methods:{
        
        getList(){
            axios.get('/zyp/getList').then(res => {
                this.data = res.data.data || []
                this.name = ''
                this.age = ''
            } )
        },
        add(){
            axios.post('/zyp/add',{name :this.name, age:this.age} ).then(res => {
                this.getList()
            })
        },

        clear(){
            axios.get('/zyp/clear').then(res => {
                this.getList()
            })
        }
    }
}
</script>

<style>

</style>

