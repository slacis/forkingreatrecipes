import {Http, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {RecipeService} from './recipe.service';
import {Response} from '@angular/http';
import {Recipe} from "../components/recipes/recipe.model";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";
import {Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService,
              private authService: AuthService) {
  }
  headers;
  server = 'https://forkingrate.slacis.me';
  // server = 'https://localhost:3000';
  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.headers = new Headers();
    this.authService.loadToken();
    this.headers.append('Authorization', this.authService.authToken);
    this.headers.append('Content-Type','application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');

  }


  // Handle errors
  private errorHandler(error: Response) {
    // console.error(error);
    // console.log(error)
    return Observable.throw(error || 'Error occurred')
  }


  addRecipe(recipe) {
    this.createAuthenticationHeaders()
    return this.http.post(this.server + '/recipe', recipe, {headers: this.headers})
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ).catch(this.errorHandler)
      .subscribe(
        (recipes: Recipe[]) => {
        }
      )
  }

  updateRecipe(recipe) {
    this.createAuthenticationHeaders();
    return this.http.put(this.server + '/recipe', recipe, {headers: this.headers})
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ).catch(this.errorHandler)
      .subscribe(
        (recipes: Recipe[]) => {
        }
      )
  }

  deleteRecipe(recipe) {
    this.createAuthenticationHeaders();
    let options = new RequestOptions({
      headers: this.headers,
      body: recipe
    });
    return this.http.delete(this.server + '/recipe', options)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ).catch(this.errorHandler)
      .subscribe(
        (recipes: Recipe[]) => {
        }
      )
  }

  getRecipes() {
    this.createAuthenticationHeaders();
    return this.http.get(this.server + '/recipe',  {headers: this.headers})
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ).catch(this.errorHandler)
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      )
  }

  scrapeRecipe(url) {
    // const token = this.authService.getToken();
    let scrapeURL = JSON.stringify({url: url})
    this.createAuthenticationHeaders()


    return this.http.post(this.server + '/scrapeurl', scrapeURL, {headers: this.headers})
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ).catch(this.errorHandler)
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.addRecipe(recipes[0]);
        }
      )
  }
}
