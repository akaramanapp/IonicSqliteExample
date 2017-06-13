import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  username: string;
  userList = ['Kerim', 'Murat', 'Serdar'];
  public database: SQLiteObject
  constructor(public navCtrl: NavController, private storage: Storage, public sqlite: SQLite) {
 
  }

  createDb() {
   this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table danceMoves(name VARCHAR(32))', {})
          .then(() => this.database = db)
          .catch(e => alert(e));
      })
      .catch(e => console.log(e));
  }

  save(uname: string) {
    this.database.executeSql('insert into danceMoves(name) values("'+uname+'")', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
      this.username = "";
  }

  getName() {
        this.database.executeSql("SELECT * FROM danceMoves", []).then((data) => {
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                   this.username = data.rows.item(i).name
                }
            }
        }, (error) => {
            alert("ERROR: " + JSON.stringify(error));
        });
    }

}
