# 🚀 Sorting Algorithm Performance Analyzer

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)

**A modern, interactive web application to analyze and compare sorting algorithm performance in real-time.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Algorithms](#-algorithms) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

The **Sorting Algorithm Performance Analyzer** is a pure HTML/CSS/JavaScript application that provides detailed performance analysis of six popular sorting algorithms. It tracks execution time, comparisons, and swaps, displaying results in an intuitive split-screen interface with beautiful visualizations.

Perfect for:
- 📚 **Students** learning data structures and algorithms
- 👨‍💻 **Developers** understanding algorithm efficiency
- 👨‍🏫 **Educators** demonstrating sorting algorithms
- 🔬 **Researchers** comparing algorithm performance

---

## ✨ Features

### 🔢 Six Sorting Algorithms
- **Bubble Sort** - Simple comparison-based algorithm
- **Insertion Sort** - Efficient for small/nearly sorted data
- **Selection Sort** - Minimal swaps algorithm
- **Heap Sort** - In-place O(n log n) algorithm
- **Quick Sort** - Fast divide-and-conquer with median-of-three pivot
- **Merge Sort** - Stable O(n log n) algorithm

### 📊 Performance Metrics
- ⏱️ **Execution Time** - Precise timing in microseconds/milliseconds
- 🔄 **Comparison Count** - Total number of element comparisons
- 🔀 **Swap Count** - Total number of element swaps
- 🏆 **Performance Ranking** - Automatic sorting by execution time

### 🎨 Beautiful User Interface
- 🌊 **Modern Blue Gradient Theme** - Clean, professional design
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🎯 **Equal Split-Screen Layout** - 50/50 Configuration and Results panels
- ✨ **Smooth Animations** - Hover effects, transitions, and loading states
- 🏅 **Medal Rankings** - Gold, Silver, Bronze badges for top performers

### 🛠️ Interactive Features
- ✍️ **Manual Input** - Enter custom datasets (space or comma-separated)
- ⚡ **Quick Generate** - Generate random, sorted, or reverse-sorted data
- ☑️ **Algorithm Selection** - Choose which algorithms to run
- 👀 **Data Preview** - View original and sorted data side-by-side
- 📈 **Complexity Cards** - Time/space complexity information for each algorithm
- 🗑️ **Clear Results** - Reset and start fresh anytime

---

## 🎯 Demo

### Input Panel
- Enter custom data or generate test datasets
- Select algorithms to analyze
- Run analysis with a single click

### Results Display
- **Data Preview** - Original and sorted arrays
- **Statistics Summary** - Dataset size, algorithms run, fastest algorithm
- **Performance Table** - Ranked results with all metrics
- **Complexity Analysis** - Big-O notation cards for each algorithm

---

## 🚀 Installation

**Zero installation required!** This is a pure client-side application.

### Option 1: Direct Open
1. Download or clone this repository
2. Double-click `index.html`
3. Start analyzing!

---

## 💻 Usage

### Quick Start
1. **Open `index.html`** in any modern browser
2. **Enter data** manually or use Quick Generate:
   - `5 2 8 1 9 3` (space-separated)
   - `5,2,8,1,9,3` (comma-separated)
3. **Select algorithms** to test (all checked by default)
4. **Click "Run Analysis"** to see results
5. View performance rankings and complexity analysis

### Input Options
| Option | Description | Example |
|--------|-------------|---------|
| Manual Entry | Space/comma-separated numbers | `64 34 25 12 22 11 90` |
| Random (10) | 10 random numbers | Auto-generated |
| Random (50) | 50 random numbers | Auto-generated |
| Random (100) | 100 random numbers | Auto-generated |
| Random (500) | 500 random numbers | Auto-generated |
| Sorted (100) | 100 pre-sorted numbers | `1, 2, 3, ... 100` |
| Reverse (100) | 100 reverse-sorted numbers | `100, 99, 98, ... 1` |

### Keyboard Shortcuts
- **Enter** - Run analysis (when input field is focused)

---

## 📐 Algorithms

### Time & Space Complexity

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity | Stable |
|-----------|-----------|--------------|------------|------------------|--------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ❌ No |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ No |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²)* | O(log n) | ❌ No |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Yes |

_*Quick Sort uses median-of-three pivot selection to avoid worst-case on sorted data_

### Algorithm Characteristics

#### 🔵 Bubble Sort
- Repeatedly swaps adjacent elements if they're in wrong order
- Optimized with early termination flag
- Best for nearly sorted data or teaching purposes
- Time Complexity: O(n²), Space: O(1)

#### 🟢 Insertion Sort
- Builds sorted array one element at a time
- Efficient for small datasets (< 50 elements)
- Adaptive: O(n) on already sorted data
- Time Complexity: O(n²), Space: O(1)

#### 🟡 Selection Sort
- Finds minimum element and places it at the beginning
- Makes minimal number of swaps (n-1)
- Good when write operations are expensive
- Time Complexity: O(n²), Space: O(1)

#### 🟠 Heap Sort
- Uses binary heap data structure
- Guaranteed O(n log n) with constant space
- Not stable but in-place
- Time Complexity: O(n log n), Space: O(1)

#### 🟣 Quick Sort
- Divide-and-conquer with pivot partitioning
- Median-of-three pivot prevents worst case
- Fastest in practice for large random datasets
- Time Complexity: O(n log n) avg, O(n²) worst, Space: O(log n)

#### 🔵 Merge Sort
- Divide-and-conquer with merging
- Stable and predictable performance
- Requires extra space for merging
- Time Complexity: O(n log n), Space: O(n)

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with:
  - Flexbox & Grid layouts
  - Gradient backgrounds
  - Smooth transitions & animations
  - Media queries for responsiveness
- **JavaScript ES6+** - Modern features:
  - Arrow functions
  - Template literals
  - Spread operator
  - Classes
  - Performance API

### No Dependencies
✅ Pure vanilla JavaScript  
✅ No frameworks or libraries  
✅ No build process required  
✅ Works offline  
✅ Lightweight (~42KB single file)

---

## 📊 Performance Analysis

The application provides comprehensive performance metrics for each algorithm:

### Measured Metrics
- **Execution Time**: High-precision timing using Performance API
- **Comparison Count**: Total number of element comparisons
- **Swap Count**: Total number of element swaps
- **Space Complexity**: Memory usage classification

### Complexity Reference

All algorithms display their complexity characteristics:
- **Best Case**: Optimal input scenario
- **Average Case**: Expected performance
- **Worst Case**: Maximum time complexity
- **Space**: Additional memory requirements

---

## 🎨 Design Features

- **Color Scheme**: Ocean blue gradient (`#00c6ff` → `#0072ff`)
- **Typography**: Segoe UI system font stack
- **Layout**: CSS Grid split-screen (50% Configuration + 50% Results)
- **Responsive Breakpoints**: 1024px, 768px, 480px
- **Animations**: Fade-in, shake, spin, slide-up, hover transforms
- **Accessibility**: Focus states, semantic HTML, keyboard navigation

---

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Edge | ✅ 90+ |
| Opera | ✅ 76+ |

*Requires ES6+ support and Performance API*

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Ideas for Contribution
- Add more sorting algorithms (Radix, Counting, Bucket, Shell, Tim Sort)
- Add visual animations of sorting process
- Export results to CSV/JSON
- Dark mode toggle
- Algorithm step-by-step visualization
- Performance charts/graphs
- Comparison mode (run multiple dataset sizes)
- Audio feedback for comparisons/swaps
- Multi-language support

---

## 🎯 Use Cases

### For Students
- **Learn by Doing**: Run algorithms on custom data and see real performance
- **Understand Complexity**: Compare time and space complexity across algorithms
- **Exam Preparation**: Review algorithm characteristics and performance
- **Assignment Help**: Analyze algorithms visually and understand trade-offs

### For Educators
- **Classroom Demonstrations**: Show live algorithm performance
- **Teaching Tool**: Visual comparison of algorithm efficiency
- **Homework Platform**: Students can experiment and learn independently
- **Visual Aid**: Color-coded complexity cards and ranked results

### For Developers
- **Algorithm Selection**: Compare performance on your actual data patterns
- **Interview Prep**: Understand complexity analysis deeply
- **Quick Reference**: Mathematical proofs at your fingertips
- **Performance Testing**: Test with different data sizes and patterns

### For Researchers
- **Baseline Comparisons**: Standard implementations for benchmarking
- **Educational Research**: Study tool for algorithm pedagogy
- **Data Collection**: Export capabilities for analysis
- **Reproducible Results**: Consistent environment across platforms

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Created with ❤️ by developers, for developers.

---

## 🙏 Acknowledgments

- Algorithm implementations based on classic computer science literature
- UI design inspired by modern web applications
- Performance measurement using browser's native Performance API
- Mathematical notation standards from academic publications
- Complexity analysis based on Introduction to Algorithms (CLRS)

---

## 📚 Learning Resources

Understand algorithm performance through:
- **Real-Time Metrics**: See actual comparison and swap counts
- **Performance Rankings**: Compare algorithms on identical datasets
- **Complexity Cards**: Quick reference for time/space complexity
- **Best/Worst/Average Cases**: See how different inputs affect performance

---

## 🆕 What's New

**Version 1.0.0**
- ✨ Six sorting algorithms with real-time performance analysis
- 📊 Comprehensive metrics: time, comparisons, swaps
- 🎯 Equal split-screen layout (50/50 Configuration and Results)
- 🏅 Performance rankings with medal badges
- 📈 Complexity cards for all algorithms
- 🎨 Modern ocean blue gradient theme
- 📱 Fully responsive design
- ⚡ Quick generate options for testing
- 🗑️ Clear results functionality
- 🌊 Smooth animations and transitions

---

## 📞 Support

Found a bug? Have a feature request? Want to contribute?

- 🐛 Open an issue on GitHub
- 🔧 Submit a pull request
- ⭐ Star this repository if you find it useful!
- 💬 Share feedback and suggestions
- 📧 Contact for educational or commercial use

---

## 🏆 Features Highlights

✅ **Zero Setup** - Just open and run  
✅ **Educational Focus** - Learn algorithm performance analysis  
✅ **Real Performance** - Actual timing data, not simulations  
✅ **6 Algorithms** - From simple O(n²) to efficient O(n log n)  
✅ **Performance Metrics** - Time, comparisons, and swaps tracked  
✅ **Fully Responsive** - Works on all devices  
✅ **No Dependencies** - Pure HTML/CSS/JavaScript  
✅ **Offline Ready** - No internet required after download  
✅ **Open Source** - Free to use and modify  

---

<div align="center">

**[⬆ Back to Top](#-sorting-algorithm-performance-analyzer)**

---

### 🎓 Perfect for Learning • 🚀 Fast Performance Analysis • � Real-Time Metrics

Made with ❤️ and JavaScript

**Star ⭐ this repo to support educational open source!**

</div>

✅ **Comparison & Swap Counting**: All algorithms properly count every comparison and swap operation  
✅ **Same Input**: All algorithms test on identical datasets for fair comparison  
✅ **High-Precision Timing**: Using `performance.now()` for accurate measurements  
✅ **Intelligent Time Display**: Shows microseconds or milliseconds based on value  
✅ **Data Visualization**: Preview original and sorted data  
✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile  

## Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## License

Free to use for educational purposes.
