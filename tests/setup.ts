import { afterEach } from "mocha";

const env = Object.assign({}, process.env);

afterEach(() => {
    process.env = env;
});