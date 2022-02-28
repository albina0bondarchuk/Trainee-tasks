export class CreateStore {
    constructor(reducer, initialState) {
        this.state = reducer(initialState, '_INIT_');
        this.subscribers = [];
        this.reducer = reducer
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.subscribers.forEach(sub => {
            sub()
        })
    }

    getState() {
        return this.state
    }
}