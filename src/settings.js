export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/covid19";
export const DEBUG_LEVEL = process.env.DEBUG_LEVEL || "debug";

export const MIN_AGE = process.env.MIN_AGE || 0;
export const MAX_AGE = process.env.MAX_AGE || 150;

export const SERVICE_PORT = process.env.SERVICE_PORT || 3000;
export const SERVICE_HOST = process.env.SERVICE_HOST || "0.0.0.0";

export const GENDER_OPTIONS = ["Masculino", "Feminino", "Outro"];
export const CORONAVIRUS_STATE_OPTIONS = ["Suspeita", "Confirmado"];
export const RELATIONSHIP_PERSON_OPTIONS = [
  "Sou eu",
  "Meu irmão/irmã, pai, mãe",
  "Meu avô/avó, primo(a), tio(a)",
  "Meu vizinho(a)",
  "Meu chefe, funcionário, colega de trabalho",
  "Outro"
];
