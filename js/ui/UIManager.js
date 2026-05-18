import { CodeDB } from '../core/CodeDB.js';
import { Sorter } from '../core/Sorter.js';
import { SortingAlgorithms } from '../algorithms/SortingAlgorithms.js';
import { Visualizer } from '../core/Visualizer.js';
import { Analytics } from '../core/Analytics.js';

export class UIManager {
    constructor(visualizer, dataGenerator, audioSystem, analytics) {
        this.visualizer = visualizer;
        this.dataGenerator = dataGenerator;
        this.audioSystem = audioSystem;
        this.analytics = analytics;
        
        this.sorter = new Sorter(visualizer, audioSystem, analytics, () => this.onSortComplete());
        
        this.bindElements();
        this.bindEvents();
    }

    bindElements() {
        this.algoSelect = document.getElementById('algo-select');
        this.datasetSelect = document.getElementById('dataset-select');
        this.sizeSlider = document.getElementById('size-slider');
        this.speedSlider = document.getElementById('speed-slider');
        this.visualModeSelect = document.getElementById('visual-mode-select');
        this.audioPresetSelect = document.getElementById('audio-preset-select');
        this.volumeSlider = document.getElementById('volume-slider');
        
        this.generateBtn = document.getElementById('generate-btn');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.stepBtn = document.getElementById('step-btn');
        
        this.soundToggle = document.getElementById('sound-toggle');
        this.themeToggle = document.getElementById('theme-toggle');
        
        this.langSelect = document.getElementById('lang-select');
        this.codeDisplay = document.getElementById('code-display');
        
        this.benchmarkBtn = document.getElementById('benchmark-mode-btn');
        this.benchmarkOverlay = document.getElementById('benchmark-overlay');
        this.closeBenchmark = document.getElementById('close-benchmark');
        this.runBenchmarkBtn = document.getElementById('run-benchmark-btn');
        this.benchmarkTbody = document.getElementById('benchmark-tbody');

        this.compareModeBtn = document.getElementById('compare-mode-btn');
        this.compareOverlay = document.getElementById('compare-overlay');
        this.closeCompareBtn = document.getElementById('close-compare');
        this.startCompareBtn = document.getElementById('start-compare-btn');
        this.compareAlgo1 = document.getElementById('compare-algo-1');
        this.compareAlgo2 = document.getElementById('compare-algo-2');
        this.compareWinner1 = document.getElementById('compare-winner-1');
        this.compareWinner2 = document.getElementById('compare-winner-2');
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateData());
        this.startBtn.addEventListener('click', () => this.toggleSort());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.stepBtn.addEventListener('click', () => this.sorter.step());
        
        this.algoSelect.addEventListener('change', () => this.updateInfoPanel());
        this.langSelect.addEventListener('change', () => this.updateInfoPanel());
        
        this.sizeSlider.addEventListener('input', (e) => {
            document.getElementById('size-val').textContent = e.target.value;
            this.generateData();
        });
        
        this.speedSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            let label = "Fast";
            if (val < 33) label = "Slow";
            else if (val < 66) label = "Normal";
            document.getElementById('speed-val').textContent = label;
            this.sorter.setSpeed(parseInt(val));
        });
        
        this.visualModeSelect.addEventListener('change', (e) => {
            this.visualizer.setMode(e.target.value);
        });

        this.audioPresetSelect.addEventListener('change', (e) => {
            this.audioSystem.setPreset(e.target.value);
        });

        this.volumeSlider.addEventListener('input', (e) => {
            const vol = parseInt(e.target.value);
            document.getElementById('vol-val').textContent = vol + '%';
            this.audioSystem.setVolume(vol / 100);
        });

        this.soundToggle.addEventListener('click', () => {
            const enabled = this.audioSystem.toggle();
            this.soundToggle.textContent = enabled ? '🔊' : '🔇';
        });

        this.themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('light');
            const isLight = document.documentElement.classList.contains('light');
            this.themeToggle.textContent = isLight ? '☀️' : '🌙';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        // Tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
                
                e.target.classList.add('active');
                document.getElementById(e.target.dataset.target).classList.remove('hidden');
            });
        });
        
        // Benchmark Modal
        this.benchmarkBtn.addEventListener('click', () => this.benchmarkOverlay.classList.remove('hidden'));
        this.closeBenchmark.addEventListener('click', () => this.benchmarkOverlay.classList.add('hidden'));
        this.runBenchmarkBtn.addEventListener('click', () => this.runBenchmark());
        
        // Compare Modal
        this.compareModeBtn.addEventListener('click', () => this.openCompareMode());
        this.closeCompareBtn.addEventListener('click', () => this.closeCompareMode());
        this.startCompareBtn.addEventListener('click', () => this.startRace());
        
        // Export
        document.getElementById('export-btn').addEventListener('click', () => this.exportResults());
    }

    init() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light');
            this.themeToggle.textContent = '☀️';
        }
        
        this.soundToggle.textContent = this.audioSystem.enabled ? '🔊' : '🔇';
        
        this.analytics.initCharts();
        this.sorter.setSpeed(parseInt(this.speedSlider.value));
        this.updateInfoPanel();
        this.generateData();
    }

    generateData() {
        if (this.sorter.isRunning) {
            this.sorter.stop();
            this.startBtn.textContent = 'Start Sort';
        }
        const size = parseInt(this.sizeSlider.value);
        const type = this.datasetSelect.value;
        const array = this.dataGenerator.generate(size, type);
        this.visualizer.setArray(array);
        this.analytics.reset();
        document.getElementById('live-step-explanation').innerHTML = "Ready to sort.";
    }

    toggleSort() {
        if (this.audioSystem.enabled) {
            this.audioSystem.initCtx();
        }
        if (this.sorter.isRunning) {
            this.sorter.stop();
            this.startBtn.textContent = 'Start Sort';
            this.generateData();
        } else {
            this.startBtn.textContent = 'Reset';
            this.sorter.start(this.algoSelect.value, this.dataGenerator.getArray());
        }
    }

    togglePause() {
        if (!this.sorter.isRunning) return;
        
        if (this.sorter.isPaused) {
            this.sorter.resume();
            this.pauseBtn.textContent = '⏸️';
        } else {
            this.sorter.pause();
            this.pauseBtn.textContent = '▶️';
        }
    }

    onSortComplete() {
        this.startBtn.textContent = 'Start Sort';
        this.audioSystem.playSorted();
        this.analytics.recordRun(
            this.algoSelect.options[this.algoSelect.selectedIndex].text,
            parseInt(this.sizeSlider.value),
            this.analytics.getTime(),
            this.analytics.comparisons
        );
    }

    updateInfoPanel() {
        const algo = this.algoSelect.value;
        const lang = this.langSelect.value;
        const info = CodeDB[algo];
        
        if (info) {
            this.codeDisplay.textContent = info[lang];
            document.getElementById('algo-desc').textContent = info.desc;
            document.getElementById('time-best').textContent = info.timeBest;
            document.getElementById('time-avg').textContent = info.timeAvg;
            document.getElementById('time-worst').textContent = info.timeWorst;
            document.getElementById('space-comp').textContent = info.space;
        }
    }
    
    async runBenchmark() {
        this.runBenchmarkBtn.disabled = true;
        this.runBenchmarkBtn.textContent = 'Running...';
        this.benchmarkTbody.innerHTML = '';
        
        const algorithms = ['bubble', 'selection', 'insertion', 'merge', 'quick'];
        const sizes = [100, 1000, 5000];
        
        for (const algo of algorithms) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${CodeDB[algo].name}</td>`;
            this.benchmarkTbody.appendChild(tr);
            
            for (const size of sizes) {
                const td = document.createElement('td');
                td.textContent = 'Testing...';
                tr.appendChild(td);
                
                // Allow UI to render
                await new Promise(r => setTimeout(r, 10));
                
                const arr = this.dataGenerator.generate(size, 'random');
                const start = performance.now();
                // We use a silent background generator
                const generator = SortingAlgorithms[algo]([...arr]);
                let done = false;
                while(!done) {
                    done = generator.next().done;
                }
                const end = performance.now();
                
                td.textContent = (end - start).toFixed(2) + ' ms';
            }
            
            const statusTd = document.createElement('td');
            statusTd.innerHTML = '<span class="success">Complete</span>';
            tr.appendChild(statusTd);
        }
        
        this.runBenchmarkBtn.disabled = false;
        this.runBenchmarkBtn.textContent = 'Run Full Benchmark';
    }
    
    exportResults() {
        const data = {
            algorithm: this.algoSelect.options[this.algoSelect.selectedIndex].text,
            size: this.sizeSlider.value,
            comparisons: this.analytics.comparisons,
            swaps: this.analytics.swaps,
            timeMs: this.analytics.getTime().toFixed(2)
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `algo_report_${data.algorithm.replace(' ', '_')}.json`;
        a.click();
    }

    openCompareMode() {
        this.compareOverlay.classList.remove('hidden');
        if (!this.vis1) {
            // First time opening, initialize everything
            this.vis1 = new Visualizer('compare-canvas-1');
            this.vis2 = new Visualizer('compare-canvas-2');
            
            // Dummy analytics because we don't have DOM elements for them in the modal yet
            const dummyAnalytics1 = new Analytics();
            const dummyAnalytics2 = new Analytics();
            dummyAnalytics1.updateDOM = () => {};
            dummyAnalytics2.updateDOM = () => {};
            
            let finished1 = false;
            let finished2 = false;
            
            const checkWinner = (sorterNum) => {
                if (sorterNum === 1) finished1 = true;
                if (sorterNum === 2) finished2 = true;
                
                if (finished1 && !finished2) {
                    this.compareWinner1.textContent = "🏆 WINNER!";
                    this.compareWinner1.style.color = "var(--success)";
                } else if (finished2 && !finished1) {
                    this.compareWinner2.textContent = "🏆 WINNER!";
                    this.compareWinner2.style.color = "var(--success)";
                }
            };
            
            this.compareSorter1 = new Sorter(this.vis1, this.audioSystem, dummyAnalytics1, () => checkWinner(1));
            this.compareSorter2 = new Sorter(this.vis2, this.audioSystem, dummyAnalytics2, () => checkWinner(2));
        }
        
        // Setup initial array display
        const arr = this.dataGenerator.generate(200, 'random');
        this.vis1.setArray(arr);
        this.vis2.setArray(arr);
        this.compareWinner1.textContent = "";
        this.compareWinner2.textContent = "";
    }

    closeCompareMode() {
        this.compareOverlay.classList.add('hidden');
        if (this.compareSorter1 && this.compareSorter1.isRunning) this.compareSorter1.stop();
        if (this.compareSorter2 && this.compareSorter2.isRunning) this.compareSorter2.stop();
    }

    startRace() {
        this.audioSystem.initCtx();
        const arr = this.dataGenerator.generate(200, 'random');
        this.compareWinner1.textContent = "";
        this.compareWinner2.textContent = "";
        
        // Need to stop before restarting
        if (this.compareSorter1.isRunning) this.compareSorter1.stop();
        if (this.compareSorter2.isRunning) this.compareSorter2.stop();
        
        this.compareSorter1.setSpeed(100);
        this.compareSorter2.setSpeed(100);
        
        // Slightly stagger the start to ensure both can instantiate without blocking
        setTimeout(() => {
            this.compareSorter1.start(this.compareAlgo1.value, [...arr]);
            this.compareSorter2.start(this.compareAlgo2.value, [...arr]);
        }, 50);
    }
}
