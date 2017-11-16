import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../recipe.model';
import {DataStorageService} from "../../../services/data-storage.service";
import {CookTime} from "../../../shared/cooktime.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private dataStorageService: DataStorageService) { }
  inputMethod = "scrape";
  scrapeURL

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }
  //Initialize form for editing
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    const recipeMethod = new FormArray([]);
    const recipecookTime = new FormArray([]);
    // If we're not in edit mode, populate the cooktimes to 0
    if (!this.editMode){
      recipecookTime.push(
        new FormGroup({
          'cookTime': new FormControl(0, Validators.required),
          'prepTime': new FormControl(0, Validators.required),
        }));
    }
    //If we're in edit mode, read in the values of the recipe into initialized form
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipecookTime.push(
        new FormGroup({
          'cookTime': new FormControl(recipe.cooktime.cookTime, Validators.required),
          'prepTime': new FormControl(recipe.cooktime.prepTime, Validators.required),
        }));

      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
            })
          )
        }
      }
      if (recipe['cookmethod']) {
        for (const method of recipe.cookmethod) {
          recipeMethod.push(
            new FormGroup({
              'stepNo': new FormControl(method.stepNo, Validators.required),
              'explanation': new FormControl(method.explanation, Validators.required),
              // 'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
      'cookmethod': recipeMethod,
      'cooktime': recipecookTime
    })
    var arrayControl = this.recipeForm.get('cooktime').get('controls')
  }

  // Controls how form is submitted
  onSubmit() {
    //If this is a new recipe, no id is generated as this is done by mongo
    var id = ''
    if (this.editMode) {
      id = this.recipeService.getRecipe(this.id)._id;
    } else {
      id = '0';
    }
    const cookTime = new CookTime(this.recipeForm.value['cooktime'][0].prepTime,
      this.recipeForm.value['cooktime'][0].cookTime)
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      localStorage.getItem('user')['_id'],
      this.recipeForm.value['ingredients'],
      this.recipeForm.value['cookmethod'],
      cookTime,
      id)
    ;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe)
      this.dataStorageService.updateRecipe(newRecipe)
    } else {
      this.dataStorageService.addRecipe(newRecipe)
      // this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  // Adds a new form control into the ingredients form group
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    )
  }

  // Adds new form control into cook method form group
  onAddStep() {
    (<FormArray>this.recipeForm.get('cookmethod')).push(
      new FormGroup({
        'stepNo': new FormControl(null, Validators.required),
        'explanation': new FormControl(null, Validators.required),
        // 'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  // Cancels editing the recipe
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  // Deletes form control from ingredients form array
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  // Deletes form control from cook method form array
  onDeleteMethod(index: number) {
    (<FormArray>this.recipeForm.get('cookmethod')).removeAt(index);
  }

  // Scrapes a recipe from the given URL
  // Currently supports taste.com.au and delicious.com.au
  onScrape() {
    this.dataStorageService.scrapeRecipe(this.scrapeURL);
  }
}
