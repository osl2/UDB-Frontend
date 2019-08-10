// Based on https://gist.github.com/tschuegge/903b4688a70c2ea34a6270fcc7baac48
export default class UUIDGenerator {
  public static uuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      /* tslint:disable */
      const random = Math.random() * 16 | 0;
      /* tslint:enable */
      const value = char === "x" ? random : (random % 4 + 8);
      return value.toString(16);
    });
  }
}
