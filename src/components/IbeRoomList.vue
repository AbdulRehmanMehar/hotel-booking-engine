<template>
    <div class="w-full">
        <!-- <IbeRoom :room=this.room1></IbeRoom>
        <IbeRoom :room=this.room2></IbeRoom>
        <IbeRoom :room=this.room3></IbeRoom> -->

        <div v-if="getRoomModuleBookProcessing">
            Processing...
        </div>

        <div v-else-if="getRoomModuleBookError">
            {{ getRoomModuleBookError }}
        </div>

        <div v-if="getRoomModuleFetchProcessing">
            Processing....
        </div>
        <div v-else-if="getRoomModuleFetchError">
            {{ getRoomModuleFetchError }}
        </div>
        <div v-else>
            <IbeRoom v-for="(room, index) in getAllRooms" :key="index" :room="room"></IbeRoom>
        </div>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import IbeRoom from "./IbeRoom";


    export default {
        components: {
            IbeRoom
        },

        computed: {
            ...mapGetters(['getAllRooms', 'getRoomModuleFetchError', 'getRoomModuleFetchProcessing', 'getRoomModuleBookProcessing', 'getRoomModuleBookError'])
        },

        name: 'IbeRoomList',
        props: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
