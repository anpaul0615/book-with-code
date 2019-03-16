import Dictionary from '../dictionary/Dictionary';
import Queue from '../queue/Queue';

interface MarkTable {
	[key:string]: string
}

export default class Graph {
	private vertices:Array<string>;
	private adjacencies:Dictionary;

	constructor() {
		this.vertices = new Array();
		this.adjacencies = new Dictionary();
	}

	addVertex(vertex:string):boolean {
		if (this.vertices.indexOf(vertex) !== -1) {
			return false;
		}
		this.vertices.push(vertex);
		this.adjacencies.set(vertex, new Array());
		return true;
	}

	addEdge(vertext1:string, vertext2:string):boolean {
		const adjacency1 = this.adjacencies.get(vertext1);
		const adjacency2 = this.adjacencies.get(vertext2);
		if (adjacency1 === null || adjacency2 === null) {
			return false;
		}
		adjacency1.push(vertext2);
		adjacency2.push(vertext1);
		return true;
	}

	bfs(vertex:string, callback:Function) {
		let marks:MarkTable = this.initializeMark();
		let queue:Queue = new Queue();
		// insert start-node to wait-queue
		queue.enqueue(vertex);
		// loop with traversing nodes in wait-queue
		while (queue.isEmpty() === false) {
			// 1) get target-node from wait-queue
			const target = queue.dequeue();
			// 2) get nearby-nodes from target-node
			const neighbors = this.adjacencies.get(target);
			// 3) mark target-node to visit-mark (visit, but not traverse)
			marks[target] = 'grey';
			// 4) loop with visiting and marking nearby-nodes
			for (let i =0; i < neighbors.length; i++) {
				let w = neighbors[i];
				if (marks[w] === 'white') { // if wait-mark, change to visit-mark (visit, but not traverse)
					marks[w] = 'grey';
					queue.enqueue(w);
				}
			}
			// 5) mark target-node to traverse-mark (visit and traverse)
			marks[target] = 'black';
			callback(target);
		}
	}
	private initializeMark():MarkTable {
		let marks:MarkTable = {};
		for (let i = 0; i < this.vertices.length; i++) {
			marks[this.vertices[i]] = 'white';  // mark all-nodes to wait-mark (not visit, not traverse)
		}
		return marks;
	}

	dfs(callback:Function) {
		let marks:MarkTable = this.initializeMark();
		// loop with visiting all-wait-nodes
		for (let i = 0; i < this.vertices.length; i++) {
			if (marks[this.vertices[i]] === 'white') {
				this.dfsVisit(this.vertices[i], marks, callback);
			}
		}
	}
	private dfsVisit(target:string, marks:MarkTable, callback:Function) {
		// mark target-node to visit-mark (visit, but not backtrack)
		marks[target] = 'grey';
		callback(target);
		// loop with visiting all-wait-nodes (for target's nearby-nodes)
		let neighbors = this.adjacencies.get(target);
		for (let i = 0; i < neighbors.length; i++) {
			let next = neighbors[i];
			if (marks[next] === 'white') {
				this.dfsVisit(next, marks, callback);
			}
		}
		// mark target-node to backtrack-mark (visit and backtrack)
		marks[target] = 'black';
	}
}
