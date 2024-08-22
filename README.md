# Priority Queue with Dynamic Updates

## Project Description
This project implements a **Priority Queue** using a **Max-Heap** with dynamic priority updates. It efficiently handles insertion, removal, and priority updates using a combination of a binary heap and a hash map. This ensures that operations like insert, removeMax, and updatePriority are executed in **O(log n)** time complexity.

## Features
- **Insert**: Adds an element with a specified priority to the queue.
- **RemoveMax**: Removes and returns the element with the highest priority.
- **UpdatePriority**: Updates the priority of an existing element.
- **Efficient Operations**: All operations are optimized to run in logarithmic time.

## Usage

### Installation
No external libraries are required. Simply clone the repository and start using the `PriorityQueue` class in your JavaScript project.
For running code simply use ``node priorityQueue.js`` 

### Example Usage
```javascript
const pq = new PriorityQueue();

pq.insert('task1', 1);
pq.insert('task2', 2);
pq.insert('task3', 3);

console.log(pq.removeMax()); // Output: 'task3'

pq.updatePriority('task1', 4);
console.log(pq.removeMax()); // Output: 'task1'
console.log(pq.removeMax()); // Output: 'task2'
console.log(pq.removeMax()); // Output: null (queue is empty)
