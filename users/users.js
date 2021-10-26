import as from '@lightbend/akkaserverless-javascript-sdk';
const EventSourcedEntity = as.EventSourcedEntity;

const entity = new EventSourcedEntity(
    ['users.proto', 'domain.proto'],
    'ecommerce.UserService',
    'users',
    {
        includeDirs: ['./'],
        snapshotEvery: 100,
        serializeAllowPrimitives: true,
        serializeFallbackToJson: true
    }
);

const pkg = 'ecommerce.persistence.';
const UserCreated = entity.lookupType(pkg + 'UserCreated');
const User = entity.lookupType(pkg + 'User');

entity.setInitial(userId => User.create({
    id: '',
    name: '',
    emailAddress: ''
}));

entity.setBehavior(users => {
    return {
        commandHandlers: {
            AddUser: add_user
        },
        eventHandlers: {
            UserCreated: user_created
        }
    }
});

function add_user(newUser, userInfo, ctx) {
    console.log(`Creating a new user for ${newUser.id}`);

    const userCreated = UserCreated.create({
        id: newUser.id,
        name: newUser.name,
        emailAddress: newUser.emailAddress
    });

    ctx.emit(userCreated);

    return newUser
}

function user_created(newUser, userInfo) {
    console.log(`Persisting new user ${newUser.id} ${newUser.name}`);
    userInfo = newUser;
    return userInfo
}

export default entity;
