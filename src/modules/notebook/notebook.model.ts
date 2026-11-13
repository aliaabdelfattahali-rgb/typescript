import type { Note } from '../note/note.model';

export class NoteBook {
    private static nextId: number = 1;

    private readonly id: number;
    private title: string;
    private notes: Note[] = [];

    constructor(title: string) {
        this.id = NoteBook.nextId++;
        this.title = title;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getNoteCount(): number {
        return this.notes.length;
    }

    public addNote(note: Note): void {
        this.notes.push(note);
    }

    public removeNote(noteId: number): boolean {
        const index = this.notes.findIndex((n) => n.getId() === noteId);
        if (index !== -1) {
            this.notes.splice(index, 1);
            return true;
        }
        return false;
    }

    public getNotes(): Note[] {
        return [...this.notes];
    }
}
