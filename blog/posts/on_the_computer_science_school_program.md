## 14 August 2025
# On The Computer Science School Program

XX minute read FAI PROOFREADING CON CLAUDE

## Introduction (presentation of the argument and personal presentation)

Hello reader, i am Federico Veronesi, a soon to be student of computer engineering at the University Of Pisa. I already wrote an article where i present myself through my story. You can find it in this website, under the name "My Fascination With Programming". I invite you to read that first, if you prefer to know more about my story before delving into my opinions. I believe that this examination can be interesting to students and teachers alike, because today we're going to explore potential improvements to the current italian computer science school program. Specifically, i'm going to refer to the scientific high school of applied sciences, which is the type that i attended. I could dedicate an entire article to explaining the complex landscape of the high school types a student can choose after middle school but, for now, suffice to say that mine had two hours of computer science per week. Also, it is worth to mention that high school, in italy, lasts 5 years.

## What Works

I think that they mostly got it right. The first year focuses on the components of a computer, the binary number system, what a turing machine is, and boolean algebra. These are the fundamentals, and i think it is actually excellent knowledge to have for anybody that is starting out. In the second year flowchart programming is used to ease in students towards programming. This helps to visualize the solutions, for students that might find it hard to abstractly imagine them. The third and fourth years are the problematic ones in my opinion, so let's jump to the fifth to analyze them more in depth later. In the last year pupils study databases and computer networks. These aren't essential to know for non-programmers, but are important parts of computer science nonetheless.

## What Doesn't

As mentioned before, i think there is a problem with what is taught in the third and fourth years. That would be C++. No programming language is a terrible choice, but a language can, like in this case, be too complex to be taught first. It is commonly known as the most difficult to use language. It would actually be perfect, but only if the programmer already knew both low-level programming and OOP (object oriented programming) well.

## Why C++

Low-level programs can directly manipulate a computer's resources, or can interface directly with the operating system, that is if there is one to work with. OOP aims to map the problem into a solution as intuitively as possible. Using specific design patterns and language features, the resulting code describes complex, real-world problems in a human-friendly way. The first paradigm is used either in situations where hardware resources have to be used directly, like in operating systems, or in programs that require maximum efficiency through direct control of what the computer executes, like in Redis. The second one is used for every sufficiently complex program, that could benefit from abstracting away the implementation details, in favor of application logic and functionality, like in enterprise applications. The problem is that it is very hard to have both, because your code either interfaces directly with the metal, or it describes a larger system through abstraction. C++ aims to bridge that gap. It is a language that was born out of C, a standard in the low-level world and earlier, lesser known, pioneer OOP languages. For this reason, it is incredibly hard to use, and requires the programmer to know both paradigms in depth. It takes quite literally decades to become an expert in C++. Thus, it confuses any students that face it as the first language.

## How It Is Really Taught

C++ gets reduced to a shortcut, mostly. Since it has a bit of everything, it is first used to teach low-level, and later high-level programming (OOP). They both get skimmed through superficially, and many details are overlooked. What ends happening is that the students are taught geek-programming, and not even that, really. They're left with just enough knowledge to vibe code a CLI (command line interface) unit converter that runs locally. I see this as a failure on the school system's part.

## Improvements On Low-Level Programming Didactics

Low-level programming can be a great to teach about how a computer works. I know this because i have made a 52 episode C tutorial, which can be found on my YouTube channel, linked in the footer of my website. I would follow the structure of my course to teach students the C programming language. The first topics would be the basics, such as data types, what memory is, how an integer is represented in memory, what an ASCII table is, and how to detect potential integer overflows. Then all the usual stuff, such as iteration, conditionals, boolean algebra, functions. I would not just teach the syntax and how to make the program run. I would analyze the resulting assembly code together with the students, and analyze concerns of optimization and internal implementation. Then we continue, the usual stuff, pointers, structs, strings, enums, constants, but then i would actually try and have some fun, like trying to execute memory. We would do that by copying the compiled code pointed by a function pointer into an array, and then cast the address of that byte array into a function pointer, and call it, thus executing memory. That would also be an excuse to teach segmentation faults. Obviously, when teaching pointers, but more specifically dynamic memory allocation, i would explain the difference between the heap and the stack, and the most common bugs and vulnerabilities like buffer overflows, double free, use after free, etc.

## Improvements On High-Level Programming Didactics

For the high-level part of the question, there is only one right answer: Python! It employs the procedural, object-oriented, and functional paradigms, and its basics are very easy to learn. This is not only a massively useful and mature language, as it is also built with more modern functionality like duck typing. The implementation details can still be explored in depth, but it is also easy to use. Another contender would be Java, but it just misses out on that simplicity that can be perfect for beginners.

## Conclusion

No school program will ever be perfect. If anything, i would actually propose that the bottleneck is the teacher, not the subject. If i were in charge of making the students truly interested in the field, while giving them a solid foundation at the same time, in two hours per week of lessons, i would assign custom-made homework, prepare my own slides, demand silence in the room, and give extra exercises to be done on a voluntary basis for those who wanted it, all things that none of my past computer science teachers have ever gotten close to do.