import { heroes } from "../data/heroes"

export const getHreroById = ( id ) => {

    return heroes.find( hero => hero.id === id)

}