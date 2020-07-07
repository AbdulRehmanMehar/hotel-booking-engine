import axios from 'axios'

export default {
    state: {
        rooms: [
            {
                code: "STD",
                title: "Standard Room",
                summary: "Studio Apartment with an area of 41 m2. Max cap.: 2 adults + 1 child up to 2 years old",
                card_amenities: [
                    {
                        label: "Sleeps",
                        value: 3
                    },
                    {
                        label: "Beds",
                        value: "2 Twin"
                    },
                    {
                        label: "Area",
                        value: "41 m²"
                    },
                ],
                image: "/uploads/rooms/room-0.jpg",
                rates: [
                    {
                        code: "BAR",
                        title: "Best Available Rate",
                        summary: "Hotel's Best Available Rate. Accommodation and all taxes included.",
                        from: 190
                    },
                    {
                        code: "NFR",
                        title: "Non Refundable",
                        summary: "Hotel's Non Refundable Rate. Accommodation and all taxes included.",
                        from: 155
                    }
                ]
            },
            {
                code: "DBL",
                title: "Double Room",
                summary: "Studio Apartment with an area of 41 m2. Max cap.: 2 adults + 1 child up to 2 years old",
                card_amenities: [
                    {
                        label: "Sleeps",
                        value: 2
                    },
                    {
                        label: "Beds",
                        value: "1 Twin"
                    },
                    {
                        label: "Area",
                        value: "21 m²"
                    },
                ],
                image: "/uploads/rooms/room-1.jpg",
                rates: [
                    {
                        code: "BAR",
                        title: "Best Available Rate",
                        summary: "Hotel's Best Available Rate. Accommodation and all taxes included.",
                        from: 120
                    },
                    {
                        code: "NFR",
                        title: "Non Refundable",
                        summary: "Hotel's Non Refundable Rate. Accommodation and all taxes included.",
                        from: 115
                    }
                ]
            },
            {
                code: "ST",
                title: "Suite",
                summary: "Studio Apartment with an area of 41 m2. Max cap.: 2 adults + 1 child up to 2 years old",
                card_amenities: [
                    {
                        label: "Sleeps",
                        value: 4
                    },
                    {
                        label: "Beds",
                        value: "2 Twin"
                    },
                    {
                        label: "Area",
                        value: "61 m²"
                    },
                ],
                image: "/uploads/rooms/room-2.jpg",
                rates: [
                    {
                        code: "BAR",
                        title: "Best Available Rate",
                        summary: "Hotel's Best Available Rate. Accommodation and all taxes included.",
                        from: 170
                    },
                    {
                        code: "NRF",
                        title: "Non Refundable",
                        summary: "Hotel's Non Refundable Rate. Accommodation and all taxes included.",
                        from: 175
                    }
                ]
            }
        ],
        fetch_processing: false,
        fetch_error: null,
        search_data: null,
        book_processing: false,
        book_error: null,
        book_details: null
    },

    mutations: {

        SET_ROOMS(state, payload) {
            state.rooms = payload
        },

        SET_FETCH_PROCESSING(state, payload) {
            state.fetch_processing = payload
        },

        SET_FETCH_ERROR(state, payload) {
            state.fetch_error = payload
        },

        SET_SEARCH_DATA(state, payload) {
            state.search_data = payload
        },

        SET_BOOK_PROCESSING(state, payload) {
            state.book_processing = payload
        },

        SET_BOOK_ERROR(state, payload) {
            state.book_error = payload
        },

        SET_BOOK_DETAILS(state, payload) {
            state.book_details = payload
        },

    },

    actions: {

        searchRooms(context, paylaod) {
            return new Promise((resolve, reject) => {        

                context.commit('SET_FETCH_ERROR', null)
                context.commit('SET_FETCH_PROCESSING', true)

                axios.post('https://y6bp6qz2xe.execute-api.us-east-1.amazonaws.com/dev/api/v1/201/ibe/search', paylaod)
                    .then(resp => {
                        let data = Object.values(resp.data.data)
                        data.forEach(rms => {
                            rms.rates = Object.values(rms.rates)
                        })
                        context.commit('SET_ROOMS', data)
                        context.commit('SET_SEARCH_DATA', paylaod)
                        context.commit('SET_FETCH_PROCESSING', false)
                        resolve(data)
                    }).catch(error => {
                        context.commit('SET_ROOMS', [])
                        context.commit('SET_FETCH_ERROR', error)
                        context.commit('SET_SEARCH_DATA', null)
                        context.commit('SET_FETCH_PROCESSING', false)
                        reject(error)
                    })
            })
        },

        bookRoom(context, payload) {
            return new Promise((resolve, reject) => {
                context.commit('SET_BOOK_ERROR', null)
                context.commit('SET_BOOK_PROCESSING', true)

                axios.post('https://y6bp6qz2xe.execute-api.us-east-1.amazonaws.com/dev/api/v1/201/ibe/reserve', payload)
                    .then(resp => {
                        let data = resp.data
                        context.commit('SET_BOOK_DETAILS', data)
                        context.commit('SET_BOOK_PROCESSING', false)
                        resolve(data)
                    }).catch(error => {
                        context.commit('SET_BOOK_DETAILS', null)
                        context.commit('SET_BOOK_ERROR', error)
                        context.commit('SET_BOOK_PROCESSING', false)
                        reject(error)
                    })
            })

        }
    },

    getters: {
        getAllRooms(state) {
            return state.rooms
        },

        getRoomModuleFetchError(state) {
            return state.fetch_error
        },

        getRoomModuleFetchProcessing(state) {
            return state.fetch_processing
        },

        getRoomSearchData(state) {
            return state.search_data
        },

        getRoomModuleBookError(state) {
            return state.book_error
        },

        getRoomModuleBookProcessing(state) {
            return state.book_processing
        },

        getRoomModuleBookDetails(state) {
            return state.book_details
        },
    }
}