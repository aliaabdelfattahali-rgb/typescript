import type { NoteBook } from '../notebook/notebook.model';

export abstract class Person {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public abstract displayInfo(): void;
}

import type { ContactInfo } from '../../index';
import { UserRole } from '../../index';

export class User extends Person {
    private static nextId: number = 1;

    private readonly id: number;
    private email: string;
    private password: string;
    private phone: string;
    private _age: number = 0;
    private notebooks: NoteBook[] = [];
    public readonly role: UserRole;

    constructor(
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number,
        role: UserRole = UserRole.USER
    ) {
        super(name);
        this.id = User.nextId++;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        this.role = role;
    }

    public getId(): number {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getRole(): UserRole {
        return this.role;
    }

    public getNotebooks(): NoteBook[] {
        return [...this.notebooks];
    }

    public getContactInfo(): ContactInfo {
        return { email: this.email, phone: this.phone };
    }

    public getContactTuple(): [string, string] {
        return [this.email, this.phone];
    }

    public get age(): number {
        return this._age;
    }

    public set age(value: number) {
        if (value < 18 || value > 60) {
            throw new Error('Age must be between 18 and 60.');
        }
        this._age = value;
    }

    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }

    public displayInfo(): void {
        console.log('--- User ---');
        console.log('ID:', this.id);
        console.log('Name:', this.name);
        console.log('Email:', this.email);
        console.log('Phone:', this.phone);
        console.log('Age:', this._age);
        console.log('Notebooks:', this.notebooks.length);
    }
}
