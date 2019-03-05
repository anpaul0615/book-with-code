import Dictionary from './Dictionary';

describe('Dictionary', ()=>{
	test('Constructor Test', ()=>{
		const dict:Dictionary = new Dictionary();
		expect( dict ).toBeInstanceOf( Dictionary );
	});

	test('Set/Get Test', ()=>{
		const dict:Dictionary = new Dictionary();
		dict.set('a', 1);
		dict.set('b', 2);
		dict.set('c', 3);
		expect( dict.getSize() ).toEqual( 3 );
		dict.set('a', 99);
		dict.set('a', 999);
		expect( dict.getSize() ).toEqual( 3 );
		expect( dict.get('a') ).toEqual( 999 );
		expect( dict.get('b') ).toEqual( 2 );
		expect( dict.get('c') ).toEqual( 3 );
	});

	test('Get/Has/Remove Test', ()=>{
		const dict:Dictionary = new Dictionary();
		const names = [ 'Anna', 'Bob', 'Chris', 'Denny', 'Elice' ];
		for (let [ idx, name ] of names.entries()) {
			dict.set(name , idx);
		}
		expect( dict.getSize() ).toEqual( 5 );
		expect( dict.get(names[0]) ).toEqual( 0 );
		expect( dict.get(names[1]) ).toEqual( 1 );
		expect( dict.get(names[2]) ).toEqual( 2 );
		expect( dict.has(names[0]) ).toEqual( true );
		expect( dict.has(names[1]) ).toEqual( true );
		expect( dict.has(names[2]) ).toEqual( true );
		expect( dict.remove(names[0]) ).toEqual( true );
		expect( dict.getSize() ).toEqual( 4 );
		expect( dict.has('Paul') ).toEqual( false );
		expect( dict.has('HongGilDong') ).toEqual( false );
	});

	test('GetValues/GetKeys Test', ()=>{
		const dict:Dictionary = new Dictionary();
		const names = [ 'Anna', 'Bob', 'Chris', 'Denny', 'Elice' ];
		for (let [ idx, name ] of names.entries()) {
			dict.set(name , idx);
		}
		const values = dict.getValues();
		expect( values.length ).toEqual( names.length );
		expect( values[0] ).toEqual( values[0] );
		expect( values[1] ).toEqual( values[1] );
		expect( values[2] ).toEqual( values[2] );
		const keys = dict.getKeys();
		expect( keys.length ).toEqual( values.length );
		for (let [ idx, key ] of keys.entries()) {
			expect( key ).toEqual( names[idx] );
		}
	});
});
