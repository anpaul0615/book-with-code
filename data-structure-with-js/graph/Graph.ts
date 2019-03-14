import Dictionary from '../dictionary/Dictionary';
import LinkedList from '../linked-list/LinkedList';

export default class Graph {
	private vertices:LinkedList;
	private adjacencies:Dictionary;

	constructor() {
		this.vertices = new LinkedList();
		this.adjacencies = new Dictionary();
	}

	addVertex(vertex:string):boolean {
		if (this.vertices.indexOf(vertex) !== -1) {
			return false;
		}
		this.vertices.append(vertex);
		this.adjacencies.set(vertex, new LinkedList());
		return true;
	}

	addEdge(vertext1:string, vertext2:string):boolean {
		const adjacency1 = this.adjacencies.get(vertext1);
		const adjacency2 = this.adjacencies.get(vertext2);
		if (adjacency1 === null || adjacency2 === null) {
			return false;
		}
		adjacency1.append(vertext2);
		adjacency2.append(vertext1);
		return true;
	}

	bfs() {}
	dfs() {}
}
