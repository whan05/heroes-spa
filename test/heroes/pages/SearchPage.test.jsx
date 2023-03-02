/** @jest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <Search Page />', () => {

    beforeEach(() => jest.clearAllMocks());
    
    test('debe de mostrarse correctamente con valores por defecto', () => {
        const {container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot()


    });

    test('debe mostrar a Batman y el input con el valor de queryString', () => {

        render(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <SearchPage/>
            </MemoryRouter>
        )
        const input = screen.getByRole("textbox")

        expect( input.value ).toBe("batman")
        const img = screen.getByRole("img")
        expect(img.src).toContain(`/src/assets/heroes/dc-batman.jpg`)

    });

    test('debe mostrar un error si no se encuentra el hero', () => {

        render(
            <MemoryRouter initialEntries={["/search?q=batman123"]}>
                <SearchPage/>
            </MemoryRouter>
        )
        
        const alert = screen.getByLabelText("alert-danger")
        expect(alert.textContent).toBe("No Hero with batman123")
        
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        
        render(
            <MemoryRouter initialEntries={["/search"]}>
                <SearchPage/>
            </MemoryRouter>
        )

        const input = screen.getByRole("textbox")
        fireEvent.change( input, {target: {name: "searchText", value : "superman"}})
        
        const form =  screen.getByLabelText("form")
        fireEvent.submit(form)

        expect( mockedUseNavigate ).toHaveBeenCalled()
        expect( mockedUseNavigate ).toHaveBeenCalledWith("?q=superman")


    });

});