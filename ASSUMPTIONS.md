# Assumptions

This document describes the rules and heuristics assumed when normalizing order data, detecting duplicates, and resolving conflicts.  
It serves as a reference for both developers and data operators to ensure consistent processing.

---

## **1. Normalization Rules**

### **Order ID**
- **Trim** whitespace from both ends.
- **Uppercase** all letters.
- **Remove** non-alphanumeric characters from the **start and end** of the string.
- For duplicate detection (matching purposes), also **remove all internal non-alphanumeric characters** to create a "match key".
- Example:
  | Raw input        | Normalized output | Match key |
  |------------------|-------------------|-----------|
  | `" Ord-001 "`    | `ORD-001`         | `ORD001`  |
  | `"ord001"`       | `ORD001`          | `ORD001`  |
  | `"ORD-001."`     | `ORD-001`         | `ORD001`  |

### **Addresses**
- Trim and uppercase.
- Collapse multiple spaces into one.
- Remove punctuation for matching purposes.
- Compare addresses using edit distance or string similarity; treat addresses with similarity ≥ 0.9 as the same.

### **Payment Type**
- Uppercase all values.
- Map known synonyms (e.g., `COD` ↔ `Cash On Delivery`).

### **Product Type**
- Uppercase first letter only (for display), but normalize to lowercase for comparison.

---

## **2. Deduplication Heuristic**

Two orders are considered duplicates if:
1. They have the **same order ID match key** (from normalization rules above), or
2. They have **matching addresses** (similarity ≥ 0.9) **and** matching deadlines.

---

## **3. Tie-breaker Rules When Merging**

When duplicates are detected:

1. **Prefer non-empty fields** over empty ones.
2. For **conflicting deadlines**, keep the earliest.
3. For **addresses**:
   - If similarity ≥ 0.9, merge and keep the more complete/longer version.
   - If similarity < 0.9, keep the earliest order’s address and log a warning.
4. Preserve the **first source’s orderId formatting** for display.
5. For numerical fields that differ:
   - If both values are numeric and equal after normalization, keep either.
   - If different, keep earliest order’s value and log a warning.

---
