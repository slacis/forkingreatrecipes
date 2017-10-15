import {Recipe} from '../components/recipes/recipe.model';
import { Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';
import {CookMethod} from "../shared/cookmethod.model";
import {DataStorageService} from "./data-storage.service"
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private _recipes:
    Recipe[] = [
    // new Recipe('Chocolate Poo',
    //   'Poo and chocolate yum',
    //   'http://uploads.neatorama.com/wp-content/uploads/2010/10/doodrops1.jpg',
    //   'user',
    //   [
    //     new Ingredient('2 meats'),
    //     new Ingredient('3 dogs')
    //   ],
    //   [
    //     new CookMethod(1, 'do a shit into a cup'),
    //     new CookMethod(2, 'mix it the fuck up'),
    //     new CookMethod(3, 'make the food')
    //   ],
    // ),

  ];

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this._recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this._recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
