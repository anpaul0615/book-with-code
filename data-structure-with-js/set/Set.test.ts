import Set from './Set';

describe('Set', ()=>{
	test('Constructor Test', ()=>{
		const set:Set = new Set();
		expect( set ).toBeInstanceOf( Set );
	});

	test('Add/GetSize Test', ()=>{
		const set = new Set();
		expect( set.add(1) ).toEqual( true );
		expect( set.add(2) ).toEqual( true );
		expect( set.add(3) ).toEqual( true );
		expect( set.getSize() ).toEqual( 3 );
		expect( set.add(1) ).toEqual( false );
		expect( set.add(1) ).toEqual( false );
		expect( set.getSize() ).toEqual( 3 );
	});

	test('Remove/Has Test', ()=>{
		const set = new Set();
		const numbers = [ 1, 1, 2, 3, 5, 8 ];
		for (let n of numbers) {
			set.add(n);
		}
		expect( set.getSize() ).toEqual( 5 );
		expect( set.has(1) ).toEqual( true );
		expect( set.has(2) ).toEqual( true );
		expect( set.has(5) ).toEqual( true );
		expect( set.remove(1) ).toEqual( true );
		expect( set.getSize() ).toEqual( 4 );
		expect( set.has(1) ).toEqual( false );
		expect( set.has(-1) ).toEqual( false );
		expect( set.has(999) ).toEqual( false );
	});

	test('GetValues Test', ()=>{
		const set = new Set();
		const numbers = [ 1, 1, 2, 3, 5, 8 ];
		for (let n of numbers) {
			set.add(n);
		}
		const values = set.getValues();
		expect( values.length ).not.toEqual( numbers.length );
		expect( values.length ).toEqual( numbers.length - 1 );
		expect( values[0] ).toEqual( 1 );
		expect( values[1] ).toEqual( 2 );
		expect( values[2] ).toEqual( 3 );
		expect( values[3] ).toEqual( 5 );
		expect( values[4] ).toEqual( 8 );
	});
});
