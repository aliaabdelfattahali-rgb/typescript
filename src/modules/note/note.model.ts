import type { User } from '../user/user.model';
import type { IAuthor } from '../../index';

export class Note implements IAuthor {
    private static nextId: number = 1;

    private readonly id: number;
    private title: string;
    private content: string;
    public readonly author: User;

    constructor(title: string, content: string, author: User) {
        this.id = Note.nextId++;
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getAuthorName(): string {
        return this.author.getName();
    }

    public preview(): string {
        if (this.content.length <= 50) {
            return this.content;
        }
        return this.content.substring(0, 50) + '...';
    }
}
