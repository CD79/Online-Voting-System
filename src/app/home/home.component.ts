import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  products = [];
  votes = 0;
  idx;
  uvflag: boolean = false;
  dvflag: boolean = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{  
      console.log(res);  
      this.products = res.body;  
    }) 
  }
  public firstPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
  public previousPage() {

    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }

  }
  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }
  }
  public lastPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
  public onUpvoteClick(product){
    this.votes = product.vote_count;
    if(this.uvflag == false)
    {
      this.uvflag=true;
      this.votes = this.votes+1;
    }
    else{
      this.uvflag=false;
      this.votes = this.votes-1;
    }
    this.idx = product.id; 
    product.vote_count = this.votes;
    this.apiService.sendPutRequest(product,this.idx).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    });
    console.log(this.votes);
  }
  public onDownvoteClick(product){
    this.votes = product.vote_count;
    if(this.dvflag == false)
    {
      this.dvflag=true;
      this.votes = this.votes-1;
    }
    else{
      this.dvflag=false;
      this.votes = this.votes+1;
    }
    this.idx = product.id; 
    product.vote_count = this.votes;
    this.apiService.sendPutRequest(product,this.idx).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    });
    console.log(this.votes);
  }
}