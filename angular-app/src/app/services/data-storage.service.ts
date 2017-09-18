import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {RecipeService} from './recipe.service';
import {Response} from '@angular/http';
import {Recipe} from "../components/recipes/recipe.model";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";
import {Headers} from '@angular/http';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService,
              private authService: AuthService) {
  }

  // storeRecipes() {
  //   const token = this.authService.getToken();
  //   return this.http.put('https://udemy-tut-sim.firebaseio.com/recipe.json?auth=' + token,
  //   this.recipeService.recipes);
  // }
  getRecipes() {
    // const token = this.authService.getToken();
    return this.http.get('http://localhost:3000/scrape')
      .map(
        (response: Response) => {
          console.log(response)
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      )
  }

  scrapeRecipe(url) {
    // const token = this.authService.getToken();
    let scrapeURL = JSON.stringify({url: url})
    console.log('data' + scrapeURL)
    let headers = new Headers({
      'Content-Type': 'application/json'
    });


    return this.http.post('http://localhost:3000/scrapeurl', scrapeURL, {headers: headers})
      .map(
        (response: Response) => {
          console.log(response)
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.addRecipe(recipes[0]);
        }
      )
  }
}
