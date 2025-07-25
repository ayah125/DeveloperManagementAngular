import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WorkspaceService {
  lists: List[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  addList(title: string) {
    this.lists.push({ title, cards: [] });
    this.saveToLocalStorage();
  }

  addCard(listIndex: number, title: string) {
    this.lists[listIndex].cards.push({ title });
    this.saveToLocalStorage();
  }

  renameList(index: number, newTitle: string) {
    this.lists[index].title = newTitle;
    this.saveToLocalStorage();
  }

  deleteList(index: number) {
    this.lists.splice(index, 1);
    this.saveToLocalStorage();
  }

  renameCard(listIndex: number, cardIndex: number, newTitle: string) {
    this.lists[listIndex].cards[cardIndex].title = newTitle;
    this.saveToLocalStorage();
  }

  deleteCard(listIndex: number, cardIndex: number) {
    this.lists[listIndex].cards.splice(cardIndex, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('lists');
    if (data) this.lists = JSON.parse(data);
  }
}
export interface Card {
  title: string;
}

export interface List {
  title: string;
  cards: Card[];
}
