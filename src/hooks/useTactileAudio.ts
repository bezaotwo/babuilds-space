import { useState, useEffect } from 'react';

// Global state mechanism outside React so all instances share it
let globalIsMuted = false;
const listeners = new Set<(muted: boolean) => void>();

export const toggleGlobalMute = () => {
  globalIsMuted = !globalIsMuted;
  listeners.forEach(l => l(globalIsMuted));
}

// Preload audio objects
const click1Audio = new Audio('/click1.mp3');
const click2Audio = new Audio('/click2.mp3');
click1Audio.preload = 'auto';
click2Audio.preload = 'auto';

export const playSound = (type: 'thock' | 'click' | 'nav' | 'toggle') => {
    if (globalIsMuted) return;
    try {
        const sourceAudio = type === 'toggle' ? click2Audio : click1Audio;
        // Clone the node so multiple sounds can play simultaneously
        const clonedAudio = sourceAudio.cloneNode() as HTMLAudioElement;
        clonedAudio.play().catch(e => console.error("Audio playback failed", e));
    } catch (e) {
        console.error("Audio playback error", e);
    }
}

export const useTactileAudio = () => {
    const [isMuted, setIsMuted] = useState(globalIsMuted);

    useEffect(() => {
        const handler = (muted: boolean) => setIsMuted(muted);
        listeners.add(handler);
        return () => { listeners.delete(handler); };
    }, []);

    return {
        isMuted,
        toggleMute: toggleGlobalMute,
        playSound
    }
}
