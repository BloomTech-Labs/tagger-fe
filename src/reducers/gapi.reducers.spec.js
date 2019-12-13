
// Run npm test -- --coverage (note extra -- in the middle) to include a coverage report like this:
// ADD TO PACKAGE.JSON
// RUN COVERAGE TEST

// {
//     "presets": ["@babel/preset-env"]
//   }

describe('signedOutReducer reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual([
            {}
        ])
    })
    it('should handle SIGNED_OUT', () => {
        expect()
    })
})

describe('actions', () => {
    it('should create an action to add a todo', () => {
      const state = 'signed out'
      const expectedAction = {
        state: state.SIGNED_OUT,
        state
      }
      expect(actions.signInStatusResult(text)).toEqual(expectedAction)
    })
  })