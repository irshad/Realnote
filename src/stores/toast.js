import { writable } from 'svelte/store';

export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'danger'
}

const createToastStore = () => {
    const { subscribe, set, update } = writable({
        show: false,
        duration: 3000,
        type: null,
        message: ''
    })

    return {
        subscribe,
        success: msg => {
            update(u => ({
                ...u,
                show: true,
                type: TOAST_TYPES.SUCCESS,
                message: msg,
                textColor: '#222121',
                color:"#ffcc5c"
            }))
        },
        error: msg => {
            update(u => ({
                ...u,
                show: true,
                type: TOAST_TYPES.ERROR,
                message: msg,
                textColor: '#222121',
                color:"#ffcc5c"
            }))
        },
        hide: () => {
            update(u => ({
                ...u,
                show: false,
                message: '',
                color:'',
                type: null
            }))
        }
    }
}

const toastStore = createToastStore();

toastStore.subscribe(toast => {
    if(toast.show){
        setTimeout(() => {
            toastStore.hide();
        }, toast.duration)
    }
})

export default toastStore;