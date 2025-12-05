import { writable } from 'svelte/store';

const colors = ['#c9e943', '#fa9e35', '#fb7da7', '#af98e6', '#ffd33f', '#51c7da'];

function createThemeStore() {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';

    let savedColor = colors[0];
    let initialIndex = 0;

    if (isBrowser) {
        const stored = localStorage.getItem("color");
        if (stored) {
            savedColor = stored;
            initialIndex = colors.indexOf(stored);
            if (initialIndex === -1) {
                initialIndex = 0;
                savedColor = colors[0];
            }
        }
    }

    const { subscribe, update } = writable({
        color: savedColor,
        index: initialIndex
    });

    return {
        subscribe,
        changeColor: () => update(state => {
            let newIndex = state.index + 1;
            if (newIndex >= colors.length) {
                newIndex = 0;
            }
            const newColor = colors[newIndex];
            if (isBrowser) {
                localStorage.setItem("color", newColor);
            }
            return {
                color: newColor,
                index: newIndex
            };
        })
    };
}

export const theme = createThemeStore();
