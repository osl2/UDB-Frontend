export default class MockStorage implements Storage {


    public storageMap: Map<string, string> = new Map<string, string>();
    public readonly length: number = this.storageMap.size;

    public clear(): void {
        this.storageMap.clear();
    }

    public getItem(key: string): string | null {
        const value = this.storageMap.get(key);
        if (value) {
            return value;
        } else {
            return null;
        }
    }

    public key(index: number): string | null {
        return null;
    }

    public removeItem(key: string): void {
        this.storageMap.delete(key);
    }

    public setItem(key: string, value: string): void {
        this.storageMap.set(key, value);
    }

}
