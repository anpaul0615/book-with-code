import Graph from './Graph';

describe('Graph', ()=>{
	test('Constructor Test', ()=>{
		const graph:Graph = new Graph();
		expect( graph ).toBeInstanceOf( Graph );
	});

	test('AddVertex/AddEdge Test', ()=>{
		const graph:Graph = new Graph();
		const vertices = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', ];
		for (let i = 0; i < vertices.length; i++) {
			expect( graph.addVertex(vertices[i]) ).toEqual( true );
		}
		expect( graph.addVertex('A') ).toEqual( false );
		expect( graph.addVertex('A') ).toEqual( false );
		expect( graph.addEdge('A','B') ).toEqual( true );
		expect( graph.addEdge('A','C') ).toEqual( true );
		expect( graph.addEdge('A','D') ).toEqual( true );
		expect( graph.addEdge('C','D') ).toEqual( true );
		expect( graph.addEdge('C','G') ).toEqual( true );
		expect( graph.addEdge('D','G') ).toEqual( true );
		expect( graph.addEdge('D','H') ).toEqual( true );
		expect( graph.addEdge('B','E') ).toEqual( true );
		expect( graph.addEdge('B','F') ).toEqual( true );
		expect( graph.addEdge('E','I') ).toEqual( true );
	});

	test('BFS Test', ()=>{
		const graph:Graph = new Graph();
		const vertices = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', ];
		for (let i = 0; i < vertices.length; i++) {
			graph.addVertex(vertices[i])
		}
		graph.addEdge('A','B');
		graph.addEdge('A','C');
		graph.addEdge('A','D');
		graph.addEdge('C','D');
		graph.addEdge('C','G');
		graph.addEdge('D','G');
		graph.addEdge('D','H');
		graph.addEdge('B','E');
		graph.addEdge('B','F');
		graph.addEdge('E','I');
		// const traverseAction = (vertex:string) => console.log('traverse : ', vertex);
		// graph.bfs(vertices[0], traverseAction);
		let expectedVertices:Array<string> = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', ];
		let traversedVertices:Array<string> = [];
		const traverseAction = (vertex:string) => traversedVertices.push(vertex);
		graph.bfs(vertices[0], traverseAction);
		for (let i = 0; i < traversedVertices.length; i++) {
			expect( traversedVertices[i] ).toEqual( expectedVertices[i] );
		}
	});

	test('DFS Test', ()=>{
		const graph:Graph = new Graph();
		const vertices = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', ];
		for (let i = 0; i < vertices.length; i++) {
			graph.addVertex(vertices[i])
		}
		graph.addEdge('A','B');
		graph.addEdge('A','C');
		graph.addEdge('A','D');
		graph.addEdge('C','D');
		graph.addEdge('C','G');
		graph.addEdge('D','G');
		graph.addEdge('D','H');
		graph.addEdge('B','E');
		graph.addEdge('B','F');
		graph.addEdge('E','I');
		// const visitAction = (vertex:string) => console.log('visit : ', vertex);
		// graph.dfs(visitAction);
		let expectedVertices:Array<string> = [ 'A', 'B', 'E', 'I', 'F', 'C', 'D', 'G', 'H', ];
		let visitedVertices:Array<string> = [];
		const visitAction = (vertex:string) => visitedVertices.push(vertex);
		graph.dfs(visitAction);
		for (let i = 0; i < visitedVertices.length; i++) {
			expect( visitedVertices[i] ).toEqual( expectedVertices[i] );
		}
	});
});
