import BinarySearchTree from './BinarySearchTree';

describe('BinarySearchTree', ()=>{
	test('Constructor Test', ()=>{
		const tree:BinarySearchTree<string> = new BinarySearchTree<string>();
		expect( tree ).toBeInstanceOf( BinarySearchTree );
	});

	test('Insert/Search/Min/Max Test', ()=>{
		const tree:BinarySearchTree<string> = new BinarySearchTree<string>();
		const message:string = 'hello world';
		for (let ch of message) {
			tree.insert(ch);
		}
		for (let ch of message) {
			expect( tree.search(ch) ).toEqual( true );
		}
		expect( tree.search('Z') ).toEqual( false );
		expect( tree.min() ).toEqual( ' ' );
		expect( tree.max() ).toEqual( 'w' );
	});

	test('Remove Test', ()=>{
		const tree:BinarySearchTree<string> = new BinarySearchTree<string>();
		const message:string = 'hello world';
		for (let ch of message) {
			tree.insert(ch);
		}
		expect( tree.search('h') ).toEqual( true );
		tree.remove('h');
		expect( tree.search('h') ).toEqual( false );
	});
});
