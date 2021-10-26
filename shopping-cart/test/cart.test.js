import { MockEventSourcedEntity } from './testkit.js';
import { expect } from 'chai';
import cart from '../cart.js';

describe('Test Warehouse', () => {
    const entityId = '1';
    const newItem = { 'userId': entityId, 'productId': 'dogbed', 'name': 'comfy dog bed', 'quantity': 2}
    const removeItem = { 'userId': entityId, 'productId': 'dogbed'}

    describe('Commands', () => {
        it('Should add an item...', () => {
            const entity = new MockEventSourcedEntity(cart, entityId);
            const result = entity.handleCommand('AddItem', newItem);

            expect(result).to.be.empty;

            expect(entity.error).to.be.undefined;

            expect(entity.state.items[0].name).to.equal(newItem.name);
            console.log(entity.state.items[0]);
            expect(entity.events.length).to.be.equal(1);
            expect(entity.events[0].constructor.name).to.be.equal('ItemAdded')
        })
        it('Should remove an item...', () => {
            const entity = new MockEventSourcedEntity(cart, entityId);
            let result = entity.handleCommand('AddItem', newItem);
            result = entity.handleCommand('RemoveItem', removeItem);

            expect(result).to.be.empty;

            expect(entity.error).to.be.undefined;

            expect(entity.events.length).to.be.equal(2)
            expect(entity.events[0].constructor.name).to.be.equal('ItemAdded')
            expect(entity.events[1].constructor.name).to.be.equal('ItemRemoved')
        })
        it('Should get cart...', () => {
            const entity = new MockEventSourcedEntity(cart, entityId);
            let result = entity.handleCommand('AddItem', newItem);
            result = entity.handleCommand('GetCart', { userId: entityId });

            expect(result).to.not.be.empty;

            expect(entity.error).to.be.undefined;
        })
    });

    describe('Events', () => {
        it('Should handle an item added event...', () => {
            const entity = new MockEventSourcedEntity(cart, entityId);

            function ItemAdded(addItem) {
                this.item = {
                    productId: addItem.productId,
                    name: addItem.name,
                    quantity: addItem.quantity
                }
            }
            const result = entity.handleEvent(new ItemAdded(newItem))

            expect(entity.error).to.be.undefined;

            expect(entity.state.items[0].name).to.be.equal(newItem.name);
        })
        it('Should handle an item removed event...', () => {
            const entity = new MockEventSourcedEntity(cart, entityId);

            function ItemAdded(addItem) {
                this.item = {
                    productId: addItem.productId,
                    name: addItem.name,
                    quantity: addItem.quantity
                }
            }
            let result = entity.handleEvent(new ItemAdded(newItem))

            expect(entity.error).to.be.undefined;

            function ItemRemoved(removeItem) {
                this.productId = removeItem.productId
            }

            result = entity.handleEvent(new ItemRemoved(newItem))

            expect(entity.error).to.be.undefined;
            expect(entity.events[0].constructor.name).to.be.equal('ItemAdded')
            expect(entity.events[1].constructor.name).to.be.equal('ItemRemoved')
        })
    })
});
