import Dictionary from '../dictionary/Dictionary';

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

	bfs() {}
	dfs() {}
}
