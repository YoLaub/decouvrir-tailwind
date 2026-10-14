import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { tpSequence, tpOnDemand, tpNeighbors, tpTitle } from "./tp";

const dir = new URL("../pages/tp/", import.meta.url);

describe("tpNeighbors", () => {
  it("chains the open rounds in order", () => {
    expect(tpSequence).toEqual(["manche-0", "manche-1", "manche-2"]);
    expect(tpNeighbors("manche-1").prev?.slug).toBe("manche-0");
    expect(tpNeighbors("manche-1").next?.slug).toBe("manche-2");
  });
  it("never links the crisis round or the error hunt from the sequence", () => {
    expect(tpNeighbors("manche-2").next).toBeUndefined();
    expect(tpNeighbors("manche-3")).toEqual({});
    expect(tpNeighbors("jeu-des-erreurs")).toEqual({});
  });
  it("keeps the on-demand pages out of the sequence", () => {
    expect(tpOnDemand).toEqual(["manche-3", "jeu-des-erreurs"]);
    for (const s of tpOnDemand) expect(tpSequence).not.toContain(s);
  });
  it("gives every page a title", () => {
    for (const s of [...tpSequence, ...tpOnDemand]) expect(tpTitle(s)).toBeTruthy();
  });
});

describe("tp pages", () => {
  const files = readdirSync(dir).filter((f) => f.endsWith(".astro"));
  it("has one page per round plus the hub", () => {
    expect(files.sort()).toEqual(
      ["index.astro", ...[...tpSequence, ...tpOnDemand].map((s) => `${s}.astro`)].sort(),
    );
  });
  it("never publishes trainer-only material", () => {
    for (const f of files) {
      const text = readFileSync(new URL(f, dir), "utf8");
      expect(text, f).not.toMatch(/corrig[ée]|bar[eè]me|grille d'observation|fiche de s[ée]ance/i);
    }
  });
});
