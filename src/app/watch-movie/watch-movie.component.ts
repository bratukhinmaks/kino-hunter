import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.model';
import { MoviesService } from '../shared/movies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { yo } from '../../script.js'

@Component({
  selector: 'app-watch-movie',
  templateUrl: './watch-movie.component.html',
  styleUrls: ['./watch-movie.component.scss']
})
export class WatchMovieComponent implements OnInit {
  movie: Movie;
  id: number;
  searchIdentifier: string;
  imgPath: string;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
  ) {

    this.id = +this.route.snapshot.params['id']
    this.movie = this.moviesService.getMovie(this.id)
    if (this.movie.title.length > 0) this.searchIdentifier += this.movie.title
    else if (this.movie.original_title.length > 0) this.searchIdentifier += ' / ' + this.movie.original_title;
    else if (this.movie.release_date.length > 0) this.searchIdentifier += '(' + this.movie.release_date.slice(0, 4) + ')'

    // this.searchIdentifier = `${this.movie.title} / ${this.movie.original_title} (${this.movie.release_date.slice(0, 4)})`
    this.imgPath = this.moviesService.httpConfig.imgBackgroundBaseUrl + this.movie.backdrop_path;
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.movie = this.moviesService.getMovie(this.id);
      })

  }

  ngOnInit() {
  }

  play() {
    yo();
  }

}
