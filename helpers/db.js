import * as SQLite from 'expo-sqlite';
import { exp } from 'react-native-reanimated';

const db = SQLite.openDatabase('destinations.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS destinations (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertDestination = (name, imageUri, address, latitude, longitude) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO destinations (name, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?);`,
                [name, imageUri, address, latitude, longitude],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};
