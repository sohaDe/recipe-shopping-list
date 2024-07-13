import {  Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
@Injectable ()
export class RecipeService{
  // before i add or update recipe we need to save the new slice of recipes so i add recipechange and subscribe in recipeListComTs
  recipeChanged = new Subject<Recipe[]>();

  // private  recipes : Recipe[]=[
  //       new Recipe('Recipe','A test'
  //       ,'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'
  //     ,[new Ingredient('meat',2),new Ingredient('cheese',2)])

  //       ,new Recipe('Another Recipe',
  //       'Another test','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_XgSXFZMJD5ecAqJymh8I-y0g4cpc-wZVGWnySefdMw&s'
  //     ,[new Ingredient('meat',2),new Ingredient('cheese',2)]
  //     ,)
  //     ];
private recipes : Recipe[] = []

      constructor(private slService:ShoppingListService){}

      // 2 for fetch data make overwrite for recipes
      setRecipes(recipes: Recipe[]){
        this.recipes = recipes
        this.recipeChanged.next(this.recipes.slice())
      }
      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index:number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients:Ingredient[] ){
          this.slService.addIngredients(ingredients)
      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice())
      }
}

