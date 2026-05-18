export class DataGenerator {
    constructor() {
        this.array = [];
    }

    generate(size, type = 'random') {
        this.array = [];
        for (let i = 0; i < size; i++) {
            // Using 10 to 100 as base values to represent heights nicely
            let val;
            switch(type) {
                case 'sorted':
                    val = 10 + (i / size) * 90;
                    // Add slight noise
                    val += (Math.random() * 4 - 2);
                    break;
                case 'reversed':
                    val = 100 - (i / size) * 90;
                    break;
                case 'few-unique':
                    const uniques = [20, 40, 60, 80, 100];
                    val = uniques[Math.floor(Math.random() * uniques.length)];
                    break;
                case 'random':
                default:
                    val = 10 + Math.random() * 90;
                    break;
            }
            this.array.push(Math.max(10, Math.min(100, val)));
        }
        return this.array;
    }

    getArray() {
        return [...this.array];
    }
}
