export class Visualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.array = [];
        this.colors = []; // Maps to array indices
        this.mode = 'bars'; // bars, dots, spiral
        
        // Setup Resize Observer
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.canvas.parentElement);
        this.resize();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
        this.draw();
    }

    setArray(array) {
        this.array = [...array];
        this.colors = new Array(array.length).fill('default');
        this.draw();
    }

    setMode(mode) {
        this.mode = mode;
        this.draw();
    }

    update(array, activeIndices = [], swapIndices = [], sortedIndices = []) {
        this.array = [...array];
        
        // Reset colors
        for (let i = 0; i < this.array.length; i++) {
            if (sortedIndices.includes(i)) {
                this.colors[i] = 'sorted';
            } else if (swapIndices.includes(i)) {
                this.colors[i] = 'swap';
            } else if (activeIndices.includes(i)) {
                this.colors[i] = 'compare';
            } else {
                this.colors[i] = 'default';
            }
        }
        
        this.draw();
    }

    getColorHex(state) {
        const rootStyles = getComputedStyle(document.documentElement);
        switch(state) {
            case 'compare': return rootStyles.getPropertyValue('--bar-compare').trim() || '#EF4444';
            case 'swap': return rootStyles.getPropertyValue('--bar-swap').trim() || '#F59E0B';
            case 'sorted': return rootStyles.getPropertyValue('--bar-sorted').trim() || '#10B981';
            case 'default':
            default: return rootStyles.getPropertyValue('--bar-default').trim() || '#3B82F6';
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        if (!this.array || this.array.length === 0) return;

        if (this.mode === 'bars') {
            this.drawBars();
        } else if (this.mode === 'dots') {
            this.drawDots();
        } else if (this.mode === 'spiral') {
            this.drawSpiral();
        }
    }

    drawBars() {
        const n = this.array.length;
        const barWidth = this.width / n;
        // Find max to scale appropriately, assuming max is ~100
        const maxVal = Math.max(...this.array, 100);

        for (let i = 0; i < n; i++) {
            const h = (this.array[i] / maxVal) * this.height;
            const x = i * barWidth;
            const y = this.height - h;

            this.ctx.fillStyle = this.getColorHex(this.colors[i]);
            // Draw with small gap if possible
            const gap = barWidth > 3 ? 1 : 0;
            
            // Rounded corners on top
            this.ctx.beginPath();
            if (barWidth > 4) {
                this.ctx.roundRect(x, y, barWidth - gap, h, [4, 4, 0, 0]);
                this.ctx.fill();
            } else {
                this.ctx.fillRect(x, y, barWidth - gap, h);
            }
        }
    }

    drawDots() {
        const n = this.array.length;
        const barWidth = this.width / n;
        const maxVal = Math.max(...this.array, 100);

        for (let i = 0; i < n; i++) {
            const h = (this.array[i] / maxVal) * this.height;
            const x = i * barWidth + barWidth/2;
            const y = this.height - h;

            this.ctx.fillStyle = this.getColorHex(this.colors[i]);
            this.ctx.beginPath();
            this.ctx.arc(x, y, Math.max(1, barWidth/2 - 1), 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawSpiral() {
        const n = this.array.length;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const maxRadius = Math.min(centerX, centerY) - 10;
        const maxVal = Math.max(...this.array, 100);
        
        for (let i = 0; i < n; i++) {
            const val = this.array[i] / maxVal;
            const angle = (i / n) * Math.PI * 2 * 5; // 5 spirals
            const radius = (i / n) * maxRadius;
            
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.ctx.fillStyle = this.getColorHex(this.colors[i]);
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2 + val * 4, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}
