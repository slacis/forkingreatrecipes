import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[];
  searchTerm = '';
  searchIngredients = [];
  // OPTIONS: recipe or ingredient
  searchMethod = "recipe";
  recipeForm: FormGroup;
  totalCook = 500;
  totalCookTime = 500;
  //initializing page number p to one
  p: number = 1;

  //Initialize the form
  private initForm() {
    const recipeIngredients = new FormArray([]);
    recipeIngredients.push(new FormGroup({
      'name': new FormControl(null, Validators.required)
    }));
    this.recipeForm = new FormGroup({
      'ingredients': recipeIngredients
    })

  }

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.recipes;
    this.initForm();
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
  }

  // Navigate to new recipe page
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  // Display random recipe from list to user
  onRandomRecipe() {
    let randomIndex = String(Math.floor(Math.random() * this.recipes.length))
    this.router.navigate([randomIndex], {relativeTo: this.route})
  }

  // Destroy subscription
  ngOnDestroy () {
    this.subscription.unsubscribe()
  }

  // Add new ingredient to ingredient search
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    )
  }

  // Delete ingredient from ingredient search
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // Controls what happens when search is submitted
  onSubmit() {
    this.totalCookTime = this.totalCook
    if (this.searchMethod === 'ingredient'){
      let tempArray = []
      // Blank string for 0 index will result in ingredient search
      this.recipeForm.value['ingredients'].forEach((ingredient) =>
      {
        tempArray.push(ingredient.name)
      })
      this.searchIngredients = tempArray.slice()
    } else if (this.searchMethod === 'recipe') {
      // 0 Index having a value will result in recipe name search
      this.searchIngredients[0] = this.searchTerm
    }
  }

  // Clears search and shows all recipes for user
  onClear(){
    this.initForm();
    this.searchTerm = '';
    this.searchIngredients = []
  }

}
