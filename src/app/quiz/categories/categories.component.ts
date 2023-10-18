import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizService } from '../../shared/services/quiz.service';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public categories: any[] = [];
  public playerName = '';
  public search = '';

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.initializePlayerName();
  }

  public navigateToCategory(id: number): void {
    this.router.navigate([`/quiz/${this.playerName}/${id}`]);
  }

  public resetSearch(): void {
    this.search = '';
    this.loadCategories();
  }

  public loadCategories(): void {
    this.categoriesService
      .getCategories(this.search)
      .subscribe((categories: any) => {
        this.categories = categories;
      });
  }

  private initializePlayerName(): void {
    this.route.params.subscribe((params) => {
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
    });
  }
}
