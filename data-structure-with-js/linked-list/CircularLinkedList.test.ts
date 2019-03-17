import CircularLinkedList from './CircularLinkedList';

describe('CircularLinkedList', ()=>{
	test('Constructor Test', ()=>{
		const list = new CircularLinkedList();
		expect( list ).toBeInstanceOf( CircularLinkedList );
	});

	test('Append Test', ()=>{
		const list = new CircularLinkedList();
		const numbers = [ 1, 1, 2, 3, 5, 8, 13, 21 ];
		for (let i = 0; i < numbers.length; i++) {
			list.append(numbers[i]);
		}
		expect( list.getSize() ).toEqual( numbers.length );
	});

	test('InsertAt Test', ()=>{
		const list = new CircularLinkedList();
		const numbers = [ 1, 1, 2, 3, 5, 8, 13, 21 ];
		for (let i = 0; i < numbers.length; i++) {
			list.append(numbers[i]);
		}
		expect( list.getSize() ).toEqual( numbers.length );
		expect( list.insertAt(3, 999) ).toEqual( true );
		expect( list.insertAt(3, 999) ).toEqual( true );
		expect( list.insertAt(3, 999) ).toEqual( true );
		expect( list.getSize() ).toEqual( numbers.length + 3 );
		expect( list.removeAt(3) ).toEqual( 999 );
		expect( list.removeAt(3) ).toEqual( 999 );
		expect( list.removeAt(3) ).toEqual( 999 );
		expect( list.getSize() ).toEqual( numbers.length );
		expect( list.insertAt(-1, 999) ).toEqual( false );
		expect( list.insertAt(999, 999) ).toEqual( false );
	});

	test('RemoveAt Test', ()=>{
		const list = new CircularLinkedList();
		const numbers = [ 1, 1, 2, 3, 5, 8, 13, 21 ];
		for (let i = 0; i < numbers.length; i++) {
			list.append(numbers[i]);
		}
		expect( list.getSize() ).toEqual( numbers.length );
		expect( list.removeAt(3) ).toEqual( numbers[3] );
		expect( list.removeAt(3) ).toEqual( numbers[4] );
		expect( list.removeAt(3) ).toEqual( numbers[5] );
		expect( list.getSize() ).toEqual( numbers.length - 3 );
		list.append(10);
		list.append(100);
		list.append(1000);
		expect( list.getSize() ).toEqual( numbers.length );
		expect( list.removeAt(5) ).toEqual( 10 );
		expect( list.removeAt(5) ).toEqual( 100 );
		expect( list.removeAt(5) ).toEqual( 1000 );
		expect( list.getSize() ).toEqual( numbers.length - 3 );
		expect( list.removeAt(-1) ).toEqual( null );
		expect( list.removeAt(999) ).toEqual( null );
	});

	test('IndexOf Test', ()=>{
		const list = new CircularLinkedList();
		const numbers = [ 1, 1, 2, 3, 5, 8, 13, 21 ];
		expect( list.indexOf(1) ).toEqual( -1 );  // empty
		for (let i = 0; i < numbers.length; i++) {
			list.append(numbers[i]);
		}
		expect( list.indexOf(1) ).toEqual( 0 );  // first 1
		expect( list.indexOf(2) ).toEqual( 2 );
		expect( list.indexOf(3) ).toEqual( 3 );
		expect( list.indexOf(5) ).toEqual( 4 );
		expect( list.indexOf(-1) ).toEqual( -1 );
		expect( list.indexOf(999) ).toEqual( -1 );
	});

	test('Remove Test', ()=>{
		const list = new CircularLinkedList();
		const numbers = [ 1, 1, 2, 3, 5, 8, 13, 21 ];
		expect( list.remove(1) ).toEqual( null );  // empty
		for (let i = 0; i < numbers.length; i++) {
			list.append(numbers[i]);
		}
		expect( list.remove(1) ).toEqual( 1 );
		expect( list.remove(1) ).toEqual( 1 );
		expect( list.remove(2) ).toEqual( 2 );
		expect( list.remove(3) ).toEqual( 3 );
		expect( list.remove(5) ).toEqual( 5 );
		expect( list.remove(-1) ).toEqual( null );
		expect( list.remove(999) ).toEqual( null );
	});
});
