import Queue from './Queue';

describe('Queue', ()=>{
	test('Constructor Test', ()=>{
		const queue = new Queue(10);
		expect( queue ).toBeInstanceOf( Queue );
	});

	test('Enqueue/Dequeue/Front Test', ()=>{
		const queue = new Queue(10);
		const numbers = [ 1, 2, 3, 4, 5 ];
		for (let n of numbers) {
			queue.enqueue(n);
		}
		expect( queue.getSize() ).toEqual( numbers.length );
		expect( queue.front() ).toEqual( numbers[0] );
		expect( queue.dequeue() ).toEqual( numbers[0] );
		expect( queue.dequeue() ).toEqual( numbers[1] );
		expect( queue.dequeue() ).toEqual( numbers[2] );
		expect( queue.front() ).toEqual( numbers[3] );
		expect( queue.getSize() ).toEqual( numbers.length - 3 );
	});

	test('IsEmpty/Clear Test', ()=>{
		const queue = new Queue(10);
		const numbers = [ 1, 2, 3, 4, 5 ];
		for (let n of numbers) {
			queue.enqueue(n);
		}
		expect( queue.isEmpty() ).toEqual( false );
		expect( queue.getSize() ).toEqual( numbers.length );
		expect( queue.front() ).toEqual( numbers[0] );
		queue.clear();
		expect( queue.isEmpty() ).toEqual( true );
		expect( queue.getSize() ).toEqual( 0 );
		expect( queue.front() ).toEqual( null );
	});

	test('Dynamic Capacity Test', ()=>{
		const queue = new Queue();
		const numbers = [ 1, 2, 3, 4, 5 ];
		expect( queue.getSize() ).toEqual( 0 );
		expect( queue.getCapacity() ).toEqual( 8 );
		for (let n of numbers) {
			queue.enqueue(n);
		}
		expect( queue.getSize() ).toEqual( 5 );
		expect( queue.getCapacity() ).toEqual( 8 );
		for (let n of numbers) {
			queue.enqueue(n);
		}
		expect( queue.getSize() ).toEqual( 10 );
		expect( queue.getCapacity() ).toEqual( 16 );
	});
});
