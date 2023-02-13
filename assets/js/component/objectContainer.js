import Visualizer from '../class/visualizer/visualizer.js'
import {Particle} from '../class/particle/particle.js'

export default {
    template: `
        <div :style="visualizerStyle">
            <canvas :style="canvasStyle" :ref="el => canvas = el" />
            <div :style="logoStyle">
                <div :style="logoImgStyle"></div>
            </div>
        </div>
    `,
    setup(){
        const {onMounted, computed, ref, watch} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const app = computed(() => store.getters['app/getApp'])
        const audio = computed(() => store.getters['audio/getAudio'])


        // variable
        const canvas = ref()
        const radius = 17
        const sc = 0.5
        const color = 0x2073ff
        const animation = ref()
        const scale = ref(1)
        let visualizer = null
        let particle = null


        // style
        const visualizerStyle = ref({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
        })
        const canvasStyle = ref({
            width: '100%',
            height: '100%'
        })
        const logoStyle = ref({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '17vh',
            height: '17vh'
        })
        const logoImgStyle = computed(() => ({
            width: '100%',
            height: '100%',
            transform: `scale(${scale.value})`, 
            background: `url('./assets/src/suisei_logo.png') no-repeat center center / cover`
        }))



        // method
        const createObjects = () => {
            particle = new Particle({app: app.value, audio: audio.value, color, canvas: canvas.value})
            visualizer = new Visualizer({app: app.value, audio: audio.value, color, canvas: canvas.value, radius, scale: sc})
        }
        const animate = () => {
            if(audio.value){
                scale.value = 1 + audio.value.audioDataAvg * sc
            }

            animation.value = requestAnimationFrame(() => animate())
        }


        // watch
        watch([app, audio], ([curApp, curAudio], _) => {
            console.log('work')
            if(curApp && curAudio) createObjects()
        })


        // hook
        onMounted(() => {
            animate()
        })


        return{
            canvas,
            visualizerStyle,
            canvasStyle,
            logoStyle,
            logoImgStyle
        }
    }
}