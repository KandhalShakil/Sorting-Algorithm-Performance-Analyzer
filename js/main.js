import { Visualizer } from './core/Visualizer.js';
import { DataGenerator } from './core/DataGenerator.js';
import { Sorter } from './core/Sorter.js';
import { AudioSystem } from './core/AudioContext.js';
import { UIManager } from './ui/UIManager.js';
import { Analytics } from './core/Analytics.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core Modules
    const visualizer = new Visualizer('visualizer-canvas');
    const dataGenerator = new DataGenerator();
    const audioSystem = new AudioSystem();
    const analytics = new Analytics();
    
    // UI Manager connects DOM with logic
    const ui = new UIManager(visualizer, dataGenerator, audioSystem, analytics);
    
    // Setup initial state
    ui.init();
});
