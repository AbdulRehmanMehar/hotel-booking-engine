import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)


export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/components/IbeRoomList')
        },

        {
            path: '/booking-successfull',
            name: 'booked',
            beforeEnter: function(to, from, next) {
                if (store.getters.getRoomModuleBookDetails) {
                    return next()
                }
                return next('/')
            },
            component: () => import('@/components/IbeBookSuccess')
        },

        {
            path: '*',
            name: 'not-found',
            component: { template: 'Sorry ' }
        }
    ]
})