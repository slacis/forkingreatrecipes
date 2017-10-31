import {Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // Pick-up recipe and index being passed in
@Input() recipe: Recipe;
@Input() index: number;

  ngOnInit() {
  }

}
