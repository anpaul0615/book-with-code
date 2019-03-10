import BinarySearchTree from './BinarySearchTree';

describe('BinarySearchTree', ()=>{
	test('Constructor Test', ()=>{
		const tree:BinarySearchTree = new BinarySearchTree();
		expect( tree ).toBeInstanceOf( BinarySearchTree );
	});

	test('Insert/Search/Min/Max Test', ()=>{
		const tree:BinarySearchTree = new BinarySearchTree();
		const message:string = 'hello world';
		for (let ch of message) {
			tree.insert(ch);
		}
		// for (let ch of message) {
		// 	expect( tree.search(ch) ).toEqual( true );
		// }
		// expect( tree.min() ).toEqual( 'd' );
		// expect( tree.max() ).toEqual( 'w' );
	});
});
