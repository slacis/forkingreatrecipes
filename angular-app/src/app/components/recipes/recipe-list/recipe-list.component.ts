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
  searchIngredients = []
  // OPTIONS: recipe or ingredient
  searchMethod = "recipe";
  recipeForm: FormGroup;
  private initForm() {
    const recipeIngredients = new FormArray([]);
    recipeIngredients.push(new FormGroup({
      'name': new FormControl(null, Validators.required)
    }))
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
          console.log(recipes)
        }
      )
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onRandomRecipe() {
    let randomIndex = String(Math.floor(Math.random() * this.recipes.length))
    this.router.navigate([randomIndex], {relativeTo: this.route})
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
        // 'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
      let tempArray = []
      this.recipeForm.value['ingredients'].forEach((ingredient) =>
      {
       tempArray.push(ingredient.name)
      })
    this.searchIngredients = tempArray
    console.log(this.searchIngredients)
  }

}
