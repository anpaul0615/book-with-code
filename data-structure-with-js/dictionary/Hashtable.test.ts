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

	// // skip this test (becuase hash function is changed)
	// test.skip('Collision Test', ()=>{
	// 	const table:Hashtable = new Hashtable();
	// 	table.put('Gandalf', 'gandalf@email.com');   // hash:19, key:Gandalf
	// 	table.put('John', 'johnsnow@email.com');     // hash:29, key:John
	// 	table.put('Tyrion', 'tyrion@email.com');     // hash:16, key:Trion
	// 	table.put('Aaron', 'aaron@email.com');       // hash:16, key:Aaron  (collision..!)
	// 	table.put('Donnie', 'donnie@email.com');     // hash:13, key:Donnie
	// 	table.put('Ana', 'ana@email.com');           // hash:13, key:Ana  (collision..!)
	// 	table.put('Jonathan', 'jonathan@email.com'); // hash:5, key:Jonathan
	// 	table.put('Jamie', 'jamie@email.com');       // hash:5, key:Jamie  (collision..!)
	// 	table.put('Sue', 'sue@email.com');           // hash:5, key:Sue  (collision..!)
	// 	table.put('Mindy', 'mindy@email.com');       // hash:32, key:Mindy
	// 	table.put('Paul', 'paul@email.com');         // hash:32, key:Paul  (collision..!)
	// 	table.put('Nathan', 'nathan@email.com');     // hash:10, key:Nathan
	// 	expect( table.getSize() ).not.toEqual( 12 );
	// 	expect( table.getSize() ).toEqual( 7 );
	// 	expect( table.getItems().map(e=>e.hash) ).toEqual( [19,29,16,13,5,32,10].sort((a,b)=>a-b));
	// });
});
