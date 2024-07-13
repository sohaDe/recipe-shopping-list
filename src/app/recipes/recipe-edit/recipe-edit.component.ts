import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
id:number
editMode =false;
// @1  define form
recipeForm :FormGroup
constructor(private route:ActivatedRoute, private recipeService: RecipeService, private router: Router){}

ngOnInit() {
  this.route.params.subscribe
  (
    (params:Params)=>
      {
        // retriving id
        this.id = +params['id'];
        // if we in new or edit mode
        this.editMode = params['id'] !=null;
        // console.log(this.editMode)
        // @3 call form method
        this.initForm()
      }
  )
}
onSubmit(){
    // const newRwcipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['descripion'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )instead of this we put this.recipeForm.value(reactive form)
    if (this.editMode) {
        this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    } else {
        this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel()
  }

// for add ingredient and it is form group
onAddIngrdient(){
 (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name':new FormControl(null, Validators.required),
      'amount':new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
})
  )
}

// مننتقل صفحة لورا مع العلم نحنا بنفس الصفحة الحالية باستخدام ريليتف تو
onCancel(){
  this.router.navigate(['../'], {relativeTo: this.route})
}

onDeleteIngredient(index:number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
}
// @2 init form and build it
private initForm(){
  let recipeName = '';
  let recipeImagePath= '';
  let recipeDescription= '';
  let recipeIngredients = new FormArray([]);

  // if we in edit mode we need to get recipe values
  if(this.editMode){
    const recipe = this.recipeService.getRecipe(this.id);
    recipeName= recipe.name;
    recipeImagePath= recipe.imagePath;
    recipeDescription = recipe.description;
    if(recipe['ingredients']){
      for(let ingredient of recipe.ingredients){
        recipeIngredients.push(
          new FormGroup({
            'name' :new FormControl(ingredient.name,Validators.required),
            'amount' :new FormControl(ingredient.amount,[
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        );
      }
    }
  }
  this.recipeForm = new FormGroup({
    // form group take key value for form control
    // if we in edit mode it will show the value else it empty ''
    'name': new FormControl(recipeName, Validators.required),
    'imagePath': new FormControl(recipeImagePath, Validators.required),
    'description': new FormControl(recipeDescription, Validators.required),
    'ingredients': recipeIngredients
    // now go to tml for connect to it
  })
}
}
