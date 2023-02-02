const APPROVE_COUNT_CLASS = "approve-count";

run();
setInterval(run, 1000); // for spa navigation

async function run() {
  if (!location.href.endsWith("pulls")) return;
  if (document.getElementsByClassName(APPROVE_COUNT_CLASS).length > 0) return;

  for (const row of document.querySelectorAll(".Box-row")) {
    const ariaLabel = await findApproveCountAriaLabelByRow(row);
    if (ariaLabel == null) continue;

    const approveCountString = /(\d+) review approval/.exec(ariaLabel)?.[1];
    row
      .querySelector(".hide-sm")
      ?.appendChild(createApproveCountBadge(Number(approveCountString || 0)));
  }
}

/**
 * @returns e.g. 3 review approval
 */
async function findApproveCountAriaLabelByRow(row: Element): Promise<string | null> {
  const eachWaitMs = 100;
  let waitedMs = 0;
  while (waitedMs < 30000) {
    // maximum wait 30 seconds
    const ariaLabel = row.querySelector("a.Link--muted.tooltipped")?.getAttribute("aria-label");
    if (ariaLabel != null) return ariaLabel;

    await new Promise((res) => setTimeout(res, eachWaitMs));
    waitedMs += eachWaitMs;
  }
  return null;
}

function createApproveCountBadge(approveCount: number) {
  const span = document.createElement("span");
  span.classList.add(APPROVE_COUNT_CLASS);
  span.append(`✅ ${approveCount}`);
  span.style.display = "flex";
  span.style.fontSize = "14px";
  span.style.color = "var(--color-fg-muted)";
  span.style.marginTop = "3px";
  span.style.marginLeft = "16px";

  return span;
}
