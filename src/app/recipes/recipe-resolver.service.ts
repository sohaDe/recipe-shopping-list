import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";


@Injectable({providedIn: "root"})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService,private recipesService:RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const recipes = this.recipesService.getRecipes();
      if(recipes.length === 0){
        // resolve subscr so i need add it in router
        return  this.dataStorageService.fetchData()
      }
    }
}
