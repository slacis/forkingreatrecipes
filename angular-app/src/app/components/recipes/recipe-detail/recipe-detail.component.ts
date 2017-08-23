import {Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import {Ingredient} from '../../../shared/ingredient.model';
// import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: string;
  paramsSubscription: Subscription;
  constructor(
    // private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(+this.id)
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.recipe = this.recipeService.getRecipe(+this.id)
        }
      )
  }

  // toShoppingList(ingredients: Ingredient[]) {
  //   this.shoppingListService.onAddRecipeIngredients(ingredients);
  // }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(+this.id);
    this.router.navigate(['/recipes'])
  }

}
