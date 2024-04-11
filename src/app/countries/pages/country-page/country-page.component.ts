import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {
[x: string]: any;

  public country?: Country;

  constructor(private countriesService: CountriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => this.countriesService.searchCountryByAlphaCode(params['id'])
        .subscribe(country => {
          if (country) {
            console.log("Tenemos un país");
            this.country = country;
          }
          else {
            this.router.navigateByUrl("");
          }
        })
    );
  }
}
