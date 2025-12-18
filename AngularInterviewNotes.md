# Angular Interview Notes

- [Angular Interview Notes](#angular-interview-notes)
  - [YARN](#yarn)
  - [DRY](#dry)
  - [SOLID](#solid)
  - [Object Oriented Programming](#object-oriented-programming)
  - [Playwright](#playwright)
  - [Jasmine](#jasmine)
  - [Accessibility](#accessibility)
  - [Styling SCSS](#styling-scss)
  - [How javascript works underneath the hoods](#how-javascript-works-underneath-the-hoods)
    - [Async Code example](#async-code-example)
  - [Change Detection on push](#change-detection-on-push)
  - [Life Cycle Hooks](#life-cycle-hooks)
  - [RxJS](#rxjs)
  - [Hot And Cold Observables](#hot-and-cold-observables)
  - [Signals](#signals)
  - [RXjS Most Common](#rxjs-most-common)
  - [Components or Directives](#components-or-directives)
  - [NGRx (Global)](#ngrx-global)
  - [NGRX Component Store](#ngrx-component-store)
  - [Micro Frontend](#micro-frontend)
  - [NX and Monorepo](#nx-and-monorepo)
  - [Ionic Need To Know](#ionic-need-to-know)
  - [Service Worker](#service-worker)
  - [Standalone](#standalone)
  - [AOT (Ahead of Time Compilation) and Just in time compilation](#aot-ahead-of-time-compilation-and-just-in-time-compilation)
  - [Modules](#modules)
  - [IndexDB](#indexdb)
  - [ChangeDetectorRef](#changedetectorref)
  - [Questions and Answers](#questions-and-answers)
  - [Mock Interviews and Coding Practice](#mock-interviews-and-coding-practice)

## YARN

## DRY

## SOLID

Robust, scalable, and easier to maintain, leading to higher quality and more adaptable codebases.

1. **Single Responsibility Principle (SRP)**

- do one thing and do it well
- A class should have only one reason to change, meaning it should have only one job or responsibility.
- Understandable, easy to name and maintainable.

1. **Open/Closed Principle (OCP)**

- Software entities like classes, modules, and functions should be open for extension but closed for modification.
- This means you can add new functionality without altering existing code. polymorphism and abstraction. But difficult to change in order to protect from the developers mistakes

1. **Liskov Substitution Principle (LSP)**

- Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

1. **Interface Segregation Principle (ISP)**

- No client should be forced to depend on methods it does not use.
- **Have many specific interfaces than a single general-purpose one**.

1. **Dependency Inversion Principle (DIP)**

- **Depend on abstractions, not on concrete implementations**.
- High-level modules should not depend on low-level modules; both should depend on abstractions.

## Object Oriented Programming

- **Encapsulation**:

  - Use **private, protected and public** methods to expose outside components or classes only the necessary fields and methods
  - This principle involves bundling related data and the methods that operate on that data within a single unit, such as a class. Encapsulation restricts external access to certain components of an object, promoting modularity and safeguarding data integrity.

- **Abstraction**:

  - Expose **only essential features and hide unnecessary details**. Create an abstract class with contract (methods and fields) that are required and hide the implementation inside the concrete class
  - For example **abstract http call logic inside service**
  - **Declarative programming not imperative**, abstract the complex logic
  - Abstraction focuses on exposing only the essential features of an object while hiding the complex details. By modeling classes pertinent to the problem, it reduces programming complexity and enhances code clarity.

- **Inheritance**:

  - **Inherit methods fields from interfaces or classes from existing classes, hence do not repeat your self**
  - Inheritance allows a new class (subclass or child class) to acquire properties and behaviors from an existing class (superclass or parent class). This mechanism promotes code reusability and establishes hierarchical relationships among classes.

- **Polymorphism**:
  - **It allows a single interface to represent different underlying data types, enhancing flexibility and integration in code**.
  - We have one interface Leg and one more interface Human and Dog, both interfaces extend the Leg interface because they require the Leg interface fields. Later when we need to process the legs we can pass the Human or Dog interfaces as well. Essentially Human and Dog interfaces use polymorphism
  - Derived from the Greek for "many forms," polymorphism enables methods or objects to take on multiple forms.

## Playwright

- An AI web browsing framework focused on simplicity and extensibility. <https://github.com/browserbase/stagehand>
- <https://playwright.dev/>

## Jasmine

## Accessibility

Key Principles of Web Accessibility:

- **Perceivable** visible, correct colors length of text
- **Operable** accessible from keyboard tabs for example
- **Understandable** self explanatory
- **Robust** Work on all screens for example

  **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive.
  **Operable**: User interface components and navigation must be operable; users should be able to interact with all controls.
  **Understandable**: Information and the operation of the user interface must be understandable.
  **Robust**: Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

Best Practices for Implementing Accessibility:

    Use **Semantic HTML**: Employing proper HTML tags provides meaningful structure to your content, aiding assistive technologies in interpreting and navigating your site effectively.

    Ensure **Keyboard Accessibility**: Design interactive elements to be operable via keyboard alone, accommodating users who cannot use a mouse.

    Provide **Text Alternatives**: Offer descriptive alt text for images and transcripts for multimedia content, enabling screen readers to convey information to visually impaired users.

    Maintain **Sufficient Color Contrast**: Use color schemes with adequate contrast between text and background to assist users with visual impairments or color blindness.

    Implement ARIA Roles and Attributes: Utilize Accessible Rich Internet Applications (ARIA) specifications to enhance the accessibility of dynamic content and complex user interface components.

    Design Responsive Interfaces: Ensure your website adapts seamlessly to various devices and screen sizes, providing a consistent experience for all users.

    Conduct Regular Accessibility Testing: Use automated tools and manual testing methods to identify and address accessibility issues throughout the development process.

## Styling SCSS

    Global Styles:
        global.scss: apply globally, common elements, typography, and utility classes that are shared
    Theming Variables:
        variables.scss: src/theme/ directory, CSS variables that define the application's theme, such as colors, fonts, and spacing.

    Component-Level Styles:
        Component SCSS Files component own SCSS file, enabling you to encapsulate styles specific to that component.modularity and prevents styles from unintentionally affecting other parts of the application. By default, these styles are scoped locally to the component.

Best Practices for Structuring SCSS in Ionic Angular:

    Organize SCSS Files: Styles directory containing subfolders for mixins, functions, and partials.
    Ionic Forum

    Importing Styles: Use the global.scss to import your organized SCSS partials.

    Utilize CSS Variables: leverages CSS variables extensively for theming.  variables.scss file

## How javascript works underneath the hoods

- JavaScript needs a runtime such as a web browser or Node.js
- Is single-threaded, event-driven model.

1. JavaScript Engine: executes the code. It processes the code line by line, converting it into machine-readable instructions.
2. Call Stack: JavaScript uses a call stack to manage function execution.
   1. When a function is invoked, it's added to the top of the stack. Once executed, it's removed, and the engine proceeds to the next function.
3. Event Loop and Callback Queue: For handling asynchronous operations (like setTimeout or fetching data), JavaScript utilizes an event loop.
   1. When such operations are initiated, they're offloaded, and their callbacks are placed in a queue.
   2. The event loop continuously checks the call stack;
      1. if it's empty, it pushes the next callback from the queue onto the stack for execution.

This model allows JavaScript to perform non-blocking operations despite being single-threaded, enabling efficient handling of tasks like user interactions and network requests.

### Async Code example

```ts
console.log("Start"); //Synchronous Code Execution: JavaScript executes synchronous code first. Therefore, 'Start' is logged immediately.

setTimeout(() => {
  //the callback is placed in the macrotask queue
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  //placed in the microtask queue
  console.log("Promise");
});

console.log("End");

//result
// Start
// End
// Promise
// Timeout
```

1. synchronous excecutions Start and End
2. microtask que Promis.resolve().then()
3. macrotask que setTimeout()

- **setTimeout** **macrotask queue** and will only **execute after the current execution stack is clear** and **all microtasks have been processed**.
- Promise.resolve().then(...): Promises' .**then()** handlers are placed in the **microtask** queue, which has a higher priority than the macrotask queue. executed immediately after the current synchronous code completes, before any macrotasks.
- **Microtask** Execution: Once the synchronous code is finished, the event loop checks the microtask queue and executes.
- **Macrotask** Execution: Once the synchronous code is finished and microtask is empty, the event loop will processes the macrotask

## Change Detection on push

Default, Angular's change detection strategy checks all components in the component tree for changes during each change detection cycle. lead to performance due to the extensive checks.

To optimize performance, Angular provides the ChangeDetectionStrategy.OnPush strategy. When a component is configured with OnPush, Angular's change detection is triggered for that component only under specific conditions:

    Input Property Changes: If an @Input() property of the component receives a new reference (i.e., the reference changes, not just the properties of the object), Angular will trigger change detection for that component.

    Events Originating from the Component or its Children: User interactions such as clicks, input events, or other DOM events within the component or its child components can trigger change detection.

    Manual Invocation: Developers can manually trigger change detection by injecting the ChangeDetectorRef service and calling its markForCheck() or detectChanges() methods.

## Life Cycle Hooks

ngOnInit

    Called once after the first ngOnChanges.
    Ideal for component initialization and fetching initial data.

ngOnChanges

    Invoked when any data-bound input property changes.
    Receives a SimpleChanges object containing current and previous property values.

ngOnDestroy

    Called just before Angular destroys the component.
    Perfect for cleanup tasks like unsubscribing from observables.

ngAfterViewInit

    Runs once after the component's view and child views have been initialized.

ngAfterContentInit

    Executed once after Angular projects external content into the component's view.

ngAfterContentChecked

    Called after every check of projected content.

ngAfterViewChecked

    Invoked after every check of the component's view and child views.

ngDoCheck

    Runs during every change detection cycle.
    Use for custom change detection logic.

## RxJS

- combine latest
- map
- concatMap
- switchMap
- mergeMap

## Hot And Cold Observables

Hot vs Cold Observables

- Cold Observables start emitting when the subscription starts
- Hot Observables are always being updated with new values,

| Feature             | Cold        | Hot                  |
| ------------------- | ----------- | -------------------- |
| Starts on subscribe | ✅           | ❌                 |
| Shared execution    | ❌           | ✅                 |
| Late subscribers    | Restart     | Miss previous values |
| Examples            | HTTP, timer | Subject, events      |


## Signals

- Signals are ideal for handling synchronous state changes, while observables excel in managing asynchronous events

- set(newValue): Directly assigns a new value to the signal.

const count = signal(0);
count.set(5); // Sets the signal's value to 5

- update(updaterFn): Updates the signal's value based on its current state by applying the provided function.

const count = signal(0);
count.update(value => value + 1); // Increments the current value by 1

- mutate(mutatorFn): Applies a mutator function to modify the signal's value in place, useful for complex data structures.

const items = signal(['apple', 'banana']);
items.mutate(list => list.push('cherry')); // Adds 'cherry' to the array

- computed(computeFn): Creates a new signal whose value is derived from other signals. It automatically recalculates when any of its dependencies change.

const width = signal(5);
const height = signal(10);
const area = computed(() => width() \* height());
console.log(area()); // Outputs: 50

## RXjS Most Common

- pipe: used to compose multiple operators into a sequence, you can create flexible and reusable data processing pipelines in a declarative manner.
- map: Transforms each value
- filter: values
- switchMap: Projects each source value to an Observable, which is merged in the output Observable, emitting values only from the most recently projected Observable
- mergeMap (also known as flatMap): Maps each value to an Observable, then flattens all of these inner Observables using mergeAll. It allows for concurrent inner subscriptions.
- concatMap: waits for the observable to finish and after it moves on to the next
- combineLatest: Combines multiple Observables to create an Observable whose value is calculated from the other. Does not start to emit until all have emitted and after it emits whenever one emits
- tap: Performs a side effect
- catchError: Catches errors on the source Observable and returns a new Observable or throws an error
- debounceTime: Delays the emissions of the source Observable by a given time span, and omits any intermediate values

## Components or Directives

- Components for new widgets
- Directives for new behavior logic to existing component or elements
  - does not include HTML
  - can add multiple directives on components or elements

## NGRx (Global)

## NGRX Component Store

<https://ngrx.io/guide/component-store>

## Micro Frontend

## NX and Monorepo

<https://nx.dev/getting-started/intro>

Best Practices for Monorepos

    Use tools like Nx, Bazel, or Turborepo to optimize builds and testing.
    Implement a robust CI/CD pipeline to handle incremental builds and selective testing.
    Structure the repository to clearly separate projects and shared libraries.
    Establish clear guidelines for dependencies and code ownership.
    Use feature flags or versioned libraries to decouple updates across projects.

When to Choose a Monorepo

    If you have tightly coupled projects with shared components.
    When you aim to enforce consistent tooling, standards, and processes.
    For organizations where collaboration between teams is a priority.

When to Avoid a Monorepo

    If the projects are entirely unrelated and have no shared code.
    When you lack the necessary tooling or infrastructure to manage a large monorepo effectively.
    If granular access control is a critical requirement.

## Ionic Need To Know

## Service Worker

- Its a script that runs in the background of your web browser
- It acts as a programmable network proxy, to intercept and control how network requests are handled
  - used for creating Progressive Web Apps (PWAs) that offer offline support
    - caching assets and responses enable web applications to work even when the network is unavailable
      - They can synchronize data in the background, ensuring that the latest updates are available when the user reconnects to the internet.
- Capabilities like push notifications.

## Standalone

Enables treeshaking so the final build output only includes the code necessary to run your app which reduces overall build size.
Avoids the use of NgModules to streamline the development experience and make your code easier to understand.
Allows developers to also use newer Angular features such as ESBuild.

## AOT (Ahead of Time Compilation) and Just in time compilation

- more performance no need to transpile code in run time
- helps to catch errors, is more strict
- prepare everything before we release to production and just ship everything as js files, no template or ts file

## Modules

- imports
  - other modules
- declarations
  - define module components
- export
  - export defined modules if necessary
- providers
  - services

## IndexDB

- <https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API>

## ChangeDetectorRef

https://angular.dev/api/core/ChangeDetectorRef

## Questions and Answers

1. <https://www.simplilearn.com/tutorials/angular-tutorial/angular-interview-questions?utm_source=chatgpt.com>
2. <https://www.turing.com/interview-questions/angular?utm_source=chatgpt.com>
3. <https://www.interviewbit.com/angular-interview-questions/?utm_source=chatgpt.com>
4. <https://arc.dev/talent-blog/angular-interview-questions/?utm_source=chatgpt.com>
5. <https://davembush.medium.com/angular-performance-optimization-5ec630d2b8f1>
6. <https://www.xenonstack.com/blog/performance-optimization-in-angular?utm_source=chatgpt.com>
7. <https://dev.to/vivekdogra02/14-tips-for-enhancing-angular-performance-1i3i?utm_source=chatgpt.com>
8. <https://www.evoketechnologies.com/blog/best-practices-robust-angular-application/?utm_source=chatgpt.com>
9. <https://www.bacancytechnology.com/blog/angular-performance-optimization?utm_source=chatgpt.com>

## Mock Interviews and Coding Practice

- Interview Platforms:
  - Pramp: Offers free mock interviews with peers to practice coding and system design.
  - Interviewing.io: Provides mock interviews conducted by experienced software engineers.
- Coding Challenges:
  - HackerRank: Features a variety of coding challenges, including those focused on Angular.
  - LeetCode: Offers a vast collection of coding problems to enhance problem-solving skills.
