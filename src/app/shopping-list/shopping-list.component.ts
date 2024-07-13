import { Component, OnDestroy, OnInit, numberAttribute } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();

    this.igChangSub = this.slService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => { this.ingredients = ingredients });
  }

  // #3emit index send index so listen to this value from other place(edit-shopp)
  onEditItem(index : number){
    this.slService.startedEditing.next(index)
  }

  
  ngOnDestroy(): void {
    this.igChangSub.unsubscribe();
  }

}
