import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  // here we dont use subject for emit to load recipe we use routerlink
  // selectedRecipe:Recipe

  // constructor(private recipeService:RecipeService){}

  ngOnInit()  {
  // this.recipeService.recipeSelected
  //       .subscribe((recipe:Recipe)=>{
  //         this.selectedRecipe = recipe
  //       }

  // );

  }

}
