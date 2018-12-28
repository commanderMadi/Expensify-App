import { login, logout } from '../../actions/auth';

test('should generate the login action object', ()=> {
    const uid = expect.any(String);
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('should generate the logout action object', ()=> {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT',
    });
}); 