export class Analytics {
    constructor() {
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.endTime = 0;
        
        this.timeChart = null;
        this.compChart = null;
    }

    reset() {
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = performance.now();
        this.endTime = null;
        this.updateDOM();
    }

    addComparison() {
        this.comparisons++;
        this.updateDOM();
    }

    addSwap() {
        this.swaps++;
        this.updateDOM();
    }

    finish() {
        this.endTime = performance.now();
        this.updateDOM();
    }

    getTime() {
        if (!this.startTime) return 0;
        if (this.endTime) return this.endTime - this.startTime;
        return performance.now() - this.startTime;
    }

    updateDOM() {
        document.getElementById('metric-comparisons').textContent = this.comparisons;
        document.getElementById('metric-swaps').textContent = this.swaps;
        
        const timeMs = this.getTime();
        let timeDisplay = '';
        if (timeMs < 1000) {
            timeDisplay = `${Math.round(timeMs)} ms`;
        } else {
            const timeSec = (timeMs / 1000).toFixed(3);
            timeDisplay = `${timeSec} sec (${Math.round(timeMs)} ms)`;
        }
        document.getElementById('metric-time').textContent = timeDisplay;
    }

    initCharts() {
        const timeCtx = document.getElementById('time-chart');
        const compCtx = document.getElementById('complexity-chart');
        
        if (!timeCtx || !compCtx) return;

        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = 'Inter';

        this.timeChart = new Chart(timeCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Execution Time (ms)',
                    data: [],
                    backgroundColor: '#3B82F6',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, title: { display: true, text: 'Recent Runtimes' } }
            }
        });

        this.compChart = new Chart(compCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Comparisons',
                    data: [],
                    borderColor: '#7C3AED',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(124, 58, 237, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, title: { display: true, text: 'Comparisons vs Size' } }
            }
        });
    }

    recordRun(algoName, size, time, comps) {
        if (!this.timeChart) return;
        
        const label = `${algoName} (N=${size})`;
        
        this.timeChart.data.labels.push(label);
        this.timeChart.data.datasets[0].data.push(time);
        
        if (this.timeChart.data.labels.length > 10) {
            this.timeChart.data.labels.shift();
            this.timeChart.data.datasets[0].data.shift();
        }
        this.timeChart.update();

        this.compChart.data.labels.push(size);
        this.compChart.data.datasets[0].data.push(comps);
        if (this.compChart.data.labels.length > 10) {
            this.compChart.data.labels.shift();
            this.compChart.data.datasets[0].data.shift();
        }
        this.compChart.update();
    }
}
