export const SortingAlgorithms = {
    bubble: function*(array) {
        let n = array.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                yield { type: 'compare', indices: [i, i + 1] };
                if (array[i] > array[i + 1]) {
                    yield { type: 'swap', indices: [i, i + 1] };
                    let temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    swapped = true;
                }
            }
            yield { type: 'sorted', indices: [n - 1] };
            n--;
        } while (swapped);
        // Mark remaining as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i] };
        }
    },
    
    insertion: function*(array) {
        yield { type: 'sorted', indices: [0] };
        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;
            
            yield { type: 'compare', indices: [i, j] };
            while (j >= 0 && array[j] > key) {
                yield { type: 'swap', indices: [j, j + 1] };
                array[j + 1] = array[j];
                j = j - 1;
                if (j >= 0) {
                    yield { type: 'compare', indices: [i, j] };
                }
            }
            array[j + 1] = key;
            for(let k = 0; k <= i; k++) {
                yield { type: 'sorted', indices: [k] };
            }
        }
    },
    
    selection: function*(array) {
        for (let i = 0; i < array.length - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < array.length; j++) {
                yield { type: 'compare', indices: [minIdx, j] };
                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                yield { type: 'swap', indices: [i, minIdx] };
                let temp = array[i];
                array[i] = array[minIdx];
                array[minIdx] = temp;
            }
            yield { type: 'sorted', indices: [i] };
        }
        yield { type: 'sorted', indices: [array.length - 1] };
    },
    
    merge: function*(array) {
        yield* mergeSortHelper(array, 0, array.length - 1);
        for(let i=0; i<array.length; i++) yield {type: 'sorted', indices: [i]};
    },
    
    quick: function*(array) {
        yield* quickSortHelper(array, 0, array.length - 1);
        for(let i=0; i<array.length; i++) yield {type: 'sorted', indices: [i]};
    },
    
    heap: function*(array) {
        let n = array.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            yield* heapify(array, n, i);
        }
        for (let i = n - 1; i > 0; i--) {
            yield { type: 'swap', indices: [0, i] };
            let temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            yield { type: 'sorted', indices: [i] };
            yield* heapify(array, i, 0);
        }
        yield { type: 'sorted', indices: [0] };
    },

    shell: function*(array) {
        let n = array.length;
        for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
            for (let i = gap; i < n; i++) {
                let temp = array[i];
                let j;
                yield { type: 'compare', indices: [i, i-gap] };
                for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                    yield { type: 'swap', indices: [j, j-gap] };
                    array[j] = array[j - gap];
                    if (j - gap * 2 >= 0) yield { type: 'compare', indices: [j-gap, j-gap*2] };
                }
                array[j] = temp;
            }
        }
        for(let i=0; i<n; i++) yield {type: 'sorted', indices: [i]};
    },

    counting: function*(array) {
        let max = Math.max(...array);
        let count = new Array(Math.floor(max) + 1).fill(0);
        let output = new Array(array.length);
        
        for (let i = 0; i < array.length; i++) {
            yield { type: 'compare', indices: [i] };
            count[Math.floor(array[i])]++;
        }
        
        for (let i = 1; i <= max; i++) {
            count[i] += count[i - 1];
        }
        
        for (let i = array.length - 1; i >= 0; i--) {
            output[count[Math.floor(array[i])] - 1] = array[i];
            count[Math.floor(array[i])]--;
        }
        
        for (let i = 0; i < array.length; i++) {
            yield { type: 'swap', indices: [i] };
            array[i] = output[i];
            yield { type: 'sorted', indices: [i] };
        }
    },

    radix: function*(array) {
        let max = Math.max(...array);
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            let output = new Array(array.length);
            let count = new Array(10).fill(0);

            for (let i = 0; i < array.length; i++) {
                yield { type: 'compare', indices: [i] };
                count[Math.floor(array[i] / exp) % 10]++;
            }

            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }

            for (let i = array.length - 1; i >= 0; i--) {
                output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
                count[Math.floor(array[i] / exp) % 10]--;
            }

            for (let i = 0; i < array.length; i++) {
                yield { type: 'swap', indices: [i] };
                array[i] = output[i];
            }
        }
        for(let i=0; i<array.length; i++) yield {type: 'sorted', indices: [i]};
    }
};

function* mergeSortHelper(array, left, right) {
    if (left >= right) return;
    const mid = left + Math.floor((right - left) / 2);
    yield* mergeSortHelper(array, left, mid);
    yield* mergeSortHelper(array, mid + 1, right);
    yield* merge(array, left, mid, right);
}

function* merge(array, left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = new Array(n1);
    let R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let j = 0; j < n2; j++) R[j] = array[mid + 1 + j];
    
    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        yield { type: 'compare', indices: [left + i, mid + 1 + j] };
        if (L[i] <= R[j]) {
            yield { type: 'swap', indices: [k] };
            array[k] = L[i];
            i++;
        } else {
            yield { type: 'swap', indices: [k] };
            array[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        yield { type: 'swap', indices: [k] };
        array[k] = L[i];
        i++; k++;
    }
    while (j < n2) {
        yield { type: 'swap', indices: [k] };
        array[k] = R[j];
        j++; k++;
    }
}

function* quickSortHelper(array, low, high) {
    if (low < high) {
        let piInfo = yield* partition(array, low, high);
        let pi = piInfo.pivotIndex;
        yield { type: 'sorted', indices: [pi] };
        yield* quickSortHelper(array, low, pi - 1);
        yield* quickSortHelper(array, pi + 1, high);
    } else if (low === high) {
        yield { type: 'sorted', indices: [low] };
    }
}

function* partition(array, low, high) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        yield { type: 'compare', indices: [j, high] };
        if (array[j] < pivot) {
            i++;
            yield { type: 'swap', indices: [i, j] };
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    yield { type: 'swap', indices: [i + 1, high] };
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    return { pivotIndex: i + 1 };
}

function* heapify(array, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n) {
        yield { type: 'compare', indices: [l, largest] };
        if (array[l] > array[largest]) largest = l;
    }
    if (r < n) {
        yield { type: 'compare', indices: [r, largest] };
        if (array[r] > array[largest]) largest = r;
    }
    if (largest !== i) {
        yield { type: 'swap', indices: [i, largest] };
        let temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;
        yield* heapify(array, n, largest);
    }
}
