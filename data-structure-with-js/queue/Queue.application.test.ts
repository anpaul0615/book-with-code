import CircularQueue from './CircularQueue';

describe('Queue Application', ()=>{
	test('Hot Potato Game Test', ()=>{
		const hotPotato = function(players:Array<string>, count:number):string  {
			let queue = new CircularQueue(players.length + 1);
			for (let i = 0; i < players.length; i++) {
				queue.enqueue(players[i]);
			}
			let eliminated = '';
			while (queue.getSize() > 1) {
				for (let i = 0; i < count; i++) {
					queue.enqueue(queue.dequeue());
				}
				eliminated = queue.dequeue();
				console.log(`${eliminated} is eliminated..!`);
			}
			return queue.dequeue();
		};
		const players = [ 'Anna', 'Bob', 'Camila', 'Dave', 'Eric', 'Fiona' ];
		const winner = hotPotato(players, 3);
		expect( winner ).toBe( 'Eric' );
	});
});
