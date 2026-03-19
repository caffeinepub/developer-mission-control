export interface Question {
  id: string;
  platform: "LeetCode" | "Codeforces" | "CodeChef";
  title: string;
  url: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
}

export const questionPool: Question[] = [
  // LeetCode Easy
  {
    id: "lc1",
    platform: "LeetCode",
    title: "Two Sum",
    url: "https://leetcode.com/problems/two-sum/",
    difficulty: "Easy",
    topic: "Array",
  },
  {
    id: "lc2",
    platform: "LeetCode",
    title: "Valid Parentheses",
    url: "https://leetcode.com/problems/valid-parentheses/",
    difficulty: "Easy",
    topic: "Stack",
  },
  {
    id: "lc3",
    platform: "LeetCode",
    title: "Merge Two Sorted Lists",
    url: "https://leetcode.com/problems/merge-two-sorted-lists/",
    difficulty: "Easy",
    topic: "Linked List",
  },
  {
    id: "lc4",
    platform: "LeetCode",
    title: "Best Time to Buy and Sell Stock",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    difficulty: "Easy",
    topic: "Array",
  },
  {
    id: "lc5",
    platform: "LeetCode",
    title: "Climbing Stairs",
    url: "https://leetcode.com/problems/climbing-stairs/",
    difficulty: "Easy",
    topic: "DP",
  },
  {
    id: "lc6",
    platform: "LeetCode",
    title: "Binary Search",
    url: "https://leetcode.com/problems/binary-search/",
    difficulty: "Easy",
    topic: "Binary Search",
  },
  {
    id: "lc7",
    platform: "LeetCode",
    title: "Reverse Linked List",
    url: "https://leetcode.com/problems/reverse-linked-list/",
    difficulty: "Easy",
    topic: "Linked List",
  },
  {
    id: "lc8",
    platform: "LeetCode",
    title: "Maximum Depth of Binary Tree",
    url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    difficulty: "Easy",
    topic: "Tree",
  },
  {
    id: "lc9",
    platform: "LeetCode",
    title: "Palindrome Number",
    url: "https://leetcode.com/problems/palindrome-number/",
    difficulty: "Easy",
    topic: "Math",
  },
  {
    id: "lc10",
    platform: "LeetCode",
    title: "Contains Duplicate",
    url: "https://leetcode.com/problems/contains-duplicate/",
    difficulty: "Easy",
    topic: "Hash Map",
  },
  {
    id: "lc11",
    platform: "LeetCode",
    title: "Invert Binary Tree",
    url: "https://leetcode.com/problems/invert-binary-tree/",
    difficulty: "Easy",
    topic: "Tree",
  },
  {
    id: "lc12",
    platform: "LeetCode",
    title: "Linked List Cycle",
    url: "https://leetcode.com/problems/linked-list-cycle/",
    difficulty: "Easy",
    topic: "Two Pointers",
  },
  {
    id: "lc13",
    platform: "LeetCode",
    title: "Majority Element",
    url: "https://leetcode.com/problems/majority-element/",
    difficulty: "Easy",
    topic: "Array",
  },
  {
    id: "lc14",
    platform: "LeetCode",
    title: "First Bad Version",
    url: "https://leetcode.com/problems/first-bad-version/",
    difficulty: "Easy",
    topic: "Binary Search",
  },
  // LeetCode Medium
  {
    id: "lc15",
    platform: "LeetCode",
    title: "Longest Substring Without Repeating Characters",
    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    difficulty: "Medium",
    topic: "Sliding Window",
  },
  {
    id: "lc16",
    platform: "LeetCode",
    title: "Add Two Numbers",
    url: "https://leetcode.com/problems/add-two-numbers/",
    difficulty: "Medium",
    topic: "Linked List",
  },
  {
    id: "lc17",
    platform: "LeetCode",
    title: "3Sum",
    url: "https://leetcode.com/problems/3sum/",
    difficulty: "Medium",
    topic: "Two Pointers",
  },
  {
    id: "lc18",
    platform: "LeetCode",
    title: "Container With Most Water",
    url: "https://leetcode.com/problems/container-with-most-water/",
    difficulty: "Medium",
    topic: "Two Pointers",
  },
  {
    id: "lc19",
    platform: "LeetCode",
    title: "Coin Change",
    url: "https://leetcode.com/problems/coin-change/",
    difficulty: "Medium",
    topic: "DP",
  },
  {
    id: "lc20",
    platform: "LeetCode",
    title: "Number of Islands",
    url: "https://leetcode.com/problems/number-of-islands/",
    difficulty: "Medium",
    topic: "Graph",
  },
  {
    id: "lc21",
    platform: "LeetCode",
    title: "Jump Game",
    url: "https://leetcode.com/problems/jump-game/",
    difficulty: "Medium",
    topic: "Greedy",
  },
  {
    id: "lc22",
    platform: "LeetCode",
    title: "Product of Array Except Self",
    url: "https://leetcode.com/problems/product-of-array-except-self/",
    difficulty: "Medium",
    topic: "Array",
  },
  {
    id: "lc23",
    platform: "LeetCode",
    title: "Kth Largest Element in an Array",
    url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    difficulty: "Medium",
    topic: "Heap",
  },
  {
    id: "lc24",
    platform: "LeetCode",
    title: "Search in Rotated Sorted Array",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    difficulty: "Medium",
    topic: "Binary Search",
  },
  {
    id: "lc25",
    platform: "LeetCode",
    title: "Decode Ways",
    url: "https://leetcode.com/problems/decode-ways/",
    difficulty: "Medium",
    topic: "DP",
  },
  {
    id: "lc26",
    platform: "LeetCode",
    title: "Subsets",
    url: "https://leetcode.com/problems/subsets/",
    difficulty: "Medium",
    topic: "Backtracking",
  },
  {
    id: "lc27",
    platform: "LeetCode",
    title: "Permutations",
    url: "https://leetcode.com/problems/permutations/",
    difficulty: "Medium",
    topic: "Backtracking",
  },
  {
    id: "lc28",
    platform: "LeetCode",
    title: "Word Search",
    url: "https://leetcode.com/problems/word-search/",
    difficulty: "Medium",
    topic: "DFS",
  },
  {
    id: "lc29",
    platform: "LeetCode",
    title: "Validate Binary Search Tree",
    url: "https://leetcode.com/problems/validate-binary-search-tree/",
    difficulty: "Medium",
    topic: "BST",
  },
  {
    id: "lc30",
    platform: "LeetCode",
    title: "Binary Tree Level Order Traversal",
    url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    difficulty: "Medium",
    topic: "BFS",
  },
  {
    id: "lc31",
    platform: "LeetCode",
    title: "Minimum Path Sum",
    url: "https://leetcode.com/problems/minimum-path-sum/",
    difficulty: "Medium",
    topic: "DP",
  },
  {
    id: "lc32",
    platform: "LeetCode",
    title: "Unique Paths",
    url: "https://leetcode.com/problems/unique-paths/",
    difficulty: "Medium",
    topic: "DP",
  },
  // LeetCode Hard
  {
    id: "lc33",
    platform: "LeetCode",
    title: "Median of Two Sorted Arrays",
    url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    difficulty: "Hard",
    topic: "Binary Search",
  },
  {
    id: "lc34",
    platform: "LeetCode",
    title: "Trapping Rain Water",
    url: "https://leetcode.com/problems/trapping-rain-water/",
    difficulty: "Hard",
    topic: "Two Pointers",
  },
  {
    id: "lc35",
    platform: "LeetCode",
    title: "Merge k Sorted Lists",
    url: "https://leetcode.com/problems/merge-k-sorted-lists/",
    difficulty: "Hard",
    topic: "Heap",
  },
  {
    id: "lc36",
    platform: "LeetCode",
    title: "Regular Expression Matching",
    url: "https://leetcode.com/problems/regular-expression-matching/",
    difficulty: "Hard",
    topic: "DP",
  },
  {
    id: "lc37",
    platform: "LeetCode",
    title: "N-Queens",
    url: "https://leetcode.com/problems/n-queens/",
    difficulty: "Hard",
    topic: "Backtracking",
  },
  {
    id: "lc38",
    platform: "LeetCode",
    title: "Longest Valid Parentheses",
    url: "https://leetcode.com/problems/longest-valid-parentheses/",
    difficulty: "Hard",
    topic: "Stack",
  },
  {
    id: "lc39",
    platform: "LeetCode",
    title: "Sliding Window Maximum",
    url: "https://leetcode.com/problems/sliding-window-maximum/",
    difficulty: "Hard",
    topic: "Deque",
  },
  // Codeforces Easy
  {
    id: "cf1",
    platform: "Codeforces",
    title: "Theatre Square",
    url: "https://codeforces.com/problemset/problem/1/A",
    difficulty: "Easy",
    topic: "Math",
  },
  {
    id: "cf2",
    platform: "Codeforces",
    title: "Bit++",
    url: "https://codeforces.com/problemset/problem/282/A",
    difficulty: "Easy",
    topic: "Implementation",
  },
  {
    id: "cf3",
    platform: "Codeforces",
    title: "Helpful Maths",
    url: "https://codeforces.com/problemset/problem/339/A",
    difficulty: "Easy",
    topic: "Sorting",
  },
  {
    id: "cf4",
    platform: "Codeforces",
    title: "Beautiful Matrix",
    url: "https://codeforces.com/problemset/problem/263/A",
    difficulty: "Easy",
    topic: "Array",
  },
  {
    id: "cf5",
    platform: "Codeforces",
    title: "Next Round",
    url: "https://codeforces.com/problemset/problem/158/A",
    difficulty: "Easy",
    topic: "Greedy",
  },
  {
    id: "cf6",
    platform: "Codeforces",
    title: "Domino piling",
    url: "https://codeforces.com/problemset/problem/50/A",
    difficulty: "Easy",
    topic: "Math",
  },
  {
    id: "cf7",
    platform: "Codeforces",
    title: "String Task",
    url: "https://codeforces.com/problemset/problem/118/A",
    difficulty: "Easy",
    topic: "String",
  },
  {
    id: "cf8",
    platform: "Codeforces",
    title: "Nearly Lucky Number",
    url: "https://codeforces.com/problemset/problem/121/A",
    difficulty: "Easy",
    topic: "Implementation",
  },
  // Codeforces Medium
  {
    id: "cf9",
    platform: "Codeforces",
    title: "Codeforces Round Sort",
    url: "https://codeforces.com/problemset/problem/1741/B",
    difficulty: "Medium",
    topic: "Greedy",
  },
  {
    id: "cf10",
    platform: "Codeforces",
    title: "Two Buttons",
    url: "https://codeforces.com/problemset/problem/520/B",
    difficulty: "Medium",
    topic: "BFS",
  },
  {
    id: "cf11",
    platform: "Codeforces",
    title: "Vasya and String",
    url: "https://codeforces.com/problemset/problem/1066/B",
    difficulty: "Medium",
    topic: "String",
  },
  {
    id: "cf12",
    platform: "Codeforces",
    title: "Palindrome Degree",
    url: "https://codeforces.com/problemset/problem/7/D",
    difficulty: "Medium",
    topic: "DP",
  },
  {
    id: "cf13",
    platform: "Codeforces",
    title: "Painting Fence",
    url: "https://codeforces.com/problemset/problem/193/E",
    difficulty: "Medium",
    topic: "Divide & Conquer",
  },
  {
    id: "cf14",
    platform: "Codeforces",
    title: "Queue Reconstruction by Height",
    url: "https://codeforces.com/problemset/problem/1740/C",
    difficulty: "Medium",
    topic: "Greedy",
  },
  {
    id: "cf15",
    platform: "Codeforces",
    title: "Number of Ways",
    url: "https://codeforces.com/problemset/problem/466/C",
    difficulty: "Medium",
    topic: "Prefix Sum",
  },
  // Codeforces Hard
  {
    id: "cf16",
    platform: "Codeforces",
    title: "Arpa's letter-marked tree and Mehrdad's Dokhtar-kosh paths",
    url: "https://codeforces.com/problemset/problem/850/C",
    difficulty: "Hard",
    topic: "Tree",
  },
  {
    id: "cf17",
    platform: "Codeforces",
    title: "Lunar New Year and a Wander",
    url: "https://codeforces.com/problemset/problem/1106/D",
    difficulty: "Hard",
    topic: "Graph",
  },
  {
    id: "cf18",
    platform: "Codeforces",
    title: "A Lot of Games",
    url: "https://codeforces.com/problemset/problem/404/D",
    difficulty: "Hard",
    topic: "Game Theory",
  },
  {
    id: "cf19",
    platform: "Codeforces",
    title: "Sereja and Brackets",
    url: "https://codeforces.com/problemset/problem/380/E",
    difficulty: "Hard",
    topic: "Segment Tree",
  },
  // CodeChef Easy
  {
    id: "cc1",
    platform: "CodeChef",
    title: "Sum of Digits",
    url: "https://www.codechef.com/problems/SUMTRI",
    difficulty: "Easy",
    topic: "Math",
  },
  {
    id: "cc2",
    platform: "CodeChef",
    title: "Chef and Operators",
    url: "https://www.codechef.com/problems/CHOPRT",
    difficulty: "Easy",
    topic: "Implementation",
  },
  {
    id: "cc3",
    platform: "CodeChef",
    title: "Add Two Numbers",
    url: "https://www.codechef.com/problems/FLOW001",
    difficulty: "Easy",
    topic: "Math",
  },
  {
    id: "cc4",
    platform: "CodeChef",
    title: "Reverse The Number",
    url: "https://www.codechef.com/problems/FLOW007",
    difficulty: "Easy",
    topic: "Math",
  },
  {
    id: "cc5",
    platform: "CodeChef",
    title: "ATM",
    url: "https://www.codechef.com/problems/HS08TEST",
    difficulty: "Easy",
    topic: "Implementation",
  },
  {
    id: "cc6",
    platform: "CodeChef",
    title: "Factorial",
    url: "https://www.codechef.com/problems/FCTRL",
    difficulty: "Easy",
    topic: "Math",
  },
  {
    id: "cc7",
    platform: "CodeChef",
    title: "Small Factorials",
    url: "https://www.codechef.com/problems/FCTRL2",
    difficulty: "Easy",
    topic: "Math",
  },
  {
    id: "cc8",
    platform: "CodeChef",
    title: "Prime Generator",
    url: "https://www.codechef.com/problems/PRIME1",
    difficulty: "Easy",
    topic: "Number Theory",
  },
  // CodeChef Medium
  {
    id: "cc9",
    platform: "CodeChef",
    title: "Chef and Fibonacci",
    url: "https://www.codechef.com/problems/CHFIBS",
    difficulty: "Medium",
    topic: "DP",
  },
  {
    id: "cc10",
    platform: "CodeChef",
    title: "The Largest Number",
    url: "https://www.codechef.com/problems/LRGSTNUM",
    difficulty: "Medium",
    topic: "Greedy",
  },
  {
    id: "cc11",
    platform: "CodeChef",
    title: "Palindromic Partition",
    url: "https://www.codechef.com/problems/PALPAR",
    difficulty: "Medium",
    topic: "DP",
  },
  {
    id: "cc12",
    platform: "CodeChef",
    title: "BUYING2",
    url: "https://www.codechef.com/problems/BUYING2",
    difficulty: "Medium",
    topic: "Greedy",
  },
  {
    id: "cc13",
    platform: "CodeChef",
    title: "Lucky Numbers",
    url: "https://www.codechef.com/problems/LUCKNUM",
    difficulty: "Medium",
    topic: "Number Theory",
  },
  {
    id: "cc14",
    platform: "CodeChef",
    title: "Mysterious Queries",
    url: "https://www.codechef.com/problems/MYSTQ",
    difficulty: "Medium",
    topic: "Prefix Sum",
  },
  {
    id: "cc15",
    platform: "CodeChef",
    title: "Digit Sum",
    url: "https://www.codechef.com/problems/DIGITSUM",
    difficulty: "Medium",
    topic: "Math",
  },
  // CodeChef Hard
  {
    id: "cc16",
    platform: "CodeChef",
    title: "Chef and Trees",
    url: "https://www.codechef.com/problems/CHEFTREE",
    difficulty: "Hard",
    topic: "Tree",
  },
  {
    id: "cc17",
    platform: "CodeChef",
    title: "Sereja and Graph",
    url: "https://www.codechef.com/problems/SERJA",
    difficulty: "Hard",
    topic: "Graph",
  },
  {
    id: "cc18",
    platform: "CodeChef",
    title: "Count Substrings",
    url: "https://www.codechef.com/problems/SUBSTRGS",
    difficulty: "Hard",
    topic: "String",
  },
  {
    id: "cc19",
    platform: "CodeChef",
    title: "Maximum Flow",
    url: "https://www.codechef.com/problems/MAXFLOW1",
    difficulty: "Hard",
    topic: "Graph",
  },
  {
    id: "cc20",
    platform: "CodeChef",
    title: "String Queries",
    url: "https://www.codechef.com/problems/STRQUERY",
    difficulty: "Hard",
    topic: "Segment Tree",
  },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function seededShuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDifficultyMix(dayNumber: number): {
  easy: number;
  medium: number;
  hard: number;
} {
  if (dayNumber <= 15) return { easy: 5, medium: 0, hard: 0 };
  if (dayNumber <= 30) return { easy: 4, medium: 1, hard: 0 };
  if (dayNumber <= 50) return { easy: 3, medium: 2, hard: 0 };
  if (dayNumber <= 65) return { easy: 2, medium: 2, hard: 1 };
  if (dayNumber <= 80) return { easy: 1, medium: 2, hard: 2 };
  if (dayNumber <= 90) return { easy: 0, medium: 3, hard: 2 };
  return { easy: 0, medium: 2, hard: 3 };
}

export function getDifficultyLabel(dayNumber: number): string {
  if (dayNumber <= 15) return "Beginner";
  if (dayNumber <= 30) return "Novice";
  if (dayNumber <= 50) return "Intermediate";
  if (dayNumber <= 65) return "Skilled";
  if (dayNumber <= 80) return "Advanced";
  if (dayNumber <= 90) return "Expert";
  return "Elite";
}

export function getDailyQuestions(dayNumber = 1): Question[] {
  const today = new Date().toISOString().slice(0, 10);
  const seed = Number.parseInt(today.replace(/-/g, "")) + dayNumber * 7;
  const rand = seededRandom(seed);

  const easyPool = seededShuffle(
    questionPool.filter((q) => q.difficulty === "Easy"),
    rand,
  );
  const mediumPool = seededShuffle(
    questionPool.filter((q) => q.difficulty === "Medium"),
    rand,
  );
  const hardPool = seededShuffle(
    questionPool.filter((q) => q.difficulty === "Hard"),
    rand,
  );

  const mix = getDifficultyMix(dayNumber);
  return [
    ...easyPool.slice(0, mix.easy),
    ...mediumPool.slice(0, mix.medium),
    ...hardPool.slice(0, mix.hard),
  ];
}

export function getTodayKey(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `dmc-daily-questions-${today}`;
}
