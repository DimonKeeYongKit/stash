# Subdividing a category

Only run this analysis when the user explicitly asks (e.g. "看看哪些 category 该拆分", "is `learn` getting too big?", "review categories"). Do not volunteer it during a normal add-resource flow.

## How to evaluate

1. Read [data/resources.json](../../../data/resources.json) and group the resources by `category`.

2. For each category, ask:
   - Is there a clear sub-cluster inside it (≥ 3 entries that share a tighter theme than the rest)? Use the existing `tags` as the first signal.
   - Would a reader scanning the category page benefit from the split, or would it just create a near-empty bucket?
   - Is the parent category's name still accurate after the split, or does it need a rename too?

3. **Recommend, don't act.** Present findings as a short list:
   - Category to split, the proposed new category (`id`, bilingual `name`, suggested `icon`), and which existing resources would move.
   - If a category is fine, say so in one line — don't pad the report.

4. Wait for the user to pick which splits to apply before editing the file. When applying, update both the `categories[]` array and the `category` field of the affected resources in the same edit pass.

## Threshold guidance (not rules)

- A category with < 5 resources almost never needs splitting.
- A category with 8+ resources is worth *looking at*, but size alone isn't a reason — a tight, coherent set of 15 entries is fine.
- The trigger is **theme divergence**, not count.
