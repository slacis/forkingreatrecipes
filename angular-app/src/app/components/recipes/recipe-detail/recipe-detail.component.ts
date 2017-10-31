import {Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {DataStorageService} from "../../../services/data-storage.service";

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
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
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

  //Bring us to the edit recipe route
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  //Deletes a recipe
  onDeleteRecipe() {
    this.dataStorageService.deleteRecipe(this.recipe);
    // this.recipeService.deleteRecipe(+this.id);
    this.router.navigate(['/recipes'])
  }

}
