import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true, 
  imports: [RouterLink], 
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class TicketsComponent{

}
