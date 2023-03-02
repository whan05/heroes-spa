/** @jest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate
}))

describe('Pruebas en el componente de <Navbar/>', () => { 
    
    const contextValue = {
        logged: true,
        user : {
            id: "ABC",
            name : "Juan"
        },
        logout : jest.fn()
    }

    beforeEach(() => jest.clearAllMocks())

    test('debe de mostrar el nombre del usuario Loggeado', () => { 

        
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getByText("Juan")).toBeTruthy()

     })

     test('debe de llamar el Logout y Navigate cuando se hace click en el Boton', () => { 

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const logoutBtn = screen.getByRole("button")
        fireEvent.click(logoutBtn)

        expect(contextValue.logout).toHaveBeenCalled()
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/login", {"replace": true})

      })
 })