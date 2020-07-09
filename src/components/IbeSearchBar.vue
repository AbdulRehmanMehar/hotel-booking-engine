<template>
    <div class="mx-auto lg:block">


        <form class="" @submit.prevent="search">
            <div class="flex flex-wrap -mx-3 mb-6 space">
                <div class="w-full md:w-24 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-nr-adults">
                        Adults
                    </label>
                    <input v-model="nr_adults" class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nr-adults" type="number" name="nr_adults" placeholder="2">
                </div>
                <div class="w-full md:w-24 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-nr-children">
                        Children
                    </label>
                    <input v-model="nr_child" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nr-children" type="number" name="nr_children" placeholder="0">
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative sm-margin-bottom">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Date
                    </label>
                    <HotelDatePicker format="YYYY/MM/DD" class="absolute date-picker-custom" v-on:check-in-changed="checkInChanged" v-on:check-out-changed="checkOutChanged" />
                </div>

                <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">

                    <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2 hidden md:block" for="grid-checkout">
                       .
                    </label>
                    <button class=" appearance-none block w-full bg-teal-500 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-teal-900">
                    Search
                    </button>

                    </div>
            </div>
        </form>
    </div>
</template>

<script>
    import HotelDatePicker from 'vue-hotel-datepicker'

    export default {
        data() {
            return {
                nr_adults: "",
                nr_child: "",
                arrival_date: null,
                departure_date: null,
            }
        },

        components: {
            HotelDatePicker,
        },
        name: 'IbeSearchBar',
        props: {

        },
        methods: {
            formatDate(date) {
                let d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;

                return [year, month, day].join('-');
            },

            checkInChanged (value) {
                console.log(value)
                this.arrival_date = this.formatDate(value)
                document.querySelector('.datepicker__input:last-child').style.color = '#6acc9d'
            },

            checkOutChanged (value) {
                this.departure_date = this.formatDate(value)
            },
            
            search() {
                if (this.nr_adults == "" || 
                    this.nr_child == "" || 
                    this.arrival_date == null || 
                    this.departure_date == null) return alert('Please fill in all the fields')

                this.$store.dispatch('searchRooms', this.$data)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
