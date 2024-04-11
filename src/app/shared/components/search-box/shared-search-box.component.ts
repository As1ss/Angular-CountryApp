import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Region } from '../../../countries/interfaces/region.type';

@Component({
  selector: 'shared-search-box',
  templateUrl: 'shared-search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Output()
  messageSearched = new EventEmitter<string>();

  @Output()
  messageDebounce = new EventEmitter<string>();

  @Input()
  placeholder: string = '';

  @Input()
  public initialValue: string = '';



  sendMessage(value: string): void {
    this.messageSearched.emit(value);
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => this.messageDebounce.emit(value));
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }
}
