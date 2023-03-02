import { authReducer } from "../../../src/auth/context/AuthReducer"
import { types } from "../../../src/auth/types/types"

describe('pruebas en el AuthReducer', () => { 
    
    test('debe retornar el estado por defecto', () => { 
        
        const state = authReducer({logged : false}, {})

        expect(state).toEqual({logged: false})

     })

     test('debe de (login) llamar el login autenticar y establer el user', () => {

        const action = {
            type: types.login,
            payload: {
                name: "Juan",
                id: "123"
            }
        }

        const state = authReducer({logged: true}, action)

        expect( state).toEqual({
            logged: true,
            user: action.payload
        })
        
      })

      test('debe de borrar el name de usuario y logged en false', () => { 
        
        const state = {
            logged : true,
            user: {id: "123", name: "Juan"}
        }

        const action = {
            type: types.logout
        }

        const newState = authReducer( state, action )

        expect( newState ).toEqual({logged: false})

       })
 })