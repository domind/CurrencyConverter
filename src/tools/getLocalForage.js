import localForage from "localforage";

export function getLocalForage() {
  return new Promise((resolve, reject) => {
    localForage
      .getItem("savedConversions")
      .then((value) => {
        if (value !== null) resolve(value);
      })
      .catch(() => {
        reject("Błąd odczytu histori");
      });
  });
}
