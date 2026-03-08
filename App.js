import { useState } from "react";

const C = {
  blue:"#4fc3f7",yellow:"#ffd54f",green:"#a5d6a7",red:"#ef9a9a",
  purple:"#ce93d8",teal:"#80cbc4",orange:"#ffb74d",pink:"#f48fb1",
  lime:"#c5e1a5",cyan:"#80deea",indigo:"#9fa8da",warm:"#ffcc80",
  bg:"#0f1117",sidebar:"#0a0c10",card:"#131820",border:"#1e2330",
  text:"#e0e0e0",dim:"#546e7a",dimmer:"#2a3545"
};

// ═══════════════════════════════════════════
// STL GUIDE DATA
// ═══════════════════════════════════════════
const STL_DATA = [
  {
    name:"vector",emoji:"📦",color:C.blue,tagline:"A bag that grows as you add stuff",
    what:"A dynamic array. Grows and shrinks automatically. Use it almost everywhere in DSA problems.",
    visual:`  vector<int> v = {1, 2, 3};
  INDEX:  [0] [1] [2]
  VALUE:   1   2   3
  v.push_back(4) → [1][2][3][4]  ← grows!
  v.pop_back()   → [1][2][3]     ← shrinks!
  v[0]=1, v.back()=3, v.size()=3`,
    tips:["Use size_t or (int)v.size() in loops to avoid signed/unsigned warnings","push_back is O(1) average — don't fear it","2D: vector<vector<int>> mat(rows, vector<int>(cols, 0))"],
    cheatsheet:[
      {op:"vector<int> v",desc:"empty vector"},
      {op:"vector<int> v(5,0)",desc:"size 5, all zeros"},
      {op:"vector<int> v={1,2,3}",desc:"init with values"},
      {op:"v.push_back(x)",desc:"add to end — O(1)"},
      {op:"v.pop_back()",desc:"remove last — O(1)"},
      {op:"v[i]",desc:"access index i — O(1)"},
      {op:"v.size()",desc:"number of elements"},
      {op:"v.empty()",desc:"true if no elements"},
      {op:"v.front()",desc:"first element"},
      {op:"v.back()",desc:"last element"},
      {op:"v.clear()",desc:"remove everything"},
      {op:"sort(v.begin(),v.end())",desc:"sort ascending O(nlogn)"},
      {op:"reverse(v.begin(),v.end())",desc:"reverse in-place O(n)"},
      {op:"for(auto x:v)",desc:"loop all (copy)"},
      {op:"for(auto& x:v)",desc:"loop all (reference — faster)"},
      {op:"accumulate(v.begin(),v.end(),0)",desc:"sum all elements"},
      {op:"*max_element(v.begin(),v.end())",desc:"maximum value"},
      {op:"*min_element(v.begin(),v.end())",desc:"minimum value"},
      {op:"count(v.begin(),v.end(),x)",desc:"count occurrences of x"},
    ]
  },
  {
    name:"string",emoji:"🔤",color:C.yellow,tagline:"A sequence of characters — array of chars",
    what:"Strings are arrays of characters with extra powers. Every loop trick for arrays works on strings too.",
    visual:`  string s = "hello";
  INDEX:  [0][1][2][3][4]
  CHAR:    h  e  l  l  o
  s[0]='h'   s[4]='o'   s.length()=5
  s.substr(1,3)="ell"  s.find("ll")=2`,
    tips:["s[i] gives a char — NOT a string","'7'-'0'=7 (char digit to int)","isalpha,isdigit,tolower,toupper are your best friends for string problems"],
    cheatsheet:[
      {op:`string s="hello"`,desc:"declare string"},
      {op:"s.length()/s.size()",desc:"character count"},
      {op:"s[i]",desc:"char at index i"},
      {op:`s+="world"`,desc:"append to string"},
      {op:"s.substr(start,len)",desc:"extract part of string"},
      {op:`s.find("sub")`,desc:"find position (string::npos if absent)"},
      {op:"s.empty()",desc:"true if empty"},
      {op:"to_string(42)",desc:"int → string"},
      {op:`stoi("42")`,desc:"string → int"},
      {op:"isalpha(c)",desc:"is letter? a-z,A-Z"},
      {op:"isdigit(c)",desc:"is digit? 0-9"},
      {op:"tolower(c)/toupper(c)",desc:"change case"},
      {op:"c-'0'",desc:"char digit to int ('7'-'0'=7)"},
      {op:"c-'a'",desc:"letter to index (a=0,b=1...z=25)"},
      {op:"sort(s.begin(),s.end())",desc:"sort characters"},
      {op:"reverse(s.begin(),s.end())",desc:"reverse string"},
    ]
  },
  {
    name:"unordered_map",emoji:"📖",color:C.pink,tagline:"A dictionary — key instantly gets you the value",
    what:"Stores key→value pairs. Look up any value in O(1) by key. Perfect for counting, caching, grouping.",
    visual:`  unordered_map<string,int> age;
  age["Alice"]=25;   age["Bob"]=30;
  "Alice"──→25   "Bob"──→30
  age.count("Alice")=1 (exists)
  age.count("Eve") =0 (not there)`,
    tips:["NEVER use map[key] to check existence — it creates the key with value 0!","ALWAYS use map.count(key) to check","map[key]++ auto-initializes to 0 — great for counting"],
    cheatsheet:[
      {op:"unordered_map<K,V> m",desc:"empty hash map"},
      {op:"m[key]=val",desc:"insert or update"},
      {op:"m[key]++",desc:"count (starts at 0 auto)"},
      {op:"m.count(key)",desc:"1 if exists, 0 if not — SAFE CHECK"},
      {op:"m.erase(key)",desc:"remove a key"},
      {op:"m.size()",desc:"number of pairs"},
      {op:"for(auto& [k,v]:m)",desc:"loop all pairs (C++17)"},
    ]
  },
  {
    name:"unordered_set",emoji:"🫙",color:C.purple,tagline:"A jar of unique items — no duplicates",
    what:"Like unordered_map but only keys, no values. O(1) to check existence. For 'have I seen this?' problems.",
    visual:`  unordered_set<int> seen;
  seen.insert(5);  seen.insert(10);
  seen.insert(5);  ← duplicate! ignored
  Contents: {5, 10}
  seen.count(5)=1 ✓   seen.count(7)=0 ✗`,
    tips:["Inserting a duplicate does nothing — perfect for dedup","set<int> (ordered) if you need sorted iteration","Convert vector to set to remove all duplicates: set<int>(v.begin(),v.end())"],
    cheatsheet:[
      {op:"unordered_set<T> s",desc:"empty set"},
      {op:"s.insert(x)",desc:"add x (ignored if duplicate)"},
      {op:"s.count(x)",desc:"1 if exists, 0 if not"},
      {op:"s.erase(x)",desc:"remove x"},
      {op:"s.size()",desc:"unique element count"},
      {op:"for(auto x:s)",desc:"loop all elements"},
    ]
  },
  {
    name:"stack",emoji:"🥞",color:C.teal,tagline:"Pancake stack — last added, first eaten (LIFO)",
    what:"Last In First Out. Like browser back-button. Last page you visited is first to go back to.",
    visual:`  stk.push(1)→[1]
  stk.push(2)→[1,2]
  stk.push(3)→[1,2,3] ← TOP
  stk.top()=3  stk.pop()removes 3
  stk.top()=2 (now 2 is on top)`,
    tips:["ALWAYS check stk.empty() before top() or pop() — crashes on empty!","Stack solves: brackets matching, undo, DFS, next greater element","Store INDICES in stack when you need position later"],
    cheatsheet:[
      {op:"stack<T> stk",desc:"empty stack"},
      {op:"stk.push(x)",desc:"add to top"},
      {op:"stk.pop()",desc:"remove top (does NOT return it!)"},
      {op:"stk.top()",desc:"peek at top (don't remove)"},
      {op:"stk.empty()",desc:"true if empty"},
      {op:"stk.size()",desc:"number of elements"},
    ]
  },
  {
    name:"queue",emoji:"🚶",color:C.green,tagline:"Queue at a shop — first in, first served (FIFO)",
    what:"First In First Out. Like a ticket counter. First person in line gets served first. Used in BFS.",
    visual:`  q.push(1)→FRONT:[1]:BACK
  q.push(2)→FRONT:[1,2]:BACK
  q.push(3)→FRONT:[1,2,3]:BACK
  q.front()=1  q.pop()removes 1
  q.front()=2 (now 2 is first)`,
    tips:["ALWAYS check q.empty() before front() or pop()","Queue is the backbone of BFS traversal","Take q.size() snapshot BEFORE the level loop in BFS"],
    cheatsheet:[
      {op:"queue<T> q",desc:"empty queue"},
      {op:"q.push(x)",desc:"add to back"},
      {op:"q.pop()",desc:"remove from front"},
      {op:"q.front()",desc:"peek at front"},
      {op:"q.back()",desc:"peek at back"},
      {op:"q.empty()",desc:"true if empty"},
    ]
  },
  {
    name:"priority_queue",emoji:"🏆",color:C.orange,tagline:"Emergency room — most urgent (largest) goes first",
    what:"Like a queue but 'most important' element always comes out first. Default: LARGEST is most important.",
    visual:`  priority_queue<int> maxPQ;
  push 3,1,7 → top()=7 (always MAX)
  // MIN heap:
  priority_queue<int,vector<int>,greater<int>> minPQ;
  push 3,1,7 → top()=1 (always MIN)`,
    tips:["Default is MAX heap","For MIN heap add: ,vector<int>,greater<int>","Use for Top-K problems: min-heap of size K","Dijkstra shortest path uses min priority queue"],
    cheatsheet:[
      {op:"priority_queue<int> pq",desc:"MAX heap (biggest on top)"},
      {op:"priority_queue<int,vector<int>,greater<int>> pq",desc:"MIN heap (smallest on top)"},
      {op:"pq.push(x)",desc:"add element"},
      {op:"pq.top()",desc:"peek max or min"},
      {op:"pq.pop()",desc:"remove max or min"},
      {op:"pq.empty()",desc:"true if empty"},
    ]
  },
  {
    name:"pair & auto",emoji:"👫",color:C.red,tagline:"Two values as one + compiler type inference",
    what:"pair<T1,T2> holds two values together. auto lets compiler figure out the type — saves writing long type names.",
    visual:`  pair<int,string> p={1,"hello"};
  p.first=1   p.second="hello"
  auto x=42;           // int
  auto it=v.begin();   // iterator
  auto [a,b]=p;        // a=1, b="hello"
  for(auto& [k,v]:myMap) { }`,
    tips:["auto& in range-for loops avoids copying","Structured bindings [k,v] make map loops cleaner","Pairs sort by first element then second — useful for intervals"],
    cheatsheet:[
      {op:"pair<T1,T2> p={a,b}",desc:"create a pair"},
      {op:"p.first / p.second",desc:"access values"},
      {op:"auto x=expr",desc:"compiler determines type"},
      {op:"auto& x:container",desc:"reference in range-for (fast)"},
      {op:"auto [a,b]=pair",desc:"structured binding (C++17)"},
    ]
  },
];

// ═══════════════════════════════════════════
// ALL PROBLEMS
// ═══════════════════════════════════════════
const ALL_TOPICS = [

  // ─── PURE BASICS ────────────────────────
  {
    section:"basics",id:"loops",label:"Loops & Conditions",emoji:"🔁",color:C.blue,
    desc:"Zero prerequisites. Pure loops and conditions. Every programmer starts here.",
    items:[
      {
        title:"FizzBuzz",level:"EASY",tag:"LOOPS",company:"TCS · Wipro · LG · Infosys",
        concept:"Divisibility with %. Check BOTH conditions (15) BEFORE individual ones (3 or 5).",
        analogy:"Counting in a circle game. Every 3rd count say Fizz, every 5th say Buzz, both? FizzBuzz.",
        input:"n=15",output:"1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz",
        steps:["Loop i from 1 to n","Check i%15==0 FIRST (both 3 and 5 — order matters!)","Check i%3==0 second","Check i%5==0 third","Else print i"],
        stl:"None — pure loops",
        code:`#include <bits/stdc++.h>
using namespace std;
int main() {
    int n = 15;
    for (int i = 1; i <= n; i++) {
        // Check 15 FIRST — if you check 3 first,
        // numbers like 15 would print "Fizz" instead of "FizzBuzz"
        if      (i % 15 == 0) cout << "FizzBuzz\\n";
        else if (i % 3  == 0) cout << "Fizz\\n";
        else if (i % 5  == 0) cout << "Buzz\\n";
        else                   cout << i << "\\n";
        // % = modulo = remainder after division
        // 15 % 3 = 0 (divides evenly)
        // 16 % 3 = 1 (remainder 1)
    }
}`
      },
      {
        title:"Sum and Average of Array",level:"EASY",tag:"LOOPS",company:"TCS · Wipro · Infosys",
        concept:"Running total. Add each element. Average = total / count.",
        analogy:"Tallying your grocery bill. Each item adds to the running total. Bill / items = average price.",
        input:"[1,2,3,4,5]",output:"Sum=15 Average=3.0",
        steps:["sum=0","Loop each element","sum += element","avg = (double)sum / arr.size()"],
        stl:"accumulate() as shortcut",
        code:`#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int x : arr) sum += x;
    // Cast to double BEFORE dividing — otherwise integer division truncates
    double avg = (double)sum / arr.size();
    cout << "Sum=" << sum << " Average=" << avg << "\\n";
    // Sum=15 Average=3.0

    // STL shortcut (needs #include <numeric>):
    // int s = accumulate(arr.begin(), arr.end(), 0);
}`
      },
      {
        title:"Find Min and Max",level:"EASY",tag:"LOOPS",company:"TCS · Infosys · LG",
        concept:"Track the best seen so far. Assume first element is both min and max, then update.",
        analogy:"Window shopping. You note the cheapest and most expensive item as you walk down the street.",
        input:"[3,1,7,2,9,4]",output:"Min=1 Max=9",
        steps:["minVal=arr[0], maxVal=arr[0]","Loop from index 1","arr[i]<minVal → update minVal","arr[i]>maxVal → update maxVal","Print both"],
        stl:"*min_element() *max_element() as shortcuts",
        code:`#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> arr = {3,1,7,2,9,4};
    int minVal = arr[0]; // assume first is min
    int maxVal = arr[0]; // assume first is max
    for (int i = 1; i < (int)arr.size(); i++) {
        if (arr[i] < minVal) minVal = arr[i];
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    cout << "Min=" << minVal << " Max=" << maxVal << "\\n";
    // STL: *min_element(arr.begin(),arr.end())
    // STL: *max_element(arr.begin(),arr.end())
}`
      },
      {
        title:"Count Even & Odd",level:"EASY",tag:"LOOPS",company:"TCS · Wipro",
        concept:"% 2 == 0 means even. % 2 == 1 means odd. Count each.",
        analogy:"Sorting a handful of coins — heads in one pile, tails in another.",
        input:"[1,2,3,4,5,6]",output:"Even:3 Odd:3",
        steps:["evens=0, odds=0","For each x: if x%2==0 → evens++ else odds++","Print both"],
        stl:"None",
        code:`#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> arr = {1,2,3,4,5,6};
    int evens=0, odds=0;
    for (int x : arr) {
        if (x % 2 == 0) evens++; // 0 remainder = even
        else            odds++;  // 1 remainder = odd
    }
    cout << "Even:" << evens << " Odd:" << odds << "\\n";
}`
      },
      {
        title:"Second Largest Element",level:"EASY",tag:"LOOPS",company:"TCS · Infosys · LG · Wipro",
        concept:"Track two variables: largest (first) and second largest. Update carefully when you find a new max.",
        analogy:"Looking for the silver medal winner. When a new champion is found, the old champion becomes the silver.",
        input:"[3,1,7,2,9,4]",output:"7",
        steps:["first=INT_MIN, second=INT_MIN","For each x: if x>first → second=first, first=x","Else if x>second AND x!=first → second=x","Return second"],
        stl:"INT_MIN from <climits>",
        code:`#include <bits/stdc++.h>
using namespace std;
int secondLargest(vector<int>& arr) {
    int first  = INT_MIN; // largest
    int second = INT_MIN; // second largest
    for (int x : arr) {
        if (x > first) {
            second = first; // old champion becomes silver
            first  = x;     // new champion
        } else if (x > second && x != first) {
            second = x;     // new silver
        }
    }
    return second; // [3,1,7,2,9,4] → first=9, second=7
}
int main() {
    vector<int> v={3,1,7,2,9,4};
    cout << secondLargest(v); // 7
}`
      },
      {
        title:"Reverse an Array",level:"EASY",tag:"TWO POINTER",company:"TCS · Wipro · LG",
        concept:"Swap elements from both ends, moving toward center.",
        analogy:"Reading a word from both ends simultaneously, swapping letters as you go.",
        input:"[1,2,3,4,5]",output:"[5,4,3,2,1]",
        steps:["l=0, r=n-1","While l<r: swap(arr[l],arr[r])","l++, r--","Stop when they cross"],
        stl:"swap() or std::reverse()",
        code:`#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> arr = {1,2,3,4,5};
    int l=0, r=arr.size()-1;
    while (l < r) {
        swap(arr[l], arr[r]);
        l++; r--;
    }
    for (int x : arr) cout << x << " "; // 5 4 3 2 1
    // STL: reverse(arr.begin(), arr.end());
}`
      },
      {
        title:"Check Prime Number",level:"EASY",tag:"MATH",company:"TCS · Infosys · LG · Wipro",
        concept:"A prime has no divisors from 2 to √n. Only check up to √n — it's enough and much faster.",
        analogy:"Checking a combination lock. You only need to try combinations up to √n because divisors come in pairs.",
        input:"n=17",output:"Prime",
        steps:["n<=1 → not prime","Check i from 2 to √n (use i*i<=n)","If n%i==0 → not prime","No divisor found → prime"],
        stl:"None",
        code:`#include <bits/stdc++.h>
using namespace std;
bool isPrime(int n) {
    if (n <= 1) return false;
    // i*i<=n is safer than i<=sqrt(n) (avoids floating point errors)
    for (int i = 2; i*i <= n; i++)
        if (n % i == 0) return false;
    return true;
}
int main() {
    for (int i=2;i<=30;i++)
        if(isPrime(i)) cout<<i<<" "; // 2 3 5 7 11 13 17 19 23 29
}`
      },
      {
        title:"Fibonacci Sequence",level:"EASY",tag:"LOOPS",company:"TCS · Infosys · LG · Wipro",
        concept:"Each number = sum of two before it. fib[i] = fib[i-1] + fib[i-2].",
        analogy:"Each rung of a ladder rests on the two rungs below it.",
        input:"n=8",output:"0 1 1 2 3 5 8 13",
        steps:["fib[0]=0, fib[1]=1","For i from 2 to n-1: fib[i]=fib[i-1]+fib[i-2]","Print sequence"],
        stl:"vector<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
int main() {
    int n = 8;
    vector<int> fib(n);
    fib[0]=0; fib[1]=1;
    for (int i=2; i<n; i++)
        fib[i] = fib[i-1] + fib[i-2];
    for (int x : fib) cout << x << " ";
    // 0 1 1 2 3 5 8 13
}`
      },
      {
        title:"Reverse a Number",level:"EASY",tag:"MATH",company:"TCS · Wipro · Infosys",
        concept:"Extract last digit with %10, build reversed number by shifting left (*10), remove last digit with /10.",
        analogy:"Reading a number's digits right to left, writing them down as you go.",
        input:"12345",output:"54321",
        steps:["While n>0:","lastDigit = n%10","reversed = reversed*10 + lastDigit","n = n/10"],
        stl:"None",
        code:`#include <bits/stdc++.h>
using namespace std;
int reverseNumber(int n) {
    int rev = 0;
    while (n > 0) {
        int d = n % 10;     // last digit
        rev = rev*10 + d;   // shift left, append digit
        n /= 10;            // remove last digit
    }
    return rev; // 12345 → 54321
}
int main() { cout << reverseNumber(12345); }`
      },
      {
        title:"Sum of Digits",level:"EASY",tag:"MATH",company:"TCS · Wipro · Infosys · LG",
        concept:"Extract each digit with %10, add to sum, remove digit with /10.",
        analogy:"Breaking a number into its individual digits and adding them all up.",
        input:"n=12345",output:"15",
        steps:["sum=0","While n>0: sum += n%10, n /= 10","Return sum"],
        stl:"None",
        code:`#include <bits/stdc++.h>
using namespace std;
int sumOfDigits(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10; // add last digit
        n /= 10;       // remove last digit
    }
    return sum; // 12345 → 1+2+3+4+5 = 15
}
int main() { cout << sumOfDigits(12345); } // 15`
      },
      {
        title:"GCD and LCM",level:"EASY",tag:"MATH",company:"TCS · Wipro · Infosys · LG",
        concept:"GCD: Euclidean algorithm — gcd(a,b) = gcd(b, a%b) until b=0. LCM = (a*b)/gcd(a,b).",
        analogy:"GCD = biggest tile size that perfectly tiles a floor. LCM = first time two different-length trains align at the same station.",
        input:"a=12, b=8",output:"GCD=4 LCM=24",
        steps:["GCD: while b!=0 → temp=b, b=a%b, a=temp","Return a","LCM = (a*b)/gcd(a,b)"],
        stl:"__gcd(a,b) in STL as shortcut",
        code:`#include <bits/stdc++.h>
using namespace std;
int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b; // remainder
        a = temp;
    }
    return a; // gcd(12,8)=4
}
int lcm(int a, int b) {
    return (a / gcd(a,b)) * b; // divide first to avoid overflow
}
int main() {
    cout << "GCD=" << gcd(12,8) << "\\n"; // 4
    cout << "LCM=" << lcm(12,8) << "\\n"; // 24
    // STL shortcut: __gcd(12,8) or gcd(12,8) in C++17
}`
      },
      {
        title:"Pattern Printing — Triangle",level:"EASY",tag:"NESTED LOOPS",company:"TCS · Wipro · Infosys",
        concept:"Nested loops: outer = rows, inner = columns. Column count equals row number.",
        analogy:"Building a staircase with blocks. Row 1 has 1 block, row 2 has 2, and so on.",
        input:"n=5",output:"Star triangle",
        steps:["Outer loop i from 1 to n (rows)","Inner loop j from 1 to i (columns)","Print '*' each iteration","Print newline after inner loop"],
        stl:"None",
        code:`#include <bits/stdc++.h>
using namespace std;
int main() {
    int n = 5;
    // Pattern 1: Star triangle
    for (int i=1; i<=n; i++) {
        for (int j=1; j<=i; j++)
            cout << "* ";
        cout << "\\n";
    }
    // *
    // * *
    // * * *
    // * * * *
    // * * * * *

    cout << "---\\n";
    // Pattern 2: Inverted triangle
    for (int i=n; i>=1; i--) {
        for (int j=1; j<=i; j++)
            cout << "* ";
        cout << "\\n";
    }
    // * * * * *
    // * * * *
    // * * *
    // * *
    // *

    cout << "---\\n";
    // Pattern 3: Number pyramid
    for (int i=1; i<=n; i++) {
        for (int j=1; j<=i; j++)
            cout << j << " ";
        cout << "\\n";
    }
}`
      },
      {
        title:"Armstrong Number",level:"EASY",tag:"MATH",company:"TCS · Wipro · Infosys",
        concept:"Armstrong: sum of (each digit raised to power = number of digits) equals original number.",
        analogy:"A number that reconstitutes itself when you cube (or nth-power) its own digits. 153 = 1³+5³+3³.",
        input:"n=153",output:"Armstrong",
        steps:["Count number of digits","For each digit d: sum += d^numDigits","If sum == original → Armstrong"],
        stl:"pow() from <cmath>",
        code:`#include <bits/stdc++.h>
using namespace std;
bool isArmstrong(int n) {
    int original = n, sum = 0;
    int digits = to_string(n).length(); // count digits
    while (n > 0) {
        int d = n % 10;
        sum += (int)pow(d, digits);
        n /= 10;
    }
    return sum == original;
}
int main() {
    // Print all 3-digit Armstrong numbers
    for (int i=100; i<=999; i++)
        if (isArmstrong(i)) cout << i << " ";
    // 153 370 371 407
}`
      },
      {
        title:"Perfect Number",level:"EASY",tag:"MATH",company:"TCS · Wipro",
        concept:"A perfect number equals the sum of its proper divisors (all divisors except itself). e.g. 6=1+2+3.",
        analogy:"A perfect number is one where all its factors (except itself) add up to exactly itself.",
        input:"n=28",output:"Perfect (1+2+4+7+14=28)",
        steps:["sum=1 (1 is always a divisor)","Loop i from 2 to √n","If n%i==0: add i and n/i to sum (if n/i≠i)","If sum==n → perfect"],
        stl:"None",
        code:`#include <bits/stdc++.h>
using namespace std;
bool isPerfect(int n) {
    if (n <= 1) return false;
    int sum = 1; // 1 is always a divisor
    for (int i=2; i*i<=n; i++) {
        if (n % i == 0) {
            sum += i;
            if (i != n/i) sum += n/i; // add both divisors
        }
    }
    return sum == n;
}
int main() {
    for (int i=2; i<=1000; i++)
        if (isPerfect(i)) cout << i << " ";
    // 6 28 496
}`
      },
      {
        title:"Pascal's Triangle",level:"EASY",tag:"2D ARRAY",company:"TCS · LG · Infosys",
        concept:"Each element = left parent + right parent from row above. Edges are always 1.",
        analogy:"A mountain of pebbles. Each pebble's value = sum of the two pebbles resting on it from above.",
        input:"numRows=5",output:"Pascal's triangle",
        steps:["Each row starts and ends with 1","Middle element[i][j] = triangle[i-1][j-1] + triangle[i-1][j]","Build row by row"],
        stl:"vector<vector<int>>",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> generate(int numRows) {
    vector<vector<int>> tri;
    for (int i=0; i<numRows; i++) {
        vector<int> row(i+1, 1); // all 1s by default
        // Fill middle elements (indices 1 to i-1)
        for (int j=1; j<i; j++)
            row[j] = tri[i-1][j-1] + tri[i-1][j];
        tri.push_back(row);
    }
    return tri;
}
int main() {
    auto t = generate(5);
    for (auto& row : t) {
        for (int x : row) cout << x << " ";
        cout << "\\n";
    }
    // 1
    // 1 1
    // 1 2 1
    // 1 3 3 1
    // 1 4 6 4 1
}`
      },
    ]
  },

  // ─── ARRAYS ─────────────────────────────
  {
    section:"dsa",id:"arrays",label:"Arrays",emoji:"▦",color:C.orange,
    desc:"The most tested topic. Master these patterns and you'll crack 60% of interviews.",
    items:[
      {
        title:"Two Sum",level:"EASY",tag:"HASHMAP",company:"Amazon · LG · Google · TCS",
        concept:"For each number, check if its complement (target-number) was already seen. Store value→index.",
        analogy:"Looking for a missing puzzle piece. For each piece you pick up, check if you've already seen the one it connects to.",
        input:"[2,7,11,15], target=9",output:"[0,1]",
        steps:["Map stores {value → index}","For each nums[i]: complement = target - nums[i]","If complement in map → return both indices","Else add nums[i]→i to map"],
        stl:"unordered_map<int,int>",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> seen; // value → index
    for (int i=0; i<(int)nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need))
            return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};
    // [2,7,11,15],target=9:
    // i=0: need 7. Not seen. Add {2:0}
    // i=1: need 2. Found at 0! → {0,1} ✓
}`
      },
      {
        title:"Prefix Sum — Range Queries",level:"EASY",tag:"PREFIX SUM",company:"Amazon · LG · Infosys",
        concept:"Precompute cumulative sums once. Answer any range sum in O(1).",
        analogy:"Marking total distances on a road trip map. Any section = far marker minus near marker.",
        input:"arr=[3,1,4,1,5,9], query l=2,r=4",output:"10",
        steps:["prefix[0]=0","prefix[i+1]=prefix[i]+arr[i]","Range [l,r] = prefix[r+1]-prefix[l]","Build once, query many times"],
        stl:"vector<int> size n+1",
        code:`#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> arr = {3,1,4,1,5,9};
    int n = arr.size();
    vector<int> pre(n+1, 0); // size n+1, starts with 0
    for (int i=0; i<n; i++)
        pre[i+1] = pre[i] + arr[i];
    // pre=[0,3,4,8,9,14,23]

    // sum of arr[l..r]:
    auto rangeSum = [&](int l, int r){ return pre[r+1]-pre[l]; };
    cout << rangeSum(2,4) << "\\n"; // 4+1+5 = 10
    cout << rangeSum(0,5) << "\\n"; // sum all = 23
}`
      },
      {
        title:"Maximum Subarray (Kadane's)",level:"MEDIUM",tag:"DP/GREEDY",company:"Amazon · LG · Google · Microsoft",
        concept:"At each position: extend previous subarray OR start fresh — whichever is bigger.",
        analogy:"Walking a path collecting coins (positive) and penalties (negative). At each step: add to what you have, or throw it all away and start fresh.",
        input:"[-2,1,-3,4,-1,2,1,-5,4]",output:"6",
        steps:["curr = best sum ending HERE","maxSum = overall best","curr = max(nums[i], curr + nums[i])","maxSum = max(maxSum, curr)"],
        stl:"Two int variables",
        code:`#include <bits/stdc++.h>
using namespace std;
int maxSubArray(vector<int>& nums) {
    int curr   = nums[0];
    int maxSum = nums[0];
    for (int i=1; i<(int)nums.size(); i++) {
        curr   = max(nums[i], curr + nums[i]); // extend or restart
        maxSum = max(maxSum, curr);
    }
    return maxSum; // 6 (subarray [4,-1,2,1])
}`
      },
      {
        title:"Move Zeroes",level:"EASY",tag:"TWO POINTER",company:"Amazon · LG · Facebook · TCS",
        concept:"Slow pointer tracks write position. Fast scans for non-zero. Swap them.",
        analogy:"Pushing marbles in a tube — every time you find a non-empty space (non-zero), swap it with the first empty space (zero).",
        input:"[0,1,0,3,12]",output:"[1,3,12,0,0]",
        steps:["slow=0 (next position to place non-zero)","For each fast: if nums[fast]!=0 → swap(nums[slow],nums[fast]), slow++"],
        stl:"swap()",
        code:`#include <bits/stdc++.h>
using namespace std;
void moveZeroes(vector<int>& nums) {
    int slow = 0;
    for (int fast=0; fast<(int)nums.size(); fast++) {
        if (nums[fast] != 0) {
            swap(nums[slow], nums[fast]);
            slow++;
        }
    }
    // [0,1,0,3,12] → [1,3,12,0,0]
}
int main() {
    vector<int> v={0,1,0,3,12};
    moveZeroes(v);
    for(int x:v) cout<<x<<" ";
}`
      },
      {
        title:"Best Time to Buy & Sell Stock",level:"EASY",tag:"GREEDY",company:"Amazon · LG · Google · TCS · Infosys",
        concept:"Track minimum price seen so far. Profit = current price - min price. Track maximum profit.",
        analogy:"You're watching stock prices. Note the cheapest day you've seen. Today's price minus that minimum = potential profit.",
        input:"[7,1,5,3,6,4]",output:"5",
        steps:["minPrice=prices[0], maxProfit=0","For each price:","minPrice=min(minPrice,price)","maxProfit=max(maxProfit, price-minPrice)"],
        stl:"Two int variables",
        code:`#include <bits/stdc++.h>
using namespace std;
int maxProfit(vector<int>& prices) {
    int minPrice  = prices[0];
    int maxProfit = 0;
    for (int p : prices) {
        minPrice  = min(minPrice, p);         // cheapest day so far
        maxProfit = max(maxProfit, p-minPrice); // best profit so far
    }
    return maxProfit;
    // [7,1,5,3,6,4]:
    // min goes: 7→1→1→1→1→1
    // profit:   0 0 4 2 5 3 → max=5 ✓
}`
      },
      {
        title:"Contains Duplicate",level:"EASY",tag:"HASHSET",company:"Amazon · LG · TCS · Infosys",
        concept:"Put each element in a set. If it's already there → duplicate found.",
        analogy:"Checking a guest list. If a name is already ticked off, it's a duplicate.",
        input:"[1,2,3,1]",output:"true",
        steps:["unordered_set<int> seen","For each n: if seen.count(n) → return true","seen.insert(n)","Return false"],
        stl:"unordered_set<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for (int n : nums) {
        if (seen.count(n)) return true; // already seen!
        seen.insert(n);
    }
    return false;
}`
      },
      {
        title:"Rotate Array by K",level:"MEDIUM",tag:"ARRAY",company:"Amazon · LG · Infosys",
        concept:"Three reversals: reverse all → reverse first k → reverse rest. No extra space.",
        analogy:"Rotating a necklace: flip the whole thing, then flip the front section, then flip the back section.",
        input:"[1,2,3,4,5,6,7], k=3",output:"[5,6,7,1,2,3,4]",
        steps:["k %= n","reverse all","reverse first k","reverse last n-k"],
        stl:"reverse()",
        code:`#include <bits/stdc++.h>
using namespace std;
void rotate(vector<int>& nums, int k) {
    int n=nums.size(); k%=n;
    if(k==0) return;
    reverse(nums.begin(),nums.end());
    reverse(nums.begin(),nums.begin()+k);
    reverse(nums.begin()+k,nums.end());
    // [1,2,3,4,5,6,7],k=3 → [5,6,7,1,2,3,4]
}`
      },
      {
        title:"Product Except Self",level:"MEDIUM",tag:"ARRAY",company:"Amazon · LG · Google · Facebook",
        concept:"result[i] = left product × right product. Two passes, no division, no extra arrays.",
        analogy:"Each person in a row: your number = product of everyone on your left × everyone on your right.",
        input:"[1,2,3,4]",output:"[24,12,8,6]",
        steps:["Left pass: result[i] = product of all left of i","Right pass: multiply result[i] by product of all right of i"],
        stl:"vector<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<int> productExceptSelf(vector<int>& nums) {
    int n=nums.size();
    vector<int> res(n,1);
    int left=1;
    for(int i=0;i<n;i++){res[i]=left;left*=nums[i];}
    int right=1;
    for(int i=n-1;i>=0;i--){res[i]*=right;right*=nums[i];}
    return res; // [1,2,3,4]→[24,12,8,6]
}`
      },
      {
        title:"Majority Element",level:"EASY",tag:"BOYER-MOORE",company:"Amazon · LG · Google · TCS",
        concept:"Boyer-Moore Voting: candidate cancels non-candidate votes. Majority element always survives.",
        analogy:"A vote where the majority candidate can always absorb enough opposition to survive.",
        input:"[2,2,1,1,1,2,2]",output:"2",
        steps:["candidate=nums[0], count=1","For each x: if count==0 → candidate=x","if x==candidate → count++ else count--","Return candidate"],
        stl:"Two int variables",
        code:`#include <bits/stdc++.h>
using namespace std;
int majorityElement(vector<int>& nums) {
    int candidate=nums[0], count=1;
    for(int i=1;i<(int)nums.size();i++){
        if(count==0){candidate=nums[i];count=1;}
        else if(nums[i]==candidate) count++;
        else count--;
    }
    return candidate;
    // [2,2,1,1,1,2,2]: candidate 2 survives → 2 ✓
}`
      },
      {
        title:"Sort Colors (0s,1s,2s)",level:"MEDIUM",tag:"THREE POINTER",company:"Amazon · LG · Google",
        concept:"Dutch National Flag. Three pointers: lo,mid,hi. Push 0s front, 2s back.",
        analogy:"Sorting red(0), white(1), blue(2) balls by pushing reds to front and blues to back.",
        input:"[2,0,2,1,1,0]",output:"[0,0,1,1,2,2]",
        steps:["lo=0,mid=0,hi=n-1","nums[mid]==0: swap lo,mid, lo++,mid++","nums[mid]==1: mid++","nums[mid]==2: swap mid,hi, hi-- (DON'T mid++)"],
        stl:"swap()",
        code:`#include <bits/stdc++.h>
using namespace std;
void sortColors(vector<int>& nums) {
    int lo=0,mid=0,hi=nums.size()-1;
    while(mid<=hi){
        if(nums[mid]==0)      swap(nums[lo++],nums[mid++]);
        else if(nums[mid]==1) mid++;
        else                  swap(nums[mid],nums[hi--]);
        // KEY: no mid++ when swapping with hi!
    }
}`
      },
      {
        title:"Trapping Rain Water",level:"MEDIUM",tag:"TWO POINTER",company:"Amazon · LG · Google · Microsoft",
        concept:"Water at i = min(maxLeft,maxRight) - height[i]. Two pointer: process shorter side first.",
        analogy:"Water fills the lowest point. The water level at any pillar is limited by the shorter of the two tallest walls on each side.",
        input:"[0,1,0,2,1,0,1,3,2,1,2,1]",output:"6",
        steps:["l=0,r=n-1, maxL=0,maxR=0","While l<r:","If height[l]<height[r]: maxL=max(maxL,h[l]), water+=maxL-h[l], l++","Else: maxR=max(maxR,h[r]), water+=maxR-h[r], r--"],
        stl:"Two pointers + two max trackers",
        code:`#include <bits/stdc++.h>
using namespace std;
int trap(vector<int>& h) {
    int l=0,r=h.size()-1,maxL=0,maxR=0,water=0;
    while(l<r){
        if(h[l]<h[r]){
            maxL=max(maxL,h[l]);
            water+=maxL-h[l]; l++;
        } else {
            maxR=max(maxR,h[r]);
            water+=maxR-h[r]; r--;
        }
    }
    return water; // 6
}`
      },
    ]
  },

  // ─── STRINGS ────────────────────────────
  {
    section:"dsa",id:"strings",label:"Strings",emoji:"≈",color:C.yellow,
    desc:"Strings = character arrays with extra powers. All array patterns apply.",
    items:[
      {
        title:"Check Palindrome",level:"EASY",tag:"TWO POINTER",company:"TCS · Wipro · LG · Amazon",
        concept:"Compare characters from both ends. If all match → palindrome.",
        analogy:"Reading a word forward and backward — if identical, it's a palindrome.",
        input:"\"racecar\"",output:"true",
        steps:["l=0, r=n-1","While l<r: if s[l]!=s[r] → false","l++, r--","Return true"],
        stl:"None",
        code:`#include <bits/stdc++.h>
using namespace std;
bool isPalindrome(string s){
    int l=0,r=s.size()-1;
    while(l<r){
        if(s[l]!=s[r]) return false;
        l++;r--;
    }
    return true;
}`
      },
      {
        title:"Valid Anagram",level:"EASY",tag:"FREQ ARRAY",company:"Amazon · LG · TCS · Infosys",
        concept:"Anagrams have identical character frequencies. Count up for s, count down for t, check all zeros.",
        analogy:"'listen' and 'silent' — same letters, different arrangement.",
        input:"\"anagram\",\"nagaram\"",output:"true",
        steps:["If lengths differ → false","freq[c-'a']++ for s, freq[c-'a']-- for t","If any freq[i]!=0 → false","Return true"],
        stl:"int freq[26]={}",
        code:`#include <bits/stdc++.h>
using namespace std;
bool isAnagram(string s, string t){
    if(s.size()!=t.size()) return false;
    int freq[26]={};
    for(char c:s) freq[c-'a']++;
    for(char c:t) freq[c-'a']--;
    for(int f:freq) if(f!=0) return false;
    return true;
}`
      },
      {
        title:"Count Character Frequency",level:"EASY",tag:"FREQ ARRAY",company:"TCS · Wipro · Infosys",
        concept:"freq[c-'a']++ maps each letter to an index 0-25. c-'a' converts char to index.",
        analogy:"Counting how many of each Scrabble tile you have.",
        input:"\"programming\"",output:"g:2 m:2 r:2 (rest:1)",
        steps:["int freq[26]={}","For each char c: freq[c-'a']++","Print non-zero frequencies"],
        stl:"int freq[26] or unordered_map<char,int>",
        code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    string s = "programming";
    int freq[26] = {};
    for(char c : s) freq[c-'a']++;
    for(int i=0; i<26; i++)
        if(freq[i]>0)
            cout << (char)('a'+i) << ":" << freq[i] << " ";
    // g:2 m:2 r:2 a:1 i:1 n:1 o:1 p:1
}`
      },
      {
        title:"Reverse Words in String",level:"EASY",tag:"STRINGS",company:"Infosys · Wipro · LG",
        concept:"Split into words, reverse the list, join back with spaces.",
        analogy:"A sentence is a row of cards (words). Flip the deck — each card stays intact, just order reverses.",
        input:"\"the sky is blue\"",output:"\"blue is sky the\"",
        steps:["stringstream to split words","Store in vector<string>","reverse the vector","Join with spaces"],
        stl:"stringstream, vector<string>, reverse()",
        code:`#include <bits/stdc++.h>
using namespace std;
string reverseWords(string s){
    stringstream ss(s);
    string word;
    vector<string> words;
    while(ss>>word) words.push_back(word);
    reverse(words.begin(),words.end());
    string res="";
    for(int i=0;i<(int)words.size();i++){
        if(i>0) res+=" ";
        res+=words[i];
    }
    return res;
}`
      },
      {
        title:"Remove Duplicates from String",level:"EASY",tag:"HASHSET",company:"TCS · Wipro · LG",
        concept:"Use a set to remember seen characters. Only add to result if not seen before.",
        analogy:"Removing duplicate letters from a bag — only put the first copy in the result bag.",
        input:"\"programming\"",output:"\"progamin\"",
        steps:["unordered_set<char> seen","For each c: if not in seen → add to result, mark seen","Skip if seen"],
        stl:"unordered_set<char>",
        code:`#include <bits/stdc++.h>
using namespace std;
string removeDuplicates(string s){
    unordered_set<char> seen;
    string res="";
    for(char c:s){
        if(!seen.count(c)){
            res+=c;
            seen.insert(c);
        }
    }
    return res; // "programming" → "progamin"
}`
      },
      {
        title:"First Non-Repeating Character",level:"EASY",tag:"HASHMAP",company:"Amazon · LG · TCS · Infosys",
        concept:"Count frequency. Then find first char with frequency == 1.",
        analogy:"Finding the first unique face in a crowd photo — scan for who appears exactly once.",
        input:"\"leetcode\"",output:"index 0 ('l')",
        steps:["Count freq of each char","Loop string again — first char with freq==1 is answer","Return -1 if none found"],
        stl:"int freq[26]={}",
        code:`#include <bits/stdc++.h>
using namespace std;
int firstUniqChar(string s){
    int freq[26]={};
    for(char c:s) freq[c-'a']++;
    for(int i=0;i<(int)s.size();i++)
        if(freq[s[i]-'a']==1) return i;
    return -1;
    // "leetcode": l=1,e=3,t=1,c=1,o=1,d=1 → first freq=1 is 'l' at 0
}`
      },
      {
        title:"String Compression",level:"EASY",tag:"TWO POINTER",company:"Amazon · LG · Microsoft · TCS",
        concept:"Count consecutive same characters. Write char + count if count>1.",
        analogy:"Run-length encoding. 'aaabbc' → 'a3b2c1' but skip 1s → 'a3b2c'.",
        input:"\"aabcccccaaa\"",output:"\"a2b1c5a3\" (length 8)",
        steps:["i=0, write=0 (write position)","Count consecutive same chars","Write char, write count if >1","Return write pointer"],
        stl:"vector<char>",
        code:`#include <bits/stdc++.h>
using namespace std;
int compress(vector<char>& chars){
    int write=0, i=0;
    while(i<(int)chars.size()){
        char ch=chars[i];
        int count=0;
        while(i<(int)chars.size()&&chars[i]==ch){i++;count++;}
        chars[write++]=ch;
        if(count>1){
            string cnt=to_string(count);
            for(char c:cnt) chars[write++]=c;
        }
    }
    return write;
    // "aabcccccaaa" → ['a','2','b','c','5','a','3']
}`
      },
      {
        title:"Longest Common Prefix",level:"EASY",tag:"STRINGS",company:"Amazon · LG · Infosys",
        concept:"Compare column by column across all strings. Stop when any string differs.",
        analogy:"Finding what all friends' names share at the start. Shrink until everyone matches.",
        input:"[\"flower\",\"flow\",\"flight\"]",output:"\"fl\"",
        steps:["prefix=strs[0]","For each other string: shrink prefix until it matches start","Return prefix"],
        stl:"string::find()",
        code:`#include <bits/stdc++.h>
using namespace std;
string longestCommonPrefix(vector<string>& strs){
    if(strs.empty()) return "";
    string prefix=strs[0];
    for(int i=1;i<(int)strs.size();i++)
        while(strs[i].find(prefix)!=0)
            prefix=prefix.substr(0,prefix.size()-1);
    return prefix;
    // "flower","flow","flight" → "fl"
}`
      },
      {
        title:"Longest Palindromic Substring",level:"MEDIUM",tag:"EXPAND CENTER",company:"Amazon · LG · Google",
        concept:"Expand outward from every center. Two cases: odd (single center), even (two adjacent centers).",
        analogy:"Drop a stone in water — ripples expand outward symmetrically from impact point.",
        input:"\"babad\"",output:"\"bab\"",
        steps:["For each index i: expand from (i,i) and (i,i+1)","Expand while s[l]==s[r]","Track start and maxLen","Return substr(start,maxLen)"],
        stl:"Lambda expand function",
        code:`#include <bits/stdc++.h>
using namespace std;
string longestPalindrome(string s){
    int n=s.size(),start=0,maxLen=1;
    auto expand=[&](int l,int r){
        while(l>=0&&r<n&&s[l]==s[r]){l--;r++;}
        if(r-l-1>maxLen){maxLen=r-l-1;start=l+1;}
    };
    for(int i=0;i<n;i++){expand(i,i);expand(i,i+1);}
    return s.substr(start,maxLen);
}`
      },
      {
        title:"Count and Say",level:"EASY",tag:"STRINGS",company:"TCS · Infosys · LG",
        concept:"Each term describes the previous one. '21' means 'two 1s'. '1211' means 'one 2, one 1, one 1'.",
        analogy:"Like a game of telephone where you describe what you see. '111' → you say 'three ones' → '31'.",
        input:"n=4",output:"\"1211\"",
        steps:["Start with '1'","For each step: scan current, count consecutive same chars","Append count then char to build next string"],
        stl:"string, to_string()",
        code:`#include <bits/stdc++.h>
using namespace std;
string countAndSay(int n){
    string res="1";
    for(int i=1;i<n;i++){
        string next="";
        int j=0;
        while(j<(int)res.size()){
            char ch=res[j];
            int count=0;
            while(j<(int)res.size()&&res[j]==ch){j++;count++;}
            next+=to_string(count)+ch;
        }
        res=next;
    }
    return res;
    // n=1:"1", n=2:"11", n=3:"21", n=4:"1211"
}`
      },
    ]
  },

  // ─── MATRICES ───────────────────────────
  {
    section:"dsa",id:"matrices",label:"Matrices (2D)",emoji:"📐",color:C.green,
    desc:"2D arrays — think grids. mat[row][col]. Master traversal patterns.",
    items:[
      {
        title:"Matrix Traversals",level:"EASY",tag:"MATRIX",company:"TCS · LG · Infosys",
        concept:"mat[row][col] — row first. Diagonal: i==j. Anti-diagonal: i+j==n-1.",
        analogy:"A chessboard. Every square has a row and column number.",
        input:"3x3 matrix",output:"All traversal patterns",
        steps:["Create: vector<vector<int>> mat(rows,vector<int>(cols,0))","Access: mat[i][j]","Diagonal: i==j","Anti-diagonal: i+j==n-1"],
        stl:"vector<vector<int>>",
        code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    vector<vector<int>> mat={{1,2,3},{4,5,6},{7,8,9}};
    int r=mat.size(), c=mat[0].size();
    // Full traversal
    for(int i=0;i<r;i++){
        for(int j=0;j<c;j++) cout<<mat[i][j]<<" ";
        cout<<"\\n";
    }
    // Main diagonal (i==j): 1 5 9
    for(int i=0;i<r;i++) cout<<mat[i][i]<<" ";
    cout<<"\\n";
    // Anti-diagonal (i+j==c-1): 3 5 7
    for(int i=0;i<r;i++) cout<<mat[i][c-1-i]<<" ";
    cout<<"\\n";
    // Row sums
    for(int i=0;i<r;i++){
        int s=0;
        for(int j=0;j<c;j++) s+=mat[i][j];
        cout<<"Row "<<i<<" sum="<<s<<"\\n";
    }
}`
      },
      {
        title:"Transpose Matrix",level:"EASY",tag:"MATRIX",company:"TCS · LG · Infosys",
        concept:"Swap mat[i][j] with mat[j][i]. Rows become columns.",
        analogy:"Mirroring a grid along its diagonal. Rows flip to columns.",
        input:"[[1,2,3],[4,5,6],[7,8,9]]",output:"[[1,4,7],[2,5,8],[3,6,9]]",
        steps:["Only upper triangle (j>i) to avoid double-swap","swap(mat[i][j], mat[j][i])"],
        stl:"swap()",
        code:`#include <bits/stdc++.h>
using namespace std;
void transpose(vector<vector<int>>& mat){
    int n=mat.size();
    for(int i=0;i<n;i++)
        for(int j=i+1;j<n;j++)
            swap(mat[i][j],mat[j][i]);
}`
      },
      {
        title:"Rotate Matrix 90°",level:"MEDIUM",tag:"MATRIX",company:"Amazon · LG · Google",
        concept:"Transpose + reverse each row = 90° clockwise rotation.",
        analogy:"To rotate a photo 90°: flip it diagonally, then flip horizontally.",
        input:"[[1,2,3],[4,5,6],[7,8,9]]",output:"[[7,4,1],[8,5,2],[9,6,3]]",
        steps:["Step 1: Transpose","Step 2: Reverse each row"],
        stl:"swap(), reverse()",
        code:`#include <bits/stdc++.h>
using namespace std;
void rotate(vector<vector<int>>& mat){
    int n=mat.size();
    for(int i=0;i<n;i++) for(int j=i+1;j<n;j++) swap(mat[i][j],mat[j][i]);
    for(int i=0;i<n;i++) reverse(mat[i].begin(),mat[i].end());
}`
      },
      {
        title:"Spiral Order Traversal",level:"MEDIUM",tag:"MATRIX",company:"Amazon · LG · Microsoft",
        concept:"Four boundaries. Peel layer by layer: right → down → left → up.",
        analogy:"Peeling an onion ring by ring, going around the outer edge first.",
        input:"[[1,2,3],[4,5,6],[7,8,9]]",output:"[1,2,3,6,9,8,7,4,5]",
        steps:["top=0,bottom=rows-1,left=0,right=cols-1","→ right along top, top++","↓ down right, right--","← left along bottom (if rows remain), bottom--","↑ up left (if cols remain), left++"],
        stl:"vector<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<int> spiralOrder(vector<vector<int>>& m){
    vector<int> res;
    int t=0,b=m.size()-1,l=0,r=m[0].size()-1;
    while(t<=b&&l<=r){
        for(int c=l;c<=r;c++) res.push_back(m[t][c]); t++;
        for(int c=t;c<=b;c++) res.push_back(m[c][r]); r--;
        if(t<=b){for(int c=r;c>=l;c--) res.push_back(m[b][c]); b--;}
        if(l<=r){for(int c=b;c>=t;c--) res.push_back(m[c][l]); l++;}
    }
    return res;
}`
      },
      {
        title:"Set Matrix Zeroes",level:"MEDIUM",tag:"MATRIX",company:"Amazon · LG",
        concept:"Mark rows/cols that need zeroing FIRST, then apply. Don't zero as you go — corrupts later checks.",
        analogy:"Mark all walls needing repainting BEFORE you paint — otherwise fresh paint marks create false positives.",
        input:"[[1,1,1],[1,0,1],[1,1,1]]",output:"[[1,0,1],[0,0,0],[1,0,1]]",
        steps:["Pass 1: find all zeros, record their row and col","Pass 2: zero those rows and cols"],
        stl:"unordered_set<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
void setZeroes(vector<vector<int>>& mat){
    int r=mat.size(),c=mat[0].size();
    unordered_set<int> rows,cols;
    for(int i=0;i<r;i++) for(int j=0;j<c;j++)
        if(mat[i][j]==0){rows.insert(i);cols.insert(j);}
    for(int i=0;i<r;i++) for(int j=0;j<c;j++)
        if(rows.count(i)||cols.count(j)) mat[i][j]=0;
}`
      },
      {
        title:"Search in 2D Matrix",level:"MEDIUM",tag:"BINARY SEARCH",company:"Amazon · LG · TCS",
        concept:"Start at top-right. If current>target go left. If current<target go down.",
        analogy:"A sorted grid. From top-right corner: too big → go left (smaller), too small → go down (bigger).",
        input:"target=5",output:"true",
        steps:["r=0, c=cols-1","While in bounds: if mat[r][c]==target→found","mat[r][c]>target→c-- (go left)","mat[r][c]<target→r++ (go down)"],
        stl:"Two index variables",
        code:`#include <bits/stdc++.h>
using namespace std;
bool searchMatrix(vector<vector<int>>& mat, int target){
    int r=0,c=mat[0].size()-1;
    while(r<(int)mat.size()&&c>=0){
        if(mat[r][c]==target) return true;
        else if(mat[r][c]>target) c--;
        else r++;
    }
    return false;
}`
      },
    ]
  },

  // ─── LINKED LISTS ───────────────────────
  {
    section:"dsa",id:"linkedlist",label:"Linked Lists",emoji:"⛓",color:C.purple,
    desc:"Nodes pointing to nodes. Master pointer manipulation — three-pointer technique.",
    items:[
      {
        title:"Reverse Linked List",level:"EASY",tag:"POINTERS",company:"Amazon · LG · Google · TCS",
        concept:"Three pointers: prev, curr, nxt. Save next BEFORE reversing the arrow.",
        analogy:"Reversing a one-way street. You must note where the next sign is before changing the current one.",
        input:"1→2→3→4→5",output:"5→4→3→2→1",
        steps:["prev=null, curr=head","Save: nxt=curr->next","Reverse: curr->next=prev","Move: prev=curr, curr=nxt","Return prev"],
        stl:"ListNode* pointers",
        code:`#include <bits/stdc++.h>
using namespace std;
struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};
ListNode* reverseList(ListNode* head){
    ListNode* prev=nullptr, *curr=head;
    while(curr){
        ListNode* nxt=curr->next; // SAVE next first!
        curr->next=prev;          // reverse arrow
        prev=curr; curr=nxt;      // advance both
    }
    return prev; // new head
}`
      },
      {
        title:"Detect Cycle",level:"EASY",tag:"FAST/SLOW",company:"Amazon · LG · Google",
        concept:"Slow moves 1 step, fast moves 2 steps. They'll meet if there's a cycle.",
        analogy:"Two runners on a circular track. Faster one eventually laps the slower one.",
        input:"Linked list with cycle",output:"true/false",
        steps:["slow=head, fast=head","While fast && fast->next: slow+=1, fast+=2","If slow==fast → cycle","If fast hits null → no cycle"],
        stl:"Two ListNode* pointers",
        code:`#include <bits/stdc++.h>
using namespace std;
struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};
bool hasCycle(ListNode* head){
    ListNode*slow=head,*fast=head;
    while(fast&&fast->next){
        slow=slow->next;
        fast=fast->next->next;
        if(slow==fast) return true;
    }
    return false;
}`
      },
      {
        title:"Find Middle Node",level:"EASY",tag:"FAST/SLOW",company:"Amazon · LG · Infosys",
        concept:"Fast moves 2x speed. When fast reaches end, slow is at middle.",
        analogy:"Two people walking a path. When the fast one reaches the end, the slow one is halfway.",
        input:"1→2→3→4→5",output:"Node 3",
        steps:["slow=head, fast=head","While fast && fast->next: slow+=1, fast+=2","Return slow"],
        stl:"Two ListNode* pointers",
        code:`#include <bits/stdc++.h>
using namespace std;
struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};
ListNode* middleNode(ListNode* head){
    ListNode*slow=head,*fast=head;
    while(fast&&fast->next){slow=slow->next;fast=fast->next->next;}
    return slow;
}`
      },
      {
        title:"Merge Two Sorted Lists",level:"EASY",tag:"POINTERS",company:"Amazon · LG · Google · TCS",
        concept:"Compare heads of both lists, attach smaller, advance that pointer. Dummy head avoids edge cases.",
        analogy:"Merging two sorted card decks into one sorted deck.",
        input:"1→3→5, 2→4→6",output:"1→2→3→4→5→6",
        steps:["Dummy node as placeholder head","While both lists: compare, attach smaller, advance","Attach remaining list","Return dummy.next"],
        stl:"ListNode dummy(0)",
        code:`#include <bits/stdc++.h>
using namespace std;
struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2){
    ListNode dummy(0);
    ListNode* curr=&dummy;
    while(l1&&l2){
        if(l1->val<=l2->val){curr->next=l1;l1=l1->next;}
        else{curr->next=l2;l2=l2->next;}
        curr=curr->next;
    }
    curr->next=l1?l1:l2;
    return dummy.next;
}`
      },
      {
        title:"Remove Nth From End",level:"MEDIUM",tag:"FAST/SLOW",company:"Amazon · LG · Google",
        concept:"Two pointers n+1 apart. When fast hits null, slow->next is the target to delete.",
        analogy:"Two bookmarks n pages apart. When front bookmark reaches last page, back one is at target page.",
        input:"1→2→3→4→5, n=2",output:"1→2→3→5",
        steps:["Dummy node before head","Advance fast n+1 steps","Move both until fast is null","slow->next = slow->next->next"],
        stl:"ListNode dummy",
        code:`#include <bits/stdc++.h>
using namespace std;
struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};
ListNode* removeNthFromEnd(ListNode* head, int n){
    ListNode dummy(0); dummy.next=head;
    ListNode*fast=&dummy,*slow=&dummy;
    for(int i=0;i<=n;i++) fast=fast->next;
    while(fast){slow=slow->next;fast=fast->next;}
    slow->next=slow->next->next;
    return dummy.next;
}`
      },
    ]
  },

  // ─── STACKS & QUEUES ────────────────────
  {
    section:"dsa",id:"stackqueue",label:"Stacks & Queues",emoji:"⏫",color:C.teal,
    desc:"LIFO and FIFO. Foundation of many interview patterns.",
    items:[
      {
        title:"Valid Parentheses",level:"EASY",tag:"STACK",company:"Amazon · LG · Google · TCS",
        concept:"Push open brackets. On close bracket, pop and verify match.",
        analogy:"Every open promise must be closed by the most recently opened matching bracket.",
        input:"\"({[]})\"",output:"true",
        steps:["Open → push","Close → pop top, check match","Empty stack when checking → invalid","At end: stack empty = valid"],
        stl:"stack<char>",
        code:`#include <bits/stdc++.h>
using namespace std;
bool isValid(string s){
    stack<char> stk;
    for(char c:s){
        if(c=='('||c=='['||c=='{'){stk.push(c);continue;}
        if(stk.empty()) return false;
        char t=stk.top();stk.pop();
        if(c==')'&&t!='(') return false;
        if(c==']'&&t!='[') return false;
        if(c=='}'&&t!='{') return false;
    }
    return stk.empty();
}`
      },
      {
        title:"Daily Temperatures",level:"MEDIUM",tag:"MONOTONIC STACK",company:"Amazon · LG · Google",
        concept:"Stack stores indices of days WAITING for a warmer day. When warmer found, answer those days.",
        analogy:"People waiting for sunshine. When a warm day arrives, everyone waiting gets their answer.",
        input:"[73,74,75,71,69,72,76,73]",output:"[1,1,4,2,1,1,0,0]",
        steps:["Stack stores indices","For each day i: while stack top's temp < today → pop, record distance","Push current index","Remaining in stack → 0"],
        stl:"stack<int> (stores indices)",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<int> dailyTemperatures(vector<int>& T){
    int n=T.size();
    vector<int> res(n,0);
    stack<int> stk;
    for(int i=0;i<n;i++){
        while(!stk.empty()&&T[i]>T[stk.top()]){
            int j=stk.top();stk.pop();
            res[j]=i-j;
        }
        stk.push(i);
    }
    return res;
}`
      },
      {
        title:"Next Greater Element",level:"EASY",tag:"MONOTONIC STACK",company:"Amazon · LG · TCS",
        concept:"Stack pops when larger element arrives. That larger element is the answer for popped items.",
        analogy:"People waiting for someone taller. When a tall person enters, everyone shorter gets their answer.",
        input:"[4,5,2,10,8]",output:"[5,10,10,-1,-1]",
        steps:["Stack stores indices","For each i: pop all smaller than arr[i] → current is their answer","Push current","Remaining → -1"],
        stl:"stack<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<int> nextGreater(vector<int>& arr){
    int n=arr.size();
    vector<int> res(n,-1);
    stack<int> stk;
    for(int i=0;i<n;i++){
        while(!stk.empty()&&arr[stk.top()]<arr[i]){
            res[stk.top()]=arr[i]; stk.pop();
        }
        stk.push(i);
    }
    return res;
}`
      },
      {
        title:"Min Stack — O(1) getMin",level:"MEDIUM",tag:"DESIGN",company:"Amazon · LG · Google",
        concept:"Two stacks: main + min tracker. Min stack always holds current minimum.",
        analogy:"Two notepads: one for all values, one always recording the current minimum at that depth.",
        input:"push(5),push(3),push(7),push(2)",output:"getMin()=2",
        steps:["Two stacks: stk and minStk","push: stk.push(x), minStk.push(min(x, minStk.top()))","pop: pop both","getMin: minStk.top()"],
        stl:"Two stack<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
class MinStack{
    stack<int> stk,minStk;
public:
    void push(int x){
        stk.push(x);
        int m=minStk.empty()?x:min(x,minStk.top());
        minStk.push(m);
    }
    void pop(){stk.pop();minStk.pop();}
    int top(){return stk.top();}
    int getMin(){return minStk.top();}
};`
      },
      {
        title:"Implement Queue Using Stacks",level:"EASY",tag:"DESIGN",company:"Amazon · LG · Infosys · TCS",
        concept:"Two stacks simulate a queue. Push to stack1. Pop from stack2 (refill from stack1 when empty).",
        analogy:"Moving plates from one pile to another reverses their order — do it twice to restore FIFO order.",
        input:"push(1),push(2),push(3),pop()",output:"1",
        steps:["stack1 = inbox, stack2 = outbox","push: push to stack1","pop/peek: if stack2 empty → pour stack1 into stack2, then pop stack2"],
        stl:"Two stack<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
class MyQueue{
    stack<int> in,out;
    void transfer(){
        while(!in.empty()){out.push(in.top());in.pop();}
    }
public:
    void push(int x){in.push(x);}
    int pop(){
        if(out.empty()) transfer();
        int t=out.top();out.pop();return t;
    }
    int peek(){
        if(out.empty()) transfer();
        return out.top();
    }
    bool empty(){return in.empty()&&out.empty();}
};`
      },
    ]
  },

  // ─── TREES ──────────────────────────────
  {
    section:"dsa",id:"trees",label:"Trees",emoji:"🌲",color:C.lime,
    desc:"Recursive structures. Every tree problem = traverse + compute at each node.",
    items:[
      {
        title:"All 4 Tree Traversals",level:"EASY",tag:"RECURSION",company:"Amazon · LG · Google · TCS",
        concept:"4 ways to visit nodes. Inorder on BST gives sorted output.",
        analogy:"Visiting rooms in a house: preorder=enter first, inorder=enter between children, postorder=enter after children, BFS=floor by floor.",
        input:"Binary tree",output:"Four orderings",
        steps:["Preorder: Root→Left→Right","Inorder: Left→Root→Right (sorted for BST)","Postorder: Left→Right→Root","Level order: BFS with queue"],
        stl:"Recursion / queue for BFS",
        code:`#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
void preorder(TreeNode*r,vector<int>&v){if(!r)return;v.push_back(r->val);preorder(r->left,v);preorder(r->right,v);}
void inorder(TreeNode*r,vector<int>&v){if(!r)return;inorder(r->left,v);v.push_back(r->val);inorder(r->right,v);}
void postorder(TreeNode*r,vector<int>&v){if(!r)return;postorder(r->left,v);postorder(r->right,v);v.push_back(r->val);}
vector<vector<int>> levelOrder(TreeNode*root){
    vector<vector<int>> res;
    if(!root)return res;
    queue<TreeNode*>q;q.push(root);
    while(!q.empty()){
        int sz=q.size();
        vector<int>level;
        for(int i=0;i<sz;i++){
            auto n=q.front();q.pop();
            level.push_back(n->val);
            if(n->left)q.push(n->left);
            if(n->right)q.push(n->right);
        }
        res.push_back(level);
    }
    return res;
}`
      },
      {
        title:"Maximum Depth",level:"EASY",tag:"RECURSION",company:"Amazon · LG · TCS",
        concept:"Height = 1 + max(left height, right height). Base case: null = 0.",
        analogy:"Tallest branch of a family tree. Your height = 1 + tallest child's height.",
        input:"Binary tree",output:"Max depth",
        steps:["If null → return 0","left = maxDepth(root->left)","right = maxDepth(root->right)","Return 1 + max(left,right)"],
        stl:"Recursion",
        code:`#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
int maxDepth(TreeNode*root){
    if(!root)return 0;
    return 1+max(maxDepth(root->left),maxDepth(root->right));
}`
      },
      {
        title:"Validate BST",level:"MEDIUM",tag:"BST",company:"Amazon · LG · Google",
        concept:"Pass valid range [lo,hi] to each node. Left child's max = parent. Right child's min = parent.",
        analogy:"Each node must earn between what its grandparent and parent earned — a range passed down.",
        input:"Binary tree",output:"true if valid BST",
        steps:["isValidBST(node, lo=LONG_MIN, hi=LONG_MAX)","If val<=lo or val>=hi → false","Left: hi becomes node val","Right: lo becomes node val"],
        stl:"Recursion with long bounds",
        code:`#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
bool isValid(TreeNode*r,long lo=LONG_MIN,long hi=LONG_MAX){
    if(!r)return true;
    if(r->val<=lo||r->val>=hi)return false;
    return isValid(r->left,lo,r->val)&&isValid(r->right,r->val,hi);
}`
      },
      {
        title:"Lowest Common Ancestor",level:"MEDIUM",tag:"RECURSION",company:"Amazon · LG · Google · Facebook",
        concept:"If p and q are in different subtrees of a node → that node is the LCA.",
        analogy:"First person in a family tree who is ancestor to both p and q.",
        input:"Tree, p, q",output:"LCA node",
        steps:["If root==p or root==q → return root","Search left and right","Both non-null → root is LCA","Else return whichever found something"],
        stl:"Recursion",
        code:`#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
TreeNode* lca(TreeNode*root,TreeNode*p,TreeNode*q){
    if(!root||root==p||root==q)return root;
    auto l=lca(root->left,p,q);
    auto r=lca(root->right,p,q);
    if(l&&r)return root;
    return l?l:r;
}`
      },
      {
        title:"Diameter of Binary Tree",level:"EASY",tag:"RECURSION",company:"Amazon · LG · Facebook",
        concept:"Diameter through node = leftHeight + rightHeight. Max may not pass through root.",
        analogy:"Longest path through any member of a family tree.",
        input:"Binary tree",output:"Diameter",
        steps:["Compute height recursively","At each node: diam candidate = left+right heights","Track max during height computation"],
        stl:"Lambda + int maxDiam",
        code:`#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
int diameterOfBinaryTree(TreeNode*root){
    int mx=0;
    function<int(TreeNode*)> h=[&](TreeNode*n)->int{
        if(!n)return 0;
        int l=h(n->left),r=h(n->right);
        mx=max(mx,l+r);
        return 1+max(l,r);
    };
    h(root); return mx;
}`
      },
      {
        title:"Path Sum",level:"EASY",tag:"RECURSION",company:"Amazon · LG · TCS",
        concept:"DFS: subtract node value from target. If leaf and target==0 → found path.",
        analogy:"Finding a path down a number tree where the values add up to a target.",
        input:"root, targetSum=22",output:"true",
        steps:["If null → false","If leaf and target==val → true","Recurse left and right with target-val"],
        stl:"Recursion",
        code:`#include <bits/stdc++.h>
using namespace std;
struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};
bool hasPathSum(TreeNode*root,int target){
    if(!root)return false;
    if(!root->left&&!root->right)return root->val==target; // leaf
    return hasPathSum(root->left,target-root->val)||
           hasPathSum(root->right,target-root->val);
}`
      },
    ]
  },

  // ─── GRAPHS ─────────────────────────────
  {
    section:"dsa",id:"graphs",label:"Graphs",emoji:"◉",color:C.red,
    desc:"Nodes and edges. BFS for shortest path. DFS for connectivity.",
    items:[
      {
        title:"Number of Islands",level:"MEDIUM",tag:"DFS",company:"Amazon · LG · Google · Microsoft",
        concept:"DFS from each unvisited '1'. Flood-fill (sink) the entire island during DFS.",
        analogy:"Counting land masses on a map. When you find land, flood it to mark as explored, count it.",
        input:"Grid of 0s and 1s",output:"Island count",
        steps:["Loop every cell","If '1': call sink(r,c), islands++","sink: mark '0', recurse all 4 neighbors"],
        stl:"Lambda DFS",
        code:`#include <bits/stdc++.h>
using namespace std;
int numIslands(vector<vector<char>>& grid){
    int r=grid.size(),c=grid[0].size(),islands=0;
    function<void(int,int)> sink=[&](int i,int j){
        if(i<0||i>=r||j<0||j>=c||grid[i][j]=='0')return;
        grid[i][j]='0';
        sink(i+1,j);sink(i-1,j);sink(i,j+1);sink(i,j-1);
    };
    for(int i=0;i<r;i++) for(int j=0;j<c;j++)
        if(grid[i][j]=='1'){sink(i,j);islands++;}
    return islands;
}`
      },
      {
        title:"BFS Shortest Path",level:"MEDIUM",tag:"BFS",company:"Amazon · LG · Google",
        concept:"BFS visits level by level. First time you reach a node = shortest path.",
        analogy:"Spreading water through a maze — reaches the exit by the shortest path first.",
        input:"Graph, source",output:"Distance array",
        steps:["dist[start]=0, queue starts with source","Pop node u, check all neighbors v","If dist[v]==-1: dist[v]=dist[u]+1, push v","Repeat until queue empty"],
        stl:"queue<int>, vector<int> dist",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<int> bfs(int start, vector<vector<int>>& adj, int n){
    vector<int> dist(n,-1);
    queue<int> q;
    dist[start]=0; q.push(start);
    while(!q.empty()){
        int u=q.front();q.pop();
        for(int v:adj[u])
            if(dist[v]==-1){dist[v]=dist[u]+1;q.push(v);}
    }
    return dist;
}`
      },
      {
        title:"Course Schedule (Cycle Detection)",level:"MEDIUM",tag:"TOPOLOGICAL SORT",company:"Amazon · LG · Google",
        concept:"Kahn's BFS topological sort. If all nodes are processed → no cycle → can finish.",
        analogy:"Checking if course prerequisites create a circular dependency (A needs B, B needs A → impossible).",
        input:"n=4, prereqs=[[1,0],[2,1]]",output:"true",
        steps:["Build adjacency list and indegree array","BFS from all indegree-0 nodes","Reduce neighbor indegrees","If all n nodes processed → no cycle"],
        stl:"queue<int>, vector<int> indegree",
        code:`#include <bits/stdc++.h>
using namespace std;
bool canFinish(int n, vector<vector<int>>& pre){
    vector<vector<int>> adj(n);
    vector<int> ind(n,0);
    for(auto&p:pre){adj[p[1]].push_back(p[0]);ind[p[0]]++;}
    queue<int> q;
    for(int i=0;i<n;i++) if(ind[i]==0) q.push(i);
    int done=0;
    while(!q.empty()){
        int c=q.front();q.pop();done++;
        for(int nxt:adj[c]) if(--ind[nxt]==0) q.push(nxt);
    }
    return done==n;
}`
      },
    ]
  },

  // ─── BINARY SEARCH ──────────────────────
  {
    section:"dsa",id:"binsearch",label:"Binary Search",emoji:"⌖",color:C.yellow,
    desc:"Halve search space every step. O(log n). Works on values too, not just arrays.",
    items:[
      {
        title:"Classic Binary Search",level:"EASY",tag:"BINARY SEARCH",company:"TCS · LG · Amazon · Infosys",
        concept:"Check middle. Target in left half? r=mid-1. Right half? l=mid+1. Repeat.",
        analogy:"Dictionary lookup. Open to middle, check which half your word is in, repeat.",
        input:"[1,3,5,7,9,11], target=7",output:"index 3",
        steps:["l=0, r=n-1","mid=l+(r-l)/2 (safe from overflow)","arr[mid]==target → return mid","arr[mid]<target → l=mid+1","arr[mid]>target → r=mid-1"],
        stl:"lower_bound/upper_bound as shortcuts",
        code:`#include <bits/stdc++.h>
using namespace std;
int binarySearch(vector<int>& arr, int target){
    int l=0,r=arr.size()-1;
    while(l<=r){
        int mid=l+(r-l)/2; // safe: no overflow
        if(arr[mid]==target) return mid;
        else if(arr[mid]<target) l=mid+1;
        else r=mid-1;
    }
    return -1;
    // STL: lower_bound(v.begin(),v.end(),7)-v.begin() = 3
}`
      },
      {
        title:"Search in Rotated Array",level:"MEDIUM",tag:"BINARY SEARCH",company:"Amazon · LG · Google",
        concept:"One half is always sorted. Identify which half, then check if target is in it.",
        analogy:"A phone book cut in half and reassembled reversed. One section is still sorted — check which one.",
        input:"[4,5,6,7,0,1,2], target=0",output:"4",
        steps:["Find mid","Left sorted: arr[l]<=arr[mid]","If target in left range → search left, else right","Else right is sorted, check similarly"],
        stl:"Just l,r,mid",
        code:`#include <bits/stdc++.h>
using namespace std;
int search(vector<int>& nums, int target){
    int l=0,r=nums.size()-1;
    while(l<=r){
        int mid=l+(r-l)/2;
        if(nums[mid]==target) return mid;
        if(nums[l]<=nums[mid]){
            if(nums[l]<=target&&target<nums[mid]) r=mid-1;
            else l=mid+1;
        } else {
            if(nums[mid]<target&&target<=nums[r]) l=mid+1;
            else r=mid-1;
        }
    }
    return -1;
}`
      },
      {
        title:"Binary Search on Answer — Koko",level:"MEDIUM",tag:"BINARY SEARCH",company:"Amazon · LG · Google",
        concept:"Search the answer space itself. The answer is monotonic — if speed k works, k+1 also works.",
        analogy:"Dialing up a speed setting on a treadmill. You want the minimum speed that finishes within time. Binary search on the speed dial.",
        input:"piles=[3,6,7,11], h=8",output:"4",
        steps:["l=1, r=max(piles)","canFinish(speed): hours = sum of ceil(pile/speed)","If canFinish → try slower (r=mid-1, save answer)","Else → faster (l=mid+1)"],
        stl:"Lambda + binary search",
        code:`#include <bits/stdc++.h>
using namespace std;
int minEatingSpeed(vector<int>& piles, int h){
    auto ok=[&](int speed){
        int hours=0;
        for(int p:piles) hours+=(p+speed-1)/speed;
        return hours<=h;
    };
    int l=1,r=*max_element(piles.begin(),piles.end()),ans=r;
    while(l<=r){
        int mid=l+(r-l)/2;
        if(ok(mid)){ans=mid;r=mid-1;}
        else l=mid+1;
    }
    return ans;
}`
      },
    ]
  },

  // ─── TWO POINTER ────────────────────────
  {
    section:"dsa",id:"twopointer",label:"Two Pointer",emoji:"↔",color:C.cyan,
    desc:"Two indices moving toward each other or in the same direction. O(n²) → O(n).",
    items:[
      {
        title:"3Sum",level:"MEDIUM",tag:"SORT+TWO POINTER",company:"Amazon · LG · Google",
        concept:"Sort. Fix one element. Two pointer for the remaining two. Skip duplicates.",
        analogy:"Three friends splitting a bill. Fix one person's share, use two pointers for the other two.",
        input:"[-1,0,1,2,-1,-4]",output:"[[-1,-1,2],[-1,0,1]]",
        steps:["Sort array","Fix i","l=i+1, r=n-1","sum<0→l++, sum>0→r--, sum==0→record+skip dups"],
        stl:"sort()",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> threeSum(vector<int>& nums){
    sort(nums.begin(),nums.end());
    vector<vector<int>> res;
    int n=nums.size();
    for(int i=0;i<n-2;i++){
        if(i>0&&nums[i]==nums[i-1]) continue;
        int l=i+1,r=n-1;
        while(l<r){
            int s=nums[i]+nums[l]+nums[r];
            if(s==0){
                res.push_back({nums[i],nums[l],nums[r]});
                while(l<r&&nums[l]==nums[l+1])l++;
                while(l<r&&nums[r]==nums[r-1])r--;
                l++;r--;
            } else if(s<0)l++;
            else r--;
        }
    }
    return res;
}`
      },
      {
        title:"Container With Most Water",level:"MEDIUM",tag:"TWO POINTER",company:"Amazon · LG · Google",
        concept:"Area = width × min(height). Move shorter wall — only it can improve area.",
        analogy:"Two walls of a fish tank. Shorter wall limits water. Replace it to improve.",
        input:"[1,8,6,2,5,4,8,3,7]",output:"49",
        steps:["l=0, r=n-1","water=(r-l)*min(h[l],h[r])","Move shorter wall inward"],
        stl:"Two pointer",
        code:`#include <bits/stdc++.h>
using namespace std;
int maxArea(vector<int>& h){
    int l=0,r=h.size()-1,mx=0;
    while(l<r){
        mx=max(mx,(r-l)*min(h[l],h[r]));
        if(h[l]<h[r]) l++; else r--;
    }
    return mx;
}`
      },
    ]
  },

  // ─── SLIDING WINDOW ─────────────────────
  {
    section:"dsa",id:"sliding",label:"Sliding Window",emoji:"⬜",color:C.indigo,
    desc:"A moving frame of elements. Add from right, remove from left. Never re-examine.",
    items:[
      {
        title:"Max Sum Subarray of Size K",level:"EASY",tag:"FIXED WINDOW",company:"TCS · Infosys · LG · Wipro",
        concept:"Build first window, then slide: add right, subtract left.",
        analogy:"Best 3-day sales window — slide it day by day, no need to recompute from scratch.",
        input:"[2,1,5,1,3,2], k=3",output:"9",
        steps:["Build first k-size window","For i=k to n: sum+=arr[i]-arr[i-k]","Track max"],
        stl:"int windowSum",
        code:`#include <bits/stdc++.h>
using namespace std;
int maxSumFixed(vector<int>& arr, int k){
    int s=0;
    for(int i=0;i<k;i++) s+=arr[i];
    int mx=s;
    for(int i=k;i<(int)arr.size();i++){
        s+=arr[i]-arr[i-k];
        mx=max(mx,s);
    }
    return mx; // 9
}`
      },
      {
        title:"Longest Substring Without Repeating",level:"MEDIUM",tag:"VARIABLE WINDOW",company:"Amazon · LG · Google · TCS",
        concept:"Store last seen index of each char. When duplicate found, jump l past previous occurrence.",
        analogy:"Sliding a frame across a film strip. When a repeated face enters right, slide left past its previous appearance.",
        input:"\"abcabcbb\"",output:"3",
        steps:["lastSeen[char]=index","For each r: if s[r] seen and within window → l=lastSeen[s[r]]+1","Update lastSeen[s[r]]=r","maxLen=max(maxLen,r-l+1)"],
        stl:"unordered_map<char,int>",
        code:`#include <bits/stdc++.h>
using namespace std;
int lengthOfLongestSubstring(string s){
    unordered_map<char,int> last;
    int l=0,mx=0;
    for(int r=0;r<(int)s.size();r++){
        if(last.count(s[r])&&last[s[r]]>=l)
            l=last[s[r]]+1;
        last[s[r]]=r;
        mx=max(mx,r-l+1);
    }
    return mx;
}`
      },
      {
        title:"Minimum Size Subarray Sum",level:"MEDIUM",tag:"VARIABLE WINDOW",company:"Amazon · LG · Google",
        concept:"Expand right, shrink left when valid. Update answer during valid state.",
        analogy:"Shortest sequence of days with combined sales ≥ target.",
        input:"target=7, [2,3,1,2,4,3]",output:"2",
        steps:["l=0, sum=0","Expand r","While sum>=target: record length, sum-=nums[l], l++","Track minimum"],
        stl:"int l, sum",
        code:`#include <bits/stdc++.h>
using namespace std;
int minSubArrayLen(int target, vector<int>& nums){
    int l=0,sum=0,mn=INT_MAX;
    for(int r=0;r<(int)nums.size();r++){
        sum+=nums[r];
        while(sum>=target){
            mn=min(mn,r-l+1);
            sum-=nums[l++];
        }
    }
    return mn==INT_MAX?0:mn;
}`
      },
    ]
  },

  // ─── DP ─────────────────────────────────
  {
    section:"dsa",id:"dp",label:"Dynamic Programming",emoji:"◈",color:C.warm,
    desc:"Break into subproblems. Solve each once, store result. Bottom-up is usually cleaner.",
    items:[
      {
        title:"Climbing Stairs",level:"EASY",tag:"1D DP",company:"Amazon · LG · Google · TCS",
        concept:"dp[i] = dp[i-1] + dp[i-2]. Fibonacci pattern.",
        analogy:"Each step can be reached from 1 step below or 2 steps below.",
        input:"n=5",output:"8",
        steps:["dp[1]=1, dp[2]=2","dp[i]=dp[i-1]+dp[i-2]","Only keep last 2 (O(1) space)"],
        stl:"Two int variables",
        code:`#include <bits/stdc++.h>
using namespace std;
int climbStairs(int n){
    if(n<=2)return n;
    int a=1,b=2;
    for(int i=3;i<=n;i++){int c=a+b;a=b;b=c;}
    return b; // n=5→8
}`
      },
      {
        title:"House Robber",level:"MEDIUM",tag:"1D DP",company:"Amazon · LG · Google",
        concept:"dp[i]=max(skip i=dp[i-1], rob i=dp[i-2]+nums[i]).",
        analogy:"Can't rob adjacent houses. At each house: rob it or skip it.",
        input:"[2,7,9,3,1]",output:"12",
        steps:["prev2=nums[0], prev1=max(nums[0],nums[1])","dp[i]=max(prev1, prev2+nums[i])"],
        stl:"Two int variables",
        code:`#include <bits/stdc++.h>
using namespace std;
int rob(vector<int>& nums){
    int n=nums.size();
    if(n==1)return nums[0];
    int a=nums[0],b=max(nums[0],nums[1]);
    for(int i=2;i<n;i++){int c=max(b,a+nums[i]);a=b;b=c;}
    return b; // [2,7,9,3,1]→12
}`
      },
      {
        title:"Coin Change",level:"MEDIUM",tag:"1D DP",company:"Amazon · LG · Google · Infosys",
        concept:"dp[i] = min coins to make amount i. For each coin: dp[i]=min(dp[i], dp[i-coin]+1).",
        analogy:"Making change with limited denominations. Try every coin for each amount.",
        input:"coins=[1,5,11], amount=15",output:"3",
        steps:["dp[0]=0, rest=INT_MAX","For i 1..amount: for each coin c: dp[i]=min(dp[i],dp[i-c]+1)","Return dp[amount]"],
        stl:"vector<int> dp(amount+1,INT_MAX)",
        code:`#include <bits/stdc++.h>
using namespace std;
int coinChange(vector<int>& coins, int amt){
    vector<int> dp(amt+1,INT_MAX);
    dp[0]=0;
    for(int i=1;i<=amt;i++)
        for(int c:coins)
            if(c<=i&&dp[i-c]!=INT_MAX)
                dp[i]=min(dp[i],dp[i-c]+1);
    return dp[amt]==INT_MAX?-1:dp[amt];
}`
      },
      {
        title:"Longest Increasing Subsequence",level:"MEDIUM",tag:"1D DP",company:"Amazon · LG · Google",
        concept:"dp[i] = LIS ending at index i. For each i, check all j<i where nums[j]<nums[i].",
        analogy:"Longest chain of numbers where each is bigger than the previous.",
        input:"[10,9,2,5,3,7,101,18]",output:"4 ([2,3,7,101])",
        steps:["dp[i]=1 initially (each element is LIS of length 1)","For each i: check all j<i where nums[j]<nums[i]","dp[i]=max(dp[i],dp[j]+1)","Return max(dp)"],
        stl:"vector<int> dp(n,1)",
        code:`#include <bits/stdc++.h>
using namespace std;
int lengthOfLIS(vector<int>& nums){
    int n=nums.size();
    vector<int> dp(n,1);
    for(int i=1;i<n;i++)
        for(int j=0;j<i;j++)
            if(nums[j]<nums[i]) dp[i]=max(dp[i],dp[j]+1);
    return *max_element(dp.begin(),dp.end());
    // [10,9,2,5,3,7,101,18] → 4
}`
      },
      {
        title:"Longest Common Subsequence",level:"MEDIUM",tag:"2D DP",company:"Amazon · LG · Google · Infosys",
        concept:"dp[i][j]=LCS of s[0..i-1] and t[0..j-1]. Match → extend. Mismatch → max of skipping either.",
        analogy:"Finding the longest story two books share, even with parts removed from each.",
        input:"s=\"abcde\", t=\"ace\"",output:"3",
        steps:["dp[0][j]=0, dp[i][0]=0","If s[i-1]==t[j-1]: dp[i][j]=dp[i-1][j-1]+1","Else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])"],
        stl:"vector<vector<int>>",
        code:`#include <bits/stdc++.h>
using namespace std;
int lcs(string s, string t){
    int m=s.size(),n=t.size();
    vector<vector<int>> dp(m+1,vector<int>(n+1,0));
    for(int i=1;i<=m;i++)
        for(int j=1;j<=n;j++)
            dp[i][j]=s[i-1]==t[j-1]?dp[i-1][j-1]+1:max(dp[i-1][j],dp[i][j-1]);
    return dp[m][n]; // 3
}`
      },
      {
        title:"0/1 Knapsack",level:"MEDIUM",tag:"2D DP",company:"Amazon · LG · TCS · Infosys",
        concept:"For each item: either include it (get its value, reduce capacity) or exclude it.",
        analogy:"Packing a bag with weight limit. Each item: take it or leave it — maximize value.",
        input:"weights=[1,2,3], values=[6,10,12], capacity=5",output:"22",
        steps:["dp[i][w] = max value using first i items with capacity w","Include: dp[i-1][w-wt]+val","Exclude: dp[i-1][w]","Take max of both"],
        stl:"vector<vector<int>>",
        code:`#include <bits/stdc++.h>
using namespace std;
int knapsack(vector<int>& wt, vector<int>& val, int W){
    int n=wt.size();
    vector<vector<int>> dp(n+1,vector<int>(W+1,0));
    for(int i=1;i<=n;i++)
        for(int w=0;w<=W;w++){
            dp[i][w]=dp[i-1][w]; // don't take item i
            if(wt[i-1]<=w)
                dp[i][w]=max(dp[i][w],dp[i-1][w-wt[i-1]]+val[i-1]); // take it
        }
    return dp[n][W];
    // wt=[1,2,3],val=[6,10,12],W=5 → 22 (items 2+3: 10+12=22)
}`
      },
    ]
  },

  // ─── SORTING ────────────────────────────
  {
    section:"dsa",id:"sorting",label:"Sorting",emoji:"⬇",color:C.teal,
    desc:"Know merge sort and quick sort internally. Understand when to use custom comparators.",
    items:[
      {
        title:"Merge Sort",level:"MEDIUM",tag:"DIVIDE & CONQUER",company:"LG · Amazon · Google",
        concept:"Split in half, sort each, merge sorted halves. O(n log n) stable.",
        analogy:"Sorting a deck of cards by splitting into two smaller decks, sorting each, then merging.",
        input:"[64,34,25,12,22,11,90]",output:"[11,12,22,25,34,64,90]",
        steps:["Divide: mid=l+(r-l)/2","Conquer: mergeSort left and right","Merge: combine two sorted halves"],
        stl:"vector for temp",
        code:`#include <bits/stdc++.h>
using namespace std;
void merge(vector<int>& a,int l,int m,int r){
    vector<int> L(a.begin()+l,a.begin()+m+1);
    vector<int> R(a.begin()+m+1,a.begin()+r+1);
    int i=0,j=0,k=l;
    while(i<(int)L.size()&&j<(int)R.size())
        a[k++]=L[i]<=R[j]?L[i++]:R[j++];
    while(i<(int)L.size()) a[k++]=L[i++];
    while(j<(int)R.size()) a[k++]=R[j++];
}
void mergeSort(vector<int>& a,int l,int r){
    if(l>=r)return;
    int m=l+(r-l)/2;
    mergeSort(a,l,m); mergeSort(a,m+1,r); merge(a,l,m,r);
}`
      },
      {
        title:"Custom Sort with Comparator",level:"EASY",tag:"STL SORT",company:"TCS · Infosys · LG · Amazon",
        concept:"std::sort with a lambda comparator — sort by any field, any order.",
        analogy:"Sorting students not by name but by their exam score, or by score then alphabetically.",
        input:"Pairs, strings, structs",output:"Custom sorted",
        steps:["sort(v.begin(),v.end(),comparator)","Lambda returns true if first arg comes BEFORE second","Can sort by any field"],
        stl:"sort() with lambda",
        code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    // Sort pairs by second element
    vector<pair<int,int>> v={{3,1},{1,4},{2,2},{4,3}};
    sort(v.begin(),v.end(),[](auto&a,auto&b){return a.second<b.second;});

    // Sort strings by LENGTH, then alphabetically
    vector<string> words={"banana","apple","fig","cherry"};
    sort(words.begin(),words.end(),[](auto&a,auto&b){
        if(a.size()!=b.size()) return a.size()<b.size();
        return a<b;
    });
    for(auto s:words) cout<<s<<" ";
    // fig apple banana cherry
}`
      },
    ]
  },

  // ─── HEAPS ──────────────────────────────
  {
    section:"dsa",id:"heaps",label:"Heaps",emoji:"△",color:C.orange,
    desc:"Always know your min or max in O(1). Top-K problems live here.",
    items:[
      {
        title:"Kth Largest Element",level:"MEDIUM",tag:"MIN HEAP",company:"Amazon · LG · Google · Facebook",
        concept:"Min-heap of size K. When size exceeds K, pop smallest. Top = Kth largest.",
        analogy:"Top-5 leaderboard. New score in? Kick out the lowest if board is full.",
        input:"[3,2,1,5,6,4], k=2",output:"5",
        steps:["Min heap of size K","Add each element","If size>K → pop","top = Kth largest"],
        stl:"priority_queue with greater<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
int findKthLargest(vector<int>& nums, int k){
    priority_queue<int,vector<int>,greater<int>> pq;
    for(int n:nums){pq.push(n);if((int)pq.size()>k)pq.pop();}
    return pq.top();
}`
      },
      {
        title:"Find Median from Data Stream",level:"MEDIUM",tag:"TWO HEAPS",company:"Amazon · LG · Google",
        concept:"Max-heap for lower half, min-heap for upper half. Keep sizes balanced.",
        analogy:"Two stacks of cards: smaller half face-up left, bigger half face-up right. Median is at the boundary.",
        input:"Stream 1,2,3,4,5",output:"Median after each insert",
        steps:["lower=max-heap, upper=min-heap","After each insert: balance sizes and ensure lower.top()<=upper.top()","Median: lower.top() or average"],
        stl:"Two priority_queue",
        code:`#include <bits/stdc++.h>
using namespace std;
class MedianFinder{
    priority_queue<int> lo;
    priority_queue<int,vector<int>,greater<int>> hi;
public:
    void addNum(int n){
        lo.push(n);
        if(!hi.empty()&&lo.top()>hi.top()){hi.push(lo.top());lo.pop();}
        if(lo.size()>hi.size()+1){hi.push(lo.top());lo.pop();}
        else if(hi.size()>lo.size()){lo.push(hi.top());hi.pop();}
    }
    double findMedian(){
        return lo.size()>hi.size()?lo.top():(lo.top()+hi.top())/2.0;
    }
};`
      },
    ]
  },

  // ─── GREEDY ─────────────────────────────
  {
    section:"dsa",id:"greedy",label:"Greedy",emoji:"⚡",color:C.lime,
    desc:"Make the locally best choice at each step and trust it leads to global best.",
    items:[
      {
        title:"Jump Game",level:"MEDIUM",tag:"GREEDY",company:"Amazon · LG · Google",
        concept:"Track maxReach. If current index > maxReach → stuck. Otherwise update maxReach.",
        analogy:"Jumping across stepping stones. Each stone shows how far you can jump. Can you reach the other side?",
        input:"[2,3,1,1,4]",output:"true",
        steps:["maxReach=0","For each i: if i>maxReach → false","maxReach=max(maxReach,i+nums[i])","If loop completes → true"],
        stl:"One int variable",
        code:`#include <bits/stdc++.h>
using namespace std;
bool canJump(vector<int>& nums){
    int reach=0;
    for(int i=0;i<(int)nums.size();i++){
        if(i>reach) return false;
        reach=max(reach,i+nums[i]);
    }
    return true;
}`
      },
      {
        title:"Merge Intervals",level:"MEDIUM",tag:"SORT+GREEDY",company:"Amazon · LG · Google · Infosys",
        concept:"Sort by start. If current start <= last end → extend. Else → new interval.",
        analogy:"Merging overlapping meeting times. Sort by start, combine overlapping blocks.",
        input:"[[1,3],[2,6],[8,10],[15,18]]",output:"[[1,6],[8,10],[15,18]]",
        steps:["Sort by start","For each: if overlaps with last → extend end","Else → add new interval"],
        stl:"sort()",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> merge(vector<vector<int>>& iv){
    sort(iv.begin(),iv.end());
    vector<vector<int>> res;
    for(auto&c:iv){
        if(res.empty()||c[0]>res.back()[1]) res.push_back(c);
        else res.back()[1]=max(res.back()[1],c[1]);
    }
    return res;
}`
      },
    ]
  },

  // ─── PATTERN TEMPLATES ──────────────────
  {
    section:"patterns",id:"templates",label:"Pattern Templates",emoji:"📋",color:C.cyan,
    desc:"Generic templates. Recognize the shape, fill in the specifics. Copy-adapt-solve.",
    items:[
      {
        title:"Template: Frequency Count",level:"TEMPLATE",tag:"PATTERN",company:"Used in: 30+ problems",
        concept:"Count how many times each element appears. Foundation of anagram, duplicate, top-K problems.",
        analogy:"Counting how many of each type of coin you have.",
        input:"Any array or string",output:"Frequency map",
        steps:["For int arrays: unordered_map<int,int>","For lowercase strings: int freq[26]={}","map[elem]++ to count (auto-starts at 0)","map.count(elem) to check existence"],
        stl:"unordered_map OR int freq[26]",
        code:`#include <bits/stdc++.h>
using namespace std;
// ── TEMPLATE: FREQUENCY COUNT ──────────────
// Use when: "count occurrences" "find duplicates"
//           "most frequent" "anagram check"

// For INTEGER arrays
unordered_map<int,int> freqInt;
vector<int> nums={1,2,2,3,3,3};
for(int n:nums) freqInt[n]++;
// {1:1, 2:2, 3:3}

// For STRINGS (lowercase — fastest)
int freq[26]={};
string s="hello";
for(char c:s) freq[c-'a']++;
// freq[4]('e')=1, freq[7]('h')=1, freq[11]('l')=2, freq[14]('o')=1

// For STRINGS (any characters)
unordered_map<char,int> freqChar;
for(char c:s) freqChar[c]++;

// SAFE existence check (ALWAYS use .count, NEVER map[key] to check)
if(freqInt.count(3)) cout<<"3 appears "<<freqInt[3]<<" times\\n";

// Find max frequency element
int maxFreq=0, maxElem=-1;
for(auto&[k,cnt]:freqInt)
    if(cnt>maxFreq){maxFreq=cnt;maxElem=k;}

// Find all elements appearing exactly once
for(auto&[k,cnt]:freqInt)
    if(cnt==1) cout<<k<<" is unique\\n";`
      },
      {
        title:"Template: Prefix Sum",level:"TEMPLATE",tag:"PATTERN",company:"Used in: range queries, subarray problems",
        concept:"Precompute cumulative sums. Answer range sum in O(1). Also enables finding subarrays with target sum.",
        analogy:"Odometer readings. Any segment distance = end reading minus start reading.",
        input:"Array",output:"O(1) range queries",
        steps:["prefix[0]=0","prefix[i+1]=prefix[i]+arr[i]","Range [l,r] = prefix[r+1]-prefix[l]","Subarray sum = k: use map to check if (runSum-k) seen before"],
        stl:"vector<int> + unordered_map for subarray count",
        code:`#include <bits/stdc++.h>
using namespace std;
// ── TEMPLATE: PREFIX SUM ───────────────────
// Use when: "sum of range [l,r]"
//           "number of subarrays with sum = k"

vector<int> arr={3,1,4,1,5,9};
int n=arr.size();
vector<int> pre(n+1,0);
for(int i=0;i<n;i++) pre[i+1]=pre[i]+arr[i];
// pre=[0,3,4,8,9,14,23]

// RANGE SUM in O(1)
auto rangeSum=[&](int l,int r){return pre[r+1]-pre[l];};
cout<<rangeSum(1,4)<<"\\n"; // arr[1]+arr[2]+arr[3]+arr[4]=1+4+1+5=11

// COUNT SUBARRAYS WITH SUM == k
// Technique: if pre[j]-pre[i]==k → pre[i]=pre[j]-k
int k=5, count=0;
unordered_map<int,int> seen;
seen[0]=1; // empty prefix
int run=0;
for(int x:arr){
    run+=x;
    count+=seen[run-k]; // how many times did we see (run-k)?
    seen[run]++;
}
cout<<"Subarrays with sum "<<k<<": "<<count<<"\\n";`
      },
      {
        title:"Template: Two Pointer (Converging)",level:"TEMPLATE",tag:"PATTERN",company:"Used in: sorted array pair problems",
        concept:"l and r move toward center. Move based on whether sum is too big or too small.",
        analogy:"Squeezing a tube from both ends until you find the right pressure.",
        input:"Sorted array + target",output:"Pair/triplet/answer",
        steps:["Sort if needed","l=0, r=n-1","Condition too small → l++","Condition too big → r--","Condition met → record answer"],
        stl:"Just two int indices",
        code:`#include <bits/stdc++.h>
using namespace std;
// ── TEMPLATE: TWO POINTER (CONVERGING) ────
// Use when: find pair/triplet with property in SORTED array
// Requires sorted array!

vector<int> arr={1,3,5,7,9,11};
int target=10;
int l=0,r=arr.size()-1;
while(l<r){
    int sum=arr[l]+arr[r];
    if(sum==target){
        cout<<arr[l]<<"+"<<arr[r]<<"="<<target<<"\\n";
        l++;r--;
    }
    else if(sum<target) l++; // too small → move left up
    else r--;                // too big  → move right down
}

// ── TEMPLATE: TWO POINTER (SAME DIRECTION) ─
// Use when: remove elements, merge, slow/fast pointer
int slow=0;
vector<int> v={1,1,2,3,3,4};
for(int fast=1;fast<(int)v.size();fast++)
    if(v[fast]!=v[slow]){slow++;v[slow]=v[fast];}
// v[0..slow] has no duplicates`
      },
      {
        title:"Template: Sliding Window",level:"TEMPLATE",tag:"PATTERN",company:"Used in: substring/subarray problems",
        concept:"Fixed size: slide by adding right, removing left. Variable: expand right, shrink left when invalid.",
        analogy:"A camera zoom on a moving object. Fixed lens = fixed window. Variable lens = variable window.",
        input:"Array + window condition",output:"Optimal subarray",
        steps:["Fixed: build first k, then loop adding right, removing left","Variable: expand right always, shrink left when condition violated","Update answer inside valid window state"],
        stl:"l pointer, window variable",
        code:`#include <bits/stdc++.h>
using namespace std;
// ── TEMPLATE: SLIDING WINDOW (FIXED SIZE) ──
// Use when: max/min sum of exactly k elements
vector<int> arr={2,1,5,1,3,2};
int k=3, s=0;
for(int i=0;i<k;i++) s+=arr[i];
int mx=s;
for(int i=k;i<(int)arr.size();i++){
    s+=arr[i]-arr[i-k]; // add new right, remove old left
    mx=max(mx,s);
}
// max sum of 3 consecutive = 9

// ── TEMPLATE: SLIDING WINDOW (VARIABLE SIZE) ─
// Use when: longest/shortest subarray with condition
int target=7, l=0, cur=0, minLen=INT_MAX;
for(int r=0;r<(int)arr.size();r++){
    cur+=arr[r]; // expand right
    while(cur>=target){ // window valid
        minLen=min(minLen,r-l+1);
        cur-=arr[l++]; // shrink left
    }
}`
      },
      {
        title:"Template: BFS",level:"TEMPLATE",tag:"PATTERN",company:"Used in: shortest path, level traversal",
        concept:"Queue-based. Process level by level. First arrival = shortest distance.",
        analogy:"Spreading fire in a forest. Every tree burns its neighbors simultaneously. First burn = shortest path.",
        input:"Graph/grid",output:"Shortest distances",
        steps:["Initialize dist array with -1","Push source with dist=0","Process queue: pop u, expand neighbors","If neighbor unvisited: dist=dist[u]+1, push"],
        stl:"queue<int> or queue<pair<int,int>>",
        code:`#include <bits/stdc++.h>
using namespace std;
// ── TEMPLATE: BFS (GRAPH) ──────────────────
void bfsGraph(int src, vector<vector<int>>& adj, int n){
    vector<int> dist(n,-1);
    queue<int> q;
    dist[src]=0; q.push(src);
    while(!q.empty()){
        int u=q.front();q.pop();
        for(int v:adj[u])
            if(dist[v]==-1){dist[v]=dist[u]+1;q.push(v);}
    }
}

// ── TEMPLATE: BFS (GRID) ───────────────────
void bfsGrid(vector<vector<int>>& grid, int sr, int sc){
    int rows=grid.size(),cols=grid[0].size();
    vector<vector<bool>> vis(rows,vector<bool>(cols,false));
    queue<pair<int,int>> q;
    q.push({sr,sc}); vis[sr][sc]=true;
    int dirs[4][2]={{0,1},{0,-1},{1,0},{-1,0}};
    while(!q.empty()){
        auto[r,c]=q.front();q.pop();
        for(auto[dr,dc]:dirs){
            int nr=r+dr,nc=c+dc;
            if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&!vis[nr][nc]){
                vis[nr][nc]=true;
                q.push({nr,nc});
            }
        }
    }
}`
      },
      {
        title:"Template: DFS + Backtracking",level:"TEMPLATE",tag:"PATTERN",company:"Used in: permutations, combinations, word search",
        concept:"Explore all paths. Mark visited. Recurse. Unmark on return (backtrack).",
        analogy:"Exploring a maze. Go as far as you can, mark your path, back up when stuck, unmark, try another path.",
        input:"Array/grid/tree",output:"All valid combinations",
        steps:["Mark current as visited/used","Recurse into all valid next choices","Unmark after recursion (backtrack)","Base case: reached goal → record answer"],
        stl:"Recursive function + visited marker",
        code:`#include <bits/stdc++.h>
using namespace std;
// ── TEMPLATE: BACKTRACKING ─────────────────
// Use when: "all permutations" "all subsets"
//           "word search" "N-queens"

// PERMUTATIONS
vector<vector<int>> permutations;
void permute(vector<int>& nums, vector<bool>& used, vector<int>& curr){
    if(curr.size()==nums.size()){permutations.push_back(curr);return;}
    for(int i=0;i<(int)nums.size();i++){
        if(used[i]) continue;
        used[i]=true;  curr.push_back(nums[i]);  // choose
        permute(nums,used,curr);                   // explore
        used[i]=false; curr.pop_back();            // un-choose (backtrack)
    }
}

// SUBSETS
vector<vector<int>> subsets;
void subset(vector<int>& nums, int start, vector<int>& curr){
    subsets.push_back(curr); // every state is a valid subset
    for(int i=start;i<(int)nums.size();i++){
        curr.push_back(nums[i]);  // include nums[i]
        subset(nums,i+1,curr);    // explore with nums[i] included
        curr.pop_back();          // exclude nums[i] (backtrack)
    }
}`
      },
      {
        title:"Template: Binary Search on Answer",level:"TEMPLATE",tag:"PATTERN",company:"Used in: min speed, capacity, allocation problems",
        concept:"When answer is monotonic (if X works, X+1 also works), binary search on the answer directly.",
        analogy:"Dialing up a volume knob. Want minimum volume that satisfies condition. Binary search the dial.",
        input:"Problem with monotonic condition",output:"Minimum/maximum answer",
        steps:["l=min_possible, r=max_possible","canAchieve(mid): check if mid satisfies condition","If yes: save answer, try smaller (r=mid-1)","If no: try bigger (l=mid+1)","Return saved answer"],
        stl:"Lambda + binary search loop",
        code:`#include <bits/stdc++.h>
using namespace std;
// ── TEMPLATE: BINARY SEARCH ON ANSWER ──────
// Use when: "minimum capacity/speed/pages such that..."
//           "maximum ... that is possible"
// Condition must be MONOTONIC:
//   if X works → X+1 also works (or fails → X-1 also fails)

// EXAMPLE: Minimum days to make m bouquets
// (each bouquet needs k adjacent bloomed flowers)
bool canMake(vector<int>& b, int day, int m, int k){
    int bouquets=0, consecutive=0;
    for(int bloom:b){
        if(bloom<=day) consecutive++;
        else consecutive=0;
        if(consecutive==k){bouquets++;consecutive=0;}
    }
    return bouquets>=m;
}

int minDays(vector<int>& bloomDay, int m, int k){
    int l=1,r=*max_element(bloomDay.begin(),bloomDay.end()),ans=r;
    while(l<=r){
        int mid=l+(r-l)/2;
        if(canMake(bloomDay,mid,m,k)){ans=mid;r=mid-1;}
        else l=mid+1;
    }
    return ans;
}`
      },
    ]
  },

  // ─── TCS/WIPRO/INFOSYS ──────────────────
  {
    section:"company",id:"mass",label:"TCS · Wipro · Infosys",emoji:"🏢",color:C.blue,
    desc:"Mass recruiter patterns. MCQ + coding rounds. Focus on clean output format.",
    items:[
      {
        title:"Missing Number (1 to N)",level:"EASY",tag:"MATH",company:"TCS · Wipro · Infosys · LG",
        concept:"Expected sum = n*(n+1)/2. Missing = expected - actual sum.",
        analogy:"Sum formula gives what total should be. Subtract what you have. Difference = missing.",
        input:"[3,0,1], n=3",output:"2",
        steps:["expected=n*(n+1)/2","actual=sum of array","missing=expected-actual"],
        stl:"accumulate()",
        code:`#include <bits/stdc++.h>
using namespace std;
int missingNumber(vector<int>& nums){
    int n=nums.size();
    int expected=n*(n+1)/2;
    int actual=accumulate(nums.begin(),nums.end(),0);
    return expected-actual;
    // [3,0,1]: expected=6, actual=4, missing=2
}`
      },
      {
        title:"Find Duplicate in Array",level:"EASY",tag:"HASHSET",company:"TCS · Wipro · Infosys",
        concept:"Use set. If inserting element already in set → duplicate.",
        analogy:"Checking guest list. Name already ticked = duplicate.",
        input:"[1,3,4,2,2]",output:"2",
        steps:["unordered_set<int> seen","For each n: if seen.count(n) → return n","seen.insert(n)"],
        stl:"unordered_set<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
int findDuplicate(vector<int>& nums){
    unordered_set<int> seen;
    for(int n:nums){
        if(seen.count(n)) return n;
        seen.insert(n);
    }
    return -1;
}`
      },
      {
        title:"Check Armstrong Number",level:"EASY",tag:"MATH",company:"TCS · Wipro · Infosys",
        concept:"Sum of (each digit^numDigits) == original. 153=1³+5³+3³=153.",
        analogy:"A number that adds up to itself when you power each digit.",
        input:"n=153",output:"Armstrong",
        steps:["digits = to_string(n).length()","For each digit d: sum += pow(d,digits)","If sum==original → Armstrong"],
        stl:"pow(), to_string()",
        code:`#include <bits/stdc++.h>
using namespace std;
bool isArmstrong(int n){
    int orig=n, sum=0, d=to_string(n).size();
    while(n>0){sum+=(int)pow(n%10,d);n/=10;}
    return sum==orig;
}
int main(){
    for(int i=100;i<=999;i++)
        if(isArmstrong(i)) cout<<i<<" ";
    // 153 370 371 407
}`
      },
      {
        title:"Anagram Groups",level:"MEDIUM",tag:"HASHMAP",company:"TCS · Infosys · LG · Amazon",
        concept:"Sort each string → use as key. Group originals by key.",
        analogy:"Sort letters alphabetically to get a 'fingerprint'. Same fingerprint = anagrams.",
        input:"[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",output:"[[eat,tea,ate],[tan,nat],[bat]]",
        steps:["For each string: key=sorted string","groups[key].push_back(string)","Return all groups"],
        stl:"unordered_map<string,vector<string>>",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<vector<string>> groupAnagrams(vector<string>& strs){
    unordered_map<string,vector<string>> g;
    for(string& s:strs){
        string k=s; sort(k.begin(),k.end());
        g[k].push_back(s);
    }
    vector<vector<string>> res;
    for(auto&[k,v]:g) res.push_back(v);
    return res;
}`
      },
      {
        title:"Longest Consecutive Sequence",level:"MEDIUM",tag:"HASHSET",company:"Amazon · LG · TCS · Google",
        concept:"Put all in set. Only count from sequence start (x-1 not in set).",
        analogy:"Finding longest unbroken chain. Only start counting from numbers with no predecessor.",
        input:"[100,4,200,1,3,2]",output:"4 (1,2,3,4)",
        steps:["All in unordered_set","For each n: only count if n-1 NOT in set","Extend while n+1 exists","Track max"],
        stl:"unordered_set<int>",
        code:`#include <bits/stdc++.h>
using namespace std;
int longestConsecutive(vector<int>& nums){
    unordered_set<int> s(nums.begin(),nums.end());
    int mx=0;
    for(int n:s){
        if(!s.count(n-1)){ // sequence start
            int cur=n,len=1;
            while(s.count(cur+1)){cur++;len++;}
            mx=max(mx,len);
        }
    }
    return mx; // 4
}`
      },
      {
        title:"Roman to Integer",level:"EASY",tag:"HASHMAP",company:"TCS · Infosys · LG · Wipro",
        concept:"If current value < next value → subtract (e.g. IV=4). Otherwise add.",
        analogy:"Roman numerals usually add left to right, but smaller-before-larger means subtraction.",
        input:"\"MCMXCIV\"",output:"1994",
        steps:["Map each symbol to its value","Loop right to left","If value < next → subtract, else → add"],
        stl:"unordered_map<char,int>",
        code:`#include <bits/stdc++.h>
using namespace std;
int romanToInt(string s){
    unordered_map<char,int> v={
        {'I',1},{'V',5},{'X',10},{'L',50},
        {'C',100},{'D',500},{'M',1000}
    };
    int total=0;
    for(int i=0;i<(int)s.size();i++){
        // If current < next → subtract (IV=4, IX=9)
        if(i+1<(int)s.size()&&v[s[i]]<v[s[i+1]])
            total-=v[s[i]];
        else
            total+=v[s[i]];
    }
    return total; // "MCMXCIV"=1994
}`
      },
      {
        title:"Balanced Parentheses String",level:"EASY",tag:"STACK",company:"TCS · Wipro · Infosys",
        concept:"Same as valid parentheses — push open, pop and verify on close.",
        analogy:"Every open bracket needs a matching close. Stack tracks unmatched opens.",
        input:"\"((()))\"",output:"true",
        steps:["Open→push","Close→if empty→false, pop and match","Return stk.empty()"],
        stl:"stack<char>",
        code:`#include <bits/stdc++.h>
using namespace std;
// Works for all bracket types — same logic as Valid Parentheses
// TCS often gives only () brackets
bool isBalanced(string s){
    stack<char> stk;
    for(char c:s){
        if(c=='('||c=='['||c=='{') stk.push(c);
        else{
            if(stk.empty()) return false;
            char t=stk.top();stk.pop();
            if(c==')'&&t!='(') return false;
            if(c==']'&&t!='[') return false;
            if(c=='}'&&t!='{') return false;
        }
    }
    return stk.empty();
}`
      },
      {
        title:"Bubble Sort — Implement",level:"EASY",tag:"SORTING",company:"TCS · Wipro · Infosys",
        concept:"Repeatedly swap adjacent elements if they're in wrong order. Largest element bubbles to end each pass.",
        analogy:"Like bubbles rising to the surface. Each pass pushes the largest element to its final position.",
        input:"[64,34,25,12,22,11,90]",output:"[11,12,22,25,34,64,90]",
        steps:["n passes","Each pass: compare adj pairs, swap if out of order","After pass i: last i elements are sorted","Optimization: stop if no swaps in a pass"],
        stl:"swap()",
        code:`#include <bits/stdc++.h>
using namespace std;
void bubbleSort(vector<int>& arr){
    int n=arr.size();
    for(int i=0;i<n-1;i++){
        bool swapped=false;
        for(int j=0;j<n-i-1;j++){
            if(arr[j]>arr[j+1]){
                swap(arr[j],arr[j+1]);
                swapped=true;
            }
        }
        if(!swapped) break; // already sorted, early exit
    }
}
// NOTE: O(n²) — only implement in interviews when asked
// In real code always use: sort(v.begin(),v.end())`
      },
      {
        title:"Selection Sort — Implement",level:"EASY",tag:"SORTING",company:"TCS · Wipro · Infosys",
        concept:"Find minimum in unsorted portion, swap to front. Grow sorted portion from left.",
        analogy:"Finding the smallest card in your hand, putting it first, then finding next smallest.",
        input:"[64,34,25,12,22,11,90]",output:"[11,12,22,25,34,64,90]",
        steps:["For i from 0 to n-2:","Find min index in arr[i..n-1]","Swap arr[i] with arr[minIdx]"],
        stl:"swap()",
        code:`#include <bits/stdc++.h>
using namespace std;
void selectionSort(vector<int>& arr){
    int n=arr.size();
    for(int i=0;i<n-1;i++){
        int minIdx=i;
        for(int j=i+1;j<n;j++)
            if(arr[j]<arr[minIdx]) minIdx=j;
        swap(arr[i],arr[minIdx]);
    }
}
// O(n²) — implement only when asked
// In real code: sort(v.begin(),v.end())`
      },
    ]
  },

  // ─── AMAZON/LG STYLE ────────────────────
  {
    section:"company",id:"product",label:"Amazon · LG · Google Style",emoji:"🚀",color:C.orange,
    desc:"Medium difficulty. Product companies expect pattern recognition and clean code.",
    items:[
      {
        title:"Top K Frequent Elements",level:"MEDIUM",tag:"HEAP / BUCKET SORT",company:"Amazon · LG · Google",
        concept:"Count freq, bucket sort by freq, collect top k from highest bucket.",
        analogy:"Finding most searched terms — count, then sort by count.",
        input:"[1,1,1,2,2,3], k=2",output:"[1,2]",
        steps:["Count freq","bucket[freq]=list of nums with that freq","Collect from highest bucket down until k elements"],
        stl:"unordered_map + vector<vector<int>>",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<int> topKFrequent(vector<int>& nums, int k){
    unordered_map<int,int> freq;
    for(int n:nums) freq[n]++;
    vector<vector<int>> bucket(nums.size()+1);
    for(auto&[n,c]:freq) bucket[c].push_back(n);
    vector<int> res;
    for(int i=bucket.size()-1;i>=0&&(int)res.size()<k;i--)
        for(int v:bucket[i]) if((int)res.size()<k) res.push_back(v);
    return res;
}`
      },
      {
        title:"Subarray Sum Equals K",level:"MEDIUM",tag:"PREFIX SUM + HASHMAP",company:"Amazon · LG · Google · Facebook",
        concept:"Prefix sum trick. If prefix[j]-prefix[i]=k → prefix[i]=prefix[j]-k. Count how many times (runSum-k) appeared.",
        analogy:"Finding road segments with exactly k elevation change. Store cumulative elevations, check differences.",
        input:"[1,1,1], k=2",output:"2",
        steps:["prefixCount[0]=1","runSum+=n, count+=prefixCount[runSum-k]","prefixCount[runSum]++"],
        stl:"unordered_map<int,int>",
        code:`#include <bits/stdc++.h>
using namespace std;
int subarraySum(vector<int>& nums, int k){
    unordered_map<int,int> cnt;
    cnt[0]=1; int run=0,count=0;
    for(int n:nums){
        run+=n;
        count+=cnt[run-k];
        cnt[run]++;
    }
    return count; // [1,1,1],k=2 → 2
}`
      },
      {
        title:"Word Search in Grid",level:"MEDIUM",tag:"BACKTRACKING",company:"Amazon · LG · Google · Microsoft",
        concept:"DFS+backtracking from every cell. Mark visited, explore 4 dirs, unmark on return.",
        analogy:"Word search puzzle. Try every starting point, explore all connected paths.",
        input:"grid, word=\"ABCCED\"",output:"true",
        steps:["Try DFS from every cell","DFS: if grid[r][c]==word[idx] → mark, recurse 4 dirs","Base: idx==word.size() → found","Unmark on backtrack"],
        stl:"Recursive DFS with backtrack",
        code:`#include <bits/stdc++.h>
using namespace std;
bool exist(vector<vector<char>>& board, string word){
    int m=board.size(),n=board[0].size();
    function<bool(int,int,int)> dfs=[&](int r,int c,int i)->bool{
        if(i==(int)word.size()) return true;
        if(r<0||r>=m||c<0||c>=n||board[r][c]!=word[i]) return false;
        char tmp=board[r][c]; board[r][c]='#'; // mark
        bool f=dfs(r+1,c,i+1)||dfs(r-1,c,i+1)||dfs(r,c+1,i+1)||dfs(r,c-1,i+1);
        board[r][c]=tmp; // unmark (backtrack)
        return f;
    };
    for(int r=0;r<m;r++) for(int c=0;c<n;c++) if(dfs(r,c,0)) return true;
    return false;
}`
      },
      {
        title:"Longest Repeating Character Replacement",level:"MEDIUM",tag:"SLIDING WINDOW",company:"Amazon · LG · Google",
        concept:"Sliding window. Window is valid if (size - max_freq) <= k. If invalid, shrink.",
        analogy:"You can paint k letters to match. Is this window achievable with k repaints?",
        input:"s=\"AABABBA\", k=1",output:"4",
        steps:["Track freq of each char in window and maxFreq","If windowSize - maxFreq > k → shrink (l++)","maxLen = max(maxLen, r-l+1)"],
        stl:"int freq[26], l pointer",
        code:`#include <bits/stdc++.h>
using namespace std;
int characterReplacement(string s, int k){
    int freq[26]={},maxFreq=0,l=0,mx=0;
    for(int r=0;r<(int)s.size();r++){
        maxFreq=max(maxFreq,++freq[s[r]-'A']);
        while((r-l+1)-maxFreq>k) freq[s[l++]-'A']--;
        mx=max(mx,r-l+1);
    }
    return mx; // "AABABBA",k=1 → 4 ("AABA"→replace B)
}`
      },
      {
        title:"Meeting Rooms II — Min Rooms",level:"MEDIUM",tag:"HEAP / SWEEP",company:"Amazon · LG · Google · Facebook",
        concept:"Sort by start. Use min-heap of end times. If next meeting starts after heap top ends → reuse room.",
        analogy:"Booking meeting rooms. When the next meeting starts, check if the earliest-ending room is free. If yes, reuse it.",
        input:"[[0,30],[5,10],[15,20]]",output:"2",
        steps:["Sort by start time","Min-heap of end times","For each meeting: if pq.top()<=start → pop (room freed)","Push current end time","Answer = heap size"],
        stl:"priority_queue min heap",
        code:`#include <bits/stdc++.h>
using namespace std;
int minMeetingRooms(vector<vector<int>>& intervals){
    sort(intervals.begin(),intervals.end());
    priority_queue<int,vector<int>,greater<int>> ends; // min heap of end times
    for(auto& iv:intervals){
        if(!ends.empty()&&ends.top()<=iv[0])
            ends.pop(); // free a room
        ends.push(iv[1]); // book a room
    }
    return ends.size(); // rooms in use
    // [[0,30],[5,10],[15,20]] → 2
}`
      },
      {
        title:"LRU Cache",level:"MEDIUM",tag:"DESIGN",company:"Amazon · LG · Google · Microsoft",
        concept:"Doubly linked list + hashmap. Map gives O(1) access. List maintains order (most recent at front).",
        analogy:"Browser cache. When full, evict the page you haven't visited in the longest time.",
        input:"capacity=2, get/put operations",output:"LRU eviction behavior",
        steps:["Map: key→node for O(1) access","DLL: most recent at front, LRU at back","get: move to front, return val","put: add to front, evict back if full"],
        stl:"list<pair<int,int>>, unordered_map",
        code:`#include <bits/stdc++.h>
using namespace std;
class LRUCache{
    int cap;
    list<pair<int,int>> lst; // {key,val} most recent at front
    unordered_map<int,list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int c):cap(c){}
    int get(int key){
        if(!mp.count(key)) return -1;
        lst.splice(lst.begin(),lst,mp[key]); // move to front
        return mp[key]->second;
    }
    void put(int key,int val){
        if(mp.count(key)){
            mp[key]->second=val;
            lst.splice(lst.begin(),lst,mp[key]);
            return;
        }
        if((int)lst.size()==cap){
            mp.erase(lst.back().first);
            lst.pop_back(); // evict LRU
        }
        lst.push_front({key,val});
        mp[key]=lst.begin();
    }
};`
      },
      {
        title:"Pacific Atlantic Water Flow",level:"MEDIUM",tag:"MULTI-SOURCE BFS",company:"Amazon · LG · Google",
        concept:"Reverse: BFS from borders going UPHILL. Cells reachable from both = answer.",
        analogy:"Instead of checking if each cell flows to both oceans (hard), check which cells each ocean can reach going uphill (easy).",
        input:"Height matrix",output:"Cells flowing to both oceans",
        steps:["BFS from Pacific borders (top+left) uphill","BFS from Atlantic borders (bottom+right) uphill","Answer: cells marked by both BFS runs"],
        stl:"queue<pair<int,int>>, 2D bool arrays",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> pacificAtlantic(vector<vector<int>>& h){
    int m=h.size(),n=h[0].size();
    vector<vector<bool>> pac(m,vector<bool>(n,false)),atl=pac;
    int d[4][2]={{0,1},{0,-1},{1,0},{-1,0}};
    auto bfs=[&](queue<pair<int,int>>&q,vector<vector<bool>>&vis){
        while(!q.empty()){
            auto[r,c]=q.front();q.pop();
            for(auto[dr,dc]:d){
                int nr=r+dr,nc=c+dc;
                if(nr>=0&&nr<m&&nc>=0&&nc<n&&!vis[nr][nc]&&h[nr][nc]>=h[r][c])
                {vis[nr][nc]=true;q.push({nr,nc});}
            }
        }
    };
    queue<pair<int,int>> pq,aq;
    for(int r=0;r<m;r++){pac[r][0]=true;pq.push({r,0});atl[r][n-1]=true;aq.push({r,n-1});}
    for(int c=0;c<n;c++){pac[0][c]=true;pq.push({0,c});atl[m-1][c]=true;aq.push({m-1,c});}
    bfs(pq,pac);bfs(aq,atl);
    vector<vector<int>> res;
    for(int r=0;r<m;r++) for(int c=0;c<n;c++) if(pac[r][c]&&atl[r][c]) res.push_back({r,c});
    return res;
}`
      },
    ]
  },

  // ─── MICROSOFT/ADOBE ────────────────────
  {
    section:"company",id:"ms_adobe",label:"Microsoft · Adobe Style",emoji:"💻",color:C.purple,
    desc:"Emphasis on design problems, string manipulation, and mathematical thinking.",
    items:[
      {
        title:"Pow(x,n) — Fast Power",level:"MEDIUM",tag:"MATH / RECURSION",company:"Microsoft · LG · Adobe · Amazon",
        concept:"Binary exponentiation: x^n = (x^(n/2))^2. Halve the problem each time → O(log n).",
        analogy:"Instead of multiplying x 8 times for x^8, multiply x^4 by x^4 (one operation). Then x^4=x^2*x^2. Three ops total.",
        input:"x=2.0, n=10",output:"1024.0",
        steps:["If n<0: x=1/x, n=-n","If n==0: return 1","If n is even: return pow(x*x, n/2)","If n is odd: return x * pow(x*x, n/2)"],
        stl:"Recursion",
        code:`#include <bits/stdc++.h>
using namespace std;
double myPow(double x, long long n){
    if(n<0){x=1/x;n=-n;}
    if(n==0) return 1;
    double half=myPow(x,n/2);
    if(n%2==0) return half*half;
    else       return x*half*half;
    // 2^10: half=2^5=32, 32*32=1024 ✓
    // Just 4 recursive calls vs 10 multiplications!
}
int main(){
    cout<<myPow(2.0,10)<<"\\n"; // 1024
    cout<<myPow(2.0,-2)<<"\\n"; // 0.25
}`
      },
      {
        title:"Excel Column Title",level:"EASY",tag:"MATH",company:"Microsoft · LG · Adobe",
        concept:"Convert number to base-26 system using A-Z alphabet. But 'A' is 1, not 0 — off-by-one needs handling.",
        analogy:"Like base-10 counting but with letters instead of digits, starting from A=1.",
        input:"n=28",output:"\"AB\"",
        steps:["While n>0:","Adjust: n-- (because A=1 not A=0)","Prepend char: 'A'+(n%26)","n /= 26"],
        stl:"string construction",
        code:`#include <bits/stdc++.h>
using namespace std;
string convertToTitle(int n){
    string res="";
    while(n>0){
        n--; // adjust: A=1 but we need 0-indexed mod
        res=(char)('A'+n%26)+res; // prepend character
        n/=26;
    }
    return res;
    // n=1:"A", n=26:"Z", n=27:"AA", n=28:"AB"
}
int main(){
    cout<<convertToTitle(1)<<"\\n";  // A
    cout<<convertToTitle(28)<<"\\n"; // AB
    cout<<convertToTitle(701)<<"\\n";// ZY
}`
      },
      {
        title:"Spiral Matrix — Generate",level:"MEDIUM",tag:"MATRIX",company:"Microsoft · LG · Amazon",
        concept:"Fill matrix in spiral order. Four boundaries shrink as each side is filled.",
        analogy:"Writing numbers on a coiling snail shell — start outer ring, spiral inward.",
        input:"n=3",output:"[[1,2,3],[8,9,4],[7,6,5]]",
        steps:["t=0,b=n-1,l=0,r=n-1, num=1","→ fill top, t++","↓ fill right, r--","← fill bottom, b--","↑ fill left, l++"],
        stl:"vector<vector<int>>",
        code:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> generateMatrix(int n){
    vector<vector<int>> mat(n,vector<int>(n,0));
    int t=0,b=n-1,l=0,r=n-1,num=1;
    while(t<=b&&l<=r){
        for(int c=l;c<=r;c++) mat[t][c]=num++;  t++;
        for(int c=t;c<=b;c++) mat[c][r]=num++;  r--;
        if(t<=b){for(int c=r;c>=l;c--) mat[b][c]=num++; b--;}
        if(l<=r){for(int c=b;c>=t;c--) mat[c][l]=num++; l++;}
    }
    return mat;
    // n=3: [[1,2,3],[8,9,4],[7,6,5]]
}`
      },
      {
        title:"N-Queens Problem",level:"MEDIUM",tag:"BACKTRACKING",company:"Microsoft · LG · Google",
        concept:"Backtracking: place queen row by row. Skip if column, or either diagonal is attacked.",
        analogy:"Placing chess queens on a board such that no two attack each other — one per row, check columns and diagonals.",
        input:"n=4",output:"2 solutions",
        steps:["Row by row: place queen in each column","Check if safe: no queen in same col, diag1(r-c), diag2(r+c)","If safe: place, recurse next row","If all rows placed → record solution"],
        stl:"Sets for col/diag tracking",
        code:`#include <bits/stdc++.h>
using namespace std;
int totalNQueens(int n){
    int count=0;
    unordered_set<int> cols,d1,d2; // col, r-c diagonals, r+c diagonals
    function<void(int)> bt=[&](int row){
        if(row==n){count++;return;}
        for(int col=0;col<n;col++){
            if(cols.count(col)||d1.count(row-col)||d2.count(row+col)) continue;
            cols.insert(col);d1.insert(row-col);d2.insert(row+col);
            bt(row+1);
            cols.erase(col);d1.erase(row-col);d2.erase(row+col);
        }
    };
    bt(0); return count;
    // n=4 → 2 solutions
}`
      },
    ]
  },

  // ─── LG SOFT SPECIFIC ───────────────────
  {
    section:"company",id:"lgsoft",label:"LG Soft India Specific",emoji:"🎯",color:C.green,
    desc:"LG Soft focuses on embedded/OS awareness + solid DSA. These patterns match their style.",
    items:[
      {
        title:"Bit Manipulation — Count Set Bits",level:"EASY",tag:"BIT OPS",company:"LG · Embedded companies",
        concept:"Brian Kernighan's trick: n & (n-1) removes the lowest set bit. Count how many removals until 0.",
        analogy:"Popping bubbles from the bottom one at a time. Count how many bubbles there were.",
        input:"n=13 (1101 in binary)",output:"3",
        steps:["While n!=0: count++, n = n&(n-1)","Each operation removes exactly one set bit","Return count"],
        stl:"Bit operator &",
        code:`#include <bits/stdc++.h>
using namespace std;
int countBits(int n){
    int count=0;
    while(n){count++;n=n&(n-1);} // removes lowest set bit
    return count;
    // 13=1101: 1101&1100=1100(count=1), 1100&1011=1000(count=2), 1000&0111=0000(count=3)
}
int main(){
    cout<<countBits(13)<<"\\n"; // 3
    // STL: __builtin_popcount(n)  — fastest!
    cout<<__builtin_popcount(13)<<"\\n"; // 3
}`
      },
      {
        title:"Bit Manipulation — Power of Two",level:"EASY",tag:"BIT OPS",company:"LG · Amazon · TCS",
        concept:"Power of 2 has exactly ONE set bit. n & (n-1) removes it. If result is 0 AND n>0 → power of 2.",
        analogy:"A power of 2 in binary looks like a lone 1 with all zeros after it. 8=1000. 16=10000.",
        input:"n=16",output:"true",
        steps:["If n<=0 → false","n & (n-1) == 0 → power of 2","Else → not power of 2"],
        stl:"Bit operator &",
        code:`#include <bits/stdc++.h>
using namespace std;
bool isPowerOfTwo(int n){
    return n>0 && (n&(n-1))==0;
    // 8=1000: 1000&0111=0000 ✓
    // 6=0110: 0110&0101=0100 ≠ 0 ✗
}
// Related patterns:
// Even/odd: n&1 == 0/1
// Multiply by 2: n<<1
// Divide by 2: n>>1
// XOR trick: a^b (differs), a^0=a, a^a=0
// Swap without temp: a^=b; b^=a; a^=b;`
      },
      {
        title:"Matrix Chain Multiplication — Count",level:"MEDIUM",tag:"DP",company:"LG · Amazon · Adobe",
        concept:"dp[i][j]=min scalar multiplications for matrices from i to j. Try every split point k.",
        analogy:"Finding the cheapest order to multiply a chain of matrices. The order matters — (AB)C vs A(BC) can differ vastly in cost.",
        input:"dims=[10,30,5,60]",output:"27000",
        steps:["dp[i][j]=min cost for matrices i..j","For length l from 2 to n:","For each i: j=i+l-1","Try every split k: cost=dp[i][k]+dp[k+1][j]+p[i-1]*p[k]*p[j]"],
        stl:"2D DP vector",
        code:`#include <bits/stdc++.h>
using namespace std;
int matrixChain(vector<int>& p){
    int n=p.size()-1; // number of matrices
    vector<vector<int>> dp(n+1,vector<int>(n+1,0));
    for(int len=2;len<=n;len++){
        for(int i=1;i<=n-len+1;i++){
            int j=i+len-1;
            dp[i][j]=INT_MAX;
            for(int k=i;k<j;k++){
                int cost=dp[i][k]+dp[k+1][j]+p[i-1]*p[k]*p[j];
                dp[i][j]=min(dp[i][j],cost);
            }
        }
    }
    return dp[1][n];
    // dims=[10,30,5,60]: min multiplications=27000
}
int main(){
    vector<int> p={10,30,5,60};
    cout<<matrixChain(p)<<"\\n"; // 27000
}`
      },
      {
        title:"Detect Loop in Array (Cycle Find)",level:"MEDIUM",tag:"FAST/SLOW",company:"LG · Amazon · Google",
        concept:"Follow indices like a linked list. Detect cycle with Floyd's algorithm. Find entry point of cycle.",
        analogy:"Array where each element points to the next index to visit — like a linked list made of array indices.",
        input:"nums=[3,1,3,4,2]",output:"3",
        steps:["Phase 1: slow+=1, fast+=2 until they meet","Phase 2: slow=0, both move by 1","Meeting point = cycle entry"],
        stl:"Two int pointers",
        code:`#include <bits/stdc++.h>
using namespace std;
int findDuplicateCycle(vector<int>& nums){
    // Works when array has values 1..n and size n+1
    // Phase 1: find meeting point inside cycle
    int slow=nums[0], fast=nums[0];
    do{slow=nums[slow];fast=nums[nums[fast]];}
    while(slow!=fast);
    // Phase 2: find cycle entry
    slow=nums[0];
    while(slow!=fast){slow=nums[slow];fast=nums[fast];}
    return slow; // cycle entry = duplicate
    // [1,3,4,2,2]: slow=1,3,2,4,2 fast=1,2,2 → meet at 2
}`
      },
      {
        title:"Implement Stack Using Array",level:"EASY",tag:"DESIGN",company:"LG · TCS · Embedded",
        concept:"Manual stack: array + top pointer. push increments top, pop decrements. Check overflow/underflow.",
        analogy:"A physical tray dispenser. Add trays on top, take from top. Know when it's full and when it's empty.",
        input:"push 1,2,3 then pop twice",output:"3, 2",
        steps:["arr[MAXSIZE], top=-1","push: if top==MAXSIZE-1 → overflow, else arr[++top]=x","pop: if top==-1 → underflow, else return arr[top--]","peek: arr[top]"],
        stl:"Manual array",
        code:`#include <bits/stdc++.h>
using namespace std;
class ArrayStack{
    int arr[1000];
    int top=-1;
public:
    bool push(int x){
        if(top==999){cout<<"Overflow!\\n";return false;}
        arr[++top]=x;
        return true;
    }
    int pop(){
        if(top==-1){cout<<"Underflow!\\n";return -1;}
        return arr[top--];
    }
    int peek(){return top==-1?-1:arr[top];}
    bool empty(){return top==-1;}
    int size(){return top+1;}
};
int main(){
    ArrayStack s;
    s.push(1);s.push(2);s.push(3);
    cout<<s.pop()<<"\\n"; // 3
    cout<<s.pop()<<"\\n"; // 2
    cout<<s.peek()<<"\\n";// 1
}`
      },
    ]
  },

];

// ═══════════════════════════════════════════
// SECTION DEFINITIONS
// ═══════════════════════════════════════════
const SECTIONS=[
  {id:"start",   label:"🏠 Home",         color:C.green},
  {id:"stl",     label:"📦 STL Library",  color:C.blue},
  {id:"basics",  label:"🔰 Basics",       color:C.cyan},
  {id:"dsa",     label:"🌿 DSA Core",     color:C.lime},
  {id:"patterns",label:"📋 Patterns",     color:C.indigo},
  {id:"company", label:"🏢 Company Qs",   color:C.orange},
];
const LEVEL_COLOR={EASY:"#66bb6a",MEDIUM:"#ffb74d",HARD:"#ef5350",TEMPLATE:"#80deea"};

// ═══════════════════════════════════════════
// CODE BLOCK COMPONENT
// ═══════════════════════════════════════════
const CodeBlock=({code,color})=>{
  const[cp,setCp]=useState(false);
  const copy=()=>{navigator.clipboard.writeText(code);setCp(true);setTimeout(()=>setCp(false),2000);};
  return(
    <div style={{background:"#0d1117",border:"1px solid "+C.border,borderRadius:6,overflow:"hidden"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 14px",background:C.sidebar,borderBottom:"1px solid "+C.border}}>
        <div style={{display:"flex",gap:5}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#ef5350"}}/>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#ffb74d"}}/>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#66bb6a"}}/>
          <span style={{marginLeft:8,fontSize:9,color:C.dimmer,letterSpacing:2}}>solution.cpp</span>
        </div>
        <button onClick={copy} style={{background:cp?"#1a2e1a":"transparent",border:`1px solid ${cp?"#66bb6a":C.border}`,color:cp?"#66bb6a":C.dim,padding:"2px 10px",cursor:"pointer",fontSize:9,borderRadius:3,fontFamily:"inherit"}}>
          {cp?"✓ COPIED":"COPY"}
        </button>
      </div>
      <pre style={{margin:0,padding:"14px 16px",overflowX:"auto",fontSize:12,lineHeight:1.75,fontFamily:"'Courier New',monospace"}}>
        {code.split("\n").map((line,i)=>{
          let col="#c9d1d9";
          if(line.trim().startsWith("// =")) col=color||C.blue;
          else if(line.trim().startsWith("//")&&!line.trim().startsWith("//!")) col="#4a6070";
          else if(line.trim().startsWith("#")) col="#ce93d8";
          return(<div key={i} style={{display:"flex"}}>
            <span style={{color:C.dimmer,minWidth:26,fontSize:10,userSelect:"none",paddingRight:10,textAlign:"right",flexShrink:0}}>{i+1}</span>
            <span style={{color:col,whiteSpace:"pre",flex:1}}>{line}</span>
          </div>);
        })}
      </pre>
    </div>
  );
};

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App(){
  const[section,setSection]=useState("start");
  const[topicId,setTopicId]=useState(null);
  const[itemIdx,setItemIdx]=useState(0);
  const[stlIdx,setStlIdx]=useState(0);
  const[tab,setTab]=useState("code");
  const[sideOpen,setSideOpen]=useState(true);
  const[search,setSearch]=useState("");

  const sectionTopics=ALL_TOPICS.filter(t=>t.section===section);
  const activeTopic=topicId?ALL_TOPICS.find(t=>t.id===topicId):sectionTopics[0];
  const item=activeTopic?.items[itemIdx];
  const stl=STL_DATA[stlIdx];

  const goTopic=(tid)=>{setTopicId(tid);setItemIdx(0);setTab("code");};
  const goItem=(idx)=>{setItemIdx(idx);setTab("code");};
  const nextItem=()=>{
    if(!activeTopic)return;
    if(itemIdx<activeTopic.items.length-1)setItemIdx(i=>i+1);
    else{const idx=sectionTopics.findIndex(t=>t.id===activeTopic.id);if(idx<sectionTopics.length-1)goTopic(sectionTopics[idx+1].id);}
  };
  const prevItem=()=>{
    if(itemIdx>0)setItemIdx(i=>i-1);
    else{const idx=sectionTopics.findIndex(t=>t.id===activeTopic?.id);if(idx>0){const p=sectionTopics[idx-1];setTopicId(p.id);setItemIdx(p.items.length-1);}}
  };

  // Search results
  const searchResults=search.length>=2?ALL_TOPICS.flatMap(t=>
    t.items.filter(p=>p.title.toLowerCase().includes(search.toLowerCase())||p.tag.toLowerCase().includes(search.toLowerCase())||p.company.toLowerCase().includes(search.toLowerCase()))
    .map(p=>({...p,topicId:t.id,topicLabel:t.label,topicColor:t.color}))
  ):[];

  const changeSection=(s)=>{setSection(s);setTopicId(null);setItemIdx(0);setTab("code");setSearch("");};

  const totalProblems=ALL_TOPICS.reduce((s,t)=>s+t.items.length,0);

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:C.bg,color:C.text,fontFamily:"'Courier New',monospace",fontSize:13,overflow:"hidden"}}>

      {/* ── TOP NAV ── */}
      <div style={{display:"flex",alignItems:"center",borderBottom:"1px solid "+C.border,background:C.sidebar,flexShrink:0,padding:"0 6px"}}>
        <div style={{fontSize:11,color:C.green,fontWeight:700,letterSpacing:3,padding:"10px 12px",borderRight:"1px solid "+C.border,whiteSpace:"nowrap",flexShrink:0}}>DSA∙MASTER</div>
        <div style={{display:"flex",overflowX:"auto",flex:1}}>
          {SECTIONS.map(s=>(
            <button key={s.id} onClick={()=>changeSection(s.id)}
              style={{padding:"10px 12px",background:section===s.id?s.color+"22":"transparent",color:section===s.id?s.color:C.dim,border:"none",borderBottom:`2px solid ${section===s.id?s.color:"transparent"}`,cursor:"pointer",fontSize:10,fontFamily:"inherit",whiteSpace:"nowrap",letterSpacing:1}}>
              {s.label}
            </button>
          ))}
        </div>
        {/* Search */}
        <div style={{padding:"0 8px",flexShrink:0}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 search..."
            style={{background:C.card,border:"1px solid "+C.border,color:C.text,padding:"4px 10px",fontSize:11,borderRadius:4,fontFamily:"inherit",width:140,outline:"none"}}/>
        </div>
        <button onClick={()=>setSideOpen(o=>!o)} style={{padding:"8px 10px",background:"transparent",border:"none",color:C.dim,cursor:"pointer",fontSize:14,flexShrink:0}}>
          {sideOpen?"◀":"▶"}
        </button>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>

        {/* ── SIDEBAR ── */}
        {sideOpen&&(
          <div style={{width:196,background:C.sidebar,borderRight:"1px solid "+C.border,overflowY:"auto",flexShrink:0}}>

            {section==="start"&&(
              <div style={{padding:12}}>
                <div style={{color:C.green,fontSize:12,fontWeight:700,marginBottom:10}}>Start Here 👇</div>
                {[
                  {emoji:"📦",text:"STL Library",sub:"Learn tools first",s:"stl"},
                  {emoji:"🔰",text:"Basics",sub:"Loops, math, patterns",s:"basics",t:"loops"},
                  {emoji:"🌿",text:"DSA Core",sub:"All data structures",s:"dsa",t:"arrays"},
                  {emoji:"📋",text:"Patterns",sub:"Templates to memorize",s:"patterns",t:"templates"},
                  {emoji:"🏢",text:"Company Qs",sub:"Real exam patterns",s:"company",t:"mass"},
                ].map((c,i)=>(
                  <div key={i} onClick={()=>{changeSection(c.s);if(c.t)setTopicId(c.t);}}
                    style={{background:C.card,borderRadius:5,padding:"8px 10px",marginBottom:6,cursor:"pointer",border:"1px solid "+C.border}}>
                    <div style={{fontSize:11}}>{c.emoji} {c.text}</div>
                    <div style={{fontSize:9,color:C.dim,marginTop:2}}>{c.sub}</div>
                  </div>
                ))}
                <div style={{marginTop:10,padding:"8px 10px",background:C.card,borderRadius:5,border:"1px solid "+C.border}}>
                  <div style={{fontSize:10,color:C.green}}>Total Problems</div>
                  <div style={{fontSize:18,color:C.text,fontWeight:700}}>{totalProblems}</div>
                  <div style={{fontSize:9,color:C.dim}}>across all topics</div>
                </div>
              </div>
            )}

            {section==="stl"&&STL_DATA.map((s,i)=>(
              <div key={i} onClick={()=>setStlIdx(i)} style={{padding:"9px 12px",cursor:"pointer",borderLeft:`3px solid ${stlIdx===i?s.color:"transparent"}`,background:stlIdx===i?C.card:"transparent"}}>
                <div style={{display:"flex",gap:7,alignItems:"center"}}>
                  <span style={{fontSize:13}}>{s.emoji}</span>
                  <div>
                    <div style={{fontSize:10,color:stlIdx===i?s.color:C.dim,fontWeight:stlIdx===i?700:400}}>{s.name}</div>
                    <div style={{fontSize:8,color:C.dimmer,marginTop:1}}>{s.tagline}</div>
                  </div>
                </div>
              </div>
            ))}

            {["basics","dsa","patterns","company"].includes(section)&&sectionTopics.map(t=>(
              <div key={t.id}>
                <div onClick={()=>goTopic(t.id)} style={{padding:"8px 12px",cursor:"pointer",borderLeft:`3px solid ${activeTopic?.id===t.id?t.color:"transparent"}`,background:activeTopic?.id===t.id?C.card:"transparent"}}>
                  <div style={{fontSize:11,color:activeTopic?.id===t.id?t.color:C.dim,fontWeight:activeTopic?.id===t.id?700:400}}>{t.emoji} {t.label}</div>
                  <div style={{fontSize:8,color:C.dimmer,marginTop:1}}>{t.items.length} problems</div>
                </div>
                {activeTopic?.id===t.id&&t.items.map((p,pi)=>(
                  <div key={pi} onClick={()=>goItem(pi)} style={{padding:"5px 12px 5px 24px",cursor:"pointer",background:itemIdx===pi?t.color+"11":"transparent",borderLeft:`3px solid ${itemIdx===pi?t.color:"transparent"}`}}>
                    <div style={{display:"flex",gap:4,alignItems:"center"}}>
                      <span style={{fontSize:7,color:LEVEL_COLOR[p.level],border:`1px solid ${LEVEL_COLOR[p.level]}44`,borderRadius:2,padding:"1px 3px"}}>{p.level}</span>
                      <span style={{fontSize:10,color:itemIdx===pi?t.color:"#3a4a5a",lineHeight:1.3}}>{p.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── MAIN CONTENT ── */}
        <div style={{flex:1,overflowY:"auto",padding:20}}>

          {/* SEARCH RESULTS */}
          {search.length>=2&&(
            <div style={{maxWidth:700}}>
              <div style={{fontSize:12,color:C.dim,marginBottom:12}}>
                Found {searchResults.length} results for "{search}"
              </div>
              {searchResults.map((p,i)=>(
                <div key={i} onClick={()=>{
                  const t=ALL_TOPICS.find(t=>t.id===p.topicId);
                  if(!t)return;
                  changeSection(t.section);
                  setTimeout(()=>{setTopicId(t.id);setItemIdx(t.items.findIndex(x=>x.title===p.title));setTab("code");},0);
                  setSearch("");
                }} style={{background:C.card,border:`1px solid ${p.topicColor}33`,borderRadius:6,padding:"10px 14px",marginBottom:8,cursor:"pointer"}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                    <span style={{fontSize:8,color:LEVEL_COLOR[p.level],border:`1px solid ${LEVEL_COLOR[p.level]}44`,borderRadius:2,padding:"1px 5px"}}>{p.level}</span>
                    <span style={{fontSize:13,color:p.topicColor,fontWeight:700}}>{p.title}</span>
                    <span style={{fontSize:9,color:C.dim}}>{p.topicLabel}</span>
                  </div>
                  <div style={{fontSize:10,color:C.dim}}>{p.tag} · {p.company}</div>
                </div>
              ))}
              {searchResults.length===0&&<div style={{color:C.dim,fontSize:12}}>No results. Try a different keyword.</div>}
            </div>
          )}

          {/* HOME PAGE */}
          {!search&&section==="start"&&(
            <div style={{maxWidth:660}}>
              <div style={{marginBottom:20}}>
                <div style={{fontSize:20,color:C.green,fontWeight:700,marginBottom:6}}>DSA Master — Complete Guide 🎯</div>
                <div style={{color:C.dim,lineHeight:1.9,fontSize:12}}>{totalProblems} problems · 8 STL containers · 7 pattern templates · Company-specific sections. Everything you need for LG Soft and beyond.</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                {[
                  {color:C.blue,emoji:"📦",title:"STL Library",desc:"8 containers. Visual + cheatsheet.",action:()=>changeSection("stl")},
                  {color:C.cyan,emoji:"🔰",title:"Complete Basics",desc:"FizzBuzz to Pascal's triangle. Zero prerequisites.",action:()=>{changeSection("basics");setTopicId("loops");}},
                  {color:C.lime,emoji:"🌿",title:"DSA Core",desc:"Arrays→DP→Graphs. All with analogies.",action:()=>{changeSection("dsa");setTopicId("arrays");}},
                  {color:C.indigo,emoji:"📋",title:"Pattern Templates",desc:"7 reusable templates. Copy-adapt-solve.",action:()=>{changeSection("patterns");setTopicId("templates");}},
                  {color:C.blue,emoji:"🏢",title:"TCS/Wipro/Infosys",desc:"Mass recruiter style questions.",action:()=>{changeSection("company");setTopicId("mass");}},
                  {color:C.orange,emoji:"🚀",title:"Amazon/LG/Google",desc:"Product company patterns.",action:()=>{changeSection("company");setTopicId("product");}},
                  {color:C.purple,emoji:"💻",title:"Microsoft/Adobe",desc:"Design + math problems.",action:()=>{changeSection("company");setTopicId("ms_adobe");}},
                  {color:C.green,emoji:"🎯",title:"LG Soft Specific",desc:"Bit ops, embedded-aware questions.",action:()=>{changeSection("company");setTopicId("lgsoft");}},
                ].map((c,i)=>(
                  <div key={i} onClick={c.action} style={{background:C.card,border:`1px solid ${c.color}33`,borderRadius:7,padding:14,cursor:"pointer"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=c.color}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=c.color+"33"}>
                    <div style={{fontSize:18,marginBottom:5}}>{c.emoji}</div>
                    <div style={{fontSize:12,color:c.color,fontWeight:700,marginBottom:4}}>{c.title}</div>
                    <div style={{fontSize:10,color:C.dim,lineHeight:1.6}}>{c.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:14}}>
                <div style={{fontSize:10,color:C.green,letterSpacing:2,marginBottom:10}}>📋 HOW TO STUDY EACH PROBLEM</div>
                {["Click BREAKDOWN tab first — understand the idea before the code","Read the real-world analogy — connects pattern to something you know","Study the step-by-step — know what to think before you type","Then read the code — line by line with comments","Copy it, run it, change values, deliberately break it","Close and rewrite from memory — only way it actually sticks"].map((s,i)=>(
                  <div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                    <div style={{minWidth:18,height:18,background:C.green+"22",border:"1px solid "+C.green+"55",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:C.green,flexShrink:0}}>{i+1}</div>
                    <span style={{fontSize:10,color:C.dim,lineHeight:1.7}}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STL PAGE */}
          {!search&&section==="stl"&&stl&&(
            <div style={{maxWidth:720}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
                <span style={{fontSize:34}}>{stl.emoji}</span>
                <div>
                  <div style={{fontSize:19,color:stl.color,fontWeight:700}}>{stl.name}</div>
                  <div style={{fontSize:11,color:C.dim}}>{stl.tagline}</div>
                </div>
              </div>
              <div style={{background:C.card,border:`1px solid ${stl.color}33`,borderRadius:7,padding:14,marginBottom:12}}>
                <div style={{fontSize:9,color:stl.color,letterSpacing:3,marginBottom:7}}>WHAT IS IT?</div>
                <div style={{fontSize:12,color:"#b0bec5",lineHeight:1.9}}>{stl.what}</div>
              </div>
              <div style={{background:"#0d1117",border:"1px solid "+C.border,borderRadius:7,padding:14,marginBottom:12}}>
                <div style={{fontSize:9,color:C.dimmer,letterSpacing:3,marginBottom:7}}>VISUAL — HOW IT LOOKS IN MEMORY</div>
                <pre style={{margin:0,fontSize:11,color:stl.color,lineHeight:1.9,fontFamily:"inherit",whiteSpace:"pre-wrap"}}>{stl.visual}</pre>
              </div>
              <div style={{background:"#1a100e",border:"1px solid #5f2a1a",borderRadius:7,padding:14,marginBottom:12}}>
                <div style={{fontSize:9,color:C.orange,letterSpacing:3,marginBottom:8}}>⚠ COMMON MISTAKES & TIPS</div>
                {stl.tips.map((t,i)=>(
                  <div key={i} style={{display:"flex",gap:8,marginBottom:6}}>
                    <span style={{color:C.orange,fontSize:11}}>→</span>
                    <span style={{fontSize:11,color:C.orange+"99",lineHeight:1.7}}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{background:C.sidebar,border:"1px solid "+C.border,borderRadius:7,overflow:"hidden",marginBottom:14}}>
                <div style={{padding:"9px 14px",borderBottom:"1px solid "+C.border}}>
                  <span style={{fontSize:9,color:C.dimmer,letterSpacing:3}}>CHEATSHEET</span>
                </div>
                {stl.cheatsheet.map((it,i)=>(
                  <div key={i} style={{display:"flex",padding:"7px 14px",borderBottom:"1px solid #111820",background:i%2===0?"transparent":C.card,gap:14,flexWrap:"wrap"}}>
                    <code style={{fontSize:11,color:stl.color,minWidth:250,fontFamily:"inherit"}}>{it.op}</code>
                    <span style={{fontSize:11,color:C.dim}}>// {it.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setStlIdx(i=>Math.max(0,i-1))} style={{flex:1,padding:"8px 0",background:"transparent",border:"1px solid "+C.border,color:C.dim,cursor:"pointer",fontSize:10,borderRadius:4,fontFamily:"inherit"}}>← PREV</button>
                <button onClick={()=>setStlIdx(i=>Math.min(STL_DATA.length-1,i+1))} style={{flex:1,padding:"8px 0",background:"transparent",border:`1px solid ${stl.color}55`,color:stl.color,cursor:"pointer",fontSize:10,borderRadius:4,fontFamily:"inherit"}}>NEXT →</button>
              </div>
            </div>
          )}

          {/* PROBLEM PAGE */}
          {!search&&["basics","dsa","patterns","company"].includes(section)&&activeTopic&&item&&(
            <div style={{maxWidth:760}}>
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,flexWrap:"wrap"}}>
                  <span style={{color:LEVEL_COLOR[item.level],border:`1px solid ${LEVEL_COLOR[item.level]}44`,borderRadius:3,padding:"2px 8px",fontSize:9}}>{item.level}</span>
                  <span style={{fontSize:15,color:activeTopic.color,fontWeight:700}}>{item.title}</span>
                  <span style={{fontSize:9,color:C.dimmer,background:C.card,border:"1px solid "+C.border,borderRadius:3,padding:"2px 6px"}}>{item.tag}</span>
                  {item.company&&<span style={{fontSize:8,color:C.dim}}>Asked by: {item.company}</span>}
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {["code","breakdown"].map(t=>(
                    <button key={t} onClick={()=>setTab(t)} style={{padding:"4px 12px",fontSize:9,letterSpacing:1,cursor:"pointer",background:tab===t?activeTopic.color:"transparent",color:tab===t?"#000":activeTopic.color,border:`1px solid ${activeTopic.color}55`,borderRadius:3,fontFamily:"inherit"}}>
                      {t==="code"?"💻 CODE":"📋 BREAKDOWN"}
                    </button>
                  ))}
                </div>
              </div>

              {tab==="breakdown"?(
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <div style={{display:"flex",gap:10}}>
                    <div style={{flex:1,background:C.card,border:"1px solid #1e2d40",borderRadius:6,padding:11}}>
                      <div style={{fontSize:9,color:"#4fc3f7",letterSpacing:2,marginBottom:5}}>INPUT</div>
                      <code style={{fontSize:11,color:"#80deea"}}>{item.input}</code>
                    </div>
                    <div style={{flex:1,background:C.card,border:"1px solid #1e3a22",borderRadius:6,padding:11}}>
                      <div style={{fontSize:9,color:C.green,letterSpacing:2,marginBottom:5}}>OUTPUT</div>
                      <code style={{fontSize:11,color:"#66bb6a"}}>{item.output}</code>
                    </div>
                  </div>
                  <div style={{background:C.card,border:`1px solid ${activeTopic.color}33`,borderRadius:6,padding:13}}>
                    <div style={{fontSize:9,color:activeTopic.color,letterSpacing:2,marginBottom:7}}>CORE IDEA</div>
                    <div style={{fontSize:12,color:"#b0bec5",lineHeight:1.9}}>{item.concept}</div>
                  </div>
                  <div style={{background:"#0e1520",border:"1px solid #1e2d40",borderRadius:6,padding:13}}>
                    <div style={{fontSize:9,color:"#80deea",letterSpacing:2,marginBottom:7}}>💡 REAL-WORLD ANALOGY</div>
                    <div style={{fontSize:12,color:"#90a4ae",lineHeight:1.9}}>{item.analogy}</div>
                  </div>
                  <div style={{background:"#0d1a10",border:"1px solid #1e3a22",borderRadius:6,padding:13}}>
                    <div style={{fontSize:9,color:C.green,letterSpacing:2,marginBottom:9}}>STEP BY STEP — Think this before you code</div>
                    {item.steps.map((s,i)=>(
                      <div key={i} style={{display:"flex",gap:9,marginBottom:7,alignItems:"flex-start"}}>
                        <div style={{minWidth:20,height:20,background:activeTopic.color+"22",border:`1px solid ${activeTopic.color}55`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:activeTopic.color,flexShrink:0}}>{i+1}</div>
                        <span style={{fontSize:11,color:"#78909c",lineHeight:1.8,paddingTop:2}}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"#1a100e",border:"1px solid #5f2a1a",borderRadius:6,padding:12}}>
                    <div style={{fontSize:9,color:C.orange,letterSpacing:2,marginBottom:7}}>⚡ STL TOOLS TO USE</div>
                    <code style={{fontSize:11,color:C.orange+"99"}}>{item.stl}</code>
                  </div>
                  <button onClick={()=>setTab("code")} style={{padding:"9px 0",background:"transparent",border:`1px solid ${activeTopic.color}`,color:activeTopic.color,cursor:"pointer",fontSize:11,borderRadius:4,fontFamily:"inherit",letterSpacing:2}}>
                    → NOW READ THE CODE
                  </button>
                </div>
              ):(
                <div>
                  <div style={{background:C.card,border:`1px solid ${activeTopic.color}22`,borderRadius:6,padding:"9px 13px",marginBottom:11,fontSize:11,color:C.dim,lineHeight:1.7}}>
                    <span style={{color:activeTopic.color}}>💡 </span>{item.concept}
                  </div>
                  <CodeBlock code={item.code} color={activeTopic.color}/>
                  <div style={{display:"flex",gap:8,marginTop:12}}>
                    <button onClick={prevItem} style={{flex:1,padding:"8px 0",background:"transparent",border:"1px solid "+C.border,color:C.dim,cursor:"pointer",fontSize:10,borderRadius:4,fontFamily:"inherit"}}>← PREV</button>
                    <button onClick={()=>setTab("breakdown")} style={{flex:1,padding:"8px 0",background:"transparent",border:`1px solid ${activeTopic.color}55`,color:activeTopic.color,cursor:"pointer",fontSize:10,borderRadius:4,fontFamily:"inherit"}}>📋 BREAKDOWN</button>
                    <button onClick={nextItem} style={{flex:1,padding:"8px 0",background:"transparent",border:`1px solid ${activeTopic.color}55`,color:activeTopic.color,cursor:"pointer",fontSize:10,borderRadius:4,fontFamily:"inherit"}}>NEXT →</button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
