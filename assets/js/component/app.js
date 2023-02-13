import Method from '../method/method.js'
import App from '../class/app/app.js'

import UiContainer from './uiContainer.js'
import ObjectContainer from './objectContainer.js'
import AudioContainer from './audioContainer.js'

export default {
    components: {
        'ui-container': UiContainer,
        'object-container': ObjectContainer,
        'audio-container': AudioContainer
    },
    template: `
        <div
            id="app"
            :style="appStyle"
            :ref="el => app = el"
        >

            <audio-container />
            <object-container />
            <ui-container />

        </div>
    `,
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()


        // variable
        const app = ref()


        // style
        const appStyle = ref({
            position: 'relative',
            width: '100%',
            height: '100%'
        })


        // method
        const createThreeApp = () => {
            store.dispatch('app/setApp', new App({element: app.value}))
        }
        const init = async () => {
            createThreeApp()
        }


        // event
        const animate = () => {
            TWEEN.update()

            requestAnimationFrame(animate)
        }
        const onWindowResize = () => {
        }
        const initEvent = () => {
            animate()
            window.addEventListener('resize', onWindowResize)
        }


        // hook
        onMounted(() => {
            init()
            initEvent()
        })


        return{
            appStyle,
            app,
        }
    }
}