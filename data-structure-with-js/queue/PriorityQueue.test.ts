import PriorityQueue from './PriorityQueue';

describe('PriorityQueue', ()=>{
	test('Constructor Test', ()=>{
		const queue = new PriorityQueue();
		expect( queue ).toBeInstanceOf( PriorityQueue );
	});

	test('Enqueue Test', ()=>{
		const queue = new PriorityQueue();
		queue.enqueue('Anna', 1);   // [ Anna(1) ]
		queue.enqueue('Bob', 2);    // [ Anna(1), Bob(2) ]
		queue.enqueue('Camila', 3); // [ Anna(1), Bob(2), Camila(3) ]
		queue.enqueue('Dave', 1);   // [ Anna(1), Dave(1), Bob(2), Camila(3) ]
		queue.enqueue('Paul', 1);   // [ Anna(1), Dave(1), Paul(1), Bob(2), Camila(3) ]
		expect( queue.dequeue().value ).toEqual( 'Anna' );
		expect( queue.dequeue().value ).toEqual( 'Dave' );
		expect( queue.dequeue().value ).toEqual( 'Paul' );
		expect( queue.dequeue().value ).toEqual( 'Bob' );
		expect( queue.dequeue().value ).toEqual( 'Camila' );
	});
});
