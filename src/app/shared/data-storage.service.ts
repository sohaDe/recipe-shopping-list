import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: "root"})
export class DataStorageService{
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService : AuthService){}

  //1 for save data
  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-shopping-list-f0532-default-rtdb.firebaseio.com/recipes.json', recipes)
    .subscribe(response => { console.log(response)})
  }
  //1 for fetch data
  fetchData(){
  //  return this.authService.user.pipe(take(1), exhaustMap(user =>{
    // return not subsc so i subscribe in header
    return this.http.get<Recipe[]>(
      'https://recipe-shopping-list-f0532-default-rtdb.firebaseio.com/recipes.json',

    ).pipe(
    // for ingredient if not existing

    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []}
      })
    }),tap(recipes => {
        // 3 for fetch data
      this.recipeService.setRecipes(recipes)

    })
  )}}

