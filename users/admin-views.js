import as from '@lightbend/akkaserverless-javascript-sdk';
const View = as.View;

const adview = new View(
    ['users.proto', 'domain.proto'],
    'ecommerce.AdminInterface',
    {
        viewId: "admin-view"
    }
);

adview.setUpdateHandlers({
    ProcessUserCreated: user_created
});

function user_created(event, state, ctx) {
    console.log(`Adding user ${event.name} to admin table.`);
    return {
        "id": event.id,
        "name": event.name,
        "emailAddress": event.emailAddress
    }
}

export default adview;
