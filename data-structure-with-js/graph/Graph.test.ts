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
});
