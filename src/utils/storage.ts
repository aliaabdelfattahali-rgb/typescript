export class Storage<T> {
    private items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
    }

    public removeItem(item: T): boolean {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    public getAllItems(): T[] {
        return [...this.items];
    }
}
