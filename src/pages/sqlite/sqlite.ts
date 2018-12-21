import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {  NewsPage } from '../news/news';


/**
 * Generated class for the SqlitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 const DATABASE_FILE_NAME: string = 'data.db';

@IonicPage()
@Component({
  selector: 'page-sqlite',
  templateUrl: 'sqlite.html',
})
export class SqlitePage {


  nextPage = NewsPage;
  private db: SQLiteObject;
  romans: string[] = [];
  titleRoman: string;
  ratingRoman: number; 
  titleLivre: string;
  descriptionRoman: string;
  categorieRoman: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
  this.createDatabaseFile();
  }
  private createDatabaseFile(): void {
    this.sqlite.create({
      name: 'const DATABASE_FILE',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Bdd créé !');
        this.db = db;
        this.createTables();
    
    
      })
      .catch(e => console.log(e));
  }

  private createTables(): void{
    this.db.executeSql('CREATE TABLE IF NOT EXISTS`ROMANS` ( `idRomans` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nom` TEXT NOT NULL, `eval` INTEGER NOT NULL, `desc` TEXT, `categoryid` INTEGER, FOREIGN KEY(`categoryid`) REFERENCES `CATEGORIES`(`idCategories`) )', {})
    .then(() => {
      console.log('Table Romans creates !');
      this.db.executeSql('CREATE TABLE IF NOT EXISTS `CATEGORIES` ( `idCategories` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nom` TEXT NOT NULL )', {})
      .then(() => console.log('Table Categories creates !'))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter SqlitePage');
  }
  public saveMyRoman() {
    console.log('Roman name -> ' + this.titleRoman);
    console.log('Rating -> ' + this.ratingRoman + '/5');
    console.log('Description -> ' + this.descriptionRoman);
    console.log('Categorie -> ' + this.categorieRoman);
    console.log('Livre -> ' + this.titleLivre);

    // INSERT INTO `CATEGORIES` (name) VALUES('Test');
    // INSERT INTO `ROMANS`(name, eval, desc, categoryId) VALUES ('Nom film', 3, 'Description', 1)
    this.db.executeSql('INSERT INTO `CATEGORIES` (name) VALUES(\'' + this.categorieRoman + '\')', {})
      .then(() => {
        console.log('Categorie inséré !');

        this.db.executeSql('INSERT INTO `ROMANS`(name, eval, desc, categoryId) VALUES (\'' + this.titleRoman + '\', '+ this.ratingRoman +', \''+ this.descriptionRoman +'\', last_insert_rowid())', {})
        .then(() => console.log('Roman inséré !'))
        .catch(e => console.log(e));

      })
      .catch(e => console.log(e));
  }

  public retrieveRoman() {

    this.romans = [];
    this.db.executeSql('SELECT name FROM `ROMANS`', {})
		.then((data) => {

			if(data == null) {
				return;
			}

			if(data.rows) {
				if(data.rows.length > 0) {
					for(var i = 0; i < data.rows.length; i++) {
            this.romans.push(data.rows.item(i).name);
          }
				}
			}
		});
    
	}

}
