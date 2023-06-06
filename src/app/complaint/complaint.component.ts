import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Complaint } from '../models/complaint';
import { ComplaintService } from '../service/complaint.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs/dist/types';
import { Chart } from 'chart.js';


@Component({
    selector: 'app-complaint',
    templateUrl: './complaint.component.html',
    styleUrls: ['./complaint.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class ComplaintComponent implements OnInit {

    @ViewChild('pieChart') pieChart: ElementRef;
    @ViewChild('pieChartt') pieChartt: ElementRef;
    @ViewChild('lineChart') lineChart: ElementRef;

    chartt: Chart;
    chart: any;
    complaints: Complaint[];
    userId: number;
    complaint: Complaint;
    private routeSub: Subscription;
    selectedType: string;


    constructor(private router: Router, private messageService: MessageService, private complaintService: ComplaintService) {
    }
    ngOnInit(): void {
        this.routeSub = this.complaintService.retrieveAllComplaints().subscribe(res => {console.log(res);
            this.complaints = res;
        });
        this.getComplaintStats();
        this.getComplaintsByType();
        this.complaintService.getComplaintsByDayInMonth().subscribe(
            data => {
                const labels = Object.keys(data);
                const values = Object.values(data);
                this.chartt = new Chart(this.lineChart.nativeElement, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Complaints by Day',
                            data: values,
                            borderColor: '#3cba9f',
                            fill: false
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                display: true
                            }],
                            yAxes: [{
                                display: true
                            }]
                        }
                    }
                });
            },
            error => {
                console.log('Error fetching statistics', error);
            }
        );
    }

    
    deleteComplaint(id: string) {this.complaintService.deleteComplaint(id).subscribe(p => {
        console.log('delete');
        this.router.navigate(['/superadmin/complaint']);
    });
    }

    updateUntreatedComplaint(id: string) {
                this.complaintService.updateComplaint(id).subscribe(p => {
                    console.log('update');
                    this.router.navigate(['/superadmin/complaint']);
                });
            }

    getComplaintStats() {
        this.complaintService.getComplaintStats().subscribe(
            data => {
                this.generateChart(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    getComplaintsByType() {
        this.complaintService.getComplaintsByType().subscribe(
            data => {
                this.generateChartt(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    generateChart(stats: any) {
        const chartData = {
            labels: Object.keys(stats),
            datasets: [{
                data: Object.values(stats),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ]
            }]
        };

        const canvas = this.pieChart.nativeElement;
        this.chart = new Chart(canvas, {
            type: 'pie',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }


    generateChartt(stats: any) {
        const chartData = {
            labels: Object.keys(stats),
            datasets: [{
                data: Object.values(stats),
                backgroundColor: [
                    '#ff6392',
                    '#63dbff',
                    '#FFCE56',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ]
            }]
        };

        const canvas = this.pieChartt.nativeElement;
        this.chart = new Chart(canvas, {
            type: 'pie',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }


}
