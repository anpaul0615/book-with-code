import Stack from './Stack';

describe('Stack Application', ()=>{
	describe('Number System Conversion', ()=>{
		test('Decimal To Binary Test', ()=>{
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
				return binaryString;
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

		test('Decimal To Binary/Octal/Hexadecimal Test', ()=>{
			const decimalToOtherBase = function(decimal: number, base: number): string  {
				if ([2,8,16].indexOf(base) === -1) {
					throw Error('not supported base..!');
				}
				if (decimal === 0) {
					return '0';
				}
				let remainderStack = new Stack();
				let remainder = 0;
				let binaryString = '';
				while (decimal > 0) {
					remainder = Math.floor(decimal % base);
					remainderStack.push(remainder);
					decimal = Math.floor(decimal / base);
				}
				const digits = '0123456789ABCDEF';
				while (!remainderStack.isEmpty()) {
					binaryString += digits[remainderStack.pop()];
				}
				return binaryString;
			};
			expect( decimalToOtherBase(0,2) ).toBe( Number(0).toString(2) );
			expect( decimalToOtherBase(123,2) ).toBe( Number(123).toString(2) );
			expect( decimalToOtherBase(456,8) ).toBe( Number(456).toString(8) );
			expect( decimalToOtherBase(789,16) ).toBe( Number(789).toString(16) );
		});
	});
});
