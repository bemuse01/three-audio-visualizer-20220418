import Audio from '../class/audio/audio.js'

export default {
    template: `
        <div id="audio-container"></div>
    `,
    setup(){
        const {onMounted, onBeforeMount, computed} = Vue
        const {useStore} = Vuex


        // variables
        const src = './assets/src/ranbu_suisei.ogg'
        const store = useStore()
        const audio = computed(() => store.getters['audio/getAudio'])


        // methods
        const playAudio = () => {
            if(!audio.value) return
            
            audio.value.play()
        }


        // hook
        onBeforeMount(() => {
            store.dispatch('audio/setAudio', new Audio(src))
        })
        onMounted(() => {
            window.addEventListener('click', playAudio)
        })
    }
}