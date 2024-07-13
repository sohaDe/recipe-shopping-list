import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
subscription : Subscription;
editMode = false;
editedItemIndex : number
editedItem:Ingredient;
// #7 get the form 
@ViewChild('f') slForm :NgForm
constructor(private slService:ShoppingListService){}

// #4 listen to index and be in edit mode if it triggger
ngOnInit() {
  this.subscription = this.slService.startedEditing
  .subscribe(
    (index:number)=>{
      this.editedItemIndex = index;
      // we are in edit mode 
      this.editMode = true;
      // #6 get ingredient
      this.editedItem = this.slService.getIngredient(index);
      // #8 edit 
      this.slForm.setValue({
        name : this.editedItem.name,
        amount:this.editedItem.amount
      })
    }
  )
}

onSubmit(form: NgForm){
  const value = form.value;
  const newIngredient = new Ingredient(value.name,value.amount);
  // 2-for update 
  if(this.editMode){
    this.slService.updateIngredient(this.editedItemIndex,newIngredient);}
    else{
  // what i add to list by sl 

      this.slService.addIngredient(newIngredient);
    }
    // 3-for reset form we back to editmode=false 
    this.editMode = false;
    form.reset();
}

onClear(){
  this.slForm.reset();
  this.editMode = false;
}

onDelete(){
  this.slService.deleteIngredient(this.editedItemIndex);
  this.onClear();
}
ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
