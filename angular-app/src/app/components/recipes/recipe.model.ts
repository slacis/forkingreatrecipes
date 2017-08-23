import {Ingredient} from '../../shared/ingredient.model';
import {CookMethod} from "../../shared/cookmethod.model";
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public cookmethod: CookMethod[];

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[], cookmethod: CookMethod[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.cookmethod = cookmethod;
  }
}
