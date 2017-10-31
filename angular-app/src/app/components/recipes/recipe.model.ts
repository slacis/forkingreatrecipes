import {Ingredient} from '../../shared/ingredient.model';
import {CookMethod} from "../../shared/cookmethod.model";
import {CookTime} from "../../shared/cooktime.model";
export class Recipe {
  public _id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public user: string;
  //Refer to models for structure of these items
  public ingredients: Ingredient[];
  public cookmethod: CookMethod[];
  public cooktime: CookTime;


  // id is optional as we will need to read in the id when downloading from the database
  // but not for when we create a new item locally
  constructor(name: string, desc: string, imagePath: string, user: string, ingredients: Ingredient[], cookmethod: CookMethod[], cooktime: CookTime, _id?) {
    if(_id) {
      this._id = _id;
    }
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.user = user;
    this.ingredients = ingredients;
    this.cookmethod = cookmethod;
    this.cooktime = cooktime;
  }
}
