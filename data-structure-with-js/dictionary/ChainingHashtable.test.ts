import ChainingHashtable from './ChainingHashtable';

describe('ChainingHashtable', ()=>{
	test('Constructor Test', ()=>{
		const table:ChainingHashtable = new ChainingHashtable();
		expect( table ).toBeInstanceOf( ChainingHashtable );
	});

	test('Put without Collision Test (Simple)', ()=>{
		const table:ChainingHashtable = new ChainingHashtable();
		table.put('a',111); // hash:23(= 37*2 + 23 = 97 â†’ 'a')
		table.put('<',222); // hash:23(= 37*1 + 23 = 60 â†’ '<')
		table.put('o',333); // hash:0(= 37*2 + 0 = 111 â†’ 'o')
		table.put('J',444); // hash:0(= 37*2 + 0 = 74 â†’ 'J')
		expect( table.getSize() ).toEqual( 4 );
		expect( table.get('a') ).toEqual( 111 );
		expect( table.get('<') ).toEqual( 222 );
		expect( table.get('o') ).toEqual( 333 );
		expect( table.get('J') ).toEqual( 444 );
		expect( table.get('abc') ).not.toBeDefined( );
	});

	test('Put Same Key Test', ()=>{
		const table:ChainingHashtable = new ChainingHashtable();
		table.put('a', 1);
		table.put('a', 11);  // overwrite
		table.put('a', 111);  // overwrite
		table.put('b', 2);
		table.put('c', 3);
		expect( table.getSize() ).not.toEqual( 5 );
		expect( table.getSize() ).toEqual( 3 );
		expect( table.get('a') ).toEqual( 111 );
		expect( table.get('b') ).toEqual( 2 );
		expect( table.get('c') ).toEqual( 3 );
		expect( table.get('abc') ).not.toBeDefined( );
	});

	test('Put/Remove Test', ()=>{
		const table:ChainingHashtable = new ChainingHashtable();
		table.put('A', 1);
		table.put('A', 11);  // overwrite
		table.put('f', 111);  // append
		table.put('Z', 2);
		table.put('5', 22);  // append
		expect( table.getSize() ).not.toEqual( 5 );
		expect( table.getSize() ).toEqual( 4 );
		expect( table.get('A') ).toEqual( 11 );
		expect( table.get('f') ).toEqual( 111 );
		expect( table.get('Z') ).toEqual( 2 );
		expect( table.get('5') ).toEqual( 22 );
		table.remove('Z');
		expect( table.getSize() ).toEqual( 3 );
		table.remove('f');
		table.remove('A');
		expect( table.getSize() ).toEqual( 1 );
		table.remove('5');
		expect( table.getSize() ).toEqual( 0 );
		table.remove('5');
		table.remove('5');
		table.remove('5');
		expect( table.getSize() ).toEqual( 0 );
		expect( table.get('5') ).not.toBeDefined( );
	});

	test('Collision Test', ()=>{
		const table:ChainingHashtable = new ChainingHashtable();
		table.put('Gandalf', 'gandalf@email.com');   // hash:19, key:Gandalf
		table.put('John', 'johnsnow@email.com');     // hash:29, key:John
		table.put('Tyrion', 'tyrion@email.com');     // hash:16, key:Trion
		table.put('Aaron', 'aaron@email.com');       // hash:16, key:Aaron  (collision..!)
		table.put('Donnie', 'donnie@email.com');     // hash:13, key:Donnie
		table.put('Ana', 'ana@email.com');           // hash:13, key:Ana  (collision..!)
		table.put('Jonathan', 'jonathan@email.com'); // hash:5, key:Jonathan
		table.put('Jamie', 'jamie@email.com');       // hash:5, key:Jamie  (collision..!)
		table.put('Sue', 'sue@email.com');           // hash:5, key:Sue  (collision..!)
		table.put('Mindy', 'mindy@email.com');       // hash:32, key:Mindy
		table.put('Paul', 'paul@email.com');         // hash:32, key:Paul  (collision..!)
		table.put('Nathan', 'nathan@email.com');     // hash:10, key:Nathan
		expect( table.getSize() ).toEqual( 12 );
	});
});
