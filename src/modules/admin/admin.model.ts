import { User } from '../user/user.model';
import type { NoteBook } from '../notebook/notebook.model';
import type { IManageable } from '../../index';
import { UserRole } from '../../index';

export class Admin extends User implements IManageable {
    public readonly adminLevel: number;

    constructor(
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number,
        adminLevel: number = 1
    ) {
        super(name, email, password, phone, age, UserRole.ADMIN);
        this.adminLevel = adminLevel;
    }

    public manageNotes(notebook: NoteBook): void {
        console.log('Admin', this.getName(), 'is managing notebook:', notebook.getTitle());
        console.log('Total notes:', notebook.getNoteCount());
    }

    public displayInfo(): void {
        console.log('--- Admin ---');
        console.log('ID:', this.getId());
        console.log('Name:', this.getName());
        console.log('Email:', this.getEmail());
        console.log('Role:', this.getRole());
        console.log('Admin Level:', this.adminLevel);
        console.log('Notebooks:', this.getNotebooks().length);
    }
}
