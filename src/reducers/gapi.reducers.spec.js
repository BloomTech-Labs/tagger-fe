

// Run npm test -- --coverage (note extra -- in the middle) to include a coverage report like this:
// ADD TO PACKAGE.JSON
// RUN COVERAGE TEST

// {
//     "presets": ["@babel/preset-env"]
//   }



import React from 'react'
import reducer from './gapi.reducers'



describe('signedOutReducer reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })
    it('should handle SIGNED_OUT', () => {
        expect()
    })
})

describe('actions', () => {
    it('should create an action to SIGN OUT', () => {
      const state = 'signed out'
      const expectedAction = {
        state: state.SIGNED_OUT,
        state
      }
      expect(actions.signInStatusResult(text)).toEqual(expectedAction)
    })

    it('should change state to AUTH_IN_PROGRESS', () => {
        const state = 'auth_in_progress'
        const expectedAction = {
            state: state.AUTH_IN_PROGRESS,
            ...state
        }
        expect(actions.signInStatusResult().toEqual(expectedAction))
    })
  })