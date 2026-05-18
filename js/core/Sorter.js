import { SortingAlgorithms } from '../algorithms/SortingAlgorithms.js';

export class Sorter {
    constructor(visualizer, audioSystem, analytics, onComplete) {
        this.visualizer = visualizer;
        this.audioSystem = audioSystem;
        this.analytics = analytics;
        this.onComplete = onComplete;
        
        this.generator = null;
        this.isRunning = false;
        this.isPaused = false;
        this.speed = 50; // 1 to 100
        this.delay = 0;
        
        this.sortedIndices = [];
    }

    setSpeed(val) {
        this.speed = val;
        // Map 1-100 to delay (100 is 0ms, 1 is 500ms)
        this.delay = Math.floor(500 * Math.pow(1 - (val / 100), 2));
        if (this.audioSystem && this.audioSystem.setSpeedDuration) {
            this.audioSystem.setSpeedDuration(Math.max(0.01, this.delay / 1000));
        }
    }

    start(algoName, array) {
        if (!SortingAlgorithms[algoName]) {
            console.error('Algorithm not found');
            return;
        }
        
        this.array = [...array];
        this.sortedIndices = [];
        this.generator = SortingAlgorithms[algoName](this.array);
        this.isRunning = true;
        this.isPaused = false;
        
        this.analytics.reset();
        this.tick();
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        if (this.isRunning && this.isPaused) {
            this.isPaused = false;
            this.tick();
        }
    }

    step() {
        if (!this.isRunning) return;
        this.processNext();
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
    }

    tick() {
        if (!this.isRunning || this.isPaused) return;

        // For maximum speed, process multiple steps per frame
        if (this.speed === 100) {
            for(let i=0; i<10; i++) {
                if (!this.processNext()) break;
            }
            if (this.isRunning && !this.isPaused) {
                requestAnimationFrame(() => this.tick());
            }
        } else {
            this.processNext();
            if (this.isRunning && !this.isPaused) {
                if (this.delay === 0) {
                    requestAnimationFrame(() => this.tick());
                } else {
                    setTimeout(() => requestAnimationFrame(() => this.tick()), this.delay);
                }
            }
        }
    }

    processNext() {
        if (!this.generator) return false;
        
        const result = this.generator.next();
        
        if (result.done) {
            this.isRunning = false;
            this.analytics.finish();
            this.visualizer.update(this.array, [], [], this.sortedIndices);
            if (this.onComplete) this.onComplete();
            return false;
        }

        const action = result.value;
        let active = [];
        let swap = [];

        if (action.type === 'compare') {
            active = action.indices;
            this.analytics.addComparison();
            if (action.indices.length > 0) {
                this.audioSystem.playCompare(this.array[action.indices[0]]);
            }
            document.getElementById('live-step-explanation').innerHTML = `Comparing elements at index ${action.indices.join(' and ')}`;
        } else if (action.type === 'swap') {
            swap = action.indices;
            this.analytics.addSwap();
            if (action.indices.length > 0) {
                this.audioSystem.playSwap(this.array[action.indices[0]]);
            }
            document.getElementById('live-step-explanation').innerHTML = `<span style="color:var(--bar-swap)">Swapping elements at index ${action.indices.join(' and ')}</span>`;
        } else if (action.type === 'sorted') {
            action.indices.forEach(idx => {
                if (!this.sortedIndices.includes(idx)) {
                    this.sortedIndices.push(idx);
                }
            });
            document.getElementById('live-step-explanation').innerHTML = `<span style="color:var(--success)">Element at index ${action.indices[0]} is now in sorted position.</span>`;
        }

        this.visualizer.update(this.array, active, swap, this.sortedIndices);
        return true;
    }
}
