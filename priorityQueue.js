/**
 * PriorityQueue class implementing a max-heap with dynamic priority updates.
 * Elements are stored with their priorities, and efficient operations like 
 * insert, removeMax, and updatePriority are supported using a combination of 
 * a binary heap and a hash map.
 */
class PriorityQueue {
    constructor() {
        this.heap = [];
        this.elementMap = new Map(); // Maps elements to their indices in the heap
    }

    /**
     * Swaps two elements in the heap and updates their positions in the elementMap.
     * @param {number} i - Index of the first element.
     * @param {number} j - Index of the second element.
     */
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        this.elementMap.set(this.heap[i].element, i);
        this.elementMap.set(this.heap[j].element, j);
    }

    /**
     * Returns the index of the parent node of the given index.
     * @param {number} i - Index of the current node.
     * @returns {number} - Index of the parent node.
     */
    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    /**
     * Returns the index of the left child node of the given index.
     * @param {number} i - Index of the current node.
     * @returns {number} - Index of the left child node.
     */
    leftChild(i) {
        return 2 * i + 1;
    }

    /**
     * Returns the index of the right child node of the given index.
     * @param {number} i - Index of the current node.
     * @returns {number} - Index of the right child node.
     */
    rightChild(i) {
        return 2 * i + 2;
    }

    /**
     * Heapifies up from the given index to maintain the max-heap property.
     * @param {number} index - Index of the element to heapify up.
     */
    heapifyUp(index) {
        let currentIndex = index;
        while (
            currentIndex > 0 &&
            this.heap[currentIndex].priority > this.heap[this.parent(currentIndex)].priority
        ) {
            this.swap(currentIndex, this.parent(currentIndex));
            currentIndex = this.parent(currentIndex);
        }
    }

    /**
     * Heapifies down from the given index to maintain the max-heap property.
     * @param {number} index - Index of the element to heapify down.
     */
    heapifyDown(index) {
        let largest = index;
        const left = this.leftChild(index);
        const right = this.rightChild(index);

        if (left < this.heap.length && this.heap[left].priority > this.heap[largest].priority) {
            largest = left;
        }

        if (right < this.heap.length && this.heap[right].priority > this.heap[largest].priority) {
            largest = right;
        }

        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }

    /**
     * Inserts an element with a given priority into the priority queue.
     * @param {T} element - The element to be inserted.
     * @param {number} priority - The priority of the element.
     */
    insert(element, priority) {
        const newItem = { element, priority };
        this.heap.push(newItem);
        const index = this.heap.length - 1;
        this.elementMap.set(element, index);
        this.heapifyUp(index);
    }

    /**
     * Removes and returns the element with the highest priority from the queue.
     * @returns {T | null} - The element with the highest priority, or null if the queue is empty.
     */
    removeMax() {
        if (this.heap.length === 0) return null;

        const maxItem = this.heap[0];
        const lastItem = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = lastItem;
            this.elementMap.set(lastItem.element, 0);
            this.heapifyDown(0);
        }

        this.elementMap.delete(maxItem.element);
        return maxItem.element;
    }

    /**
     * Updates the priority of an existing element in the queue.
     * If the element is not found, no action is taken.
     * @param {T} element - The element whose priority needs to be updated.
     * @param {number} newPriority - The new priority for the element.
     */
    updatePriority(element, newPriority) {
        if (!this.elementMap.has(element)) {
            console.log(`Element not found: ${element}`);
            return;
        }

        const index = this.elementMap.get(element);
        const oldPriority = this.heap[index].priority;
        this.heap[index].priority = newPriority;

        if (newPriority > oldPriority) {
            this.heapifyUp(index);
        } else {
            this.heapifyDown(index);
        }
    }

    /**
     * Checks if the priority queue is empty.
     * @returns {boolean} - True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.heap.length === 0;
    }
}

// Unit tests
const pq = new PriorityQueue();

pq.insert('task1', 1);
pq.insert('task2', 2);
pq.insert('task3', 3);

console.log(pq.removeMax()); // Output: 'task3'

pq.updatePriority('task1', 4);
console.log(pq.removeMax()); // Output: 'task1'
console.log(pq.removeMax()); // Output: 'task2'
console.log(pq.removeMax()); // Output: null (queue is empty)
