import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, Router } from '@angular/router'; 
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';


import { 
  Chart, 
  BarController, 
  BarElement, 
  CategoryScale, 
  Legend, 
  LinearScale, 
  Title, 
  Tooltip 
} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  
  sidebarAberta: boolean = false; 
  ticketsExpandidos: boolean = false;
  clientesExpandidos: boolean = false;

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      y: {
        beginAtZero: true 
      }
    }
  };

  
  public barChartLabels: string[] = ['Secretaria', 'Coordenação', 'Direção', 'RH'];

 
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { 
        data: [12, 8, 5, 3], 
        label: 'Chamados Abertos',
        backgroundColor: '#8B1C28', 
      },
      { 
        data: [30, 25, 40, 15], 
        label: 'Chamados Fechados',
        backgroundColor: '#4CAF50', 
        borderColor: '#4CAF50'
      }
    ]
  };

  constructor(private router: Router) {
  
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );
  } 

  ngOnInit(): void {
    //
  }

  toggleSidebar() {
    this.sidebarAberta = !this.sidebarAberta;
  }

  toggleTickets() {
    this.ticketsExpandidos = !this.ticketsExpandidos;
  }

  toggleClientes() {
    this.clientesExpandidos = !this.clientesExpandidos;
  }
  
  fazerLogout() {
      this.router.navigate(['/login']);
  }
}