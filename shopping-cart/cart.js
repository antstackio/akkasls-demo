import as from '@lightbend/akkaserverless-javascript-sdk';
const EventSourcedEntity = as.EventSourcedEntity;

const entity = new EventSourcedEntity(
    ['cart.proto', 'domain.proto'],
    "com.example.shoppingcart.ShoppingCartService",
    'cart',
    {
        snapshotEvery: 100,
        includeDirs: ['./'],
        serializeAllowPrimitives: true,
        serializeFallbackToJson: true
    }
);

const pkg = "ecommerce.persistence.";
const ItemAdded = entity.lookupType(pkg + 'ItemAdded');
const ItemRemoved = entity.lookupType(pkg + 'ItemRemoved');
const Cart = entity.lookupType(pkg + 'Cart');

entity.setInitial(userId => Cart.create({ items: [] }));

entity.setBehavior(cart => {
    return {
        commandHandlers: {
            AddItem: addItem,
            RemoveItem: removeItem,
            GetCart: getCart
        },
        eventHandlers: {
            ItemAdded: itemAdded,
            ItemRemoved: itemRemoved
        }
    };
});

function addItem(item, cart, ctx) {
    if (item.quantity < 1) {
        ctx.fail('Cannot add negative quantity to item ' + item.productId);
    } else {
        const itemAdded = ItemAdded.create({
            item: {
                productId: item.productId,
                name: item.name,
                quantity: item.quantity
            }
        });
        ctx.emit(itemAdded);
        return {};
    }
}

function removeItem(item, cart, ctx) {
    const existing = cart.items.find(existingItem => {
        return existingItem.productId === item.productId;
    });

    if (!existing) {
        ctx.fail('Item ' + item.productId + ' not in cart');
    } else {
        const itemRemoved = ItemRemoved.create({
            productId: item.productId
        });
        ctx.emit(itemRemoved);
        return {};
    }
}

function getCart(request, cart) {
    return cart;
}

function itemAdded(added, cart) {
    const existing = cart.items.find(item => {
        return item.productId === added.item.productId;
    });
    
    if (existing) {
        existing.quantity = existing.quantity + added.item.quantity;
    } else {
        cart.items.push(added.item);
    }

    return cart;
}

function itemRemoved(removed, cart) {
    cart.items = cart.items.filter(item => {
        return item.productId !== removed.productId;
    });

    return cart;
}

export default entity;
