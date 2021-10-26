import { MockEventSourcedEntity } from './testkit.js';
import { expect } from 'chai';
import users from '../users.js';

describe('Test Users', () => {
    const entityId = '1';
    const newUser = { 'id': entityId, 'name': 'akshi', 'emailAddress': 'akshi@abc.com'}

    describe('Commands', () => {
        it('Should add a user...', () => {
            const entity = new MockEventSourcedEntity(users, entityId);
            const result = entity.handleCommand('AddUser', newUser);

            expect(result).to.deep.equal(newUser);

            expect(entity.error).to.be.undefined;

            expect(entity.state).to.deep.include(newUser);

            expect(entity.events.length).to.be.equal(1)
            expect(entity.events[0].constructor.name).to.be.equal('UserCreated')
            expect(entity.events[0]).to.deep.include(newUser);
        })
        // it('Should get user details...', () => {
        //     const entity = new MockEventSourcedEntity(users, entityId);
        //     let result = entity.handleCommand('AddUser', newUser);
        //     result = entity.handleCommand('GetUserDetails', entityId)

        //     expect(result).to.deep.equal(newUser);
        // })
    });

    describe('Events', () => {
        it('Should handle user created event...', () => {
            const entity = new MockEventSourcedEntity(users, entityId);

            function UserCreated(addUser) {
                this.id = addUser.id;
                this.name = addUser.name;
                this.emailAddress = addUser.emailAddress;
            }
            const result = entity.handleEvent(new UserCreated(newUser))

            expect(entity.error).to.be.undefined;
        })
    })
});
