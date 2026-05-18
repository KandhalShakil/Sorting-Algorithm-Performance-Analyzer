export class AudioSystem {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.volume = 0.5; // Starts at 50% matching UI slider
        this.unlocked = false;
        this.preset = 'modern';
        this.speedDuration = 0.01; // Default duration
    }

    setVolume(val) {
        this.volume = val;
    }

    setPreset(preset) {
        this.preset = preset;
    }

    setSpeedDuration(sec) {
        this.speedDuration = sec;
    }

    initCtx() {
        try {
            if (!this.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioContext();
            }
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            if (!this.unlocked) {
                // Force unlock on mobile/Safari with a silent ping
                const buffer = this.ctx.createBuffer(1, 1, 22050);
                const source = this.ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(this.ctx.destination);
                source.start(0);
                this.unlocked = true;
            }
        } catch (e) {
            console.warn('AudioContext init failed:', e);
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) this.initCtx();
        return this.enabled;
    }

    getPresetConfig(isSwap) {
        // Returns type, attack, release multiplier, filter
        let config = { type: 'sine', attack: 0.01, release: 0.8, filterFreq: null };
        switch(this.preset) {
            case 'soft':
                config.type = 'sine';
                config.attack = 0.05;
                config.release = 1.2;
                break;
            case 'digital':
                config.type = 'square';
                config.attack = 0.005;
                config.release = 0.3;
                config.filterFreq = 2000;
                break;
            case 'synth':
                config.type = 'sawtooth';
                config.attack = 0.02;
                config.release = 0.5;
                config.filterFreq = 3000;
                break;
            case 'minimal':
                config.type = 'sine';
                config.attack = 0.005;
                config.release = 0.2;
                break;
            case 'modern':
            default:
                config.type = isSwap ? 'triangle' : 'sine';
                config.attack = 0.01;
                config.release = 0.5;
                break;
        }
        return config;
    }

    playTone(freq, isSwap = false) {
        if (!this.enabled || !this.ctx || this.ctx.state !== 'running' || this.volume <= 0) return;
        try {
            const config = this.getPresetConfig(isSwap);
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = config.type;
            osc.frequency.value = freq;

            const now = this.ctx.currentTime + 0.005;

            // Guarantee a minimum duration so fast sorts don't break scheduling
            let dur = this.speedDuration * config.release;
            if (dur < 0.015) dur = 0.015;
            if (dur > 0.4) dur = 0.4;

            // Enforce strictly sequential timing for ADSR Envelope to prevent DOMExceptions
            const safeAttack = Math.min(config.attack, dur * 0.3);
            const safeReleaseDur = dur - safeAttack;

            if (config.filterFreq) {
                const filter = this.ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(config.filterFreq, now);
                // Sweeping filter effect properly bounded
                filter.frequency.exponentialRampToValueAtTime(200, now + dur);
                osc.connect(filter);
                filter.connect(gain);
            } else {
                osc.connect(gain);
            }

            gain.connect(this.ctx.destination);
            
            // ADSR Envelope
            gain.gain.setValueAtTime(0, now);
            const peakVol = isSwap ? this.volume : this.volume * 0.6; // swaps slightly louder
            
            gain.gain.linearRampToValueAtTime(peakVol, now + safeAttack);
            gain.gain.exponentialRampToValueAtTime(0.001, now + safeAttack + safeReleaseDur);

            osc.start(now);
            osc.stop(now + dur);
        } catch (e) { 
            console.error("Audio engine error:", e);
        }
    }

    playCompare(val) {
        // Map 10-100 to 200Hz-800Hz
        const freq = 200 + (val / 100) * 600;
        this.playTone(freq, false);
    }

    playSwap(val) {
        // Higher pitch offset for swaps
        const freq = 250 + (val / 100) * 600;
        this.playTone(freq, true);
    }

    playSorted() {
        if (!this.enabled || !this.ctx || this.ctx.state !== 'running' || this.volume <= 0) return;
        // Satisfying completion arpeggio (A Major chord)
        const notes = [440, 554.37, 659.25, 880]; 
        notes.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, true);
            }, i * 80);
        });
    }
}
