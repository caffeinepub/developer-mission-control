const tips: Record<string, string> = {
  arrays:
    "📦 Arrays Tips:\n• Use two-pointer technique for sorted arrays (O(n) instead of O(n²))\n• Prefix sum arrays enable O(1) range queries\n• Kadane's algorithm finds max subarray in O(n)\n• Watch for off-by-one errors in boundary conditions\n• In-place operations reduce space complexity from O(n) to O(1)\n• Common patterns: sliding window, two pointers, prefix sums, frequency count",
  string:
    "🔤 Strings Tips:\n• Strings are immutable in Java/Python — use StringBuilder/list for mutations\n• KMP algorithm for pattern matching: O(n+m) vs O(nm) naive\n• Anagram check: sort both strings or use frequency map (26 chars for lowercase)\n• Palindrome: two-pointer from both ends\n• Rolling hash for efficient substring search (Rabin-Karp)\n• Common patterns: sliding window, two pointers, character frequency",
  "linked list":
    "🔗 Linked List Tips:\n• Floyd's cycle detection: fast/slow pointer, O(1) space\n• Reverse in O(n) time with 3 pointers (prev, curr, next)\n• Dummy head node simplifies edge cases\n• Middle element: fast/slow pointer (fast moves 2x)\n• Merge two sorted lists: classic O(n+m) merge\n• Common patterns: two pointers, dummy node, recursive vs iterative",
  stack:
    "📚 Stack Tips:\n• Monotonic stack for next greater/smaller element in O(n)\n• Balanced parentheses is a classic stack problem\n• Function call stack → think recursion conversion\n• Stack sorts in O(n log n) using auxiliary stack\n• Common problems: valid parentheses, min-stack, largest rectangle in histogram\n• DFS iteratively uses explicit stack instead of recursion",
  queue:
    "🚦 Queue Tips:\n• BFS always uses a queue — master this!\n• Deque (double-ended queue) enables sliding window max/min in O(n)\n• Circular queue implementation: use modulo for index wrap-around\n• Priority queue (heap) for task scheduling / Dijkstra's algorithm\n• Common problems: BFS shortest path, sliding window maximum, task scheduler",
  tree: "🌳 Tree Tips:\n• DFS traversals: preorder (root-left-right), inorder (left-root-right), postorder (left-right-root)\n• BFS / level-order: use a queue\n• Tree height: max(left, right) + 1 recursively\n• Balanced tree: height difference ≤ 1 for every node\n• Common patterns: recursion with return values, path sum problems, ancestor queries\n• Serialize/deserialize trees: BFS approach is cleaner",
  "binary tree":
    "🌲 Binary Tree Tips:\n• Lowest Common Ancestor (LCA): classic recursive problem\n• Diameter: max(left_depth + right_depth) at each node\n• Symmetric tree: compare left and right recursively\n• Path sum: DFS with remaining target\n• Morris traversal: O(1) space inorder traversal (advanced)\n• Construct from preorder+inorder or postorder+inorder",
  bst: "🌲 BST Tips:\n• Inorder traversal of BST gives sorted array — exploit this!\n• Search, insert, delete: O(h) where h is height\n• Validate BST: pass min/max bounds recursively (not just parent comparison)\n• Find kth smallest: inorder traversal counting\n• BST to balanced: inorder array → divide and conquer\n• Augmented BST: store subtree size for order statistics",
  graph:
    "🕸️ Graph Tips:\n• BFS for shortest path in unweighted graph\n• DFS for cycle detection, topological sort, connected components\n• Dijkstra's for weighted shortest path (non-negative weights)\n• Bellman-Ford handles negative weights, detects negative cycles\n• Floyd-Warshall: all-pairs shortest path in O(V³)\n• Union-Find (DSU) for connected components and cycle detection\n• Topological sort: Kahn's algorithm (BFS) or DFS-based",
  heap: "🏔️ Heap Tips:\n• Min-heap: smallest element at root. Max-heap: largest at root\n• Build heap: O(n) — heapify from bottom up\n• Kth largest element: min-heap of size k\n• Merge k sorted lists: use min-heap with (val, list_idx)\n• Median of stream: two heaps (max-heap for lower half, min-heap for upper)\n• Python: heapq is min-heap; negate values for max-heap",
  trie: "🔍 Trie Tips:\n• Prefix search in O(m) where m = word length\n• Auto-complete, spell-check, IP routing use tries\n• Space-efficient: compressed trie / radix tree\n• Word search in grid: DFS + trie pruning\n• Count words with given prefix: store count at each node\n• Common problems: word dictionary, longest common prefix",
  hash: "#️⃣ Hash Map Tips:\n• Two-sum pattern: store complement in hash map as you iterate\n• Frequency counting: hash map to count occurrences\n• Group anagrams: sort each string as key\n• Subarray sum equals k: prefix sum + hash map\n• Rolling hash: efficient substring matching\n• Avoid hash collisions in interviews by explaining load factor",
  hashmap:
    "#️⃣ Hash Map Tips:\n• Two-sum pattern: store complement in hash map as you iterate\n• Frequency counting: hash map to count occurrences\n• Group anagrams: sort each string as key\n• Subarray sum equals k: prefix sum + hash map\n• Rolling hash: efficient substring matching\n• Avoid hash collisions in interviews by explaining load factor",
  sorting:
    "🔢 Sorting Tips:\n• Know all O(n log n) sorts: merge sort, quick sort, heap sort\n• Quicksort average O(n log n) but worst O(n²) — use randomized pivot\n• Merge sort: stable, good for linked lists, O(n) extra space\n• Counting/Radix/Bucket sort: O(n) for limited ranges\n• Dutch National Flag (3-way partition) for sorting 0s, 1s, 2s\n• For interviews: often need custom comparator — know lambda syntax",
  searching:
    "🔎 Searching Tips:\n• Binary search template: lo=0, hi=n-1, while lo<=hi\n• Binary search on answer space (not just sorted arrays)\n• Ternary search for unimodal functions\n• Interpolation search: O(log log n) for uniform distribution\n• BFS for shortest path, DFS for existence/all paths\n• Exponential search: find range then binary search",
  "binary search":
    "🎯 Binary Search Tips:\n• Classic template: lo=0, hi=n-1, mid=(lo+hi)//2\n• Left-biased: hi=mid when target could be mid\n• Right-biased: lo=mid+1 when moving right\n• Search in rotated sorted array: check which half is sorted\n• Floating point binary search: iterate fixed 100 times\n• Common patterns: find first/last occurrence, peak element, minimum in rotated array, capacity/allocation problems",
  "two pointer":
    "👉👈 Two Pointer Tips:\n• Works on sorted arrays — sort first if needed\n• Container with most water: move the shorter pointer inward\n• 3Sum: fix one element, two-pointer for the rest\n• Remove duplicates: slow and fast pointer\n• Palindrome check: left and right pointers converging\n• Common patterns: opposite ends, same direction (fast/slow)",
  "sliding window":
    "🪟 Sliding Window Tips:\n• Fixed window: maintain sum/count, add right and remove left\n• Variable window: expand right, shrink left when condition violated\n• Maximum subarray of size k: classic fixed window\n• Longest substring without repeating characters: variable window + set/map\n• Minimum window substring: hash map for character counts\n• All anagrams in string: fixed window + frequency comparison",
  recursion:
    "🔄 Recursion Tips:\n• Always define: base case, recursive case, what function returns\n• Tail recursion optimization (TCO): some languages optimize this\n• Memoization converts naive recursion to O(n) time\n• Think: 'If I had the answer for n-1, how do I get answer for n?'\n• Draw the recursion tree to understand time complexity\n• Stack overflow risk for deep recursion — consider iterative with explicit stack",
  backtracking:
    "↩️ Backtracking Tips:\n• Template: choose → explore → unchoose\n• Prune early: add constraints to avoid exploring dead ends\n• N-Queens, Sudoku, permutations, combinations — classic problems\n• Use boolean array or set to track used elements\n• For permutations: swap in-place, explore, swap back\n• Time complexity often O(n!) — pruning is critical for performance",
  "dynamic programming":
    "💡 Dynamic Programming Tips:\n• Start with recursion + memoization (top-down), then convert to tabulation (bottom-up)\n• Identify: optimal substructure + overlapping subproblems\n• Common patterns: 0/1 knapsack, LCS, LIS, coin change, matrix DP\n• State definition is the hardest part — define clearly\n• Optimize space: often only need previous row/two variables\n• LeetCode tag filter: medium/hard DP problems are interview gold",
  dp: "💡 DP Tips:\n• Memoization = recursion + cache. Tabulation = bottom-up iteration\n• For string DP: dp[i][j] often represents first i/j characters\n• For grid DP: direction matters (top-left to bottom-right)\n• LIS (Longest Increasing Subsequence): O(n log n) with patience sorting\n• Bitmask DP: useful when n ≤ 20 (2^n states)\n• Print the actual solution: track parent/choice array",
  greedy:
    "💰 Greedy Tips:\n• Prove correctness: show greedy choice is always safe (exchange argument)\n• Activity selection, interval scheduling: sort by end time\n• Huffman coding: greedy builds optimal prefix-free code\n• Fractional knapsack: sort by value/weight ratio\n• Jump game: track max reachable index greedily\n• When to use: local optimal choice leads to global optimum",
  "divide and conquer":
    "✂️ Divide & Conquer Tips:\n• Split problem → solve subproblems → merge results\n• Merge sort, quicksort are classic D&C algorithms\n• Master theorem: T(n) = aT(n/b) + f(n)\n• Closest pair of points: O(n log n) with D&C\n• Matrix multiplication: Strassen's O(n^2.81) vs naive O(n³)\n• Karatsuba multiplication: multiply large numbers efficiently",
  "bit manipulation":
    "⚙️ Bit Manipulation Tips:\n• x & (x-1) clears the lowest set bit (count set bits)\n• x & (-x) isolates lowest set bit\n• XOR tricks: find single number (a^a=0, a^0=a)\n• Left shift: x<<k = x*2^k | Right shift: x>>k = x//2^k\n• Check bit i: (x >> i) & 1 | Set bit i: x | (1 << i)\n• Brian Kernighan's algorithm: count set bits in O(k) where k=set bits",
  math: "🔢 Math Tips:\n• GCD: Euclidean algorithm — gcd(a,b) = gcd(b, a%b)\n• LCM: lcm(a,b) = a*b / gcd(a,b)\n• Sieve of Eratosthenes: all primes up to n in O(n log log n)\n• Fast exponentiation: O(log n) power using squaring\n• Modular arithmetic: (a+b)%m = ((a%m)+(b%m))%m\n• Combinatorics: C(n,k) = C(n-1,k-1) + C(n-1,k) (Pascal's triangle)",
  "number theory":
    "🔢 Number Theory Tips:\n• Prime factorization: trial division up to √n\n• Euler's totient function: φ(n) = n × ∏(1 - 1/p)\n• Fermat's little theorem: a^(p-1) ≡ 1 (mod p) for prime p\n• Chinese Remainder Theorem: solve systems of modular equations\n• Bezout's identity: gcd(a,b) = ax + by (extended Euclidean)\n• Modular inverse: a^(-1) mod p = a^(p-2) mod p (Fermat's)",
  matrix:
    "🔲 Matrix Tips:\n• Matrix rotation: transpose then reverse each row (clockwise 90°)\n• Spiral traversal: shrink boundaries (top, bottom, left, right)\n• Matrix multiplication: standard O(n³), Strassen O(n^2.81)\n• Matrix chain multiplication: classic interval DP\n• DFS/BFS on grid: 4-directional or 8-directional movement\n• Sparse matrix: store only non-zero elements",
  "segment tree":
    "🌲 Segment Tree Tips:\n• Range queries + point updates: O(log n) each\n• Lazy propagation for range updates: defer updates\n• Build in O(n), query/update in O(log n)\n• Can handle: range sum, range min/max, range GCD\n• Persistent segment tree: immutable versions for historical queries\n• Merge sort tree: each node stores sorted list for order statistics",
  "time complexity":
    "⏱️ Time Complexity Tips:\n• O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!)\n• Log base doesn't matter asymptotically (just log n)\n• Amortized analysis: dynamic array O(1) amortized push\n• Master theorem for recursive algorithms\n• Iterate over n log n: usually sorting or heap operations\n• 10^8 operations/sec rule: O(n²) fine for n≤10^4",
  "space complexity":
    "💾 Space Complexity Tips:\n• Recursive call stack: O(depth) auxiliary space\n• In-place algorithms: O(1) extra space\n• Memoization table: O(states × cost_per_state)\n• BFS queue: O(width) = O(V) in worst case\n• Space-time tradeoff: hash map adds O(n) space to save time\n• Iterative solutions often use less stack space than recursive",
  "big o":
    "📊 Big O Tips:\n• Focus on dominant term, ignore constants: O(2n) = O(n)\n• Drop lower-order terms: O(n² + n) = O(n²)\n• Best/average/worst case — always clarify which you mean\n• Amortized O(1): occasional expensive op averaged over many cheap ones\n• Omega (Ω): best case. Theta (Θ): tight bound. O: upper bound\n• Tight analysis often matters in interviews — don't just say O(n²)",
  "system design":
    "🏗️ System Design Tips:\n• FAANG blueprint: Requirements → Scale → API → Database → Architecture → Bottlenecks\n• CAP theorem: Consistency, Availability, Partition Tolerance (pick 2)\n• SQL vs NoSQL: structured+ACID vs flexible+horizontal scale\n• Cache strategies: cache-aside, write-through, write-back\n• Load balancer: round-robin, least connections, consistent hashing\n• Message queues (Kafka/RabbitMQ) for async processing and decoupling\n• CDN for static assets, DB replication for read scaling",
  database:
    "🗄️ Database Tips:\n• Indexes: B-tree for range queries, hash for equality\n• ACID: Atomicity, Consistency, Isolation, Durability\n• Normalization: 1NF, 2NF, 3NF — reduce redundancy\n• Denormalization: intentional redundancy for read performance\n• Sharding: horizontal partitioning for scale\n• Connection pooling: reuse DB connections\n• EXPLAIN/ANALYZE: profile slow queries",
  sql: "📋 SQL Tips:\n• JOINs: INNER, LEFT, RIGHT, FULL OUTER — know the difference\n• Window functions: ROW_NUMBER(), RANK(), LAG(), LEAD()\n• CTEs: WITH clause for readable complex queries\n• Index strategy: composite indexes, covering indexes\n• GROUP BY → HAVING filters groups. WHERE filters rows\n• Subqueries vs JOINs: JOINs usually more efficient\n• N+1 query problem: use JOINs or eager loading",
  os: "💻 OS Tips:\n• Process vs Thread: processes have separate memory, threads share\n• Mutex, Semaphore, Monitor for synchronization\n• Deadlock conditions: mutual exclusion, hold-and-wait, no preemption, circular wait\n• Virtual memory: paging, page tables, TLB\n• CPU scheduling: FCFS, SJF, Round Robin, Priority\n• Cache hierarchy: L1 (fastest) → L2 → L3 → RAM → Disk",
  "operating system":
    "💻 Operating System Tips:\n• Process vs Thread: processes have separate memory, threads share\n• Mutex, Semaphore, Monitor for synchronization\n• Deadlock: hold-and-wait, circular wait, no preemption, mutual exclusion\n• Virtual memory, paging, demand paging, page replacement (LRU, FIFO, Clock)\n• File systems: inodes, directory structure, journaling\n• Memory management: fragmentation, compaction, garbage collection",
  networking:
    "🌐 Networking Tips:\n• OSI layers: Physical → Data Link → Network → Transport → Session → Presentation → Application\n• TCP vs UDP: reliable ordered vs fast unreliable\n• HTTP/HTTPS: stateless, request-response. HTTP/2: multiplexing\n• DNS: recursive vs iterative resolution\n• Load balancing: L4 (TCP) vs L7 (HTTP) load balancers\n• TLS handshake: certificate exchange, key derivation\n• WebSocket: full-duplex, persistent connection",
  oops: "🧩 OOP Tips:\n• SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion\n• Inheritance vs Composition: 'favor composition over inheritance'\n• Polymorphism: method overriding (runtime) vs overloading (compile-time)\n• Encapsulation: hide implementation, expose interface\n• Abstract class vs Interface: abstract has state/partial implementation\n• Design for extension: use interfaces/abstract classes for flexibility",
  "object oriented":
    "🧩 OOP Tips:\n• SOLID principles: memorize and explain each with an example\n• Design patterns: creational (Factory, Singleton), structural (Adapter, Decorator), behavioral (Observer, Strategy)\n• Dependency injection: pass dependencies, don't create them inside\n• YAGNI, DRY, KISS: practical software design principles\n• UML diagrams: class, sequence, use case for system design interviews",
  "design pattern":
    "🏛️ Design Patterns Tips:\n• Creational: Singleton (one instance), Factory (create without specifying class), Builder (step-by-step construction)\n• Structural: Adapter (interface compatibility), Decorator (add behavior), Proxy (surrogate)\n• Behavioral: Observer (event subscription), Strategy (swap algorithms), Command (encapsulate requests)\n• MVC, MVP, MVVM: separate concerns in UI applications\n• Repository pattern: abstract data access layer",
  react:
    "⚛️ React Tips:\n• Hooks: useState (state), useEffect (side effects), useCallback (memoize functions), useMemo (memoize values)\n• Key prop: must be stable and unique for list rendering\n• Lifting state up: move state to nearest common ancestor\n• Context API: avoid prop drilling for global state\n• React Query/SWR for server state management\n• Virtual DOM: React batches updates and reconciles efficiently",
  javascript:
    "🟡 JavaScript Tips:\n• Event loop: call stack → Web APIs → callback queue → microtask queue\n• Promises vs async/await: async/await is syntactic sugar\n• Closure: function retaining access to outer scope variables\n• Prototype chain: objects inherit from prototype\n• let/const vs var: block-scoped vs function-scoped\n• Destructuring, spread/rest, optional chaining (?.) — master ES6+",
  typescript:
    "🔷 TypeScript Tips:\n• Utility types: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>\n• Type vs Interface: both work; interfaces support declaration merging\n• Generics: reusable type-safe functions/classes\n• Discriminated unions: common pattern for state machines\n• never type: exhaustive checks in switch statements\n• Mapped types, conditional types, template literal types (advanced)",
  python:
    "🐍 Python Tips:\n• List comprehensions: [x*2 for x in range(10) if x%2==0]\n• defaultdict, Counter, OrderedDict from collections\n• heapq module: min-heap operations\n• itertools: product, combinations, permutations, groupby\n• @functools.lru_cache for memoization\n• Generator expressions: memory-efficient iteration with yield",
  java: "☕ Java Tips:\n• ArrayList vs LinkedList: array for random access, linked for frequent insert/delete\n• HashMap vs TreeMap vs LinkedHashMap\n• Stream API: filter, map, reduce, collect for functional style\n• StringBuilder for string concatenation in loops\n• Comparable vs Comparator: built-in vs external ordering\n• Java Concurrency: synchronized, volatile, ReentrantLock, Executors",
  "c++":
    "🔧 C++ Tips:\n• STL containers: vector, deque, list, set, map, unordered_map, priority_queue\n• auto keyword reduces boilerplate\n• Range-based for loop: for(auto& x : vec)\n• Lambda functions: [capture](params) { body }\n• Smart pointers: unique_ptr, shared_ptr, weak_ptr\n• Move semantics: avoid unnecessary copies with std::move",
  git: "🗂️ Git Tips:\n• git rebase vs merge: rebase creates linear history, merge preserves branch history\n• Squash commits before merging feature branches\n• git bisect: binary search through commits to find bug introduction\n• git stash: temporarily shelve changes\n• Conventional commits: feat:, fix:, docs:, chore:, refactor:\n• Git hooks: pre-commit for linting, pre-push for tests",
  "interview tips":
    "🎯 Interview Tips:\n• STAR method: Situation, Task, Action, Result for behavioral questions\n• Clarify the problem before coding: constraints, edge cases, expected output\n• Think out loud — interviewers value your thought process\n• Start with brute force, then optimize\n• Test your code with examples including edge cases\n• Practice on LeetCode, HackerRank, and mock interviews\n• Know your time/space complexity before the interviewer asks",
  resume:
    "📄 Resume Tips:\n• One page for < 10 years experience\n• Quantify achievements: 'Reduced load time by 40%' not 'Improved performance'\n• STAR bullets: strong action verb + what you did + measurable result\n• ATS optimization: include keywords from job description\n• Projects section: show GitHub links with live demos\n• Tailor resume per job: highlight relevant skills/projects\n• Include competitive programming achievements (rating, problems solved)",
};

export function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  for (const [key, response] of Object.entries(tips)) {
    if (q.includes(key)) {
      return response;
    }
  }
  return "I don't have specific tips on that yet. Try searching: arrays, binary search, recursion, dynamic programming, graphs, system design, time complexity, react, javascript, python, java, git, interview tips, or resume.";
}

// ─── Problem Solver ────────────────────────────────────────────────────────

export interface ProblemAnalysis {
  type: string;
  hint: string;
  approach: string;
  complexity: string;
}

interface PatternDef {
  keywords: string[];
  type: string;
  hint: string;
  approach: string;
  complexity: string;
}

const PATTERNS: PatternDef[] = [
  {
    keywords: ["two sum", "target sum", "pair"],
    type: "Two Pointers / Hash Map",
    hint: "Store each element's complement in a hash map as you iterate. For sorted arrays, converging two pointers from both ends avoids O(n²) brute force.",
    approach:
      "1. Scan the array from left to right.\n2. For each element x, check if (target − x) exists in the hash map.\n3. If found → return the pair. Otherwise store x in the map.\n4. For the sorted-array variant, use lo/hi pointers moving inward.\n5. Return indices or values as required.",
    complexity: "Time: O(n), Space: O(n)",
  },
  {
    keywords: ["subarray", "substring", "window"],
    type: "Sliding Window",
    hint: "Maintain a window [left, right] and expand/shrink it based on a constraint. This avoids recomputing the window from scratch each step.",
    approach:
      "1. Initialize left = 0, and any required tracking structure (sum, map, set).\n2. Expand right pointer one step at a time, updating the window state.\n3. When the constraint is violated, shrink from the left until valid again.\n4. Track the best result (max length, min length, etc.) at each valid state.\n5. Return the optimal result found.",
    complexity: "Time: O(n), Space: O(k) where k is window/alphabet size",
  },
  {
    keywords: ["sorted", "binary search", "rotated"],
    type: "Binary Search",
    hint: "If the search space is monotonic or sorted, you can eliminate half in O(log n). Binary search also applies to 'answer-space' problems where you search for a value, not an index.",
    approach:
      "1. Define lo = 0, hi = n−1 (or the answer range).\n2. Compute mid = (lo + hi) >> 1.\n3. Evaluate the condition at mid — decide whether the answer is in [lo, mid] or [mid+1, hi].\n4. For rotated arrays, first determine which half is sorted.\n5. Repeat until lo > hi; return the final result.",
    complexity: "Time: O(log n), Space: O(1)",
  },
  {
    keywords: ["tree", "bst", "root", "leaf", "node"],
    type: "Tree / DFS / BFS",
    hint: "Most tree problems decompose naturally into recursion: solve for left subtree, solve for right subtree, combine. For level-order work, BFS with a queue is cleaner.",
    approach:
      "1. Handle the base case: null node returns 0 / false / null.\n2. Recurse on the left child and collect the result.\n3. Recurse on the right child and collect the result.\n4. Combine both results for the current node's answer.\n5. For BFS, push children into a queue and process level by level.",
    complexity:
      "Time: O(n), Space: O(h) for DFS, O(w) for BFS (h=height, w=max width)",
  },
  {
    keywords: ["graph", "path", "connected", "cycle", "visit"],
    type: "Graph Traversal",
    hint: "Choose BFS for shortest paths in unweighted graphs; choose DFS for connectivity, cycles, and topological sort. Always track visited nodes to avoid infinite loops.",
    approach:
      "1. Build an adjacency list from the input edges.\n2. Initialize a visited set/array.\n3. For BFS: use a queue, push the start node, process neighbors level by level.\n4. For DFS: use recursion or an explicit stack.\n5. Check cycle / connectivity / shortest-path conditions during traversal.",
    complexity: "Time: O(V + E), Space: O(V)",
  },
  {
    keywords: [
      "dp",
      "dynamic",
      "memoiz",
      "subproblem",
      "min cost",
      "max profit",
      "ways to",
    ],
    type: "Dynamic Programming",
    hint: "Identify overlapping subproblems and optimal substructure. Define state clearly (what does dp[i] or dp[i][j] represent?), then find the recurrence relation before writing code.",
    approach:
      "1. Define the DP state: what parameters uniquely identify a subproblem.\n2. Write the base cases (smallest inputs with known answers).\n3. Express the recurrence: dp[i] = f(dp[i-1], dp[i-2], ...).\n4. Decide top-down (memoization) or bottom-up (tabulation).\n5. Optimize space if only the previous row/values are needed.",
    complexity: "Time: O(n²) typical, Space: O(n) after optimization",
  },
  {
    keywords: ["stack", "parentheses", "bracket", "monotonic"],
    type: "Stack",
    hint: "A stack shines when you need the most recent 'open' context — matching brackets, the nearest smaller element, or converting infix to postfix.",
    approach:
      "1. Initialize an empty stack.\n2. Iterate through each element/character.\n3. Push onto the stack based on your condition (e.g., push open brackets).\n4. Pop when the closing condition is met; validate or compute.\n5. After iteration the stack should be empty for balanced problems.",
    complexity: "Time: O(n), Space: O(n)",
  },
  {
    keywords: ["heap", "priority", "kth", "top k"],
    type: "Heap / Priority Queue",
    hint: "Use a min-heap of size k to track the k largest elements in one pass — no need to sort the entire array.",
    approach:
      "1. Initialize a min-heap (or max-heap depending on the problem).\n2. Push the first k elements into the heap.\n3. For each remaining element, compare with the heap root.\n4. If the new element qualifies, pop the root and push the new element.\n5. The heap now contains the top-k result; extract or return as needed.",
    complexity: "Time: O(n log k), Space: O(k)",
  },
  {
    keywords: ["string", "palindrome", "anagram", "reverse"],
    type: "String Manipulation",
    hint: "Anagram problems map to frequency counting. Palindrome problems use two-pointer inward scan or center-expand. Sliding window handles most substring queries.",
    approach:
      "1. Clarify: are we looking at characters, words, or a frequency match?\n2. Build a character frequency map or sort the string as a canonical key.\n3. Use two pointers for palindrome / reversal checks.\n4. Apply sliding window for longest/shortest substring with constraints.\n5. Handle edge cases: empty string, single character, all same characters.",
    complexity: "Time: O(n), Space: O(1) for fixed alphabet",
  },
  {
    keywords: ["matrix", "grid", "row", "column", "island"],
    type: "Matrix / Grid BFS-DFS",
    hint: "Treat each cell as a graph node with up to 4 (or 8) neighbors. BFS gives shortest path in unweighted grids; DFS + visited marking counts connected components.",
    approach:
      "1. Define 4-directional (or 8-directional) movement deltas.\n2. Initialize a visited matrix to avoid revisiting cells.\n3. For each unvisited starting cell, launch BFS or DFS.\n4. During traversal, accumulate area/count or track the shortest path distance.\n5. Handle boundary checks (row in [0,m) && col in [0,n)) before visiting.",
    complexity: "Time: O(m × n), Space: O(m × n)",
  },
  {
    keywords: ["permutation", "combination", "subset"],
    type: "Backtracking",
    hint: "Build the solution incrementally. At each step choose an element, recurse, then undo the choice. Prune branches early when constraints are violated.",
    approach:
      "1. Define the recursive function: (current build, start index, remaining constraint).\n2. Base case: if current build meets the target, record and return.\n3. Iterate from start to end, choosing one element at a time.\n4. Add the element, recurse with updated state.\n5. Remove the element (backtrack) and continue to the next choice.",
    complexity: "Time: O(2^n) to O(n!), Space: O(n) recursion depth",
  },
  {
    keywords: ["linked list", "reverse list", "cycle list"],
    type: "Linked List",
    hint: "Most linked-list patterns rely on two pointers: a fast/slow pointer pair (cycle detection, middle node) or a prev/curr/next triple (in-place reversal).",
    approach:
      "1. Draw the before/after pointer state for a small example.\n2. Use a dummy head node to simplify edge cases at the start.\n3. For reversal: prev = null, curr = head, iterate: next = curr.next → curr.next = prev → prev = curr → curr = next.\n4. For cycle detection: advance slow by 1, fast by 2; they meet inside a cycle.\n5. For finding the middle: slow/fast pointers — slow ends at the midpoint.",
    complexity: "Time: O(n), Space: O(1)",
  },
];

const GENERIC_ANALYSIS: ProblemAnalysis = {
  type: "General / Unknown",
  hint: "Start by reading the constraints carefully — they dictate the required time complexity and often hint at the right data structure or algorithm.",
  approach:
    "1. Read constraints: n ≤ 10⁴ → O(n²) ok; n ≤ 10⁶ → need O(n log n) or O(n).\n2. Identify the input structure: array, string, graph, tree, matrix?\n3. Ask: does order matter? Do I need duplicates? Is the data sorted?\n4. Sketch a brute-force solution and estimate its complexity.\n5. Look for patterns: subarrays → sliding window; pairs → two pointers / hash map; optimization → DP or greedy.",
  complexity: "Depends on chosen approach",
};

export function analyzeProblem(text: string): ProblemAnalysis {
  const lower = text.toLowerCase();
  for (const pattern of PATTERNS) {
    if (pattern.keywords.some((kw) => lower.includes(kw))) {
      return {
        type: pattern.type,
        hint: pattern.hint,
        approach: pattern.approach,
        complexity: pattern.complexity,
      };
    }
  }
  return GENERIC_ANALYSIS;
}
