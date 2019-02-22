import Stack from './Stack';

describe('Stack Application', ()=>{
	test('Number System Conversion Test', ()=>{
		const decimalToBinary = function(decimal: number): string  {
			if (decimal === 0) {
				return '0';
			}
			let remainderStack = new Stack();
			let remainder = 0;
			let binaryString = '';
			while (decimal > 0) {
				remainder = Math.floor(decimal % 2);
				remainderStack.push(remainder);
				decimal = Math.floor(decimal / 2);
			}
			while (!remainderStack.isEmpty()) {
				binaryString += remainderStack.pop().toString();
			}
			return binaryString.toString();
		};
		expect( decimalToBinary(0) ).toBe( Number(0).toString(2) );
		expect( decimalToBinary(1) ).toBe( Number(1).toString(2) );
		expect( decimalToBinary(2) ).toBe( Number(2).toString(2) );
		expect( decimalToBinary(3) ).toBe( Number(3).toString(2) );
		expect( decimalToBinary(7) ).toBe( Number(7).toString(2) );
		expect( decimalToBinary(8) ).toBe( Number(8).toString(2) );
		expect( decimalToBinary(10) ).toBe( Number(10).toString(2) );
		expect( decimalToBinary(100) ).toBe( Number(100).toString(2) );
		expect( decimalToBinary(1000) ).toBe( Number(1000).toString(2) );
		expect( decimalToBinary(1024) ).toBe( Number(1024).toString(2) );
	});

	// test('Number System Conversion Test', ()=>{

	// 	const decimalConverter = function(decimal: number, base: number): string {
	// 		return '';
	// 	};

	// 	const stack = new Stack(10);
	// 	const numbers = [ 1, 2, 3, 4, 5 ];
	// 	for (let n of numbers) {
	// 		stack.push(n);
	// 	}
	// });
	
});
