import authReducer from '../../reducers/auth';

test('should dispatch with default values', ()=>{
    const state = authReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({});
});

test('should set the user id into the state upon login', ()=>{
    const defState = {};
    const action = {
        type: 'LOGIN',
        uid: expect.any(String)
    }
    const state = authReducer(defState,action);
    expect(state).toEqual({
        uid: action.uid
    });
});

test('should remove the user id and set an empty object upon logout', ()=>{
    const defState = {uid: expect.any(String)};
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer(defState,action);
    expect(state).toEqual({});
});
