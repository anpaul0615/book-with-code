import Stack from './Stack';

describe('Stack', ()=>{
	test('Constructor/Push Test', ()=>{
		const stack = new Stack();
		const numbers = [ 1, 2, 3, 4, 5 ];
		for (let n of numbers) {
			stack.push(n);
		}
	});
	
	test('Size/Peek/Pop Test', ()=>{
		const stack = new Stack();
		const numbers = [ 1, 2, 3, 4, 5 ];
		for (let n of numbers) {
			stack.push(n);
		}
		expect( stack.size() ).toEqual( numbers.length );
		expect( stack.peek() ).toEqual( numbers[(numbers.length - 1)] );
		expect( stack.pop() ).toEqual( numbers[(numbers.length - 1) - 0] );
		expect( stack.pop() ).toEqual( numbers[(numbers.length - 1) - 1] );
		expect( stack.pop() ).toEqual( numbers[(numbers.length - 1) - 2] );
	});

	test('IsEmpty/Clear Test', ()=>{
		const stack = new Stack();
		const numbers = [ 1, 2, 3, 4, 5 ];
		for (let n of numbers) {
			stack.push(n);
		}
		expect( stack.isEmpty() ).toEqual( false );
		stack.clear();
		expect( stack.isEmpty() ).toEqual( true );
		expect( stack.size() ).toEqual( 0 );
		expect( stack.peek() ).toEqual( null );
	});
});
