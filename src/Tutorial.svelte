<script lang="ts">
  import BindingForm from "./BindingForm.svelte";

  export let name: string = "default";
  let count = 0;
  const increment = () => { count += 1};

  let user = { loggedIn: false };

  const toggle = () => { user.loggedIn = !user.loggedIn }

  let cats = [
    { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
    { id: 'z_AbfPXTKms', name: 'Maru' },
    { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
  ];

  async function getRandomNumber() {
    const res = await new Promise(resolve => setTimeout(resolve, 6000));
    const text = await res.text();

    if (res.ok) {
      return text;
    } else {
      throw new Error(text);
    }
  }

  let promise = getRandomNumber();

  let m = { x: 0, y: 0 };
  function handleMousemove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
  function handleClick() {
    alert('clicked')
  }

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sayHello() {
    dispatch('message', {
      text: 'Hello!'
    });
  }
  let a = 1;
  let yes = false;
  let scoops = 1;
  let flavours = ['Mint choc chip'];
  let menu = [
    'Cookies and cream',
    'Mint choc chip',
    'Raspberry ripple'
  ];
  function join(flavours) {
    if (flavours.length === 1) return flavours[0];
    return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
  }
  let value = "asdf"
  let html = '<p>Write some text!</p>';
  let todos = [
    { done: false, text: 'finish Svelte tutorial' },
    { done: false, text: 'build an app' },
    { done: false, text: 'world domination' }
  ];

  function add() {
    todos = todos.concat({ done: false, text: '' });
  }

  function clear() {
    todos = todos.filter(t => !t.done);
  }

  $: remaining = todos.filter(t => !t.done).length;
</script>

<main>
    <h1>Hello {name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <button on:click={increment}>{count}</button>



    <!-- Flow control -->
    {#if user.loggedIn}
        <button on:click={toggle}>
            Log out
        </button>
    {:else}
        <button on:click={toggle}>
            Log in
        </button>
    {/if}



    <!-- Looping through arrays -->
    <!-- enumerate by specifying i, then specify the id for each element with (cat.id)-->
    {#each cats as cat, i (cat.id)}
        <li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
            {i + 1}: {cat.name}
        </a></li>
    {/each}

    <!-- Asynchronous code-->
    {#await promise}
        <p>...waiting</p>
    {:then number}
        <p>The number is {number}</p>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}

    <!-- If you're sure the promise wont reject -->
    {#await promise then value}
        <p>the value is {value}</p>
    {/await}

    <!-- Other cool events-->
    <div on:mousemove={handleMousemove} class="movebox">
        The mouse position is {m.x} x {m.y}
    </div>
    <!-- You can declare event handlers inline  -->
    <div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
        The mouse position is {m.x} x {m.y}
    </div>

    <!--  Dom event handler can have modifiers that alter their behavior. This alert only shows once.  -->
    <button on:click|once={handleClick}>
        Click me
    </button>
<!--  Components can dispatch events to their parents. -->
<!--  Using the property `on:message` makes that component bubble up all events it gets.-->
<!--  This works for any handler. Not defining a handler for `on:click` will mean the click event is bubbled up to the parent  -->
<!--   `bind:value={variable}` Allows you to set parent variables from a child component (The "value" of an input component can be set to be a variable in the parent. -->
<!--    This is a two way binding. The value of input will always equal the `name`, even if one or the other changes.-->
    <input bind:value={name}>
    <h1>Hello {name}!</h1>

<!--    Numeric inputs -- number input and a slider. These are automatically numbers instead of strings. -->
    <input type=number bind:value={a} min=0 max=10>
    <input type=range bind:value={a} min=0 max=10>

<!--    Boolean input (checkbox)-->
    <input type=checkbox bind:checked={yes}>
<!--    You can bind multiple inputs to the same value with bind:group, radio buttons:-->
    <label>
        <input type=radio bind:group={scoops} name="scoops" value={1}>
        One scoop
    </label>

    <label>
        <input type=radio bind:group={scoops} name="scoops" value={2}>
        Two scoops
    </label>

    <label>
        <input type=radio bind:group={scoops} name="scoops" value={3}>
        Three scoops
    </label>
<!--    It will also automatically add to an array, if that's what you want.-->
    {#each menu as flavour}
        <label>
            <input type=checkbox bind:group={flavours} name="flavours" value={flavour}>
            {flavour}
        </label>
    {/each}
    <p>
        You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
        of {join(flavours)}
    </p>
<!--    -->
    <textarea bind:value={value}></textarea>
<!--    If the names of a binding match, you can use this shorthand form-->
    <textarea bind:value></textarea>
<!--    <BindingForm/>-->
<!--    Select multiple allows you to select multiple things (instead of just radio button-ing one). Hold control-->
    <select multiple bind:value={flavours}>
        {#each menu as flavour}
            <option value={flavour}>
                {flavour}
            </option>
        {/each}
    </select>
<!--    Elements with a contenteditable="true" attribute support textContent and innerHTML bindings:-->
    <div
            contenteditable="true"
            bind:innerHTML={html}
    ></div>
    <pre>{html}</pre>

<!--    You can even bind to properties inside an each block.-->
<!--    Note that interacting with these <input> elements will mutate the array.
If you prefer to work with immutable data, you should avoid these bindings and use event handlers instead.-->
    {#each todos as todo}
        <div class:done={todo.done}>
            <input
                    type=checkbox
                    bind:checked={todo.done}
            >

            <input
                    placeholder="What needs to be done?"
                    bind:value={todo.text}
            >
        </div>
    {/each}

    <p>{remaining} remaining</p>

    <button on:click={add}>
        Add new
    </button>

    <button on:click={clear}>
        Clear completed
    </button>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    .movebox {
        background-color: beige;
        width: 100%;
        height: 100%;
    }
</style>