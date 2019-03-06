import Hashtable from './Hashtable';

describe('Hashtable', ()=>{
	test('Constructor Test', ()=>{
		const table:Hashtable = new Hashtable();
		expect( table ).toBeInstanceOf( Hashtable );
	});

	test('Put/Get/Remove Test', ()=>{
		const table:Hashtable = new Hashtable();
		table.put('a', 1);
		table.put('b', 2);
		table.put('c', 3);
		expect( table.get('a') ).toEqual( 1 );
		expect( table.get('b') ).toEqual( 2 );
		expect( table.get('c') ).toEqual( 3 );
		table.remove('a');
		expect( table.get('a') ).toEqual( undefined );
		expect( table.get('b') ).toEqual( 2 );
		expect( table.get('c') ).toEqual( 3 );
	});
});
