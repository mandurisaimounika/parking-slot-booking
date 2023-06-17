import { v4 as uuidv4 } from "uuid";
import * as uuidValidator from "uuid-validate";

//Generates a random uuid string
export function getUUID() {
  return uuidv4();
}

//Validates the uuid string
export function isValidUUID(uuid) {
  return uuidValidator(uuid, 4);
}
