import { User } from './modules/user/user.model';
import { Admin } from './modules/admin/admin.model';
import { Note } from './modules/note/note.model';
import { NoteBook } from './modules/notebook/notebook.model';
import { Storage } from './utils/storage';

export interface IAuthor {
    getAuthorName(): string;
}

export interface IManageable {
    manageNotes(notebook: NoteBook): void;
}

export enum UserRole {
    USER = 'User',
    ADMIN = 'Admin'
}

export type ContactInfo = {
    email: string;
    phone: string;
};

async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
    console.log('=== Simple Notes Management System ===\n');

    const user1 = new User('Alice Johnson', 'alice@example.com', 'pass123', '555-0101', 25);
    const user2 = new User('Bob Smith', 'bob@example.com', 'pass456', '555-0102', 32);
    const admin = new Admin('Carol Admin', 'carol@example.com', 'adminpass', '555-0103', 40);

    user1.displayInfo();
    user2.displayInfo();
    admin.displayInfo();

    console.log('\nUser1 contact info:', user1.getContactInfo());
    console.log('User1 contact tuple:', user1.getContactTuple());

    try {
        user1.age = 15;
    } catch (error) {
        console.log('\nSetter validation:', (error as Error).message);
    }
    user1.age = 30;
    console.log('User1 updated age:', user1.age);

    const notebook1 = new NoteBook('Personal Ideas');
    const notebook2 = new NoteBook('Work Tasks');

    user1.addNotebook(notebook1);
    user1.addNotebook(notebook2);

    const note1 = new Note('Shopping List', 'Buy milk, eggs, bread, and fruits.', user1);
    const note2 = new Note('Project Plan', 'Complete the TypeScript assignment by Friday.', user1);
    const note3 = new Note('Meeting Notes', 'Discuss Q3 goals with the team.', admin);

    notebook1.addNote(note1);
    notebook1.addNote(note2);
    notebook2.addNote(note3);

    console.log('\n=== Note Previews ===');
    for (const note of notebook1.getNotes()) {
        console.log('-', note.getTitle(), ':', note.preview(), '(Author:', note.author.getName(), ')');
    }
    for (const note of notebook2.getNotes()) {
        console.log('-', note.getTitle(), ':', note.preview(), '(Author:', note.author.getName(), ')');
    }

    notebook1.removeNote(note2.getId());

    admin.manageNotes(notebook2);

    console.log('\n=== Generic Storage Demo ===');
    const stringStorage = new Storage<string>();
    stringStorage.addItem('TypeScript');
    stringStorage.addItem('OOP');
    console.log('Items:', stringStorage.getAllItems());
    stringStorage.removeItem('OOP');
    console.log('After removal:', stringStorage.getAllItems());

    const numberStorage = new Storage<number>();
    numberStorage.addItem(100);
    numberStorage.addItem(200);
    console.log('Number items:', numberStorage.getAllItems());

    console.log('\n=== Async Operation ===');
    console.log('Saving...');
    await delay(600);
    console.log('Saved successfully (async).');

    console.log('\n=== Done ===');
}

main().catch(console.error);
