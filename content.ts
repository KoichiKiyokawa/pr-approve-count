(async function () {
  if (location.href.endsWith("pulls")) {
    for (const row of document.querySelectorAll(".Box-row")) {
      const ariaLabel = await findApproveCountAriaLabelByRow(row);
      if (ariaLabel == null) continue;

      const approveCountString = /(\d+) review approval/.exec(ariaLabel)?.[1];
      row
        .querySelector(".d-flex")
        ?.appendChild(createApproveCountBadge(Number(approveCountString || 0)));
    }
  }
})();

/**
 * @returns e.g. 3 review approval
 */
async function findApproveCountAriaLabelByRow(row: Element): Promise<string | null> {
  const eachWaitMs = 100;
  let waitedMs = 0;
  while (waitedMs < 3000) {
    // maximum wait 3 seconds
    const ariaLabel = row.querySelector("a.Link--muted.tooltipped")?.getAttribute("aria-label");
    if (ariaLabel != null) return ariaLabel;

    await new Promise((res) => setTimeout(res, eachWaitMs));
    waitedMs += eachWaitMs;
  }
  return null;
}

function createApproveCountBadge(approveCount: number) {
  const span = document.createElement("span");
  span.append(`✅ ${approveCount}`);
  span.style.display = "flex";
  span.style.alignItems = "center";
  span.style.marginRight = "1rem";

  return span;
}
