import as from '@lightbend/akkaserverless-javascript-sdk';
const View = as.View;

const view = new View(
    ['users.proto', 'domain.proto'],
    'ecommerce.UserInterface',
    {
        viewId: "user-interface-view"
    }
);

view.setUpdateHandlers({
    ProcessUserCreated: user_created
});

function user_created(event, state, ctx) {
    if (state !== undefined) {
        console.log(`${state.name} is already a user.`);
        return state;
    } else {
        console.log(`Adding ${event.name} as a new user.`);
        return event;
    }
}

export default view;
