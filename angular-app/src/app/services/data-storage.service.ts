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
  headers

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.headers = new Headers();
    this.authService.loadToken();
    this.headers.append('Authorization', this.authService.authToken)
    this.headers.append('Content-Type','application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }
//   storeRecipes() {
//   // const token = this.authService.getToken();
//   return this.http.put('https://udemy-tut-sim.firebaseio.com/recipe.json?auth=' + token,
//     this.recipeService.recipes);
// }

  getProfile(){

  }

  getRecipes() {
    // const token = this.authService.getToken();
    this.createAuthenticationHeaders();
    return this.http.get('http://localhost:3000/recipes',  {headers: this.headers})
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
    // let headers = new Headers({
    //   'Content-Type': 'application/json'
    // });
    this.createAuthenticationHeaders()


    return this.http.post('http://localhost:3000/scrapeurl', scrapeURL, {headers: this.headers})
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
