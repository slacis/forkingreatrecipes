import {Ingredient} from '../../shared/ingredient.model';
import {CookMethod} from "../../shared/cookmethod.model";
import {CookTime} from "../../shared/cooktime.model";
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public user: string;
  public ingredients: Ingredient[];
  public cookmethod: CookMethod[];
  public cooktime: CookTime;



  constructor(name: string, desc: string, imagePath: string, user: string, ingredients: Ingredient[], cookmethod: CookMethod[], cooktime: CookTime) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.user = user;
    this.ingredients = ingredients;
    this.cookmethod = cookmethod;
    this.cooktime = cooktime;
  }
}
