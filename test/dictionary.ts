import {describe, it } from "mocha";
import { Dictionary } from "../src/selen/";
import { strict as assert } from "assert";

describe("testing Dictionary", () => {
  it("new", () => {
    assert.equal(
      new Dictionary().constructor.name,
      "Dictionary"
    );
  });

  it("get() returns value if key exists", () => {
    const dictionary = new Dictionary({
      some: "thing"
    });

    assert.equal(
      dictionary.get("some"),
      "thing"
    );
  });

  it("get() returns key if key doesn't exist", () => {
    const dictionary = new Dictionary();

    assert.equal(
      dictionary.get("some"),
      "some"
    );
  });

  it("add(key, value)", () => {
    const dictionary = new Dictionary();

    dictionary.add("some", "thing");

    assert.equal(
      dictionary.get("some"),
      "thing"
    );
  });

  it("merge() merges data", () => {
    const dictionary = new Dictionary({
      some: "thing"
    });

    dictionary.merge({
      test: "testValue"
    });

    assert(
      dictionary.get("some") === "thing" &&
      dictionary.get("test") === "testValue"
    );
  });

  it("renew() renews data", () => {
    const dictionary = new Dictionary({
      initialKey: "initialValue"
    });

    dictionary.add("addedKey", "addedValue");

    dictionary.merge({
      mergedKey: "mergedValue"
    });

    dictionary.renew({
      renewedKey: "renewedValue"
    });

    assert(
      dictionary.get("initialKey") === "initialKey" &&
      dictionary.get("addedKey") === "addedKey" &&
      dictionary.get("mergedKey") === "mergedKey" &&
      dictionary.get("renewedKey") === "renewedValue"
    );
  });
});
