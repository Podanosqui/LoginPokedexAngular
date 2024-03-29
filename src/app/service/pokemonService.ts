import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class PokemonService {
    getPokemonsData() {
        return [
            {
                id: 25,
                nome: 'Pikachu',
                descricao: 'Pokémon do tipo elétrico com alguma descrição sobre.',
                imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
                peso: 10,
                tipo: 'Elétrico',
                statusInvetario: 'Disponível',
                rating: 5
            },
            {
                id: 92,
                nome: 'Haunter',
                descricao: 'Pokémon do tipo fantasma com alguma descrição sobre.',
                imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/093.png',
                peso: 0.1,
                tipo: 'Fantasma',
                statusInvetario: 'Indisponível',
                rating: 3
            },
        ]
    }

    getPokemonsMini() {
        return Promise.resolve(this.getPokemonsData().slice(0, 5));
    }

    getPokemonsSmall() {
        return Promise.resolve(this.getPokemonsData().slice(0, 10));
    }

    getPokemons() {
        return Promise.resolve(this.getPokemonsData());
    }

    getPokemonsWithOrdersSmall() {
        return Promise.resolve(this.getPokemonsData().slice(0, 10));
    }

    getPokemonssWithOrders() {
        return Promise.resolve(this.getPokemonsData());
    }

};