export class LocalDataService {

  public setItem(reference, value) {
    if (localStorage) {
      try {
        localStorage.setItem(reference, value);
        return true;
      } catch (e) {
        console.log(e);
      }
    }
  }

  public getItem(reference) {
    if (localStorage) {
      try {
        return localStorage.getItem(reference);
      } catch (e) {
        console.log(e);
      }
    }
  }

  public remove(reference) {
    if (localStorage) {
      try {
        localStorage.removeItem(reference);
        return true;
      } catch (e) {
        console.log(e);
      }
    }
  }

  public clear() {
    if (localStorage) {
      try {
        localStorage.clear();
        return true;
      } catch (e) {
        console.log(e);
      }
    }
  }

  public length() {
    if (localStorage) {
      try {
        return localStorage.length;
      } catch (e) {
        console.log(e);
      }
    }
  }

}
