import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../dominio/pokemons';
import { PokemonService } from '../../service/pokemonService';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { StyleClassModule } from 'primeng/styleclass';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { trigger, query, style, transition, animate, stagger } from '@angular/animations';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, ToastModule, ConfirmDialogModule, ToolbarModule, FileUploadModule, RatingModule, FormsModule, ConfirmPopupModule, TagModule, DialogModule, StyleClassModule, MessagesModule, CommonModule, InputTextModule, DropdownModule, RadioButtonModule],
  templateUrl: './home.component.html',
  providers: [ConfirmationService, MessageService],
  styleUrl: './home.component.css',
  animations: [
    trigger('logoAni', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('100ms', [
          animate('1s', style({ opacity: 1 }))
        ]), { optional: true })
      ])
    ])
  ],
})

export class HomeComponent implements OnInit {
  pokemonDialogCreate: boolean = false;

  pokemonDialogEdit: boolean = false;

  pokemons!: Pokemon[];

  pokemon: Pokemon;

  selectedPokemons!: Pokemon[] | null;

  submitted: boolean = false;

  statuses!: any[];

  visible: boolean = false;

  value!: any;

  showDialog() {
    this.visible = true;
  }

  constructor(private pokemonService: PokemonService, private messageService: MessageService) {
    this.pokemon = {} as Pokemon;
  }

  ngOnInit() {
    this.pokemonService.getPokemons().then((data) => {
      this.pokemons = data;     
    });

    this.statuses = [
      { label: 'Disponível', value: 'disponivel' },
      { label: 'Indisponível', value: 'indisponivel' }
    ];
  }

  openNew() {
    this.pokemon = {};
    this.submitted = false;
    this.pokemonDialogCreate = true;
  }

  deleteSelectedPokemons() {
    console.log("Entrou");
    this.pokemons = this.pokemons.filter((val) => !this.selectedPokemons?.includes(val));
    this.selectedPokemons = null;
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pokemons deletados', life: 3000 });
  }

  editPokemon(pokemon: Pokemon) {
    this.pokemon = { ...pokemon };
    this.submitted = false;
    this.pokemonDialogEdit = true;
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemons = this.pokemons.filter((val) => val.id !== pokemon.id);
    this.pokemon = {};
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pekémon Deletado', life: 3000 });
  }

  hideDialog() {
    this.pokemonDialogCreate = false;
    this.pokemonDialogEdit = false;
    this.submitted = false;
  }

  saveNewPokemon() {
    this.submitted = true;

    const pokemonsExistente = this.pokemons.some(p => p.id === this.pokemon.id);

    if (pokemonsExistente) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Já existe um Pokémon com esse ID.', life: 3000 });
      return;
    }

    let pokemon: Pokemon = {
      id: this.pokemon.id,
      nome: this.pokemon.nome,
      descricao: this.pokemon.descricao,
      imagem: this.pokemon.imagem,
      peso: this.pokemon.peso,
      tipo: this.pokemon.tipo,
      statusInvetario: this.pokemon.statusInvetario,
    };
    this.pokemons.push(pokemon);
    this.pokemonDialogCreate = false;
    console.log(pokemon);
    console.log(this.pokemons);
  }

  saveEditedPokemon() {
    this.submitted = true;
    if (this.pokemon.id) {
      this.pokemons[this.findIndexById(this.pokemon.id)] = this.pokemon;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pokémon Atualizado', life: 3000 });
      this.pokemonDialogEdit = false;
    }
  }

  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.pokemons.length; i++) {
      if (this.pokemons[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(statusInvetario: string) {
    switch (statusInvetario) {
      case 'Disponível':
        return 'success';
      case 'Indisponível':
        return 'warning';
      default:
        return '';
    }
  }

}
