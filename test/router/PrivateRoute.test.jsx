/** @jest-environment jsdom */

import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth"
import { PrivateRoute } from "../../src/router/PrivateRoute"


describe('Pruebas en el <PrivateRoute/>', () => { 

    test('debe de mostrar el children si no esta autenticado', () => { 

        Storage.prototype.setItem = jest.fn()

        const contextValue = {
            logged: true,
            user : {
                id: "ABC",
                name : "Juan Carlos"
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter >
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText("Ruta Privada")).toBeTruthy()
        expect(localStorage.setItem).toHaveBeenCalled()
        // screen.debug()
     })


 })