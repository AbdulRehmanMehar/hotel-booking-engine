<template>
    <div class="shadow-sm min-w-full bg-white border border-gray-400 rounded mb-6 p-6">
        <div class="relative mb-6">
            <div class="absolute left-0 top-0 p-2">
                <router-link :to="{name: 'home'}" class="text-blue-700">Back to product listings</router-link>
            </div>
        </div>

        <div class="flex mt-6 mb-6 p-6 text-center">            
            <h1 class="text-3xl font-bold my-0 mx-auto">Your Booking Summary</h1>
        </div>

        <div class="flex">
            <div class="w-1/4 h-24">
                <div class="m-2 rounded h-24 lg:w-full flex-none bg-cover text-center overflow-hidden" :style="{ backgroundImage: `url(${getRoomModuleBookDetails.room.image})` }" title="Woman holding a mug">
                </div>
            </div>
            <div class="w-2/3">
                <div class="m-4 p-4 pt-0">
                    <p>Select Room: {{ getRoomModuleBookDetails.room.title }}</p>
                    <p>
                        <b>{{getRoomModuleBookDetails.nr_adults}} Adults </b>
                        and {{ getRoomModuleBookDetails.nr_child }} Child</p>
                    <p>Stay from <b>{{getRoomModuleBookDetails.arrival_date}} &gt; {{ getRoomModuleBookDetails.departure_date }} ({{ getRoomModuleBookDetails.nr_nights }} nights)</b></p>
                </div>
            </div>
            <div class="w-1/3">
                <div class="m-4 p-4 pt-0">
                    <h3 class="text-xl text-right font-bold">{{ getRoomModuleBookDetails.amount_per_night }}</h3>
                    <p class="text-right">For the {{ getRoomModuleBookDetails.nr_nights }} nights</p>
                    <p class="text-right">Including Taxes and Fees</p>
                </div>
            </div>
        </div>


        <div class="w-full">
            
            <!-- FORM -->
            <form class="w-full" @submit.prevent="completeReservation">
                <div class="my-6 pb-1 border-t-2 border-b-2 border-black"></div>
                <h3 class="text-xl font-bold my-5 uppercase">Your Personal Details</h3>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="First Name">
                    
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Last Name">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Your Address">
                    
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Zip Code">
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="City">
                    
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Country">
                    </div>
                </div>

                 <div class="flex flex-wrap -mx-3 mb-6 pt-3">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="email" placeholder="Email">
                    
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Phone Number">
                    </div>
                </div>

                <div class="my-6 pb-1 border-t-2 border-b-2 border-black"></div>
                <h3 class="text-xl font-bold my-5 uppercase">Your Payment Details</h3>

                <div class="flex w-full mb-6">
                    <div class="w-1/2">
                        <div class="w-full mb-6">
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Credit Card Name">
                        </div>
                        <div class="w-full mb-6">
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Credit Card Number">
                        </div>
                        <div class="w-full flex flex-wrap">
                            <div class="w-1/2 mr-16">
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" placeholder="Expiration Date">
                            </div>
                            <div class="w-1/3 ml-2">
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="CVV">
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="w-full h-40 p-6 pt-0">
                            <div class="m-2 rounded h-40 lg:w-full flex-none bg-cover text-center overflow-hidden" :style="{ backgroundImage: `url(/uploads/payment-methods.png)` }" title="Woman holding a mug">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                
                    
                        <button class="bg-transparent w-full hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Complete Reservation
                        </button>

                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {

        computed: {
            ...mapGetters(['getRoomModuleBookDetails'])
        },

        methods: {
            completeReservation() {
                // TODO: Handle form submission
            }
        }

    }
</script>