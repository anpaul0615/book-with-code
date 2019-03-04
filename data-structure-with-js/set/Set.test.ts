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

	test('Union Test', ()=>{
		const fiboSet = new Set();
		const fiboNumbers = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ];
		for (let n of fiboNumbers) {
			fiboSet.add(n);
		}
		const naturalSet = new Set();
		const naturalNumbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		for (let n of naturalNumbers) {
			naturalSet.add(n);
		}
		expect( fiboSet.getSize() ).toEqual( 9 );
		expect( naturalSet.getSize() ).toEqual( 9 );
		const unionSet = fiboSet.union(naturalSet);  // [ 1,2,3,4,5,6,7,8,9,13,21,34,55 ]
		expect( unionSet ).toBeInstanceOf( Set );
		expect( unionSet.getSize() ).toEqual( 13 );
		const expectedValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 21, 34, 55 ];
		for (let v of expectedValues) {
			expect( unionSet.has(v) ).toEqual( true );
		}
		for (let v of unionSet.getValues()) {
			expect( expectedValues.indexOf(v) !== -1 ).toEqual( true );
		}
	});

	test('Intersection Test', ()=>{
		const fiboSet = new Set();
		const fiboNumbers = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ];
		for (let n of fiboNumbers) {
			fiboSet.add(n);
		}
		const naturalSet = new Set();
		const naturalNumbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		for (let n of naturalNumbers) {
			naturalSet.add(n);
		}
		expect( fiboSet.getSize() ).toEqual( 9 );
		expect( naturalSet.getSize() ).toEqual( 9 );
		const intersectionSet = fiboSet.intersection(naturalSet);  // [ 1,2,3,5,8 ]
		expect( intersectionSet ).toBeInstanceOf( Set );
		expect( intersectionSet.getSize() ).toEqual( 5 );
		const expectedValues = [ 1, 2, 3, 5, 8 ];
		for (let v of expectedValues) {
			expect( intersectionSet.has(v) ).toEqual( true );
		}
		for (let v of intersectionSet.getValues()) {
			expect( expectedValues.indexOf(v) !== -1 ).toEqual( true );
		}
	});

	test('Difference Test', ()=>{
		const fiboSet = new Set();
		const fiboNumbers = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ];
		for (let n of fiboNumbers) {
			fiboSet.add(n);
		}
		const naturalSet = new Set();
		const naturalNumbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		for (let n of naturalNumbers) {
			naturalSet.add(n);
		}
		expect( fiboSet.getSize() ).toEqual( 9 );
		expect( naturalSet.getSize() ).toEqual( 9 );
		const differenceSet = fiboSet.difference(naturalSet);  // [ 13,21,34,55 ]
		expect( differenceSet ).toBeInstanceOf( Set );
		expect( differenceSet.getSize() ).toEqual( 4 );
		const expectedValues = [ 13, 21, 34, 55 ];
		for (let v of expectedValues) {
			expect( differenceSet.has(v) ).toEqual( true );
		}
		for (let v of differenceSet.getValues()) {
			expect( expectedValues.indexOf(v) !== -1 ).toEqual( true );
		}
	});

	test('Subset Test', ()=>{
		const fiboSet = new Set();
		const fiboNumbers = [ 1, 1, 2, 3, 5, 8 ];
		for (let n of fiboNumbers) {
			fiboSet.add(n);
		}
		const naturalSet = new Set();
		const naturalNumbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		for (let n of naturalNumbers) {
			naturalSet.add(n);
		}
		expect( fiboSet.getSize() ).toEqual( 5 );
		expect( naturalSet.getSize() ).toEqual( 9 );
		expect( fiboSet.subset(naturalSet) ).toEqual( true );
	});
});
