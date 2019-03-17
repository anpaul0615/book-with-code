import CircularQueue from './CircularQueue';

describe('CircularQueue', ()=>{
	test('Constructor Test', ()=>{
		const queue = new CircularQueue(5);
		expect( queue ).toBeInstanceOf( CircularQueue );
	});

	test('Enqueue/Dequeue Test', ()=>{
		const queue = new CircularQueue(5);
		queue.enqueue('Anna');   // [ Anna ]
		queue.enqueue('Bob');    // [ Anna, Bob ]
		queue.enqueue('Camila'); // [ Anna, Bob, Camila ]
		queue.enqueue('Dave');   // [ Anna, Bob, Camila, Dave ]
		try {
			queue.enqueue('Paul');   // enqueue err..!
		} catch(e) {
			expect( e.message ).toEqual( 'Queue is fully..!' );
		}

		expect( queue.dequeue() ).toEqual( 'Anna' );    // [ Bob, Camila, Dave ]
		expect( queue.dequeue() ).toEqual( 'Bob' );     // [ Camila, Dave ]
		expect( queue.dequeue() ).toEqual( 'Camila' );  // [ Dave ]
		expect( queue.dequeue() ).toEqual( 'Dave' );    // []
		try {
			queue.dequeue();   // dequeue err..!
		} catch(e) {
			expect( e.message ).toEqual( 'Queue is empty..!' );
		}
	});

	test('Circular Test', ()=>{
		const queue = new CircularQueue(10);
		queue.enqueue('Anna');   // [ Anna ]
		queue.enqueue('Bob');    // [ Anna, Bob ]
		queue.enqueue('Camila'); // [ Anna, Bob, Camila ]
		queue.enqueue('Dave');   // [ Anna, Bob, Camila, Dave ]
		expect( queue.getSize() ).toEqual( 4 );

		expect( queue.dequeue() ).toEqual( 'Anna' );    // [ Bob, Camila, Dave ]
		expect( queue.dequeue() ).toEqual( 'Bob' );     // [ Camila, Dave ]
		expect( queue.getSize() ).toEqual( 2 );

		queue.enqueue('Eric');   // [ Camila, Dave, Eric ]
		queue.enqueue('Fiona');  // [ Camila, Dave, Eric, Fiona ]
		expect( queue.getSize() ).toEqual( 4 );

		expect( queue.dequeue() ).toEqual( 'Camila' );   // [ Dave, Eric, Fiona ]
		expect( queue.dequeue() ).toEqual( 'Dave' );     // [ Eric, Fiona ]
		expect( queue.dequeue() ).toEqual( 'Eric' );     // [ Fiona ]
		expect( queue.dequeue() ).toEqual( 'Fiona' );    // [ ]
		expect( queue.getSize() ).toEqual( 0 );
	});
});
