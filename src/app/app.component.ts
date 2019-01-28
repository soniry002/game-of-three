import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { PlayerData } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public service: AppService) { }
  title = 'Game Of Three';
  public player1Data: PlayerData[] = [];
  public player2Data: PlayerData[] = [];
  public endGame = false;
  public initialNum: number;
  public moveNum = 0;
  public player1 = false;
  public player2 = false;

  ngOnInit() { }

  choosePlayer(player: number) {
    this.initialNum = Math.floor(Math.random() * 100000) + 2;
    player === 1 ? this.player1 = true : this.player2 = true;
    this.sendToPlayer(this.initialNum, player);
  }

  sendToPlayer(num, player) {
    this.service.callAPI(num).subscribe((res: any) => {
      const playerData: PlayerData = {
        'received': num,
        'added': res.added,
        'resultingNumber': res.data,
        'moveNum': ++this.moveNum
      };
      if (player === 1) {
        this.player2Data.push(playerData);
        player = 2;
      } else {
        this.player1Data.push(playerData);
        player = 1;
      }
      if (res.data > 1) {
        this.sendToPlayer(res.data, player);
      } else {
        this.endGame = true;
      }
    }, err => {
      console.error('ERROR', err);
    });
  }

  reset() {
    this.player1Data = [];
    this.player2Data = [];
    this.endGame = false;
    this.moveNum = 0;
    this.player1 = false;
    this.player2 = false;
  }
}
