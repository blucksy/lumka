import { tick } from "svelte";

type Opts = {
  duration?: number;
  easing?: string; // CSS easing string
};

export function flipLayout(node: HTMLElement, opts: Opts = {}) {
  const duration = opts.duration ?? 450;
  const easing = opts.easing ?? "cubic-bezier(0.22, 1, 0.36, 1)"; // like cubicOut

  let prev = node.getBoundingClientRect();

  async function run() {
    const first = prev;

    // Wait until the DOM has updated and layout has settled
    await tick();
    // Force layout read
    const last = node.getBoundingClientRect();

    prev = last;

    const dx = first.left - last.left;
    const dy = first.top - last.top;

    // If it didn't move, do nothing
    if (!dx && !dy) return;

    node.animate(
      [
        { transform: `translate(${dx}px, ${dy}px)` },
        { transform: "translate(0, 0)" }
      ],
      {
        duration,
        easing,
        fill: "both"
      }
    );
  }

  return {
    update(newOpts: Opts = {}) {
      // allow live-updating options
      if (newOpts.duration) (opts.duration = newOpts.duration);
      if (newOpts.easing) (opts.easing = newOpts.easing);
      run();
    }
  };
}