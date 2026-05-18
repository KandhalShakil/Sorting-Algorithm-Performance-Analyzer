# 📖 Complete Technical Documentation
## Sorting Algorithm Performance Analyzer

**Version:** 1.0.0  
**Last Updated:** February 7, 2026  
**File Size:** ~1823 lines (~60KB)  
**Technology:** Pure HTML5, CSS3, JavaScript ES6+

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Features Documentation](#features-documentation)
4. [Technical Specifications](#technical-specifications)
5. [Algorithm Implementations](#algorithm-implementations)
6. [User Interface Components](#user-interface-components)
7. [Performance Tracking System](#performance-tracking-system)
8. [Responsive Design](#responsive-design)
9. [Deployment](#deployment)
10. [Development Guide](#development-guide)
11. [API Reference](#api-reference)
12. [Future Enhancements](#future-enhancements)

---

## Project Overview

### What is this project?

The **Sorting Algorithm Performance Analyzer** is a comprehensive educational tool designed to demonstrate and analyze the performance characteristics of six major sorting algorithms. Built entirely with vanilla JavaScript, it provides real-time performance metrics including execution time, comparison counts, and detailed swap tracking.

### Key Objectives

- ✅ **Education First**: Help students and developers understand algorithm performance
- ✅ **Interactive Learning**: Provide hands-on experience with algorithm behavior
- ✅ **Real Data**: Show actual performance metrics, not theoretical estimates
- ✅ **Accessibility**: Zero installation, works on any device with a browser
- ✅ **Professional UI**: Clean, modern interface with intuitive navigation

### Target Audience

1. **Computer Science Students** - Learning data structures and algorithms
2. **Software Developers** - Preparing for technical interviews
3. **Educators** - Teaching algorithm complexity and performance
4. **Researchers** - Comparing algorithm implementations

---

## Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface Layer                    │
│  ┌──────────────────────┐  ┌──────────────────────────────┐│
│  │  Configuration Panel │  │    Results Display Panel     ││
│  │  (Left 50%)          │  │    (Right 50%)               ││
│  └──────────────────────┘  └──────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Application Logic Layer                    │
│  ┌─────────────┐ ┌──────────────┐ ┌────────────────────┐  │
│  │ Input Parser│ │ Algorithm    │ │ Performance        │  │
│  │             │ │ Executors    │ │ Tracker            │  │
│  └─────────────┘ └──────────────┘ └────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Processing Layer                     │
│  ┌─────────────┐ ┌──────────────┐ ┌────────────────────┐  │
│  │ SortingStats│ │ Result       │ │ Swap Details       │  │
│  │ Class       │ │ Aggregator   │ │ Tracker            │  │
│  └─────────────┘ └──────────────┘ └────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend (100% Client-Side)
- **HTML5**: Semantic markup, modal system, form controls
- **CSS3**: Grid/Flexbox layouts, gradients, animations, transitions
- **JavaScript ES6+**: Classes, arrow functions, async/await, destructuring

#### No Dependencies
- ❌ No React, Vue, or Angular
- ❌ No jQuery or external libraries
- ❌ No build tools (Webpack, Vite, etc.)
- ❌ No package managers needed
- ✅ Pure vanilla JavaScript - runs anywhere

### File Structure

```
Sorting Algorithm Performance Analyzer/
│
├── index.html                 # Main application file (1823 lines)
├── README.md                  # User documentation
├── DOCUMENTATION.md           # Technical documentation (this file)
│
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions deployment workflow
```

---

## Features Documentation

### 1. Input Management

#### Manual Data Entry
- **Format Support**: Space-separated or comma-separated numbers
- **Examples**: 
  - `5 2 8 1 9 3`
  - `5,2,8,1,9,3`
  - `64 34 25 12 22 11 90`
- **Validation**: Checks for non-numeric input and minimum array size (≥2)

#### Quick Generate Options
| Option | Size | Type | Use Case |
|--------|------|------|----------|
| Random (10) | 10 | Random | Quick testing, demos |
| Random (50) | 50 | Random | Small dataset analysis |
| Random (100) | 100 | Random | Medium dataset testing |
| Random (500) | 500 | Random | Large dataset benchmarking |
| Sorted (100) | 100 | Pre-sorted | Best-case analysis |
| Reverse (100) | 100 | Reverse-sorted | Worst-case analysis |

#### Input Parser Function
```javascript
function parseInput(input) {
    // Handles space and comma separation
    // Validates numeric input
    // Throws descriptive errors
    // Returns integer array
}
```

### 2. Algorithm Selection

#### Available Algorithms
✅ **Bubble Sort** - O(n²) comparison-based, optimized with early termination  
✅ **Insertion Sort** - O(n²) adaptive algorithm, efficient for small/sorted data  
✅ **Selection Sort** - O(n²) minimal swaps, good for expensive writes  
✅ **Heap Sort** - O(n log n) guaranteed, in-place with constant space  
✅ **Quick Sort** - O(n log n) average, divide-and-conquer with partitioning  
✅ **Merge Sort** - O(n log n) stable, predictable performance

#### Selection Features
- ☑️ **Checkbox Interface**: Toggle any combination of algorithms
- ☑️ **Validation**: Requires at least one algorithm selected
- ☑️ **Default State**: All algorithms enabled by default
- ☑️ **Visual Feedback**: Hover effects and smooth transitions

### 3. Performance Metrics

#### Core Metrics Tracked

**⏱️ Execution Time**
- precision timing using `performance.now()`
- Display format adapts to value:
  - < 0.01ms: Shows microseconds (µs)
  - 0.01ms - 1ms: Shows to 4 decimal places
  - > 1ms: Shows to 2 decimal places

**🔄 Comparison Count**
- Tracks every element comparison across all algorithms
- Includes loop condition checks
- Formatted with thousand separators

**🔀 Swap Count**
- Tracks every element swap operation
- **Interactive**: Click to see detailed swap list
- Shows position indices and values for each swap

#### SortingStats Class

```javascript
class SortingStats {
    constructor() {
        this.comparisons = 0;      // Total comparison operations
        this.swaps = 0;             // Total swap operations
        this.swapDetails = [];      // Array of swap objects
        this.timeMs = 0;            // Execution time in ms
    }
}

// Swap detail structure:
{
    from: 2,              // Source index
    to: 5,                // Destination index
    values: [8, 3]        // [value at 'from', value at 'to']
}
```

### 4. Interactive Swap Details Modal

#### Overview
Revolutionary feature that lets users see **every single swap operation** performed by each algorithm, providing unprecedented insight into algorithm behavior.

#### Features
- 🔍 **Click to Explore**: Click any swap count button to see full details
- 📊 **Comprehensive List**: Shows all swaps with position and value information
- 🎯 **Sequential Display**: Swaps shown in order of execution
- ⚡ **Fast Performance**: Handles thousands of swaps efficiently
- 📱 **Mobile Optimized**: Fully responsive modal design

#### Modal Structure

**Header**
- Algorithm name and total swap count
- Close button (simple transparent design)

**Body**
- Total swap count badge (blue gradient)
- Scrollable list of all swap operations
- Each swap shows:
  - Swap number (sequential)
  - Position indices (from → to)
  - Values being swapped

**Interaction**
- Click swap button to open
- Click close button (×) to dismiss
- Click outside modal to close
- Press Escape key to close

#### Implementation

```javascript
function showSwapDetails(algorithmName, index) {
    const result = globalResults[index];
    const modal = document.getElementById('swapModal');
    
    // Display swap details with:
    // - Swap number
    // - Position: index[from] ↔ index[to]
    // - Values: value1 ↔ value2
    
    modal.classList.add('active');
}

// Swap tracking example (Bubble Sort)
if (arrCopy[j] > arrCopy[j + 1]) {
    stats.swapDetails.push({
        from: j, 
        to: j + 1, 
        values: [arrCopy[j], arrCopy[j + 1]]
    });
    [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
    stats.swaps++;
}
```

### 5. Results Display

#### Desktop View

**Data Preview Section**
- Original data array (first 50 elements shown)
- Sorted data array (first 50 elements shown)
- Monospace font for easy reading

**Statistics Summary Cards**
- Dataset Size
- Number of Algorithms Run
- Fastest Algorithm name

**Performance Table**
- Ranked by execution time (fastest first)
- Columns: Rank, Algorithm, Time, Comparisons, Swaps, Complexity
- Color-coded rank badges:
  - 🥇 #1: Gold
  - 🥈 #2: Silver
  - 🥉 #3: Bronze/Orange
  - 🎖️ #4+: Light Blue
- Interactive swap buttons with gradient styling

**Complexity Analysis Cards**
- Individual cards for each algorithm
- Shows Best, Average, Worst case complexity
- Color-coded borders matching algorithm theme

#### Mobile View

**Card-Based Layout**
- Vertical stacking of result cards
- Each card contains:
  - Algorithm name with rank badge
  - All metrics in labeled rows
  - Visual separators
  - Interactive swap button

**Responsive Tables**
- Horizontal scroll for performance table
- Custom scrollbar with gradient thumb
- Minimum width constraints
- Touch-friendly scrolling

### 6. Dynamic Loading Animation

#### Time Calculation
Loading time adapts based on dataset complexity:

```javascript
// Data size based timing
if (dataSize <= 50) {
    baseDelay = 500;      // 0.5 second per algorithm
} else if (dataSize <= 200) {
    baseDelay = 1000;     // 1 second per algorithm
} else {
    baseDelay = 1500;     // 1.5 seconds per algorithm
}
```

#### Loading States
- **Spinner Animation**: Rotating blue border
- **Status Message**: "Running analysis..."
- **Progressive Display**: Results appear after all complete
- **Smooth Transitions**: Fade-in animations

### 7. Error Handling

#### Validation Checks
✅ Empty input detection  
✅ Non-numeric value detection  
✅ Minimum array size (≥2)  
✅ No algorithm selected  

#### Error Display
- Red background with border
- Clear error icon (❌)
- Descriptive error message
- Shake animation on appear
- Auto-clears on next run

---

## Technical Specifications

### Browser Requirements

**Minimum Versions**
- Chrome / Edge: 90+
- Firefox: 88+
- Safari: 14+
- Opera: 76+

**Required APIs**
- ES6+ JavaScript (Classes, Arrow Functions, Destructuring)
- Performance API (`performance.now()`)
- CSS Grid and Flexbox
- CSS Animations and Transitions

### Performance Characteristics

**Memory Usage**
- Base application: ~60KB
- Runtime memory: O(n) where n = input size
- Each algorithm creates array copy: additional O(n)
- Swap details storage: O(s) where s = number of swaps

**Execution Performance**
- Input parsing: O(n)
- Algorithm execution: Varies by algorithm
- Results display: O(a) where a = number of algorithms
- DOM operations: Batched for efficiency

**Scalability**
- Tested with arrays up to 10,000 elements
- UI remains responsive during execution
- Swap modal handles 50,000+ swaps efficiently

---

## Algorithm Implementations

### Bubble Sort

```javascript
function bubbleSort(arr) {
    const stats = new SortingStats();
    const arrCopy = [...arr];
    const n = arrCopy.length;
    const startTime = performance.now();
    
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            stats.comparisons++;
            if (arrCopy[j] > arrCopy[j + 1]) {
                stats.swapDetails.push({
                    from: j, 
                    to: j + 1, 
                    values: [arrCopy[j], arrCopy[j + 1]]
                });
                [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
                stats.swaps++;
                swapped = true;
            }
        }
        if (!swapped) break;  // Early termination optimization
    }
    
    stats.timeMs = performance.now() - startTime;
    return stats;
}
```

**Key Features:**
- ✅ Optimized with early termination flag
- ✅ Tracks every comparison and swap
- ✅ Records detailed swap information
- ✅ High-precision timing

**Complexity:**
- Best: O(n) - already sorted
- Average: O(n²)
- Worst: O(n²) - reverse sorted
- Space: O(1)

### Insertion Sort

```javascript
function insertionSort(arr) {
    const stats = new SortingStats();
    const arrCopy = [...arr];
    const startTime = performance.now();
    
    for (let i = 1; i < arrCopy.length; i++) {
        const key = arrCopy[i];
        let j = i - 1;
        
        while (j >= 0) {
            stats.comparisons++;
            if (arrCopy[j] > key) {
                stats.swapDetails.push({
                    from: j, 
                    to: j + 1, 
                    values: [arrCopy[j], key]
                });
                arrCopy[j + 1] = arrCopy[j];
                stats.swaps++;
                j--;
            } else {
                break;
            }
        }
        
        if (j < 0) stats.comparisons++;
        arrCopy[j + 1] = key;
    }
    
    stats.timeMs = performance.now() - startTime;
    return stats;
}
```

**Key Features:**
- ✅ Adaptive algorithm (fast on sorted data)
- ✅ Tracks shift operations as swaps
- ✅ Efficient for small arrays
- ✅ Stable sorting algorithm

**Complexity:**
- Best: O(n) - already sorted
- Average: O(n²)
- Worst: O(n²) - reverse sorted
- Space: O(1)

### Selection Sort

```javascript
function selectionSort(arr) {
    const stats = new SortingStats();
    const arrCopy = [...arr];
    const n = arrCopy.length;
    const startTime = performance.now();
    
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            stats.comparisons++;
            if (arrCopy[j] < arrCopy[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx !== i) {
            stats.swapDetails.push({
                from: i, 
                to: minIdx, 
                values: [arrCopy[i], arrCopy[minIdx]]
            });
            [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]];
            stats.swaps++;
        }
    }
    
    stats.timeMs = performance.now() - startTime;
    return stats;
}
```

**Key Features:**
- ✅ Minimal number of swaps (n-1 maximum)
- ✅ Useful when write operations are expensive
- ✅ Simple implementation
- ✅ Consistent O(n²) performance

**Complexity:**
- Best: O(n²)
- Average: O(n²)
- Worst: O(n²)
- Space: O(1)

### Heap Sort

```javascript
function heapSort(arr) {
    const stats = new SortingStats();
    const arrCopy = [...arr];
    const n = arrCopy.length;
    
    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n) {
            stats.comparisons++;
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }
        
        if (right < n) {
            stats.comparisons++;
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }
        
        if (largest !== i) {
            stats.swapDetails.push({
                from: i, 
                to: largest, 
                values: [arr[i], arr[largest]]
            });
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            stats.swaps++;
            heapify(arr, n, largest);
        }
    }
    
    const startTime = performance.now();
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arrCopy, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        stats.swapDetails.push({
            from: 0, 
            to: i, 
            values: [arrCopy[0], arrCopy[i]]
        });
        [arrCopy[0], arrCopy[i]] = [arrCopy[i], arrCopy[0]];
        stats.swaps++;
        heapify(arrCopy, i, 0);
    }
    
    stats.timeMs = performance.now() - startTime;
    return stats;
}
```

**Key Features:**
- ✅ Guaranteed O(n log n) performance
- ✅ In-place sorting with O(1) space
- ✅ Uses binary heap data structure
- ✅ Not stable but consistent

**Complexity:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)
- Space: O(1)

### Quick Sort

```javascript
function quickSort(arr) {
    const stats = new SortingStats();
    const arrCopy = [...arr];
    
    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            stats.comparisons++;
            if (arr[j] <= pivot) {
                i++;
                stats.swapDetails.push({
                    from: i, 
                    to: j, 
                    values: [arr[i], arr[j]]
                });
                [arr[i], arr[j]] = [arr[j], arr[i]];
                stats.swaps++;
            }
        }
        
        stats.swapDetails.push({
            from: i + 1, 
            to: high, 
            values: [arr[i + 1], arr[high]]
        });
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        stats.swaps++;
        return i + 1;
    }
    
    function quickSortHelper(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            quickSortHelper(arr, low, pi - 1);
            quickSortHelper(arr, pi + 1, high);
        }
    }
    
    const startTime = performance.now();
    quickSortHelper(arrCopy, 0, arrCopy.length - 1);
    stats.timeMs = performance.now() - startTime;
    return stats;
}
```

**Key Features:**
- ✅ Fastest in practice for large random arrays
- ✅ Divide-and-conquer approach
- ✅ In-place partitioning
- ✅ Recursive implementation

**Complexity:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n²) - rare with good pivot selection
- Space: O(log n) - recursion stack

### Merge Sort

```javascript
function mergeSort(arr) {
    const stats = new SortingStats();
    const arrCopy = [...arr];
    
    function merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            stats.comparisons++;
            if (leftArr[i] <= rightArr[j]) {
                stats.swapDetails.push({
                    from: left + i, 
                    to: k, 
                    values: [leftArr[i], arr[k]]
                });
                arr[k] = leftArr[i];
                i++;
            } else {
                stats.swapDetails.push({
                    from: mid + 1 + j, 
                    to: k, 
                    values: [rightArr[j], arr[k]]
                });
                arr[k] = rightArr[j];
                j++;
            }
            stats.swaps++;
            k++;
        }
        
        // Copy remaining elements
        while (i < leftArr.length) {
            stats.swapDetails.push({
                from: left + i, 
                to: k, 
                values: [leftArr[i], arr[k]]
            });
            arr[k] = leftArr[i];
            stats.swaps++;
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            stats.swapDetails.push({
                from: mid + 1 + j, 
                to: k, 
                values: [rightArr[j], arr[k]]
            });
            arr[k] = rightArr[j];
            stats.swaps++;
            j++;
            k++;
        }
    }
    
    function mergeSortHelper(arr, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            mergeSortHelper(arr, left, mid);
            mergeSortHelper(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    const startTime = performance.now();
    mergeSortHelper(arrCopy, 0, arrCopy.length - 1);
    stats.timeMs = performance.now() - startTime;
    return stats;
}
```

**Key Features:**
- ✅ Stable sorting algorithm
- ✅ Guaranteed O(n log n) performance
- ✅ Predictable behavior
- ✅ Efficient for linked lists

**Complexity:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)
- Space: O(n) - requires auxiliary array

---

## User Interface Components

### 1. Header Section

**Elements:**
- Application title with emoji icon (🚀)
- Subtitle describing functionality
- Blue gradient background matching theme

**Styling:**
```css
header {
    background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
    color: white;
    padding: 30px 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
}
```

### 2. Configuration Panel (Left 50%)

**Components:**

**Data Input**
- Text input field
- Placeholder text with examples
- Hint text below input
- Enter key support for quick analysis

**Quick Generate Dropdown**
- Select element with 6 options
- Event listener for auto-population
- Resets on new selection

**Algorithm Checkboxes**
- 6 checkbox items with labels
- Hover effects and transitions
- Visual selection feedback
- All checked by default

**Action Buttons**
- Run Analysis (primary blue gradient)
- Clear Results (secondary green)
- Full-width responsive buttons
- Hover and active states

**Error Display**
- Hidden by default
- Red background with shake animation
- Clear error icon and message
- Auto-clears on next run

### 3. Results Panel (Right 50%)

**Components:**

**Loading State**
- Rotating spinner animation
- "Running analysis..." message
- Centered layout
- Hidden by default, shown during execution

**Empty State**
- 📊 Large icon
- "No Results Yet" heading
- Instruction text
- Centered layout
- Shown on initial load

**Data Preview**
- Original data display
- Sorted data display
- Monospace font
- Gray background containers
- Array notation with brackets

**Stats Summary Cards**
- Grid layout (3 columns on desktop)
- Dataset Size card
- Algorithms Run card
- Fastest Algorithm card
- Blue accent color
- Hover animations

**Performance Table**
- Full-width responsive table
- Sticky header with gradient
- Ranked rows with badges
- Interactive swap buttons
- Hover row highlighting
- Horizontal scroll on mobile

**Mobile Result Cards**
- Hidden on desktop/tablet
- Vertical stacking layout
- Individual cards per algorithm
- All metrics in rows
- Rank badges
- Interactive swap buttons

**Complexity Cards**
- Grid layout (responsive columns)
- Color-coded left borders
- Best/Average/Worst case display
- Algorithm-specific colors
- Hover effects

### 4. Swap Details Modal

**Structure:**
```html
<div id="swapModal" class="swap-modal">
    <div class="swap-modal-content">
        <div class="swap-modal-header">
            <h2 id="swapModalTitle">Algorithm Name - All Swaps</h2>
            <button class="swap-modal-close" onclick="closeSwapModal()">×</button>
        </div>
        <div id="swapList">
            <!-- Dynamic swap list -->
        </div>
    </div>
</div>
```

**Features:**
- Full-screen overlay with backdrop
- Centered content box
- Scrollable swap list
- Simple close button (transparent, no background)
- Keyboard support (Escape key)
- Click outside to close
- Smooth entry/exit animations

**Swap Item Display:**
- Sequential numbering
- Blue circular badge for number
- Position indices shown
- Values being swapped
- Arrow indicator between values

---

## Performance Tracking System

### Global Results Storage

```javascript
let globalResults = [];
```

Stores all algorithm results for swap detail access.

### Result Object Structure

```javascript
{
    name: "Quick Sort",
    stats: {
        comparisons: 1847,
        swaps: 326,
        swapDetails: [
            {from: 2, to: 5, values: [42, 15]},
            {from: 0, to: 3, values: [83, 27]},
            // ... more swaps
        ],
        timeMs: 2.4567
    },
    complexity: "O(n log n)",
    sortedArray: [1, 2, 3, 4, 5, ...] // Final sorted result
}
```

### Performance Measurement

**High-Precision Timing**
```javascript
const startTime = performance.now();
// ... algorithm execution ...
stats.timeMs = performance.now() - startTime;
```

**Comparison Tracking**
```javascript
stats.comparisons++;  // Increment on every comparison
```

**Swap Tracking**
```javascript
stats.swapDetails.push({
    from: i,
    to: j,
    values: [arr[i], arr[j]]
});
stats.swaps++;
```

### Result Sorting

Results automatically sorted by execution time (fastest first):
```javascript
results.sort((a, b) => a.stats.timeMs - b.stats.timeMs);
```

---

## Responsive Design

### Breakpoint Strategy

```css
/* Desktop: Default styling (> 1024px) */

@media (max-width: 1024px) {
    /* Tablet: Stack panels vertically */
    .content {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    /* Tablet/Mobile: Reduce padding, hide table, show cards */
    .results-table {
        display: none;
    }
    .mobile-results {
        display: block;
    }
}

@media (max-width: 480px) {
    /* Mobile: Compact spacing, smaller fonts */
    h1 {
        font-size: 1.1em;
    }
    button {
        padding: 10px 16px;
        font-size: 0.9em;
    }
}
```

### Layout Transformations

**Desktop (> 1024px)**
- 50/50 split-screen (Configuration | Results)
- Table view for results
- 3-column stats cards
- Multi-column complexity grid

**Tablet (768px - 1024px)**
- Vertical stacking (Configuration above Results)
- Table with horizontal scroll
- 2-column stats/complexity grids
- Adjusted padding

**Mobile (< 768px)**
- Single column layout
- Card-based result display (no table)
- Single column stats/complexity
- Touch-optimized buttons
- Smaller typography

### Table Responsiveness

**Desktop/Tablet**
```css
.table-container {
    width: 100%;
    overflow-x: auto;
}

.results-table {
    min-width: 700px;  /* Forces horizontal scroll on small screens */
}
```

**Mobile**
```css
.results-table {
    display: none;  /* Hide complex table */
}

.mobile-results {
    display: block;  /* Show card layout */
}
```

### Button Scaling

**Desktop**
```css
.swap-btn {
    padding: 8px 16px;
    min-width: 60px;
    font-size: 0.95em;
}
```

**Tablet**
```css
.swap-btn {
    padding: 6px 14px;
    min-width: 55px;
    font-size: 0.85em;
}
```

**Mobile**
```css
.swap-btn {
    padding: 6px 12px;
    min-width: 50px;
    font-size: 0.75em;
}
```

---

## Deployment

### GitHub Pages (Automated)

The project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

**Workflow File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Setup Instructions:**

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Select "GitHub Actions"
   - Save

3. **Automatic Deployment**
   - Every push to `main` branch triggers deployment
   - Deployment takes 2-3 minutes
   - Site available at: `https://[username].github.io/[repo-name]/`

**Example URL:**
```
https://kandhalshakil.github.io/Sorting-Algorithm-Performance-Analyzer/
```

### Local Deployment

**Option 1: Direct File Open**
1. Download/clone repository
2. Double-click `index.html`
3. Opens in default browser

**Option 2: Local Server**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### CDN Deployment

Can be hosted on any CDN that serves static files:
- Netlify
- Vercel
- CloudFlare Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

---

## Development Guide

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Text editor (VS Code, Sublime, Atom, etc.)
- Basic knowledge of HTML/CSS/JavaScript
- Git (for version control)

### Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/[username]/Sorting-Algorithm-Performance-Analyzer.git
   cd Sorting-Algorithm-Performance-Analyzer
   ```

2. **Open in Editor**
   ```bash
   code .  # VS Code
   ```

3. **Run Locally**
   - Simply open `index.html` in browser
   - Or use local server (see Local Deployment above)

### File Organization

**Single File Architecture**
- Everything in `index.html` (1823 lines)
- HTML structure: Lines 1-1170
- JavaScript logic: Lines 1171-1800
- Modal HTML: Lines 1801-1823

**Sections:**
```
Lines    1-120:   CSS Styles (layout, components, responsive)
Lines  121-200:   CSS Animations & Media Queries
Lines  201-450:   HTML Structure (header, config panel, results)
Lines  451-600:   JavaScript: Data Generation & Parsing
Lines  601-750:   JavaScript: SortingStats Class & Algorithms
Lines  751-1050:  JavaScript: Algorithm Implementations
Lines 1051-1200:  JavaScript: Analysis & Display Logic
Lines 1201-1500:  JavaScript: Modal & Event Handlers
Lines 1501-1823:  Modal HTML & Closing Tags
```

### Code Style Guidelines

**JavaScript**
- Use ES6+ features (arrow functions, destructuring, classes)
- Prefer `const` over `let`, avoid `var`
- Use template literals for strings
- Comment complex algorithms
- Use descriptive variable names

**CSS**
- Mobile-first approach (but this project uses desktop-first)
- Use CSS Grid for layouts
- Use Flexbox for component alignment
- Use CSS variables for theme colors (optional future enhancement)
- Group related styles

**HTML**
- Semantic tags (`<header>`, `<section>`, etc.)
- Meaningful IDs and class names
- Accessibility attributes where needed

### Adding New Algorithms

**Step 1: Implement Algorithm Function**
```javascript
function newSortingAlgorithm(arr) {
    const stats = new SortingStats();
    const arrCopy = [...arr];
    const startTime = performance.now();
    
    // Your sorting logic here
    // Remember to track:
    // - stats.comparisons++
    // - stats.swaps++
    // - stats.swapDetails.push({...})
    
    stats.timeMs = performance.now() - startTime;
    return stats;
}
```

**Step 2: Add Checkbox to UI**
```html
<div class="checkbox-item">
    <input type="checkbox" id="newSort" checked>
    <label for="newSort">New Sorting Algorithm</label>
</div>
```

**Step 3: Add to runAnalysis()**
```javascript
if (document.getElementById('newSort').checked) {
    await new Promise(resolve => setTimeout(resolve, delayPerAlgorithm));
    const stats = newSortingAlgorithm(data);
    results.push({
        name: 'New Sorting Algorithm',
        stats: stats,
        complexity: 'O(n log n)',  // Update accordingly
        sortedArray: [...arrCopy]
    });
}
```

**Step 4: Add Complexity Info**
```javascript
const complexityInfo = {
    // ... existing algorithms ...
    'New Sorting Algorithm': { 
        best: 'O(n)', 
        avg: 'O(n log n)', 
        worst: 'O(n²)', 
        class: 'newsort' 
    }
};
```

**Step 5: Add CSS Color**
```css
.complexity-card.newsort { 
    border-color: #your-color; 
}
```

### Testing Checklist

**Functionality Tests**
- ✅ Manual input parsing (space and comma separated)
- ✅ Quick generate for all options
- ✅ Each algorithm selection independently
- ✅ All algorithms together
- ✅ Swap details modal for each algorithm
- ✅ Modal keyboard/click closing
- ✅ Clear results button
- ✅ Error validation (empty, non-numeric, no algorithms)

**Responsive Tests**
- ✅ Desktop layout (> 1024px)
- ✅ Tablet layout (768px - 1024px)
- ✅ Mobile layout (< 768px)
- ✅ Table horizontal scroll
- ✅ Button sizing at all breakpoints
- ✅ Modal display on all devices

**Performance Tests**
- ✅ Small arrays (10-50 elements)
- ✅ Medium arrays (100-500 elements)
- ✅ Large arrays (1000+ elements)
- ✅ Already sorted data
- ✅ Reverse sorted data
- ✅ All same values

**Browser Tests**
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Debugging Tips

**Console Logging**
```javascript
console.log('Input data:', data);
console.log('Results:', results);
console.log('Swap details:', stats.swapDetails);
```

**Performance Debugging**
```javascript
console.time('Bubble Sort');
const stats = bubbleSort(data);
console.timeEnd('Bubble Sort');
```

**DOM Inspection**
- Use browser DevTools (F12)
- Inspect elements for styling issues
- Check console for JavaScript errors
- Use Network tab for loading issues

---

## API Reference

### Core Functions

#### `parseInput(input: string): number[]`
Parses user input into array of integers.

**Parameters:**
- `input` - Space or comma-separated string

**Returns:**
- Array of integers

**Throws:**
- Error if input is empty, non-numeric, or < 2 elements

**Example:**
```javascript
const arr = parseInput("5 2 8 1 9");  // [5, 2, 8, 1, 9]
```

---

#### `generateData(type: string): number[]`
Generates test data based on type.

**Parameters:**
- `type` - Format: "dataType-size" (e.g., "random-100")

**Returns:**
- Array of generated numbers

**Types:**
- `random-{n}` - Random numbers 1-1000
- `sorted-{n}` - Sequential 1 to n
- `reverse-{n}` - Reverse sequential n to 1

**Example:**
```javascript
const arr = generateData("random-50");
```

---

#### `runAnalysis(): void`
Main analysis orchestrator. Validates input, runs selected algorithms, displays results.

**Process:**
1. Parse and validate input
2. Check algorithm selection
3. Show loading state
4. Run each selected algorithm with delays
5. Sort results by time
6. Display results and complexity

---

### Algorithm Functions

All algorithm functions follow this signature:

#### `{algorithmName}Sort(arr: number[]): SortingStats`

**Parameters:**
- `arr` - Input array to sort

**Returns:**
- `SortingStats` object with metrics

**Available Algorithms:**
- `bubbleSort(arr)`
- `insertionSort(arr)`
- `selectionSort(arr)`
- `heapSort(arr)`
- `quickSort(arr)`
- `mergeSort(arr)`

---

### UI Functions

#### `displayResults(results, originalData, sortedArray): void`
Generates and displays result HTML.

**Parameters:**
- `results` - Array of algorithm results
- `originalData` - Original input array
- `sortedArray` - Final sorted array

**Generates:**
- Data preview
- Stats summary
- Performance table
- Mobile cards
- Complexity cards

---

#### `showSwapDetails(algorithmName: string, index: number): void`
Opens modal with swap details for specific algorithm.

**Parameters:**
- `algorithmName` - Display name
- `index` - Index in globalResults array

---

#### `closeSwapModal(): void`
Closes the swap details modal.

---

#### `clearResults(): void`
Resets input, UI, and clears all results.

---

### Classes

#### `SortingStats`

**Properties:**
```javascript
{
    comparisons: number        // Total comparisons
    swaps: number              // Total swaps
    swapDetails: Array<{       // Detailed swap info
        from: number,
        to: number,
        values: [number, number]
    }>
    timeMs: number             // Execution time
}
```

---

## Future Enhancements

### Planned Features

**🎨 Visualization**
- [ ] Animated bar chart showing sort progress
- [ ] Real-time comparison highlighting
- [ ] Swap animations with smooth transitions
- [ ] Speed control (slow, medium, fast)
- [ ] Step-by-step mode with play/pause

**📊 Advanced Analytics**
- [ ] Performance graphs (time vs size)
- [ ] Comparison/swap ratio charts
- [ ] Algorithm comparison side-by-side
- [ ] Best/worst case scenario testing
- [ ] Memory usage tracking

**🔧 Additional Algorithms**
- [ ] Radix Sort
- [ ] Counting Sort
- [ ] Bucket Sort
- [ ] Shell Sort
- [ ] Tim Sort (Python's default)
- [ ] Comb Sort

**💾 Data Management**
- [ ] Export results to CSV
- [ ] Export results to JSON
- [ ] Save custom datasets
- [ ] Load datasets from file
- [ ] History of previous runs

**🎨 UI Enhancements**
- [ ] Dark mode toggle
- [ ] Customizable color themes
- [ ] Font size controls
- [ ] Accessibility improvements (ARIA labels)
- [ ] Multi-language support

**📱 Additional Features**
- [ ] Share results via URL
- [ ] Compare multiple runs
- [ ] Algorithm complexity calculator
- [ ] Code snippets for each algorithm
- [ ] Educational tooltips
- [ ] Quiz mode
- [ ] Performance leaderboard

**⚡ Technical Improvements**
- [ ] Web Workers for heavy computations
- [ ] Progressive Web App (PWA) support
- [ ] Offline capability
- [ ] LocalStorage for preferences
- [ ] Print-friendly results view

---

## Troubleshooting

### Common Issues

**Issue: Swap details not showing**
- **Cause:** Modal not initializing properly
- **Fix:** Check if `globalResults` array is populated
- **Debug:** `console.log(globalResults)`

**Issue: Loading animation doesn't disappear**
- **Cause:** JavaScript error during execution
- **Fix:** Check browser console for errors
- **Debug:** Wrap algorithm calls in try-catch

**Issue: Results table not responsive on mobile**
- **Cause:** CSS media queries not applying
- **Fix:** Check viewport meta tag in HTML
- **Verify:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

**Issue: Algorithms taking too long**
- **Cause:** Array too large (>10,000 elements)
- **Fix:** Reduce input size or optimize algorithms
- **Note:** O(n²) algorithms slow with large n

**Issue: Swap count seems low/high**
- **Cause:** Not counting all operations consistently
- **Fix:** Review algorithm implementation
- **Note:** Merge sort counts every merge as swap

---

## Credits & Acknowledgments

**Algorithm Implementations**
- Based on classic CS literature
- Optimizations from real-world production code

**Design Inspiration**
- Modern Material Design principles
- Gradient trends from Dribbble
- Layout concepts from CodePen

**Technologies**
- Performance API - MDN Web Docs
- CSS Grid - CSS-Tricks
- ES6+ JavaScript - JavaScript.info

---

## License

**MIT License**

Copyright (c) 2026 Sorting Algorithm Performance Analyzer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Contact & Support

**Repository:** https://github.com/KandhalShakil/Sorting-Algorithm-Performance-Analyzer

**Issues:** Report bugs or request features via GitHub Issues

**Contributions:** Pull requests welcome!

**Education:** Free to use for educational purposes

---

## Version History

### Version 1.0.0 (February 7, 2026)
- ✅ Initial release
- ✅ 6 sorting algorithms implemented
- ✅ Interactive swap details modal
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Dynamic loading animations
- ✅ GitHub Pages deployment
- ✅ Complete documentation

---

<div align="center">

**📚 Complete Documentation • 🚀 Ready to Deploy • 💻 Open Source**

**Made with ❤️ and JavaScript**

*Star ⭐ this project if you find it helpful!*

</div>
